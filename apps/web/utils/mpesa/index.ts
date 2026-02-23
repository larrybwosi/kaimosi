import { MpesaService } from './mpesa.service'
import { MockMpesaService } from './mpesa.mock'
import type {
  MpesaConfig,
  MpesaInitiatePaymentRequest,
  MpesaInitiatePaymentResponse,
  MpesaCallbackData,
  MpesaPaymentStatus,
} from './mpesa.types'

/**
 * M-Pesa Factory
 * 
 * Unified interface for M-Pesa payments that switches between
 * mock and production modes based on environment configuration
 */

export class MpesaPaymentGateway {
  private static mode: 'mock' | 'production' = 'mock'
  private static initialized = false

  /**
   * Initialize the M-Pesa gateway
   */
  static initialize(config: MpesaConfig) {
    this.mode = config.mode

    if (config.mode === 'production') {
      MpesaService.initialize(config)
    }

    this.initialized = true
    console.log(`[M-Pesa] Gateway initialized in ${config.mode} mode`)
  }

  /**
   * Ensure gateway is initialized
   */
  private static ensureInitialized() {
    if (!this.initialized) {
      // Initialize with default config from env
      const config: MpesaConfig = {
        mode: (process.env.MPESA_MODE as 'mock' | 'production') || 'mock',
        consumerKey: process.env.MPESA_CONSUMER_KEY || '',
        consumerSecret: process.env.MPESA_CONSUMER_SECRET || '',
        passKey: process.env.MPESA_PASS_KEY || '',
        shortCode: process.env.MPESA_SHORTCODE || '',
        callbackUrl: process.env.MPESA_CALLBACK_URL || '',
        baseUrl: process.env.MPESA_BASE_URL || 'https://sandbox.safaricom.co.ke',
      }

      this.initialize(config)
    }
  }

  /**
   * Initiate a payment
   */
  static async initiatePayment(
    request: MpesaInitiatePaymentRequest
  ): Promise<MpesaInitiatePaymentResponse> {
    this.ensureInitialized()

    if (this.mode === 'mock') {
      return MockMpesaService.initiatePayment(request)
    } else {
      return MpesaService.initiatePayment(request)
    }
  }

  /**
   * Check payment status
   */
  static async checkPaymentStatus(
    merchantRequestId: string,
    checkoutRequestId: string
  ): Promise<MpesaPaymentStatus> {
    this.ensureInitialized()

    if (this.mode === 'mock') {
      return MockMpesaService.checkPaymentStatus(checkoutRequestId)
    } else {
      return MpesaService.checkPaymentStatus(merchantRequestId, checkoutRequestId)
    }
  }

  /**
   * Process callback from M-Pesa
   */
  static processCallback(callbackData: MpesaCallbackData) {
    if (this.mode === 'mock') {
      // For mock, extract from our format
      const stkCallback = callbackData.Body.stkCallback
      return {
        success: stkCallback.ResultCode === 0,
        resultCode: stkCallback.ResultCode,
        resultDescription: stkCallback.ResultDesc,
        mpesaReceiptNumber: stkCallback.MpesaReceiptNumber,
        amount: stkCallback.Amount,
        transactionDate: stkCallback.TransactionDate,
        phoneNumber: stkCallback.PhoneNumber,
      }
    } else {
      return MpesaService.processCallback(callbackData)
    }
  }

  /**
   * Get current mode
   */
  static getMode(): 'mock' | 'production' {
    return this.mode
  }

  /**
   * Mock-specific: Simulate payment success
   */
  static async mockSimulateSuccess(checkoutRequestId: string, receiptNumber?: string) {
    if (this.mode === 'mock') {
      return MockMpesaService.simulatePaymentSuccess(checkoutRequestId, receiptNumber)
    }
    throw new Error('Mock simulation only available in mock mode')
  }

  /**
   * Mock-specific: Simulate payment failure
   */
  static async mockSimulateFailure(checkoutRequestId: string, reason?: string) {
    if (this.mode === 'mock') {
      return MockMpesaService.simulatePaymentFailure(checkoutRequestId, reason)
    }
    throw new Error('Mock simulation only available in mock mode')
  }

  /**
   * Mock-specific: Create mock callback data for testing
   */
  static mockCreateCallback(checkoutRequestId: string, resultCode?: number) {
    if (this.mode === 'mock') {
      return MockMpesaService.createMockCallback(checkoutRequestId, resultCode)
    }
    throw new Error('Mock creation only available in mock mode')
  }

  /**
   * Mock-specific: Get all mock transactions
   */
  static mockGetAllTransactions() {
    if (this.mode === 'mock') {
      return MockMpesaService.getAllTransactions()
    }
    throw new Error('Mock debug only available in mock mode')
  }
}

// Export types
export type {
  MpesaConfig,
  MpesaInitiatePaymentRequest,
  MpesaInitiatePaymentResponse,
  MpesaCallbackData,
  MpesaPaymentStatus,
} from './mpesa.types'

export { MpesaService } from './mpesa.service'
export { MockMpesaService } from './mpesa.mock'
