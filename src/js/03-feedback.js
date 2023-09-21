import throttle from 'lodash.throttle';
// Код для збереження даних в локальному сховищі під час введення тексту в поля форми та заповнення полів форми зі збереженими даними під час завантаження сторінки:
const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

const LOCAL_STORAGE_KEY = 'feedback-form-state';

// Функція для збереження стану форми у локальному сховищі
function saveFormState() {
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}

// Функція для заповнення полів форми зі збереженими даними
function loadFormState() {
  const savedFormData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  if (savedFormData) {
    emailInput.value = savedFormData.email || '';
    messageTextarea.value = savedFormData.message || '';
  } else {
    // Додайте значення 0, якщо даних немає
    emailInput.value = savedFormData.email || '0';
    messageTextarea.value = savedFormData.message || '0';
  }
}

// Відстеження події input на полях форми з використанням throttle
emailInput.addEventListener('input', throttle(saveFormState, 500));
messageTextarea.addEventListener('input', throttle(saveFormState, 500));

// Заповнення полів форми при завантаженні сторінки
window.addEventListener('DOMContentLoaded', loadFormState);

//код для відправки даних та очищення сховища при сабміті форми:
form.addEventListener('submit', function (event) {
  event.preventDefault();

  // Отримайте дані з форми
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };

  // Перевірка на заповненість обох полів
  if (!formData.email || !formData.message) {
    alert('Будь ласка, заповніть обидва поля форми.');
    return; // Перервемо відправку форми, якщо одне з полів не заповнене
  }

  // Виведіть об'єкт з даними у консоль
  console.log(formData);

  // Очистіть сховище та поля форми
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  emailInput.value = '';
  messageTextarea.value = '';
});
