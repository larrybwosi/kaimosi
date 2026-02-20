import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { MpesaPaymentGateway } from '@/shared/utils/mpesa'
import { PodPaymentService } from '@/shared/db/services/pod-payment.service'

/**
 * GET /api/print-on-demand/payments/mpesa/status?paymentId=...
 * 
 * Check the status of an M-Pesa payment
 */

const statusSchema = z.object({
  paymentId: z.string().cuid(),
})

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const paymentId = searchParams.get('paymentId')

    const { paymentId: validPaymentId } = statusSchema.parse({
      paymentId,
    })

    // Get payment from database
    const payment = await PodPaymentService.getPaymentById(validPaymentId)

    if (!payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      )
    }

    // If already completed or failed, return cached status
    if (payment.status === 'COMPLETED' || payment.status === 'FAILED') {
      return NextResponse.json(
        {
          status: payment.status,
          mpesaReceiptNumber: payment.mpesaReceiptNumber,
          amount: payment.amount,
          lastTransaction: payment.transactions[0] || null,
        },
        { status: 200 }
      )
    }

    // Check latest transaction status
    const latestTransaction = payment.transactions[0]

    if (!latestTransaction) {
      return NextResponse.json(
        { error: 'No transaction found' },
        { status: 400 }
      )
    }

    // Query M-Pesa for current status
    const statusResponse = await MpesaPaymentGateway.checkPaymentStatus(
      payment.id,
      latestTransaction.transactionId || ''
    )

    return NextResponse.json(
      {
        status: statusResponse.status,
        resultCode: statusResponse.resultCode,
        resultDescription: statusResponse.resultDescription,
        mpesaReceiptNumber: statusResponse.receiptNumber,
        amount: statusResponse.amount,
        transactionDate: statusResponse.transactionDate,
        phoneNumber: statusResponse.phoneNumber,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[Payment Status] Error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request parameters' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
