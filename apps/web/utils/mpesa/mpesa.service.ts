import type {
  MpesaConfig,
  MpesaInitiatePaymentRequest,
  MpesaInitiatePaymentResponse,
  MpesaCallbackData,
  MpesaPaymentStatus,
  MpesaAuthToken,
} from './mpesa.types'

/**
 * Real M-Pesa Service using Daraja API
 * 
 * Integration with M-Pesa's official Daraja API for production payments
 * Handles OAuth token management, STK Push, and transaction validation
 */

const DARAJA_AUTH_URL = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
const DARAJA_STK_PUSH_URL = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
const DARAJA_CHECK_STATUS_URL = 'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query'

// Token cache for reducing API calls
let cachedToken: MpesaAuthToken | null = null

export class MpesaService {
  private static config: MpesaConfig

  /**
   * Initialize M-Pesa service with configuration
   */
  static initialize(config: MpesaConfig) {
    this.config = config

    // Validate configuration
    if (!config.consumerKey || !config.consumerSecret) {
      throw new Error('M-Pesa Consumer Key and Secret are required')
    }
  }

  /**
   * Get or refresh OAuth token
   */
  private static async getAuthToken(): Promise<string> {
    // Check if cached token is still valid
    if (cachedToken && cachedToken.expiresAt && cachedToken.expiresAt > Date.now()) {
      return cachedToken.access_token
    }

    try {
      const auth = Buffer.from(
        `${this.config.consumerKey}:${this.config.consumerSecret}`
      ).toString('base64')

      const response = await fetch(DARAJA_AUTH_URL, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${auth}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Auth failed: ${response.statusText}`)
      }

      const data = (await response.json()) as {
        access_token: string
        expires_in: number
      }

      // Cache token with expiry
      cachedToken = {
        access_token: data.access_token,
        expires_in: data.expires_in,
        expiresAt: Date.now() + data.expires_in * 1000 - 60000, // Refresh 1 min before expiry
      }

      return cachedToken.access_token
    } catch (error) {
      console.error('[M-Pesa] Auth token error:', error)
      throw new Error('Failed to get M-Pesa authentication token')
    }
  }

  /**
   * Generate password for STK Push
   */
  private static generatePassword(timestamp: string): string {
    const data = this.config.shortCode + this.config.passKey + timestamp
    return Buffer.from(data).toString('base64')
  }

  /**
   * Initiate payment using STK Push
   */
  static async initiatePayment(
    request: MpesaInitiatePaymentRequest
  ): Promise<MpesaInitiatePaymentResponse> {
    try {
      const token = await this.getAuthToken()
      const timestamp = new Date().toISOString().replace(/[:-]/g, '').split('.')[0]
      const password = this.generatePassword(timestamp)

      // Format phone number (ensure 254 country code)
      const phone = request.phone.startsWith('254')
        ? request.phone
        : `254${request.phone.substring(1)}`

      const payload = {
        BusinessShortCode: this.config.shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: Math.ceil(request.amount), // M-Pesa requires integer amounts
        PartyA: phone,
        PartyB: this.config.shortCode,
        PhoneNumber: phone,
        CallBackURL: request.callbackUrl || this.config.callbackUrl,
        AccountReference: request.orderId,
        TransactionDesc: request.description || 'Print-on-Demand Order',
      }

      const response = await fetch(DARAJA_STK_PUSH_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = (await response.json()) as {
        MerchantRequestID?: string
        CheckoutRequestID?: string
        ResponseCode?: string
        ResponseDescription?: string
        CustomerMessage?: string
        errorCode?: string
        errorMessage?: string
      }

      if (data.ResponseCode === '0') {
        return {
          success: true,
          message: 'Payment request sent successfully',
          requestId: data.MerchantRequestID,
          responseCode: data.ResponseCode,
          responseDescription: data.ResponseDescription,
          customerMessage: data.CustomerMessage,
          transactionId: data.CheckoutRequestID,
        }
      } else {
        return {
          success: false,
          message: data.ResponseDescription || data.errorMessage || 'Payment initiation failed',
          responseCode: data.ResponseCode || data.errorCode,
        }
      }
    } catch (error) {
      console.error('[M-Pesa] Payment initiation error:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Payment initiation failed',
      }
    }
  }

  /**
   * Check payment status
   */
  static async checkPaymentStatus(
    merchantRequestId: string,
    checkoutRequestId: string
  ): Promise<MpesaPaymentStatus> {
    try {
      const token = await this.getAuthToken()
      const timestamp = new Date().toISOString().replace(/[:-]/g, '').split('.')[0]
      const password = this.generatePassword(timestamp)

      const payload = {
        BusinessShortCode: this.config.shortCode,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: checkoutRequestId,
      }

      const response = await fetch(DARAJA_CHECK_STATUS_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = (await response.json()) as {
        ResultCode?: number
        ResultDesc?: string
        MpesaReceiptNumber?: string
      }

      if (data.ResultCode === 0) {
        return {
          status: 'COMPLETED',
          resultCode: 0,
          resultDescription: data.ResultDesc,
          receiptNumber: data.MpesaReceiptNumber,
        }
      } else if (data.ResultCode === 1 || data.ResultCode === 500) {
        return {
          status: 'PENDING',
          resultCode: data.ResultCode,
          resultDescription: 'Request is still being processed',
        }
      } else {
        return {
          status: 'FAILED',
          resultCode: data.ResultCode,
          resultDescription: data.ResultDesc,
        }
      }
    } catch (error) {
      console.error('[M-Pesa] Status check error:', error)
      return {
        status: 'FAILED',
        resultCode: 1,
        resultDescription: 'Failed to check payment status',
      }
    }
  }

  /**
   * Process callback from M-Pesa
   * Validates and extracts payment information
   */
  static processCallback(callbackData: MpesaCallbackData) {
    try {
      const stkCallback = callbackData.Body.stkCallback

      if (stkCallback.ResultCode === 0) {
        // Payment successful
        const items = stkCallback.CallbackMetadata?.Item || []
        const receiptNumber =
          items.find((i) => i.Name === 'MpesaReceiptNumber')?.Value || ''
        const amount = items.find((i) => i.Name === 'Amount')?.Value || 0
        const transactionDate =
          items.find((i) => i.Name === 'TransactionDate')?.Value || ''
        const phone = items.find((i) => i.Name === 'PhoneNumber')?.Value || ''

        return {
          success: true,
          resultCode: stkCallback.ResultCode,
          resultDescription: stkCallback.ResultDesc,
          mpesaReceiptNumber: receiptNumber,
          amount: Number(amount),
          transactionDate: transactionDate ? transactionDate.toString() : new Date().toISOString(),
          phoneNumber: phone,
        }
      } else {
        // Payment failed
        return {
          success: false,
          resultCode: stkCallback.ResultCode,
          resultDescription: stkCallback.ResultDesc,
        }
      }
    } catch (error) {
      console.error('[M-Pesa] Callback processing error:', error)
      return {
        success: false,
        resultCode: 1,
        resultDescription: 'Failed to process callback',
      }
    }
  }

  /**
   * Validate M-Pesa callback signature (implement based on your security requirements)
   */
  static validateCallbackSignature(signature: string, body: string): boolean {
    // Implementation depends on M-Pesa's specific security requirements
    // This is a placeholder - implement based on Daraja API documentation
    console.log('[M-Pesa] Callback signature validation not yet implemented')
    return true
  }
}
