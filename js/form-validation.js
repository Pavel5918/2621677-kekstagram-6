const Pristine = window.Pristine;
import { initEditor, resetEditor } from './editor.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';

const form = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const fileInput = document.querySelector('.img-upload__input');
const overlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');

const validateHashtags = (value) => {
  if (value.trim() === '') {
    return true;
  }

  const hashtags = value.trim().toLowerCase().split(/\s+/);

  if (hashtags.length > 5) {
    return false;
  }

  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];

    if (!hashtag.startsWith('#')) {
      return false;
    }

    if (hashtag === '#') {
      return false;
    }

    if (hashtag.length > 20) {
      return false;
    }

    const regex = /^#[a-zа-яё0-9]+$/;
    if (!regex.test(hashtag)) {
      return false;
    }

    for (let j = i + 1; j < hashtags.length; j++) {
      if (hashtag === hashtags[j]) {
        return false;
      }
    }
  }

  return true;
};

const validateComment = (value) => value.length <= 140;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error-text'
});

pristine.addValidator(
  hashtagInput,
  validateHashtags,
  'Хэштеги должны начинаться с #, содержать только буквы и цифры, быть уникальными. Максимум 5 штук.'
);

pristine.addValidator(
  commentInput,
  validateComment,
  'Комментарий не может быть длиннее 140 символов.'
);

form.addEventListener('submit', async (evt) => {
  evt.preventDefault(); // Отменяем стандартную отправку (пункт 3.1)

  // Проверяем валидность формы
  const isValid = pristine.validate();

  if (!isValid) {
    return; // Не отправляем, если есть ошибки
  }

  // Блокируем кнопку отправки (пункт 3.1)
  const submitButton = form.querySelector('.img-upload__submit');
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';

  try {
    // Создаем FormData из формы
    const formData = new FormData(form);

    // Отправляем данные на сервер (пункт 3.1)
    await sendData(formData);

    // УСПЕШНАЯ отправка (пункт 3.3 и 3.4)
    showSuccessMessage(); // Показываем сообщение об успехе
    closeForm(); // Закрываем форму
    resetForm(); // Сбрасываем форму в исходное состояние

  } catch (error) {
    // ОШИБКА отправки (пункт 3.5)
    showErrorMessage(); // Показываем сообщение об ошибке
    // Данные в форме сохраняются автоматически

  } finally {
    // Разблокируем кнопку в любом случае
    submitButton.disabled = false;
    submitButton.textContent = 'Опубликовать';
  }
});

const resetForm = () => {
  form.reset();
  pristine.reset();
  resetEditor();
};

fileInput.addEventListener('change', () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  initEditor();
});

const closeForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetForm();
};

cancelButton.addEventListener('click', () => {
  closeForm();
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && !overlay.classList.contains('hidden')) {
    const isInputFocused = document.activeElement === hashtagInput ||
                          document.activeElement === commentInput;

    if (!isInputFocused) {
      closeForm();
    }
  }
});

hashtagInput.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

commentInput.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

export { resetForm, closeForm };
