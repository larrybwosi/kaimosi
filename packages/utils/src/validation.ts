// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Kenyan phone number validation
export function isValidKenyanPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  
  // Must be 10 digits starting with 0, or 12 digits starting with 254
  return (
    (cleaned.length === 10 && cleaned.startsWith('0')) ||
    (cleaned.length === 12 && cleaned.startsWith('254'))
  );
}

// URL validation
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Password strength check
export function checkPasswordStrength(password: string): {
  score: number;
  feedback: string;
} {
  let score = 0;
  const feedback: string[] = [];

  if (password.length >= 8) score++;
  else feedback.push('At least 8 characters');

  if (/[a-z]/.test(password)) score++;
  else feedback.push('Include lowercase letters');

  if (/[A-Z]/.test(password)) score++;
  else feedback.push('Include uppercase letters');

  if (/\d/.test(password)) score++;
  else feedback.push('Include numbers');

  if (/[^a-zA-Z\d]/.test(password)) score++;
  else feedback.push('Include special characters');

  return {
    score,
    feedback: feedback.join(', '),
  };
}

// Safe JSON parse
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}
