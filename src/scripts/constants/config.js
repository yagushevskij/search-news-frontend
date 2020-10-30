import { getPrevDate } from '../utils';

const MAIN_API_URL = NODE_ENV === 'production' ? 'https://api.turbomegapro.ru' : 'http://localhost:3000';
const NEWS_API_URL = NODE_ENV === 'production' ? 'https://nomoreparties.co/news/v2/everything?' : 'https://newsapi.org/v2/everything?';

const config = {
  mainApi: {
    articlesApiUrl: `${MAIN_API_URL}/articles`,
    userApiUrl: `${MAIN_API_URL}/users/me`,
    signoutApiUrl: `${MAIN_API_URL}/users/logout`,
    signinApiUrl: `${MAIN_API_URL}/signin`,
    signupApiUrl: `${MAIN_API_URL}/signup`,
    headers: {
      'Content-Type': 'application/json',
    },
  },
  newsApi: {
    apiKey: 'e2e59c30fc614dc8815a738af0bea3d3', // API ключ сервиса newsapi.org
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
  },
  header: {
    menuLinks: [
      {
        title: 'Главная',
        url: './index.html',
        page: 'index',
        isForLoggedIn: false,
      },
      {
        title: 'Сохраненные статьи',
        url: './saved-news.html',
        page: 'savedNews', // используется для идентификации текущей страницы
        isForLoggedIn: true, // будем показывать этот объект только залогиненным пользователям
      }],
    pages: {
      index: {
        name: 'index',
        style: 'image',
      },
      savedNews: {
        name: 'savedNews',
        style: 'none-image',
      },
    },
    text: {
      authButton: 'Авторизоваться',
    },
  },
  cardList: {
    pages: {
      index: {
        cardsOnPage: 3, // Количество карточек при первоначальной загрузке результатов поиска
        loadMoreCount: 3, // Количество загружаемых карточек по клику на кнопку
      },
      savedNews: {
        cardsOnPage: 999,
        loadMoreCount: 3,
      },
    },
  },
  card: {
    pages: {
      index: {
        page: 'index',
        picPlacehold: 'http://placehold.it/200x100',
        text: {
          addToSaved: 'Добавить в сохраненные',
          removeFromSaved: 'Убрать из сохраненных',
        },
      },
      savedNews: {
        page: 'savedNews',
        picPlacehold: 'http://placehold.it/200x100',
        text: {
          addToSaved: 'Добавить в сохраненные',
          removeFromSaved: 'Убрать из сохраненных',
        },
      },
    },
  },
  form: {
    validationMessages: {
      required: 'Это обязательное поле',
      tooShort: 'Должно быть минимум символов:',
      tooLong: 'Должно быть максимум символов:',
      email: 'Здесь должен быть email',
    },
  },
  search: {
    text: {
      required: 'Нужно ввести ключевое слово',
    },
  },
};

export { config };
