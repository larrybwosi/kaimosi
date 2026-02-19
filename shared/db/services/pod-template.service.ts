import { prisma } from '../client'

/**
 * POD Template Service
 * Handles design template operations
 */

export class PodTemplateService {
  /**
   * Get all active templates
   */
  static async getAllTemplates(filters?: {
    category?: string
    tags?: string[]
  }) {
    return prisma.podTemplate.findMany({
      where: {
        isActive: true,
        ...(filters?.category && { category: filters.category }),
        ...(filters?.tags && filters.tags.length > 0 && {
          tags: {
            hasSome: filters.tags,
          },
        }),
      },
      orderBy: { createdAt: 'desc' },
      include: {
        podProduct: {
          select: {
            id: true,
            name: true,
            category: true,
            basePrice: true,
          },
        },
      },
    })
  }

  /**
   * Get template by ID
   */
  static async getTemplateById(templateId: string) {
    return prisma.podTemplate.findUnique({
      where: { id: templateId },
      include: {
        podProduct: true,
      },
    })
  }

  /**
   * Get templates by product
   */
  static async getTemplatesByProduct(podProductId: string) {
    return prisma.podTemplate.findMany({
      where: {
        podProductId,
        isActive: true,
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  /**
   * Get templates by category
   */
  static async getTemplatesByCategory(category: string, limit = 20) {
    return prisma.podTemplate.findMany({
      where: {
        category,
        isActive: true,
      },
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        podProduct: {
          select: {
            id: true,
            name: true,
            basePrice: true,
          },
        },
      },
    })
  }

  /**
   * Search templates by tags
   */
  static async searchTemplates(query: string, limit = 20) {
    const templates = await prisma.podTemplate.findMany({
      where: {
        isActive: true,
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            tags: {
              hasSome: [query.toLowerCase()],
            },
          },
        ],
      },
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        podProduct: {
          select: {
            id: true,
            name: true,
            category: true,
            basePrice: true,
          },
        },
      },
    })

    return templates
  }

  /**
   * Create a new template
   */
  static async createTemplate(data: {
    name: string
    description?: string
    podProductId: string
    category: string
    designData: any
    thumbnail?: string
    previewImage?: string
    tags?: string[]
  }) {
    return prisma.podTemplate.create({
      data: {
        name: data.name,
        description: data.description,
        podProductId: data.podProductId,
        category: data.category,
        designData: data.designData,
        thumbnail: data.thumbnail,
        previewImage: data.previewImage,
        tags: data.tags || [],
      },
      include: {
        podProduct: true,
      },
    })
  }

  /**
   * Update template
   */
  static async updateTemplate(
    templateId: string,
    data: Partial<{
      name: string
      description: string
      designData: any
      thumbnail: string
      previewImage: string
      tags: string[]
      isActive: boolean
    }>
  ) {
    return prisma.podTemplate.update({
      where: { id: templateId },
      data,
    })
  }

  /**
   * Deactivate template
   */
  static async deactivateTemplate(templateId: string) {
    return prisma.podTemplate.update({
      where: { id: templateId },
      data: { isActive: false },
    })
  }

  /**
   * Get popular templates (most used in designs)
   */
  static async getPopularTemplates(limit = 10) {
    // This would require tracking template usage
    // For now, return most recent
    return prisma.podTemplate.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        podProduct: {
          select: {
            id: true,
            name: true,
            category: true,
            basePrice: true,
          },
        },
      },
    })
  }

  /**
   * Get template categories
   */
  static async getCategories() {
    const templates = await prisma.podTemplate.groupBy({
      by: ['category'],
      where: { isActive: true },
      _count: true,
    })

    return templates.map(t => ({
      category: t.category,
      count: t._count,
    }))
  }

  /**
   * Get all unique tags
   */
  static async getAllTags() {
    const templates = await prisma.podTemplate.findMany({
      where: { isActive: true },
      select: { tags: true },
    })

    const allTags = templates.flatMap(t => t.tags)
    const uniqueTags = [...new Set(allTags)]
    
    return uniqueTags.sort()
  }

  /**
   * Create design from template
   */
  static async createDesignFromTemplate(
    templateId: string,
    userId: string,
    designName?: string
  ) {
    const template = await this.getTemplateById(templateId)

    if (!template) {
      throw new Error('Template not found')
    }

    // Create a new design based on the template
    const design = await prisma.podDesign.create({
      data: {
        userId,
        name: designName || `${template.name} - Copy`,
        productType: template.podProduct.category,
        thumbnail: template.thumbnail,
        description: `Created from template: ${template.name}`,
      },
    })

    // Create initial version with template design data
    await prisma.podDesignVersion.create({
      data: {
        podDesignId: design.id,
        versionNumber: 1,
        designData: template.designData,
        label: 'From Template',
      },
    })

    return design
  }
}
