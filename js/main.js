import { getData } from './api.js';
import { renderThumbnails } from './thumbnails.js';
import './form-validation.js';

const createErrorBlock = () => {
  const errorBlock = document.createElement('div');
  errorBlock.className = 'load-error';
  errorBlock.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #ff6b6b;
    color: white;
    padding: 15px 25px;
    border-radius: 5px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 9999;
    display: none;
    max-width: 500px;
    text-align: center;
  `;
  errorBlock.innerHTML = `
    <strong>Ошибка загрузки</strong>
    <p style="margin: 8px 0;">Не удалось загрузить фотографии</p>
    <button class="error-close" style="
      background: rgba(255,255,255,0.2);
      border: 1px solid white;
      color: white;
      padding: 5px 15px;
      border-radius: 3px;
      cursor: pointer;
    ">Закрыть</button>
  `;

  document.body.appendChild(errorBlock);

  // Закрытие по клику на кнопку
  errorBlock.querySelector('.error-close').addEventListener('click', () => {
    errorBlock.style.display = 'none';
  });

  return errorBlock;
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  const errorBlock = createErrorBlock();

  // Загружаем данные с сервера (пункт 4.1)
  getData()
    .then((photos) => {
      // Успешно загрузили - отображаем фотографии
      renderThumbnails(photos);
    })
    .catch((error) => {
      // Произошла ошибка - показываем сообщение (пункт 4.2)
      console.error('Ошибка загрузки:', error);
      errorBlock.style.display = 'block';
    });
});
