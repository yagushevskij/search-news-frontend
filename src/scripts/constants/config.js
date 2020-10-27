import { getPrevDate } from '../utils';

const MAIN_API_URL = NODE_ENV === 'production' ? 'https://api.turbomegapro.ru' : 'http://localhost:3000';
const NEWS_API_URL = NODE_ENV === 'production' ? 'https://nomoreparties.co/news/v2/everything?' : 'https://newsapi.org/v2/everything?';
const mainApiConf = {
  articlesApiUrl: `${MAIN_API_URL}/articles`,
  userApiUrl: `${MAIN_API_URL}/users/me`,
  signoutApiUrl: `${MAIN_API_URL}/users/logout`,
  signinApiUrl: `${MAIN_API_URL}/signin`,
  signupApiUrl: `${MAIN_API_URL}/signup`,
  headers: {
    'Content-Type': 'application/json',
  },
};
const newsApiConf = {
  apiKey: '5cccd8960b3e402cae29c544e480673f', // API ключ сервиса newsapi.org
  from: 7, // Количество дней назад от текущей даты: начало интервала
  to: 0, // Количество дней назад от текущей даты: конец интервала
  sortBy: 'popularity', // Сортировка
  pageSize: 100, // Максимальная длинна массива новостей
  getUrl(query) { // При вызове функции передаем запрос
    return NEWS_API_URL
      + `q=${query}&`
      + `from=${getPrevDate(this.from)}&`
      + `to=${getPrevDate(this.to)}&`
      + `sortBy=${this.sortBy}&`
      + `pageSize=${this.pageSize}&`
      + `apiKey=${this.apiKey}`;
  },
};

const headerConf = {
  style: {
    // Модификаторы блока header для изменения фона шапки
    white: { modificator: 'header_style_background-none' },
    image: { modificator: 'header_style_background-image' },
  },
  page: {
    index: 'index',
    savedNews: 'savedNews',
  },
};

const headerMenuLinks = [
  {
    title: 'Сохраненные статьи',
    url: './saved-news.html',
    page: headerConf.page.savedNews, // используется для идентификации текущей страницы
    isForLoggedIn: true, // будем показывать этот объект только залогиненным пользователям
  },
  {
    title: 'Главная',
    url: './index.html',
    page: headerConf.page.index,
    isForLoggedIn: false,
  },
];

const cardListConf = {
  cardsOnPage: 3, // Количество карточек при первоначальной загрузке результатов поиска
  loadMoreCount: 3, // Количество загружаемых карточек по клику на кнопку
};

export {
  mainApiConf, newsApiConf, headerConf, headerMenuLinks, cardListConf,
};
