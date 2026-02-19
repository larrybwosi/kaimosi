import { prisma } from '../prisma-client'
import type { Property, PropertyType, ListingType, PropertyStatus, Prisma } from '@prisma/client'

export class PropertyService {
  // Get all properties with filters
  static async getAll(filters?: {
    locationId?: string
    type?: PropertyType
    listingType?: ListingType
    status?: PropertyStatus
    minPrice?: number
    maxPrice?: number
    bedrooms?: number[]
    bathrooms?: number[]
    amenities?: string[]
    skip?: number
    take?: number
    sortBy?: 'price' | 'createdAt' | 'bedrooms'
    sortOrder?: 'asc' | 'desc'
  }) {
    const where: Prisma.PropertyWhereInput = {
      deletedAt: null,
      status: filters?.status || 'AVAILABLE',
    }

    if (filters?.locationId) where.locationId = filters.locationId
    if (filters?.type) where.type = filters.type
    if (filters?.listingType) where.listingType = filters.listingType
    
    if (filters?.minPrice || filters?.maxPrice) {
      where.price = {}
      if (filters.minPrice) where.price.gte = filters.minPrice
      if (filters.maxPrice) where.price.lte = filters.maxPrice
    }

    if (filters?.bedrooms && filters.bedrooms.length > 0) {
      where.bedrooms = { in: filters.bedrooms }
    }

    if (filters?.bathrooms && filters.bathrooms.length > 0) {
      where.bathrooms = { in: filters.bathrooms }
    }

    if (filters?.amenities && filters.amenities.length > 0) {
      where.amenities = {
        some: {
          amenityId: { in: filters.amenities }
        }
      }
    }

    const orderBy: Prisma.PropertyOrderByWithRelationInput = {}
    if (filters?.sortBy) {
      orderBy[filters.sortBy] = filters.sortOrder || 'desc'
    } else {
      orderBy.createdAt = 'desc'
    }

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        include: {
          location: true,
          images: {
            orderBy: { displayOrder: 'asc' },
            take: 1
          },
          amenities: {
            include: { amenity: true }
          },
          analytics: true,
          _count: {
            select: {
              userFavorites: true,
              views: true
            }
          }
        },
        skip: filters?.skip || 0,
        take: filters?.take || 20,
        orderBy,
      }),
      prisma.property.count({ where })
    ])

    return { properties, total }
  }

  // Get property by ID
  static async getById(id: string, userId?: string) {
    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        location: true,
        images: { orderBy: { displayOrder: 'asc' } },
        floorPlans: { orderBy: { displayOrder: 'asc' } },
        amenities: {
          include: { amenity: true }
        },
        analytics: true,
        priceHistory: {
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        complexProperties: {
          include: {
            complex: true
          }
        },
        _count: {
          select: {
            userFavorites: true,
            views: true,
            shares: true
          }
        }
      }
    })

    if (!property) return null

    // Track view
    if (property) {
      await this.trackView(id, userId)
    }

    // Check if user favorited
    let isFavorited = false
    if (userId) {
      const favorite = await prisma.userFavorite.findUnique({
        where: {
          userId_propertyId: {
            userId,
            propertyId: id
          }
        }
      })
      isFavorited = !!favorite
    }

    return { ...property, isFavorited }
  }

  // Create new property
  static async create(data: {
    title: string
    description?: string
    type: PropertyType
    subType?: string
    listingType: ListingType
    price: number
    bedrooms: number
    bathrooms: number
    areaSize?: number
    furnishingType?: string
    yearBuilt?: number
    floorNumber?: number
    totalFloors?: number
    locationId: string
    streetAddress?: string
    coordinates?: { lat: number; lng: number }
    featuredImageUrl?: string
  }) {
    return await prisma.property.create({
      data: {
        ...data,
        coordinates: data.coordinates ? JSON.stringify(data.coordinates) : undefined,
        publishedAt: new Date()
      },
      include: {
        location: true,
        images: true
      }
    })
  }

  // Update property
  static async update(id: string, data: Partial<Omit<Property, 'id' | 'createdAt' | 'updatedAt'>>) {
    // Track price change
    if (data.price) {
      const existing = await prisma.property.findUnique({ where: { id } })
      if (existing && existing.price !== data.price) {
        await prisma.priceHistory.create({
          data: {
            propertyId: id,
            price: data.price,
            changeReason: data.price > existing.price ? 'increase' : 'reduction'
          }
        })
      }
    }

    return await prisma.property.update({
      where: { id },
      data,
      include: {
        location: true,
        images: true
      }
    })
  }

  // Soft delete property
  static async delete(id: string) {
    return await prisma.property.update({
      where: { id },
      data: { deletedAt: new Date() }
    })
  }

  // Add images to property
  static async addImages(propertyId: string, images: Array<{ url: string; caption?: string; displayOrder?: number }>) {
    return await prisma.propertyImage.createMany({
      data: images.map((img, index) => ({
        propertyId,
        url: img.url,
        caption: img.caption,
        displayOrder: img.displayOrder ?? index
      }))
    })
  }

  // Add floor plans
  static async addFloorPlans(propertyId: string, floorPlans: Array<{
    name?: string
    imageUrl: string
    dimensions?: any
    areaSize?: number
    description?: string
    displayOrder?: number
  }>) {
    return await prisma.floorPlan.createMany({
      data: floorPlans.map((fp, index) => ({
        propertyId,
        ...fp,
        dimensions: fp.dimensions ? JSON.stringify(fp.dimensions) : undefined,
        displayOrder: fp.displayOrder ?? index
      }))
    })
  }

  // Add amenities to property
  static async addAmenities(propertyId: string, amenityIds: string[]) {
    return await prisma.propertyAmenity.createMany({
      data: amenityIds.map(amenityId => ({
        propertyId,
        amenityId
      })),
      skipDuplicates: true
    })
  }

  // Track property view
  static async trackView(propertyId: string, userId?: string, sessionId?: string, source?: string) {
    await Promise.all([
      prisma.propertyView.create({
        data: {
          propertyId,
          userId,
          sessionId,
          source
        }
      }),
      prisma.propertyAnalytics.upsert({
        where: { propertyId },
        create: {
          propertyId,
          totalViews: 1
        },
        update: {
          totalViews: { increment: 1 }
        }
      })
    ])
  }

  // Get similar properties
  static async getSimilar(propertyId: string, limit = 6) {
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      select: {
        locationId: true,
        type: true,
        listingType: true,
        price: true,
        bedrooms: true
      }
    })

    if (!property) return []

    const priceRange = Number(property.price) * 0.2

    return await prisma.property.findMany({
      where: {
        id: { not: propertyId },
        locationId: property.locationId,
        type: property.type,
        listingType: property.listingType,
        price: {
          gte: Number(property.price) - priceRange,
          lte: Number(property.price) + priceRange
        },
        status: 'AVAILABLE',
        deletedAt: null
      },
      include: {
        location: true,
        images: { take: 1, orderBy: { displayOrder: 'asc' } },
        _count: {
          select: { userFavorites: true }
        }
      },
      take: limit,
      orderBy: { createdAt: 'desc' }
    })
  }

  // Get recommended properties for user
  static async getRecommended(userId: string, limit = 10) {
    const recommendations = await prisma.recommendation.findMany({
      where: {
        userPreference: { userId },
        viewed: false,
        expiresAt: { gt: new Date() }
      },
      include: {
        userPreference: true
      },
      orderBy: { score: 'desc' },
      take: limit
    })

    if (recommendations.length === 0) return []

    const propertyIds = recommendations.map(r => r.propertyId)

    const properties = await prisma.property.findMany({
      where: {
        id: { in: propertyIds },
        status: 'AVAILABLE',
        deletedAt: null
      },
      include: {
        location: true,
        images: { take: 1, orderBy: { displayOrder: 'asc' } },
        amenities: { include: { amenity: true } },
        _count: {
          select: { userFavorites: true }
        }
      }
    })

    return properties.map(property => {
      const rec = recommendations.find(r => r.propertyId === property.id)
      return {
        ...property,
        recommendationScore: rec?.score,
        recommendationReason: rec?.reason
      }
    })
  }
}
