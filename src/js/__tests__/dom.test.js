import { readFileSync } from 'fs';
import { resolve } from 'path';
import { initApp } from '../app';

const html = readFileSync(resolve(__dirname, '../../index.html'), 'utf8');

describe('DOM Card Validator Interaction', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html;
        initApp(); // Инициализируем обработчики на свежий DOM
    });

    const testCases = [
        { inputValue: '49927398716', expectedClass: 'success', expectedText: 'VALID' },
        { inputValue: '49927398717', expectedClass: 'error', expectedText: 'INVALID' },
        { inputValue: '', expectedClass: 'error', expectedText: 'Please enter' },
    ];

    testCases.forEach(({ inputValue, expectedClass, expectedText }) => {
        test(`when input is "${inputValue}", message box should have class "${expectedClass}"`, () => {
            const form = document.getElementById('validator-form');
            const input = document.getElementById('card-input');
            const messageBox = document.getElementById('result-message');

            // 1. Имитируем ввод пользователя
            input.value = inputValue;

            // 2. Отправляем форму
            form.dispatchEvent(new Event('submit'));

            // 3. Проверяем результат
            expect(messageBox.classList.contains(expectedClass)).toBe(true);
            expect(messageBox.textContent).toContain(expectedText);
        });
    });
});