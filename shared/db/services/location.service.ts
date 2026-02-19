import { prisma } from '../prisma-client'

export class LocationService {
  // Get all locations
  static async getAll() {
    return await prisma.location.findMany({
      include: {
        _count: {
          select: {
            properties: true,
            complexes: true
          }
        }
      },
      orderBy: { city: 'asc' }
    })
  }

  // Get location by ID
  static async getById(id: string) {
    return await prisma.location.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            properties: true,
            complexes: true
          }
        }
      }
    })
  }

  // Get location by slug
  static async getBySlug(slug: string) {
    return await prisma.location.findUnique({
      where: { slug },
      include: {
        _count: {
          select: {
            properties: true,
            complexes: true
          }
        }
      }
    })
  }

  // Create location
  static async create(data: {
    country: string
    city: string
    district: string
    subArea?: string
    latitude?: number
    longitude?: number
    slug: string
  }) {
    return await prisma.location.create({
      data
    })
  }

  // Get cities grouped
  static async getCities() {
    const locations = await prisma.location.findMany({
      select: {
        country: true,
        city: true,
        _count: {
          select: { properties: true }
        }
      },
      orderBy: { city: 'asc' }
    })

    const cities = locations.reduce((acc, loc) => {
      const key = `${loc.country}-${loc.city}`
      if (!acc[key]) {
        acc[key] = {
          country: loc.country,
          city: loc.city,
          propertyCount: 0
        }
      }
      acc[key].propertyCount += loc._count.properties
      return acc
    }, {} as Record<string, { country: string; city: string; propertyCount: number }>)

    return Object.values(cities)
  }

  // Get districts by city
  static async getDistricts(city: string) {
    return await prisma.location.findMany({
      where: { city },
      select: {
        district: true,
        subArea: true,
        _count: {
          select: { properties: true }
        }
      },
      orderBy: { district: 'asc' }
    })
  }
}
