import { prisma } from '../prisma-client'

export class PropertyAnalyticsService {
  // Get property analytics
  static async get(propertyId: string) {
    return await prisma.propertyAnalytics.findUnique({
      where: { propertyId }
    })
  }

  // Get market trends
  static async getMarketTrends(locationId?: string, type?: string) {
    const where: any = {
      deletedAt: null,
      status: 'AVAILABLE'
    }

    if (locationId) where.locationId = locationId
    if (type) where.type = type

    const properties = await prisma.property.findMany({
      where,
      include: {
        priceHistory: {
          orderBy: { createdAt: 'asc' }
        }
      }
    })

    const avgPrice = properties.reduce((sum, p) => sum + Number(p.price), 0) / properties.length
    
    // Calculate price trends
    const priceChanges = properties.flatMap(p => p.priceHistory)
    const avgPriceChange = priceChanges.length > 0
      ? priceChanges.reduce((sum, h) => sum + Number(h.price), 0) / priceChanges.length
      : avgPrice

    const trend = avgPrice > avgPriceChange ? 'increasing' : avgPrice < avgPriceChange ? 'decreasing' : 'stable'

    return {
      avgPrice,
      trend,
      totalProperties: properties.length,
      priceRange: {
        min: Math.min(...properties.map(p => Number(p.price))),
        max: Math.max(...properties.map(p => Number(p.price)))
      }
    }
  }

  // Get user engagement metrics
  static async getUserEngagement(propertyId: string, days = 30) {
    const since = new Date()
    since.setDate(since.getDate() - days)

    const [views, favorites, shares] = await Promise.all([
      prisma.propertyView.count({
        where: {
          propertyId,
          viewedAt: { gte: since }
        }
      }),
      prisma.userFavorite.count({
        where: {
          propertyId,
          createdAt: { gte: since }
        }
      }),
      prisma.propertyShare.aggregate({
        where: {
          propertyId,
          createdAt: { gte: since }
        },
        _sum: {
          clicks: true
        },
        _count: true
      })
    ])

    // Get daily breakdown
    const viewsByDay = await prisma.$queryRaw<Array<{ date: Date; views: bigint }>>`
      SELECT DATE(viewed_at) as date, COUNT(*) as views
      FROM property_views
      WHERE property_id = ${propertyId}
        AND viewed_at >= ${since}
      GROUP BY DATE(viewed_at)
      ORDER BY date ASC
    `

    return {
      views,
      favorites,
      shares: shares._count,
      shareClicks: shares._sum.clicks || 0,
      viewsByDay: viewsByDay.map(v => ({
        date: v.date,
        views: Number(v.views)
      }))
    }
  }

  // Get price history for property
  static async getPriceHistory(propertyId: string) {
    return await prisma.priceHistory.findMany({
      where: { propertyId },
      orderBy: { createdAt: 'asc' }
    })
  }

  // Get top properties by metric
  static async getTopProperties(metric: 'views' | 'favorites' | 'shares', limit = 10, locationId?: string) {
    const where: any = {
      deletedAt: null,
      status: 'AVAILABLE'
    }

    if (locationId) where.locationId = locationId

    const orderByMap = {
      views: { totalViews: 'desc' as const },
      favorites: { totalFavorites: 'desc' as const },
      shares: { totalShares: 'desc' as const }
    }

    const properties = await prisma.property.findMany({
      where,
      include: {
        location: true,
        images: { take: 1, orderBy: { displayOrder: 'asc' } },
        analytics: true,
        _count: {
          select: {
            userFavorites: true,
            views: true,
            shares: true
          }
        }
      },
      orderBy: {
        analytics: orderByMap[metric]
      },
      take: limit
    })

    return properties
  }

  // Get search trends
  static async getSearchTrends(days = 30) {
    const since = new Date()
    since.setDate(since.getDate() - days)

    const queries = await prisma.searchQuery.findMany({
      where: {
        createdAt: { gte: since }
      },
      select: {
        query: true,
        filters: true,
        createdAt: true
      }
    })

    // Count query frequency
    const queryFrequency = queries.reduce((acc, q) => {
      const query = q.query || 'no query'
      acc[query] = (acc[query] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const topQueries = Object.entries(queryFrequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([query, count]) => ({ query, count }))

    return {
      totalSearches: queries.length,
      topQueries,
      avgSearchesPerDay: queries.length / days
    }
  }

  // Get conversion metrics
  static async getConversionMetrics(propertyId: string) {
    const [totalViews, totalFavorites, totalShares] = await Promise.all([
      prisma.propertyView.count({ where: { propertyId } }),
      prisma.userFavorite.count({ where: { propertyId } }),
      prisma.propertyShare.count({ where: { propertyId } })
    ])

    const viewToFavoriteRate = totalViews > 0 ? (totalFavorites / totalViews) * 100 : 0
    const viewToShareRate = totalViews > 0 ? (totalShares / totalViews) * 100 : 0

    return {
      totalViews,
      totalFavorites,
      totalShares,
      viewToFavoriteRate: parseFloat(viewToFavoriteRate.toFixed(2)),
      viewToShareRate: parseFloat(viewToShareRate.toFixed(2))
    }
  }
}
