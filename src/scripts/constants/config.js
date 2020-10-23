const MAIN_API_URL = NODE_ENV === 'production' ? 'https://api.turbomegapro.ru' : 'http://localhost:3000';
const config = {
  articlesApiUrl: `${MAIN_API_URL}/articles`,
  userApiUrl: `${MAIN_API_URL}/users/me`,
  signoutApiUrl: `${MAIN_API_URL}/users/logout`,
  signinApiUrl: `${MAIN_API_URL}/signin`,
  signupApiUrl: `${MAIN_API_URL}/signup`,
  headers: {
    'Content-Type': 'application/json',
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

export { config, headerConf, headerMenuLinks };
