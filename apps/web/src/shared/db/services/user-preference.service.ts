import { prisma } from '../prisma-client'

export class UserPreferenceService {
  // Get user preferences
  static async get(userId: string) {
    return await prisma.userPreference.findUnique({
      where: { userId },
      include: {
        searchHistory: {
          orderBy: { createdAt: 'desc' },
          take: 20
        },
        recommendations: {
          where: {
            viewed: false,
            expiresAt: { gt: new Date() }
          },
          orderBy: { score: 'desc' },
          take: 10
        }
      }
    })
  }

  // Create or update preferences
  static async upsert(userId: string, data: {
    minPrice?: number
    maxPrice?: number
    preferredLocations?: string[]
    bedrooms?: number[]
    bathrooms?: number[]
    propertyTypes?: string[]
    preferredAmenities?: string[]
    petFriendly?: boolean
    furnished?: boolean
    leaseType?: string
    moveInDate?: Date
    notificationsEnabled?: boolean
  }) {
    return await prisma.userPreference.upsert({
      where: { userId },
      create: {
        userId,
        ...data
      },
      update: data
    })
  }

  // Track search query
  static async trackSearch(userId: string, query?: string, filters?: any, resultsCount?: number, selectedPropertyId?: string) {
    const preference = await prisma.userPreference.findUnique({
      where: { userId }
    })

    if (!preference) {
      await this.upsert(userId, {})
    }

    const userPreference = await prisma.userPreference.findUnique({
      where: { userId }
    })

    if (!userPreference) return null

    return await prisma.searchQuery.create({
      data: {
        userPreferenceId: userPreference.id,
        query,
        filters: filters ? JSON.stringify(filters) : undefined,
        resultsCount,
        selectedPropertyId
      }
    })
  }

  // Get user favorites
  static async getFavorites(userId: string) {
    return await prisma.userFavorite.findMany({
      where: { userId },
      include: {
        property: {
          include: {
            location: true,
            images: { take: 1, orderBy: { displayOrder: 'asc' } },
            _count: {
              select: { userFavorites: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
  }

  // Add to favorites
  static async addFavorite(userId: string, propertyId: string, listName?: string, notes?: string) {
    const favorite = await prisma.userFavorite.create({
      data: {
        userId,
        propertyId,
        listName: listName || 'Favorites',
        notes
      }
    })

    // Update analytics
    await prisma.propertyAnalytics.upsert({
      where: { propertyId },
      create: {
        propertyId,
        totalFavorites: 1
      },
      update: {
        totalFavorites: { increment: 1 }
      }
    })

    return favorite
  }

  // Remove from favorites
  static async removeFavorite(userId: string, propertyId: string) {
    await Promise.all([
      prisma.userFavorite.delete({
        where: {
          userId_propertyId: {
            userId,
            propertyId
          }
        }
      }),
      prisma.propertyAnalytics.upsert({
        where: { propertyId },
        create: {
          propertyId,
          totalFavorites: 0
        },
        update: {
          totalFavorites: { decrement: 1 }
        }
      })
    ])
  }

  // Check if favorited
  static async isFavorited(userId: string, propertyId: string) {
    const favorite = await prisma.userFavorite.findUnique({
      where: {
        userId_propertyId: {
          userId,
          propertyId
        }
      }
    })
    return !!favorite
  }
}
