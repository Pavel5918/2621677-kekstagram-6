// js/messages.js

// Функция для показа сообщения об успехе (пункт 3.4)
const showSuccessMessage = () => {
  // Находим шаблон success из index.html
  const successTemplate = document.querySelector('#success');
  if (!successTemplate) return;

  const successElement = successTemplate.content.querySelector('.success').cloneNode(true);
  document.body.appendChild(successElement);

  const successButton = successElement.querySelector('.success__button');
  const removeSuccessMessage = () => {
    successElement.remove();
    document.removeEventListener('keydown', onEscKeyDown);
    document.removeEventListener('click', onOutsideClick);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removeSuccessMessage();
    }
  };

  const onOutsideClick = (evt) => {
    if (!successElement.contains(evt.target)) {
      removeSuccessMessage();
    }
  };

  successButton.addEventListener('click', removeSuccessMessage);
  document.addEventListener('keydown', onEscKeyDown);
  document.addEventListener('click', onOutsideClick);
};

// Функция для показа сообщения об ошибке (пункт 3.5 и 4.2)
const showErrorMessage = () => {
  // Находим шаблон error из index.html
  const errorTemplate = document.querySelector('#error');
  if (!errorTemplate) return;

  const errorElement = errorTemplate.content.querySelector('.error').cloneNode(true);
  document.body.appendChild(errorElement);

  const errorButton = errorElement.querySelector('.error__button');
  const removeErrorMessage = () => {
    errorElement.remove();
    document.removeEventListener('keydown', onEscKeyDown);
    document.removeEventListener('click', onOutsideClick);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removeErrorMessage();
    }
  };

  const onOutsideClick = (evt) => {
    if (!errorElement.contains(evt.target)) {
      removeErrorMessage();
    }
  };

  errorButton.addEventListener('click', removeErrorMessage);
  document.addEventListener('keydown', onEscKeyDown);
  document.addEventListener('click', onOutsideClick);
};

// Экспортируем функции
export { showSuccessMessage, showErrorMessage };
