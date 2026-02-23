import { prisma } from '../client'
import type { UserPreference, UpdatePreferencesRequest } from '@kaimosi/types'

/**
 * Apartment Preferences Service
 * Manages user preferences for apartment searches and personalization
 */
export class ApartmentPreferencesService {
  /**
   * Get or create user preferences
   */
  static async getOrCreatePreferences(userId: string): Promise<UserPreference> {
    let prefs = await prisma.userPreference.findUnique({
      where: { userId },
    })

    if (!prefs) {
      prefs = await prisma.userPreference.create({
        data: { userId },
      })
    }

    return this.mapToUserPreference(prefs)
  }

  /**
   * Update user preferences
   */
  static async updatePreferences(
    userId: string,
    updates: UpdatePreferencesRequest
  ): Promise<UserPreference> {
    const prefs = await prisma.userPreference.update({
      where: { userId },
      data: updates,
    })

    return this.mapToUserPreference(prefs)
  }

  /**
   * Add preferred location
   */
  static async addPreferredLocation(userId: string, locationId: string): Promise<UserPreference> {
    const prefs = await this.getOrCreatePreferences(userId)
    const locations = new Set(prefs.preferredLocations)
    const updated = await prisma.userPreference.update({
      where: { userId },
      data: { preferredLocations: Array.from(locations) as string[] },
    })

    return this.mapToUserPreference(updated)
  }

  /**
   * Remove preferred location
   */
  static async removePreferredLocation(userId: string, locationId: string): Promise<UserPreference> {
    const prefs = await this.getOrCreatePreferences(userId)
    const locations = new Set(prefs.preferredLocations)
    locations.delete(locationId)

    const updated = await prisma.userPreference.update({
      where: { userId },
      data: { preferredLocations: Array.from(locations) as string[] },
    })

    return this.mapToUserPreference(updated)
  }

  /**
   * Add preferred amenity
   */
  static async addPreferredAmenity(userId: string, amenityId: string): Promise<UserPreference> {
    const prefs = await this.getOrCreatePreferences(userId)
    const amenities = new Set(prefs.preferredAmenities)
    amenities.add(amenityId)

    const updated = await prisma.userPreference.update({
      where: { userId },
      data: { preferredAmenities: Array.from(amenities) as string[] },
    })

    return this.mapToUserPreference(updated)
  }

  /**
   * Generate recommendations based on user preferences and history
   */
  static async generateRecommendations(userId: string, limit: number = 10) {
    const prefs = await this.getOrCreatePreferences(userId)

    // Build query filters based on preferences
    const filters: any = {}

    if (prefs.minPrice) filters.price = { ...filters.price, gte: prefs.minPrice }
    if (prefs.maxPrice) filters.price = { ...filters.price, lte: prefs.maxPrice }
    if (prefs.bedrooms && prefs.bedrooms.length > 0) {
      filters.bedrooms = { in: prefs.bedrooms }
    }
    if (prefs.bathrooms && prefs.bathrooms.length > 0) {
      filters.bathrooms = { in: prefs.bathrooms }
    }
    if (prefs.propertyTypes && prefs.propertyTypes.length > 0) {
      filters.type = { in: prefs.propertyTypes }
    }

    // Get recently viewed properties to exclude from recommendations
    const viewedPropertyIds = await prisma.propertyView
      .findMany({
        where: { userId },
        select: { propertyId: true },
        take: 100,
      })
      .then((views) => views.map((v) => v.propertyId))

    // Get user's favorite properties to understand preferences
    const favorites = await prisma.userFavorite.findMany({
      where: { userId },
      select: { propertyId: true },
    })

    // Find similar properties
    const properties = await prisma.property.findMany({
      where: {
        ...filters,
        id: { notIn: [...viewedPropertyIds, ...favorites.map((f) => f.propertyId)] },
        status: 'AVAILABLE',
        publishedAt: { not: null },
      },
      include: {
        amenities: true,
        location: true,
      },
      take: limit,
      orderBy: { createdAt: 'desc' },
    })

    // Create recommendations
    const recommendations = await Promise.all(
      properties.map(async (property, index) => {
        const score = this.calculateRecommendationScore(property, prefs, favorites.length)

        return prisma.recommendation.create({
          data: {
            userPreferenceId: prefs.id,
            propertyId: property.id,
            score,
            reason: `Matches your preference for ${property.bedrooms}-bedroom properties in ${property.location?.district}`,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
          },
        })
      })
    )

    return recommendations
  }

  /**
   * Calculate recommendation score (0-100)
   */
  private static calculateRecommendationScore(property: any, prefs: UserPreference, favoriteCount: number): number {
    let score = 50 // Base score

    // Price match
    if (prefs.minPrice && property.price >= prefs.minPrice) score += 10
    if (prefs.maxPrice && property.price <= prefs.maxPrice) score += 10

    // Bedroom match
    if (prefs.bedrooms && prefs.bedrooms.includes(property.bedrooms)) score += 15

    // Location match
    if (prefs.preferredLocations.length > 0) score += 5

    // Amenity match
    if (prefs.preferredAmenities.length > 0) {
      const matchedAmenities = property.amenities?.filter((a: any) =>
        prefs.preferredAmenities.includes(a.id)
      )
      if (matchedAmenities?.length) score += 10
    }

    // Furniture preference
    if (prefs.furnished === true && property.furnishingType === 'furnished') score += 5
    if (prefs.furnished === false && property.furnishingType === 'unfurnished') score += 5

    // Pet friendly
    if (prefs.petFriendly && property.amenities?.some((a: any) => a.name === 'Pet Friendly'))
      score += 5

    // Bonus for new listings
    const daysSincePublished = Math.floor(
      (Date.now() - new Date(property.publishedAt).getTime()) / (1000 * 60 * 60 * 24)
    )
    if (daysSincePublished < 7) score += 10

    return Math.min(score, 100)
  }

  /**
   * Track search query for learning
   */
  static async trackSearchQuery(
    userId: string,
    query: string,
    filters: any,
    resultsCount: number,
    selectedPropertyId?: string
  ) {
    const prefs = await this.getOrCreatePreferences(userId)

    return prisma.searchQuery.create({
      data: {
        userPreferenceId: prefs.id,
        query,
        filters,
        resultsCount,
        selectedPropertyId,
      },
    })
  }

  /**
   * Get search history
   */
  static async getSearchHistory(userId: string, limit: number = 20) {
    const prefs = await this.getOrCreatePreferences(userId)

    return prisma.searchQuery.findMany({
      where: { userPreferenceId: prefs.id },
      orderBy: { createdAt: 'desc' },
      take: limit,
    })
  }

  /**
   * Clear expired recommendations
   */
  static async clearExpiredRecommendations() {
    return prisma.recommendation.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    })
  }

  /**
   * Mark recommendation as viewed
   */
  static async markRecommendationViewed(recommendationId: string) {
    return prisma.recommendation.update({
      where: { id: recommendationId },
      data: { viewed: true, viewedAt: new Date() },
    })
  }

  /**
   * Helper to map Prisma result to UserPreference type
   */
  private static mapToUserPreference(prismaPrefs: any): UserPreference {
    if (!prismaPrefs) return prismaPrefs
    return {
      ...prismaPrefs,
      minPrice: prismaPrefs.minPrice ? Number(prismaPrefs.minPrice) : undefined,
      maxPrice: prismaPrefs.maxPrice ? Number(prismaPrefs.maxPrice) : undefined,
      propertyTypes: prismaPrefs.propertyTypes as any,
    }
  }
}
