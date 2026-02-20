import { prisma } from '../client'

/**
 * POD Design Service
 * Handles design creation, updates, and version control
 */

export class PodDesignService {
  /**
   * Create a new design
   */
  static async createDesign(data: {
    userId: string
    name: string
    productType: string
    designData: any
    thumbnail?: string
    description?: string
  }) {
    const design = await prisma.podDesign.create({
      data: {
        userId: data.userId,
        name: data.name,
        productType: data.productType,
        thumbnail: data.thumbnail,
        description: data.description,
      },
    })

    // Create initial version
    await prisma.podDesignVersion.create({
      data: {
        podDesignId: design.id,
        versionNumber: 1,
        designData: data.designData,
        label: 'Initial',
      },
    })

    return design
  }

  /**
   * Get design by ID with versions
   */
  static async getDesignById(designId: string) {
    return prisma.podDesign.findUnique({
      where: { id: designId },
      include: {
        versions: {
          orderBy: { versionNumber: 'desc' },
        },
      },
    })
  }

  /**
   * Get design by ID with a specific version
   */
  static async getDesignWithVersion(designId: string, versionNumber?: number) {
    const design = await prisma.podDesign.findUnique({
      where: { id: designId },
    })

    if (!design) return null

    const version = await prisma.podDesignVersion.findFirst({
      where: {
        podDesignId: designId,
        ...(versionNumber && { versionNumber }),
      },
      orderBy: { versionNumber: 'desc' },
      take: 1,
    })

    return { design, version }
  }

  /**
   * Update design
   */
  static async updateDesign(designId: string, data: Partial<{
    name: string
    description: string
    thumbnail: string
    isPublished: boolean
  }>) {
    return prisma.podDesign.update({
      where: { id: designId },
      data,
    })
  }

  /**
   * Save new design version
   */
  static async saveVersion(
    designId: string,
    designData: any,
    label?: string
  ) {
    // Get latest version number
    const latestVersion = await prisma.podDesignVersion.findFirst({
      where: { podDesignId: designId },
      orderBy: { versionNumber: 'desc' },
      select: { versionNumber: true },
    })

    const nextVersion = (latestVersion?.versionNumber || 0) + 1

    // Create new version
    const version = await prisma.podDesignVersion.create({
      data: {
        podDesignId: designId,
        versionNumber: nextVersion,
        designData,
        label: label || `Version ${nextVersion}`,
      },
    })

    // Update design updated timestamp
    await prisma.podDesign.update({
      where: { id: designId },
      data: { updatedAt: new Date() },
    })

    return version
  }

  /**
   * Get design versions
   */
  static async getVersions(designId: string, limit = 50) {
    return prisma.podDesignVersion.findMany({
      where: { podDesignId: designId },
      orderBy: { versionNumber: 'desc' },
      take: limit,
      select: {
        id: true,
        versionNumber: true,
        label: true,
        createdAt: true,
      },
    })
  }

  /**
   * Revert to a previous version
   */
  static async revertToVersion(designId: string, versionNumber: number) {
    const version = await prisma.podDesignVersion.findFirst({
      where: {
        podDesignId: designId,
        versionNumber,
      },
    })

    if (!version) {
      throw new Error(`Version ${versionNumber} not found`)
    }

    // Create a new version with the old design data
    return this.saveVersion(designId, version.designData, `Reverted to v${versionNumber}`)
  }

  /**
   * Get user designs
   */
  static async getUserDesigns(
    userId: string,
    filters?: {
      productType?: string
      isPublished?: boolean
      isTemplate?: boolean
    },
    limit = 50,
    offset = 0
  ) {
    const [designs, total] = await Promise.all([
      prisma.podDesign.findMany({
        where: {
          userId,
          deletedAt: null,
          ...(filters?.productType && { productType: filters.productType }),
          ...(typeof filters?.isPublished === 'boolean' && { isPublished: filters.isPublished }),
          ...(typeof filters?.isTemplate === 'boolean' && { isTemplate: filters.isTemplate }),
        },
        orderBy: { updatedAt: 'desc' },
        take: limit,
        skip: offset,
        select: {
          id: true,
          name: true,
          thumbnail: true,
          productType: true,
          isPublished: true,
          isTemplate: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.podDesign.count({
        where: {
          userId,
          deletedAt: null,
          ...(filters?.productType && { productType: filters.productType }),
          ...(typeof filters?.isPublished === 'boolean' && { isPublished: filters.isPublished }),
          ...(typeof filters?.isTemplate === 'boolean' && { isTemplate: filters.isTemplate }),
        },
      }),
    ])

    return { designs, total }
  }

  /**
   * Publish design (make it available for use)
   */
  static async publishDesign(designId: string) {
    return prisma.podDesign.update({
      where: { id: designId },
      data: {
        isPublished: true,
        updatedAt: new Date(),
      },
    })
  }

  /**
   * Unpublish design
   */
  static async unpublishDesign(designId: string) {
    return prisma.podDesign.update({
      where: { id: designId },
      data: {
        isPublished: false,
        updatedAt: new Date(),
      },
    })
  }

  /**
   * Delete design (soft delete)
   */
  static async deleteDesign(designId: string) {
    return prisma.podDesign.update({
      where: { id: designId },
      data: {
        deletedAt: new Date(),
      },
    })
  }

  /**
   * Get design statistics for a user
   */
  static async getDesignStats(userId: string) {
    const stats = await prisma.podDesign.groupBy({
      by: ['productType'],
      where: {
        userId,
        deletedAt: null,
      },
      _count: true,
    })

    const published = await prisma.podDesign.count({
      where: {
        userId,
        isPublished: true,
        deletedAt: null,
      },
    })

    const total = await prisma.podDesign.count({
      where: {
        userId,
        deletedAt: null,
      },
    })

    return {
      total,
      published,
      byProductType: stats,
    }
  }
}
