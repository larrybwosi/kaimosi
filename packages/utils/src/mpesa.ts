// M-Pesa integration utilities for Kenya

export interface MpesaSTKPushRequest {
  phoneNumber: string;
  amount: number;
  accountReference: string;
  transactionDesc: string;
}

export interface MpesaSTKPushResponse {
  merchantRequestId: string;
  checkoutRequestId: string;
  responseCode: string;
  responseDescription: string;
  customerMessage: string;
}

// Format phone number for M-Pesa (must be 254XXXXXXXXX)
export function formatMpesaPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.startsWith('254')) {
    return cleaned;
  }
  
  if (cleaned.startsWith('0')) {
    return '254' + cleaned.slice(1);
  }
  
  if (cleaned.startsWith('7') || cleaned.startsWith('1')) {
    return '254' + cleaned;
  }
  
  throw new Error('Invalid Kenyan phone number format');
}

// Validate M-Pesa transaction amount
export function isValidMpesaAmount(amount: number): boolean {
  return amount >= 1 && amount <= 150000; // M-Pesa limits
}

// Generate M-Pesa password (base64 encode)
export function generateMpesaPassword(
  shortcode: string,
  passkey: string,
  timestamp: string
): string {
  const password = shortcode + passkey + timestamp;
  return Buffer.from(password).toString('base64');
}

// Generate timestamp for M-Pesa (YYYYMMDDHHmmss)
export function generateMpesaTimestamp(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

// Parse M-Pesa callback
export function parseMpesaCallback(callback: any): {
  success: boolean;
  amount?: number;
  mpesaReceiptNumber?: string;
  transactionDate?: string;
  phoneNumber?: string;
} {
  try {
    const resultCode = callback.Body?.stkCallback?.ResultCode;
    
    if (resultCode === 0) {
      const callbackMetadata = callback.Body.stkCallback.CallbackMetadata?.Item || [];
      
      return {
        success: true,
        amount: callbackMetadata.find((item: any) => item.Name === 'Amount')?.Value,
        mpesaReceiptNumber: callbackMetadata.find((item: any) => item.Name === 'MpesaReceiptNumber')?.Value,
        transactionDate: callbackMetadata.find((item: any) => item.Name === 'TransactionDate')?.Value,
        phoneNumber: callbackMetadata.find((item: any) => item.Name === 'PhoneNumber')?.Value,
      };
    }
    
    return { success: false };
  } catch (error) {
    return { success: false };
  }
}
