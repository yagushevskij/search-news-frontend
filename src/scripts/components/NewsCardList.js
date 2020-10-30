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
      if (i < this.cardsArray.length) {
        this.addCard(this.cardsArray[i])
        this._cardIndexFrom = i; // Записываем индекс последнего элемента в цикле
      }
    }
    this._cardIndexFrom += 1 // Увеличиваем на 1 индекс элемента, с которого начнется перебор
    this._cardIndexTo += this._config.loadMoreCount; // Увеличиваем индекс последнего элемента для перебора в массиве на число из настроек
    if (this._cardIndexFrom >= this.cardsArray.length) {
      this._hideShowMoreBtn();
    }
  };
  renderResults = (cardsArray, params = {}) => { // Вызывается со всеми аргументами для отрисовки карточек,
    // либо только с частью - для перерисовки текущих результатов (например при логине/раздлгине).
    this.clearContainer();
    this.cardsArray = this.cardsArray || cardsArray; // Если при вызове метода массив карточек пришел, то будем работать с ним
    this._params = this._params || params;
    if (params.userData) { // Проверям, пришли ли данные об авторизованном пользователе
      this._params.userData = params.userData;
    }
    if (this.cardsArray.length > 0) {
      this.renderInfoBlock(this._cardsBlockTemp);
      this._button = this._container.querySelector('.button_type_load-more');
      this._cardsContainer = this._container.querySelector('.cards-container');
      this._cardIndexFrom = 0; // Создаем переменную с дефолтным индексом, с которого начнется перебор массива.
      this._cardIndexTo = this._config.cardsOnPage - 1;
      this._renderCards();
      if (this._cardIndexFrom < this.cardsArray.length) { // Если длинна массива больше, чем последний добавленный в DOM элемент, то покажем кнопку show-more и навесим обработчки
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
        callbacks: [this._renderCards]
      }
    ]
    this._setHandlers(BtnHandler);
  }
  _hideShowMoreBtn = () => {
    this._button.classList.add('button_is-hidden');
  };
  addCard = (cardObj) => {
    this._cardsContainer.appendChild(this._createCard(cardObj, this._params));
  };
}
