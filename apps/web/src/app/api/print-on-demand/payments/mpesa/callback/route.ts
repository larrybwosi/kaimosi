import { NextRequest, NextResponse } from 'next/server'
import { MpesaPaymentGateway } from '@/shared/utils/mpesa'
import { PodPaymentService } from '@/shared/db/services/pod-payment.service'
import { PodOrderService } from '@/shared/db/services/pod-order.service'
import type { MpesaCallbackData } from '@/shared/utils/mpesa'

/**
 * POST /api/print-on-demand/payments/mpesa/callback
 * 
 * Webhook for M-Pesa payment callbacks
 * Handles payment confirmations and updates order status
 */

export async function POST(request: NextRequest) {
  try {
    const callbackData: MpesaCallbackData = await request.json()

    console.log('[M-Pesa Callback] Received:', JSON.stringify(callbackData, null, 2))

    const stkCallback = callbackData.Body.stkCallback
    const checkoutRequestId = stkCallback.CheckoutRequestID

    // Get transaction by checkout ID
    const transaction = await PodPaymentService.getTransactionByMpesaId(checkoutRequestId)

    if (!transaction) {
      console.warn('[M-Pesa Callback] Transaction not found for ID:', checkoutRequestId)
      return NextResponse.json(
        { resultCode: 1, resultDesc: 'Transaction not found' },
        { status: 404 }
      )
    }

    // Process callback with M-Pesa gateway
    const callbackResult = MpesaPaymentGateway.processCallback(callbackData)

    if (callbackResult.success) {
      // Payment successful
      console.log('[M-Pesa Callback] Payment successful:', {
        receiptNumber: callbackResult.mpesaReceiptNumber,
        amount: callbackResult.amount,
      })

      // Update transaction status
      await PodPaymentService.updateTransactionStatus(
        transaction.id,
        'COMPLETED',
        '0',
        'Transaction completed successfully',
        callbackData
      )

      // Update payment record
      const payment = await PodPaymentService.updatePaymentStatus(
        transaction.podPaymentId,
        'COMPLETED',
        callbackResult.mpesaReceiptNumber?.toString() || '',
        undefined
      )

      // Update order status to PAID and PROCESSING
      await PodOrderService.updatePaymentStatus(payment.podOrderId, 'COMPLETED')
      await PodOrderService.updateOrderStatus(
        payment.podOrderId,
        'PROCESSING',
        'Payment confirmed. Order moved to processing queue.'
      )

      // TODO: Trigger order fulfillment workflow (email, queue job, etc.)
      console.log('[M-Pesa Callback] Order moved to processing:', payment.podOrderId)

      return NextResponse.json(
        {
          resultCode: 0,
          resultDesc: 'Payment processed successfully',
        },
        { status: 200 }
      )
    } else {
      // Payment failed
      console.log('[M-Pesa Callback] Payment failed:', {
        resultCode: callbackResult.resultCode,
        description: callbackResult.resultDescription,
      })

      // Update transaction status
      await PodPaymentService.updateTransactionStatus(
        transaction.id,
        'FAILED',
        callbackResult.resultCode?.toString(),
        callbackResult.resultDescription,
        callbackData
      )

      // Update payment status
      await PodPaymentService.updatePaymentStatus(
        transaction.podPaymentId,
        'FAILED',
        undefined,
        callbackResult.resultDescription
      )

      // Increment retry count
      await PodPaymentService.incrementRetryCount(transaction.podPaymentId)

      // TODO: Send failure notification to user
      console.log('[M-Pesa Callback] Payment failed, retry count incremented')

      return NextResponse.json(
        {
          resultCode: 0,
          resultDesc: 'Callback processed',
        },
        { status: 200 }
      )
    }
  } catch (error) {
    console.error('[M-Pesa Callback] Error:', error)

    return NextResponse.json(
      {
        resultCode: 1,
        resultDesc: 'Internal server error',
      },
      { status: 500 }
    )
  }
}
