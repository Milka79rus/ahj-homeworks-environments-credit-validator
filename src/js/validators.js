// 1. Алгоритм Луна для проверки валидности номера карты
export function validateCardNumber(number) {
  const value = number.replace(/\s+/g, '');
  if (!/^\d+$/.test(value)) return false;

  let sum = 0;
  let shouldDouble = false;

  // Идем с конца строки к началу
  for (let i = value.length - 1; i >= 0; i--) {
    let digit = parseInt(value.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

// 2. Определение платежной системы по БИНу
export function getCardType(number) {
  const value = number.replace(/\s+/g, '');

  if (/^4/.test(value)) return 'visa';
  if (/^(5[1-5]|222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[0-1]\d|2720)/.test(value)) return 'mastercard';
  if (/^220[0-4]/.test(value)) return 'mir';
  if (/^3[47]/.test(value)) return 'amex';
  if (/^(6011|65)/.test(value)) return 'discover';
  if (/^35/.test(value)) return 'jcb';

  return 'unknown';
}