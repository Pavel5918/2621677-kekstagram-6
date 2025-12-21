// Адрес сервера из техзадания
const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

// Пути для запросов
const Route = {
  GET_DATA: '/data',    // Для получения данных
  SEND_DATA: '/'        // Для отправки данных
};

// Методы HTTP
const Method = {
  GET: 'GET',
  POST: 'POST'
};

// Тексты ошибок
const ErrorText = {
  GET_DATA: 'Не удалось загрузить фотографии. Попробуйте обновить страницу',
  SEND_DATA: 'Ошибка отправки формы. Попробуйте ещё раз'
};

// Основная функция для работы с fetch
const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {
    method: method,
    body: body
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

// Функция для получения фотографий с сервера
const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA, Method.GET);

// Функция для отправки формы на сервер
const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

// Экспортируем функции для использования в других модулях
export { getData, sendData };
