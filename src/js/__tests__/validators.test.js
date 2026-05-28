import { validateCardNumber, getCardType } from '../validators';

describe('Card Number Validation (Luhn Algorithm)', () => {
    test('should validate correct card numbers', () => {
        expect(validateCardNumber('49927398716')).toBe(true); // Валидный номер по Луну
    });

    test('should invalidate incorrect card numbers', () => {
        expect(validateCardNumber('49927398717')).toBe(false);
    });
});

describe('Card Type Detection', () => {
    test('should detect Visa', () => {
        expect(getCardType('4123456789012345')).toBe('visa');
    });

    test('should detect Mastercard', () => {
        expect(getCardType('5123456789012345')).toBe('mastercard');
    });

    test('should detect МИР', () => {
        expect(getCardType('2202123456789012')).toBe('mir');
    });

    test('should return unknown for unsupported cards', () => {
        expect(getCardType('0000000000000000')).toBe('unknown');
    });
});