import { prisma } from '../prisma-client'
import { randomBytes } from 'crypto'

export class PropertyShareService {
  // Create share link
  static async createShare(propertyId: string, userId?: string, platform?: string) {
    const shareToken = randomBytes(16).toString('hex')

    const share = await prisma.propertyShare.create({
      data: {
        propertyId,
        userId,
        platform: platform || 'link',
        shareToken
      }
    })

    // Update analytics
    await prisma.propertyAnalytics.upsert({
      where: { propertyId },
      create: {
        propertyId,
        totalShares: 1
      },
      update: {
        totalShares: { increment: 1 }
      }
    })

    return share
  }

  // Track share click
  static async trackClick(shareToken: string) {
    const share = await prisma.propertyShare.findUnique({
      where: { shareToken }
    })

    if (!share) return null

    await Promise.all([
      prisma.propertyShare.update({
        where: { shareToken },
        data: {
          clicks: { increment: 1 }
        }
      }),
      prisma.propertyAnalytics.upsert({
        where: { propertyId: share.propertyId },
        create: {
          propertyId: share.propertyId,
          totalShareClicks: 1
        },
        update: {
          totalShareClicks: { increment: 1 }
        }
      })
    ])

    return share
  }

  // Add feedback to share
  static async addFeedback(shareToken: string, feedback: string) {
    return await prisma.propertyShare.update({
      where: { shareToken },
      data: { feedback }
    })
  }

  // Get share by token
  static async getByToken(shareToken: string) {
    return await prisma.propertyShare.findUnique({
      where: { shareToken },
      include: {
        property: {
          include: {
            location: true,
            images: { take: 1, orderBy: { displayOrder: 'asc' } }
          }
        }
      }
    })
  }

  // Get share stats for property
  static async getStats(propertyId: string) {
    const shares = await prisma.propertyShare.findMany({
      where: { propertyId },
      select: {
        platform: true,
        clicks: true,
        feedback: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    })

    const byPlatform = shares.reduce((acc, share) => {
      if (!acc[share.platform]) {
        acc[share.platform] = { count: 0, clicks: 0 }
      }
      acc[share.platform].count++
      acc[share.platform].clicks += share.clicks
      return acc
    }, {} as Record<string, { count: number; clicks: number }>)

    return {
      total: shares.length,
      totalClicks: shares.reduce((sum, s) => sum + s.clicks, 0),
      byPlatform,
      recentShares: shares.slice(0, 10)
    }
  }
}
