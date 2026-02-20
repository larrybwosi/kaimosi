/**
 * M-Pesa Type Definitions
 * Types for M-Pesa Daraja API integration
 */

export interface MpesaConfig {
  mode: 'mock' | 'production'
  consumerKey: string
  consumerSecret: string
  passKey: string
  shortCode: string
  callbackUrl: string
  baseUrl: string
}

export interface MpesaInitiatePaymentRequest {
  phone: string
  amount: number
  orderId: string
  description?: string
  callbackUrl?: string
}

export interface MpesaInitiatePaymentResponse {
  success: boolean
  message: string
  requestId?: string // CheckoutRequestID from M-Pesa
  responseCode?: string
  responseDescription?: string
  customerMessage?: string
  transactionId?: string // For mock
  checkoutUrl?: string // For real M-Pesa
}

export interface MpesaCallbackData {
  Body: {
    stkCallback: {
      MerchantRequestID: string
      CheckoutRequestID: string
      ResultCode: number // 0 = success, non-zero = failure
      ResultDesc: string
      Amount?: number
      MpesaReceiptNumber?: string
      TransactionDate?: string
      PhoneNumber?: string
      // Additional callback fields
      CallbackMetadata?: {
        Item: Array<{
          Name: string
          Value: string | number
        }>
      }
    }
  }
}

export interface MpesaCheckStatusRequest {
  checkoutRequestId: string
  timestamp: string
  password: string
}

export interface MpesaCheckStatusResponse {
  ResultCode: number
  ResultDesc: string
  MerchantRequestID: string
  CheckoutRequestID: string
}

export interface MpesaPaymentStatus {
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'TIMEOUT'
  resultCode?: number
  resultDescription?: string
  receiptNumber?: string
  transactionDate?: string
  amount?: number
  phoneNumber?: string
}

export interface MpesaAuthToken {
  access_token: string
  expires_in: number
  expiresAt?: number
}

export interface MpesaErrorResponse {
  requestId: string
  errorCode: string
  errorMessage: string
}

export interface PaymentInitiationResult {
  success: boolean
  transactionId: string
  mpesaRequestId?: string
  message: string
  checkoutUrl?: string // For real implementations
}

export interface PaymentCallbackResult {
  success: boolean
  mpesaReceiptNumber?: string
  amount?: number
  transactionDate?: string
  phoneNumber?: string
  message: string
}
