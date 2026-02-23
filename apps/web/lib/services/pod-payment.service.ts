import { prisma } from '../client'
import type { PodPaymentStatus, PodTransactionStatus } from '@prisma/client'

/**
 * POD Payment Service
 * Handles all payment-related database operations for print-on-demand orders
 */

export class PodPaymentService {
  /**
   * Create a new payment record
   */
  static async createPayment(data: {
    podOrderId: string
    userId: string
    amount: number
    mpesaPhoneNumber: string
  }) {
    return prisma.podPayment.create({
      data: {
        podOrderId: data.podOrderId,
        userId: data.userId,
        amount: data.amount,
        mpesaPhoneNumber: data.mpesaPhoneNumber,
        status: 'UNPAID' as PodPaymentStatus,
      },
      include: {
        podOrder: true,
      },
    })
  }

  /**
   * Get payment by order ID
   */
  static async getPaymentByOrderId(podOrderId: string) {
    return prisma.podPayment.findUnique({
      where: { podOrderId },
      include: {
        transactions: {
          orderBy: { initiatedAt: 'desc' },
        },
      },
    })
  }

  /**
   * Get payment by ID
   */
  static async getPaymentById(paymentId: string) {
    return prisma.podPayment.findUnique({
      where: { id: paymentId },
      include: {
        transactions: {
          orderBy: { initiatedAt: 'desc' },
        },
        podOrder: true,
      },
    })
  }

  /**
   * Update payment status
   */
  static async updatePaymentStatus(
    paymentId: string,
    status: PodPaymentStatus,
    mpesaReceiptNumber?: string,
    failureReason?: string
  ) {
    return prisma.podPayment.update({
      where: { id: paymentId },
      data: {
        status,
        ...(mpesaReceiptNumber && { mpesaReceiptNumber }),
        ...(failureReason && { failureReason }),
        updatedAt: new Date(),
      },
      include: {
        podOrder: true,
      },
    })
  }

  /**
   * Create a payment transaction log
   */
  static async createTransaction(data: {
    podPaymentId: string
    userId: string
    transactionId?: string
    phone: string
    amount: number
    status: PodTransactionStatus
    mpesaResponseCode?: string
    mpesaResponseDesc?: string
    callbackData?: any
  }) {
    return prisma.podPaymentTransaction.create({
      data: {
        podPaymentId: data.podPaymentId,
        userId: data.userId,
        transactionId: data.transactionId,
        phone: data.phone,
        amount: data.amount,
        status: data.status,
        mpesaResponseCode: data.mpesaResponseCode,
        mpesaResponseDesc: data.mpesaResponseDesc,
        callbackData: data.callbackData,
      },
    })
  }

  /**
   * Update transaction status
   */
  static async updateTransactionStatus(
    transactionId: string,
    status: PodTransactionStatus,
    mpesaResponseCode?: string,
    mpesaResponseDesc?: string,
    callbackData?: any
  ) {
    return prisma.podPaymentTransaction.update({
      where: { id: transactionId },
      data: {
        status,
        ...(mpesaResponseCode && { mpesaResponseCode }),
        ...(mpesaResponseDesc && { mpesaResponseDesc }),
        ...(callbackData && { callbackData }),
        ...(status === 'COMPLETED' && { completedAt: new Date() }),
      },
    })
  }

  /**
   * Get transaction by M-Pesa transaction ID
   */
  static async getTransactionByMpesaId(transactionId: string) {
    return prisma.podPaymentTransaction.findUnique({
      where: { transactionId },
      include: {
        podPayment: true,
      },
    })
  }

  /**
   * Increment retry count
   */
  static async incrementRetryCount(paymentId: string) {
    return prisma.podPayment.update({
      where: { id: paymentId },
      data: {
        retryCount: {
          increment: 1,
        },
        lastRetryAt: new Date(),
      },
    })
  }

  /**
   * Get failed payments for retry
   */
  static async getFailedPaymentsForRetry(limit = 10) {
    return prisma.podPayment.findMany({
      where: {
        status: 'FAILED',
        retryCount: {
          lt: 3, // Max 3 retries
        },
      },
      orderBy: {
        lastRetryAt: 'asc',
      },
      take: limit,
      include: {
        transactions: {
          orderBy: { initiatedAt: 'desc' },
          take: 1,
        },
      },
    })
  }

  /**
   * Get payments by user ID
   */
  static async getPaymentsByUserId(userId: string, limit = 20, offset = 0) {
    const [payments, total] = await Promise.all([
      prisma.podPayment.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
        include: {
          podOrder: {
            select: {
              orderNumber: true,
              status: true,
              totalAmount: true,
            },
          },
        },
      }),
      prisma.podPayment.count({ where: { userId } }),
    ])

    return { payments, total }
  }

  /**
   * Get payment statistics for a user
   */
  static async getPaymentStats(userId: string) {
    const stats = await prisma.podPayment.aggregate({
      where: { userId },
      _sum: { amount: true },
      _count: true,
    })

    const statusBreakdown = await prisma.podPayment.groupBy({
      by: ['status'],
      where: { userId },
      _count: true,
      _sum: { amount: true },
    })

    return {
      totalPayments: stats._count,
      totalAmount: stats._sum.amount,
      statusBreakdown,
    }
  }
}
