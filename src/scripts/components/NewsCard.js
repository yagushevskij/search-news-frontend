import { BaseComponent } from './BaseComponent';
import { getFormatedDate } from '../utils';

export class NewsCard extends BaseComponent {
  constructor(template, mainApi, config) {
    super();
    this._template = template;
    this._saveArticle = mainApi.createArticle;
    this._removeArticle = mainApi.removeArticle;
    this._picPlacehold = config.picPlacehold;
    this._pageName = config.page; // Получаем название страницы для создания логики удаления карточек.
    this._text = config.text;
  }
  create = (cardObj, params = {}) => {
    this._cardObj = cardObj;
    const {refreshInfoBlock} = params;
    if (refreshInfoBlock) { // Если пришел метод рендера блока с ключевыми словами, то запишем его в объект карточки.
        this._refreshInfoBlock = refreshInfoBlock;
    }

    this._isUserLoggedIn = Boolean(params.userData);
    this._isSaved = params.isSaved;
    this._keyword = this._cardObj.keyword || params.keyword; // Определяем ключевое слово для карточки.
    if (this._cardObj.urlToImage === null) {
      this._cardObj.urlToImage = this._picPlacehold
    }
    this._view = this._template.content.cloneNode(true).children[0];
    this._view.querySelector('.card__date').textContent = getFormatedDate(cardObj.publishedAt);
    this._view.querySelector('.card__news-link').setAttribute('href', this._cardObj.url);
    this._view.querySelector('.card__image').setAttribute('src', this._cardObj.urlToImage);
    this._view.querySelector('.card__title').textContent = this._cardObj.title;
    this._view.querySelector('.card__description').textContent = this._cardObj.description;
    const source = this._view.querySelector('.card__source-link');
    source.textContent = this._cardObj.source.name;
    source.setAttribute('href', this._cardObj.url);
    if (this._cardObj.keyword) { // Если в присланном объекте есть свойство "keyword", то отрисуем иконку с названием ключевого слова.
      this._view.querySelector('.card__icon_type_tag').textContent = this._cardObj.keyword;
    }
    this.renderIcon()
    this._initHandlers();
    return this._view;
  };
  _createNewsObj = () => {
    return {
      keyword: this._keyword,
      title: this._cardObj.title,
      description: this._cardObj.description,
      publishedAt: this._cardObj.publishedAt,
      source: {
        name: this._cardObj.source.name
      },
      url: this._cardObj.url,
      urlToImage: this._cardObj.urlToImage,
    }
  };
  renderIcon = () => {
    this._iconsContainer = this._view.querySelector('.card__icons-container');
    this._icon = this._iconsContainer.querySelector('.card__icon');
    const messageContainer = this._iconsContainer.querySelector('.card__icon_type_message');
    if (this._isUserLoggedIn && !this._isSaved) {
      messageContainer.textContent = this._text.addToSaved;
      this._icon.classList.remove('card__icon_type_saved');
    }
    if (this._isSaved) {
      messageContainer.textContent = this._text.removeFromSaved;
      this._icon.classList.add('card__icon_type_saved');
    }
  };
  _save = () => {
    this._removeHandlers(this._handlers)
    this._saveArticle(this._createNewsObj())
      .then((res) => {
        this._cardObj._id = res._id; // После добавления карточки на сервер - добавляем объекту id, пришедший в ответе
        this._isSaved = true;
        this.renderIcon();
        this._initHandlers();
      })
      .catch((err) => console.log(err));
  };
  _remove = () => {
    this._removeHandlers(this._handlers)
    if (this._cardObj._id) {
      this._removeArticle(this._cardObj._id)
        .then((res) => {
          this._isSaved = false;
          if (this._pageName === 'index') {
            this.renderIcon();
            this._initHandlers();
          } else if (this._pageName === 'savedNews') {
            this._view.remove();
            this._refreshInfoBlock(this._cardObj);
          } else {
            this._view.remove();
          }
        })
        .catch((err) => console.log(err));
    }
  };
  _initHandlers = () => {
    if (this._isUserLoggedIn && !this._isSaved) {
      this._handlers = [
        {
          element: this._icon,
          event: 'click',
          callbacks: [this._save]
        }
      ]
      this._setHandlers(this._handlers)
    }
    if (this._isUserLoggedIn && this._isSaved) {
      this._handlers = [
        {
          element: this._icon,
          event: 'click',
          callbacks: [this._remove]
        }
      ]
      this._setHandlers(this._handlers)
    }
  };
}
