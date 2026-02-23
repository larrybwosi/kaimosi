import { prisma } from '../client'

/**
 * POD Cart Service
 * Handles shopping cart operations for print-on-demand orders
 */

export class PodCartService {
  /**
   * Get or create user cart
   */
  static async getOrCreateCart(userId: string) {
    let cart = await prisma.podCart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            podProduct: true,
            podDesign: {
              select: {
                id: true,
                name: true,
                thumbnail: true,
              },
            },
          },
        },
      },
    })

    if (!cart) {
      cart = await prisma.podCart.create({
        data: {
          userId,
        },
        include: {
          items: {
            include: {
              podProduct: true,
              podDesign: true,
            },
          },
        },
      })
    }

    return cart
  }

  /**
   * Add item to cart
   */
  static async addItem(
    userId: string,
    data: {
      podProductId: string
      podDesignId: string
      quantity: number
      size?: string
      color?: string
      customOptions?: any
      price: number
    }
  ) {
    const cart = await this.getOrCreateCart(userId)

    // Check if item already exists
    const existingItem = await prisma.podCartItem.findFirst({
      where: {
        podCartId: cart.id,
        podProductId: data.podProductId,
        podDesignId: data.podDesignId,
        size: data.size,
        color: data.color,
      },
    })

    if (existingItem) {
      // Update quantity
      return prisma.podCartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: {
            increment: data.quantity,
          },
        },
        include: {
          podProduct: true,
          podDesign: true,
        },
      })
    } else {
      // Create new item
      return prisma.podCartItem.create({
        data: {
          podCartId: cart.id,
          podProductId: data.podProductId,
          podDesignId: data.podDesignId,
          quantity: data.quantity,
          size: data.size,
          color: data.color,
          customOptions: data.customOptions,
          price: data.price,
        },
        include: {
          podProduct: true,
          podDesign: true,
        },
      })
    }
  }

  /**
   * Update cart item quantity
   */
  static async updateItemQuantity(itemId: string, quantity: number) {
    if (quantity <= 0) {
      return this.removeItem(itemId)
    }

    return prisma.podCartItem.update({
      where: { id: itemId },
      data: { quantity },
      include: {
        podProduct: true,
        podDesign: true,
      },
    })
  }

  /**
   * Remove item from cart
   */
  static async removeItem(itemId: string) {
    return prisma.podCartItem.delete({
      where: { id: itemId },
    })
  }

  /**
   * Clear entire cart
   */
  static async clearCart(userId: string) {
    const cart = await prisma.podCart.findUnique({
      where: { userId },
    })

    if (!cart) {
      return
    }

    return prisma.podCartItem.deleteMany({
      where: { podCartId: cart.id },
    })
  }

  /**
   * Get cart totals
   */
  static async getCartTotals(userId: string) {
    const items = await prisma.podCartItem.findMany({
      where: {
        podCart: { userId },
      },
    })

    const subtotal = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)
    const tax = subtotal * 0.16 // 16% tax
    const shipping = 500 // Base shipping, can vary

    return {
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: Number(subtotal.toFixed(2)),
      tax: Number(tax.toFixed(2)),
      shipping,
      total: Number((subtotal + tax + shipping).toFixed(2)),
    }
  }

  /**
   * Get cart item count
   */
  static async getItemCount(userId: string) {
    const result = await prisma.podCartItem.aggregate({
      where: {
        podCart: { userId },
      },
      _sum: { quantity: true },
    })

    return result._sum.quantity || 0
  }

  /**
   * Update item customization
   */
  static async updateItemCustomization(itemId: string, customOptions: any) {
    return prisma.podCartItem.update({
      where: { id: itemId },
      data: {
        customOptions,
        updatedAt: new Date(),
      },
      include: {
        podProduct: true,
        podDesign: true,
      },
    })
  }
}
