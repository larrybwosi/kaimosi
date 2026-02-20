import { prisma } from '../client'

/**
 * POD Product Service
 * Handles print-on-demand product catalog operations
 */

export class PodProductService {
  /**
   * Get all active products
   */
  static async getAllProducts(filters?: {
    category?: string
    isActive?: boolean
  }) {
    return prisma.podProduct.findMany({
      where: {
        ...(filters?.category && { category: filters.category }),
        ...(typeof filters?.isActive === 'boolean' && { isActive: filters.isActive }),
      },
      orderBy: [
        { category: 'asc' },
        { name: 'asc' },
      ],
      include: {
        templates: {
          where: { isActive: true },
          take: 3,
        },
      },
    })
  }

  /**
   * Get product by ID
   */
  static async getProductById(productId: string) {
    return prisma.podProduct.findUnique({
      where: { id: productId },
      include: {
        templates: {
          where: { isActive: true },
        },
      },
    })
  }

  /**
   * Get product by SKU
   */
  static async getProductBySku(sku: string) {
    return prisma.podProduct.findUnique({
      where: { sku },
      include: {
        templates: {
          where: { isActive: true },
        },
      },
    })
  }

  /**
   * Get products by category
   */
  static async getProductsByCategory(category: string) {
    return prisma.podProduct.findMany({
      where: {
        category,
        isActive: true,
      },
      orderBy: { name: 'asc' },
      include: {
        templates: {
          where: { isActive: true },
          take: 3,
        },
      },
    })
  }

  /**
   * Create a new product
   */
  static async createProduct(data: {
    name: string
    category: string
    sku: string
    description?: string
    basePrice: number
    image?: string
    dimensions?: any
    materials?: string[]
    colors?: string[]
    sizes?: string[]
    printAreas?: any
  }) {
    return prisma.podProduct.create({
      data: {
        name: data.name,
        category: data.category,
        sku: data.sku,
        description: data.description,
        basePrice: data.basePrice,
        image: data.image,
        dimensions: data.dimensions,
        materials: data.materials || [],
        colors: data.colors || [],
        sizes: data.sizes || [],
        printAreas: data.printAreas,
      },
    })
  }

  /**
   * Update product
   */
  static async updateProduct(
    productId: string,
    data: Partial<{
      name: string
      description: string
      basePrice: number
      image: string
      dimensions: any
      materials: string[]
      colors: string[]
      sizes: string[]
      printAreas: any
      isActive: boolean
    }>
  ) {
    return prisma.podProduct.update({
      where: { id: productId },
      data,
    })
  }

  /**
   * Deactivate product
   */
  static async deactivateProduct(productId: string) {
    return prisma.podProduct.update({
      where: { id: productId },
      data: { isActive: false },
    })
  }

  /**
   * Get product categories
   */
  static async getCategories() {
    const products = await prisma.podProduct.groupBy({
      by: ['category'],
      where: { isActive: true },
      _count: true,
    })

    return products.map(p => ({
      category: p.category,
      count: p._count,
    }))
  }

  /**
   * Get product options (colors, sizes) by product ID
   */
  static async getProductOptions(productId: string) {
    const product = await prisma.podProduct.findUnique({
      where: { id: productId },
      select: {
        colors: true,
        sizes: true,
        materials: true,
      },
    })

    return product
  }

  /**
   * Calculate product price with options
   */
  static async calculatePrice(
    productId: string,
    options: {
      size?: string
      color?: string
      quantity: number
    }
  ) {
    const product = await prisma.podProduct.findUnique({
      where: { id: productId },
    })

    if (!product) {
      throw new Error('Product not found')
    }

    let price = Number(product.basePrice)

    // Size modifiers
    const sizeModifiers: Record<string, number> = {
      'XS': 0,
      'S': 0,
      'M': 0,
      'L': 0,
      'XL': 2,
      'XXL': 4,
      'XXXL': 6,
    }

    if (options.size && sizeModifiers[options.size]) {
      price += sizeModifiers[options.size]
    }

    // Quantity discounts
    if (options.quantity >= 50) {
      price *= 0.8 // 20% discount
    } else if (options.quantity >= 25) {
      price *= 0.85 // 15% discount
    } else if (options.quantity >= 10) {
      price *= 0.9 // 10% discount
    } else if (options.quantity >= 5) {
      price *= 0.95 // 5% discount
    }

    return {
      unitPrice: Number(price.toFixed(2)),
      totalPrice: Number((price * options.quantity).toFixed(2)),
      discount: options.quantity >= 5 ? true : false,
    }
  }
}
