import { BaseComponent } from './BaseComponent';

export class NewsCardList extends BaseComponent {
  constructor(container, createCard, templates, config) {
    super();
    this._container = container;
    this._createCard = createCard;
    this._config = config;
    // Блок шаблонов
    this._isLoadingTemp = templates.isLoadingTemp;
    this._notFoundTemp = templates.notFoundTemp;
    this._srvErrTemp = templates.srvErrTemp;
    this._cardsBlockTemp = templates.cardsBlockTemp;
    //
  }
  renderInfoBlock = (temp) => {
    const element = temp.content.cloneNode(true).children[0];
    this._container.append(element);
    this._container.classList.add('search-results_is-visible');
  };
  _renderCards = () => {
    for (let i = this._cardIndexFrom; i <= this._cardIndexTo; i++) {
      if (i <= this._cardsArray.length) {
        this.addCard(this._cardsArray[i])
        this._cardIndexFrom = i; // Записываем индекс последнего элемента в цикле
      }
    }
  };
  renderResults = (cardsArray, params = {}) => {
    this.clearContainer();
    this._cardsArray = cardsArray;
    this._isLoggedIn = Boolean(params.userData);
    this._keyword = params.keyword;
    if (this._cardsArray.length > 0) {
      this.renderInfoBlock(this._cardsBlockTemp);
      this._cardsContainer = this._container.querySelector('.cards-container');
      this._cardIndexFrom = 0; // Создаем переменную с дефолтным индексом, с которого начнется перебор массива.
      this._cardIndexTo = this._config.cardsOnPage - 1;
      this._renderCards();
      if (this._cardIndexTo < this._cardsArray.length) { // Если длинна массива больше, чем последний добавленный в DOM элемент, то покажем кнопку show-more и навесим обработчки
        this._button = this._container.querySelector('.button_type_load-more');
        this._showShowMoreBtn();
      }
    } else {
      this.renderInfoBlock(this._notFoundTemp);
    };
  };
  renderLoader = () => {
    this.renderInfoBlock(this._isLoadingTemp);
  };
  renderError = () => {
    this.renderInfoBlock(this._srvErrTemp);
  };
  clearContainer = () => {
    this._container.textContent = '';
  };
  _showShowMoreBtn = () => {
    this._button.classList.remove('button_is-hidden')
    const BtnHandler = [
      {
        element: this._button,
        event: 'click',
        callbacks: [this.showMore]
      }
    ]
    this._setHandlers(BtnHandler);
  }
  _hideShowMoreBtn = () => {
    this._button.classList.add('button_is-hidden');
  };
  showMore = () => {
    if (this._cardIndexFrom < this._cardsArray.length) { // Проверяем, остались ли еще элементы в массиве для обработки
      this._cardIndexFrom += 1 // Увеличиваем на 1 индекс элемента, с которого начнется перебор
      this._cardIndexTo += this._config.loadMoreCount; // Увеличиваем индекс последнего элемента для перебора в массиве на число из настроек
      this._renderCards();
    } else {
      this._hideShowMoreBtn();
    }
  };
  addCard = (cardObj) => {
    this._cardsContainer.appendChild(this._createCard(cardObj, {
      isUserLoggedIn: this._isLoggedIn,
      isSaved: false,
      keyword: this._keyword
    }));
  };
}
