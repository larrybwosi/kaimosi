import type {
  MpesaInitiatePaymentRequest,
  MpesaInitiatePaymentResponse,
  MpesaCallbackData,
  MpesaPaymentStatus,
  PaymentInitiationResult,
  PaymentCallbackResult,
} from './mpesa.types'

/**
 * Mock M-Pesa Service for Development
 * 
 * Simulates M-Pesa payment flows without actual API calls
 * Useful for testing and development
 */

interface MockTransaction {
  id: string
  requestId: string
  phone: string
  amount: number
  orderId: string
  status: 'PENDING' | 'COMPLETED' | 'FAILED'
  receiptNumber?: string
  createdAt: Date
}

const mockTransactions = new Map<string, MockTransaction>()

export class MockMpesaService {
  /**
   * Initiate payment - simulates STK Push
   */
  static async initiatePayment(
    request: MpesaInitiatePaymentRequest
  ): Promise<MpesaInitiatePaymentResponse> {
    const requestId = `MR${Date.now()}`
    const checkoutRequestId = `CRI${Date.now()}-${Math.random().toString(36).substring(7)}`

    // Store transaction in memory for testing
    mockTransactions.set(checkoutRequestId, {
      id: checkoutRequestId,
      requestId,
      phone: request.phone,
      amount: request.amount,
      orderId: request.orderId,
      status: 'PENDING',
      createdAt: new Date(),
    })

    console.log('[Mock M-Pesa] Payment initiated:', {
      phone: request.phone,
      amount: request.amount,
      checkoutRequestId,
    })

    return {
      success: true,
      message: 'Payment request initiated successfully',
      requestId,
      responseCode: '0',
      responseDescription: 'Success. Request accepted for processing',
      customerMessage: 'Enter your M-Pesa PIN to complete this transaction',
      checkoutUrl: `/mpesa/mock-pay?id=${checkoutRequestId}`,
    }
  }

  /**
   * Simulate payment success
   * In mock mode, this is called manually for testing
   */
  static async simulatePaymentSuccess(
    checkoutRequestId: string,
    receiptNumber?: string
  ): Promise<PaymentCallbackResult> {
    const transaction = mockTransactions.get(checkoutRequestId)

    if (!transaction) {
      return {
        success: false,
        message: 'Transaction not found',
      }
    }

    transaction.status = 'COMPLETED'
    transaction.receiptNumber = receiptNumber || `TXN${Date.now()}`

    console.log('[Mock M-Pesa] Payment completed:', {
      checkoutRequestId,
      receiptNumber: transaction.receiptNumber,
    })

    return {
      success: true,
      mpesaReceiptNumber: transaction.receiptNumber,
      amount: transaction.amount,
      transactionDate: new Date().toISOString(),
      phoneNumber: transaction.phone,
      message: 'Payment successful',
    }
  }

  /**
   * Simulate payment failure
   */
  static async simulatePaymentFailure(
    checkoutRequestId: string,
    reason = 'User cancelled transaction'
  ): Promise<PaymentCallbackResult> {
    const transaction = mockTransactions.get(checkoutRequestId)

    if (!transaction) {
      return {
        success: false,
        message: 'Transaction not found',
      }
    }

    transaction.status = 'FAILED'

    console.log('[Mock M-Pesa] Payment failed:', {
      checkoutRequestId,
      reason,
    })

    return {
      success: false,
      message: reason,
    }
  }

  /**
   * Check payment status
   */
  static async checkPaymentStatus(
    checkoutRequestId: string
  ): Promise<MpesaPaymentStatus> {
    const transaction = mockTransactions.get(checkoutRequestId)

    if (!transaction) {
      return {
        status: 'FAILED',
        resultCode: 1,
        resultDescription: 'Transaction not found',
      }
    }

    switch (transaction.status) {
      case 'COMPLETED':
        return {
          status: 'COMPLETED',
          resultCode: 0,
          resultDescription: 'The service request has been processed successfully',
          receiptNumber: transaction.receiptNumber,
          amount: transaction.amount,
          phoneNumber: transaction.phone,
        }
      case 'FAILED':
        return {
          status: 'FAILED',
          resultCode: 1,
          resultDescription: 'The balance is insufficient for the transaction',
        }
      case 'PENDING':
        return {
          status: 'PENDING',
          resultCode: -1,
          resultDescription: 'Request is still being processed',
        }
      default:
        return {
          status: 'FAILED',
          resultCode: 1,
          resultDescription: 'Unknown error',
        }
    }
  }

  /**
   * Format callback data (for webhook testing)
   */
  static createMockCallback(
    checkoutRequestId: string,
    resultCode: number = 0
  ): MpesaCallbackData {
    const transaction = mockTransactions.get(checkoutRequestId)

    if (!transaction) {
      return {
        Body: {
          stkCallback: {
            MerchantRequestID: 'MR000000',
            CheckoutRequestID: checkoutRequestId,
            ResultCode: 1,
            ResultDesc: 'Transaction not found',
          },
        },
      }
    }

    return {
      Body: {
        stkCallback: {
          MerchantRequestID: transaction.requestId,
          CheckoutRequestID: checkoutRequestId,
          ResultCode: resultCode,
          ResultDesc: resultCode === 0 ? 'The service request has been processed successfully' : 'User cancelled transaction',
          ...(resultCode === 0 && {
            Amount: transaction.amount,
            MpesaReceiptNumber: transaction.receiptNumber || `TXN${Date.now()}`,
            TransactionDate: new Date().toISOString(),
            PhoneNumber: transaction.phone,
          }),
        },
      },
    }
  }

  /**
   * Clean up old transactions (for memory management)
   */
  static cleanup(ageMinutes = 60): number {
    const cutoffTime = Date.now() - ageMinutes * 60 * 1000
    let removed = 0

    for (const [key, transaction] of mockTransactions.entries()) {
      if (transaction.createdAt.getTime() < cutoffTime) {
        mockTransactions.delete(key)
        removed++
      }
    }

    return removed
  }

  /**
   * Get all transactions (for debugging)
   */
  static getAllTransactions() {
    return Array.from(mockTransactions.values())
  }

  /**
   * Get transaction by ID
   */
  static getTransaction(checkoutRequestId: string) {
    return mockTransactions.get(checkoutRequestId)
  }
}
