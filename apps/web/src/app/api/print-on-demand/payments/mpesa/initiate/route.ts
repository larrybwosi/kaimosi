import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { MpesaPaymentGateway } from '@/shared/utils/mpesa'
import { PodPaymentService } from '@/shared/db/services/pod-payment.service'
import { PodOrderService } from '@/shared/db/services/pod-order.service'

/**
 * POST /api/print-on-demand/payments/mpesa/initiate
 * 
 * Initiates M-Pesa payment for a print-on-demand order
 * Integrated with database for transaction tracking
 */

const initiatePaymentSchema = z.object({
  orderId: z.string().cuid(),
  phone: z.string().regex(/^254\d{9}$/, 'Invalid Kenyan phone number'),
  userId: z.string().cuid(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, phone, userId } = initiatePaymentSchema.parse(body)

    // Get order from database
    const order = await PodOrderService.getOrderById(orderId)

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    if (order.userId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    if (order.paymentStatus !== 'UNPAID') {
      return NextResponse.json(
        { error: 'Order already paid or payment in progress' },
        { status: 400 }
      )
    }

    // Create payment record
    const payment = await PodPaymentService.createPayment({
      podOrderId: orderId,
      userId,
      amount: Number(order.totalAmount),
      mpesaPhoneNumber: phone,
    })

    // Initialize M-Pesa payment
    const mpesaResponse = await MpesaPaymentGateway.initiatePayment({
      phone,
      amount: Number(order.totalAmount),
      orderId: order.orderNumber,
      description: `POD Order - ${order.orderNumber}`,
    })

    if (!mpesaResponse.success) {
      // Update payment status to failed
      await PodPaymentService.updatePaymentStatus(
        payment.id,
        'FAILED',
        undefined,
        mpesaResponse.message
      )

      return NextResponse.json(
        {
          error: 'Failed to initiate M-Pesa payment',
          message: mpesaResponse.message,
        },
        { status: 400 }
      )
    }

    // Create transaction record
    await PodPaymentService.createTransaction({
      podPaymentId: payment.id,
      userId,
      transactionId: mpesaResponse.transactionId,
      phone,
      amount: Number(order.totalAmount),
      status: 'INITIATED',
      mpesaResponseCode: mpesaResponse.responseCode,
      mpesaResponseDesc: mpesaResponse.responseDescription,
    })

    // Update order payment status to pending
    await PodOrderService.updatePaymentStatus(orderId, 'PENDING')

    return NextResponse.json(
      {
        success: true,
        message: 'Payment initiated successfully',
        paymentId: payment.id,
        transactionId: mpesaResponse.transactionId,
        checkoutUrl: mpesaResponse.checkoutUrl,
        customerMessage: mpesaResponse.customerMessage,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[M-Pesa Initiate] Error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
