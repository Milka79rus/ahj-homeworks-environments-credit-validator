import { validateCardNumber, getCardType } from './validators';

// Выносим логику в функцию, чтобы её можно было тестировать в JSDOM
export function initApp() {
  const form = document.getElementById('validator-form');
  const input = document.getElementById('card-input');
  const messageBox = document.getElementById('result-message');
  const logos = document.querySelectorAll('.logo');

  if (!form || !input || !messageBox) return;

  input.addEventListener('input', () => {
    const value = input.value;
    const cardType = getCardType(value);

    logos.forEach(logo => {
      if (logo.dataset.type === cardType) {
        logo.classList.add('active');
      } else {
        logo.classList.remove('active');
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    messageBox.classList.add('hidden');
    messageBox.className = 'message';

    const value = input.value.trim();

    if (!value) {
      messageBox.textContent = 'Please enter a card number';
      messageBox.classList.add('error');
      messageBox.classList.remove('hidden');
      return;
    }

    const isValid = validateCardNumber(value);

    if (isValid) {
      messageBox.textContent = 'Card number is VALID!';
      messageBox.classList.add('success');
    } else {
      messageBox.textContent = 'Card number is INVALID!';
      messageBox.classList.add('error');
    }

    messageBox.classList.remove('hidden');
  });
}

// Для обычного запуска в браузере
document.addEventListener('DOMContentLoaded', initApp);