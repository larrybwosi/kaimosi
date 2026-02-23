import { prisma } from '../client'
import type { PodOrderStatus, PodPaymentStatus } from '@prisma/client'

/**
 * POD Order Service
 * Handles order creation, updates, and queries for print-on-demand
 */

export class PodOrderService {
  /**
   * Generate unique order number
   */
  private static generateOrderNumber(): string {
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.random().toString(36).substring(2, 8).toUpperCase()
    return `POD-${timestamp}-${random}`
  }

  /**
   * Create a new order from cart items
   */
  static async createOrder(data: {
    userId: string
    cartItems: Array<{
      podProductId: string
      podDesignId: string
      quantity: number
      size?: string
      color?: string
      customOptions?: any
      price: number
    }>
    shippingMethod: string
    shippingAddress: string
    shippingCost: number
    taxRate?: number
  }) {
    const orderNumber = this.generateOrderNumber()
    
    // Calculate totals
    const subtotal = data.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const tax = subtotal * (data.taxRate || 0.16) // Default 16% tax
    const totalAmount = subtotal + tax + data.shippingCost

    // Create order with items in a transaction
    const order = await prisma.podOrder.create({
      data: {
        userId: data.userId,
        orderNumber,
        subtotal,
        tax,
        shippingCost: data.shippingCost,
        totalAmount,
        shippingMethod: data.shippingMethod,
        shippingAddress: data.shippingAddress,
        status: 'PENDING' as PodOrderStatus,
        paymentStatus: 'UNPAID',
        items: {
          create: data.cartItems.map((item) => ({
            podProductId: item.podProductId,
            podDesignId: item.podDesignId,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
            customOptions: item.customOptions,
            unitPrice: item.price,
            totalPrice: item.price * item.quantity,
          })),
        },
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

    // Add initial status to fulfillment timeline
    await prisma.podFulfillmentTimeline.create({
      data: {
        podOrderId: order.id,
        status: 'PENDING' as PodOrderStatus,
        message: 'Order created, awaiting payment',
      },
    })

    return order
  }

  /**
   * Get order by ID
   */
  static async getOrderById(orderId: string) {
    return prisma.podOrder.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            podProduct: true,
            podDesign: true,
          },
        },
        payment: {
          include: {
            transactions: {
              orderBy: { initiatedAt: 'desc' },
            },
          },
        },
        fulfillmentTimeline: {
          orderBy: { createdAt: 'asc' },
        },
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    })
  }

  /**
   * Get order by order number
   */
  static async getOrderByNumber(orderNumber: string) {
    return prisma.podOrder.findUnique({
      where: { orderNumber },
      include: {
        items: {
          include: {
            podProduct: true,
            podDesign: true,
          },
        },
        payment: true,
        fulfillmentTimeline: true,
      },
    })
  }

  /**
   * Update order status
   */
  static async updateOrderStatus(
    orderId: string,
    status: PodOrderStatus,
    message?: string,
    trackingNumber?: string
  ) {
    const order = await prisma.podOrder.update({
      where: { id: orderId },
      data: {
        status,
        ...(trackingNumber && { trackingNumber }),
        updatedAt: new Date(),
      },
    })

    // Add to fulfillment timeline
    await prisma.podFulfillmentTimeline.create({
      data: {
        podOrderId: orderId,
        status,
        message: message || `Order status updated to ${status}`,
      },
    })

    return order
  }

  /**
   * Update payment status on order
   */
  static async updatePaymentStatus(orderId: string, paymentStatus: PodPaymentStatus) {
    let orderStatus: PodOrderStatus = 'PENDING'
    if (paymentStatus === 'COMPLETED') {
      orderStatus = 'PAID'
    } else if (paymentStatus === 'FAILED') {
      orderStatus = 'PENDING'
    }

    return prisma.podOrder.update({
      where: { id: orderId },
      data: {
        paymentStatus,
        status: orderStatus,
        updatedAt: new Date(),
      },
    })
  }

  /**
   * Get orders by user ID
   */
  static async getOrdersByUserId(
    userId: string,
    status?: PodOrderStatus,
    limit = 20,
    offset = 0
  ) {
    const [orders, total] = await Promise.all([
      prisma.podOrder.findMany({
        where: {
          userId,
          ...(status && { status }),
          deletedAt: null,
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
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
          payment: {
            select: {
              id: true,
              status: true,
              mpesaReceiptNumber: true,
            },
          },
        },
      }),
      prisma.podOrder.count({
        where: {
          userId,
          ...(status && { status }),
          deletedAt: null,
        },
      }),
    ])

    return { orders, total }
  }

  /**
   * Get order statistics for a user
   */
  static async getOrderStats(userId: string) {
    const stats = await prisma.podOrder.aggregate({
      where: {
        userId,
        deletedAt: null,
      },
      _sum: { totalAmount: true },
      _count: true,
    })

    const statusBreakdown = await prisma.podOrder.groupBy({
      by: ['status'],
      where: {
        userId,
        deletedAt: null,
      },
      _count: true,
      _sum: { totalAmount: true },
    })

    return {
      totalOrders: stats._count,
      totalSpent: stats._sum.totalAmount,
      statusBreakdown,
    }
  }

  /**
   * Get orders awaiting payment (for admin)
   */
  static async getOrdersAwaitingPayment(limit = 50) {
    return prisma.podOrder.findMany({
      where: {
        paymentStatus: 'UNPAID',
        status: 'PENDING',
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
        items: {
          select: {
            podProduct: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })
  }

  /**
   * Get orders in production status
   */
  static async getOrdersInProduction(limit = 50) {
    return prisma.podOrder.findMany({
      where: {
        status: {
          in: ['PAID', 'PROCESSING', 'PRODUCTION', 'QUALITY_CHECK'],
        },
      },
      orderBy: { createdAt: 'asc' },
      take: limit,
      include: {
        items: {
          select: {
            podProduct: {
              select: {
                name: true,
              },
            },
            quantity: true,
          },
        },
        fulfillmentTimeline: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    })
  }

  /**
   * Cancel an order
   */
  static async cancelOrder(orderId: string, reason?: string) {
    const order = await prisma.podOrder.update({
      where: { id: orderId },
      data: {
        status: 'CANCELLED' as PodOrderStatus,
        updatedAt: new Date(),
      },
    })

    await prisma.podFulfillmentTimeline.create({
      data: {
        podOrderId: orderId,
        status: 'CANCELLED' as PodOrderStatus,
        message: reason || 'Order cancelled',
      },
    })

    return order
  }

  /**
   * Soft delete an order
   */
  static async deleteOrder(orderId: string) {
    return prisma.podOrder.update({
      where: { id: orderId },
      data: {
        deletedAt: new Date(),
      },
    })
  }
}
