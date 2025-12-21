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
const load = (route, errorText, method = Method.GET, body = null) => {
  // Выполняем запрос к серверу
  return fetch(`${BASE_URL}${route}`, {
    method: method,
    body: body
  })
    .then((response) => {
      // Проверяем, успешен ли ответ
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      }
      // Преобразуем ответ в JSON
      return response.json();
    })
    .catch(() => {
      // Если произошла ошибка - выбрасываем её с понятным текстом
      throw new Error(errorText);
    });
};

// Функция для получения фотографий с сервера
const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA, Method.GET);

// Функция для отправки формы на сервер
const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

// Экспортируем функции для использования в других модулях
export { getData, sendData };
