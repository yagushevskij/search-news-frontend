import { BaseComponent } from './BaseComponent';
import { getFormatedDate } from '../utils';

export class NewsCard extends BaseComponent {
  constructor(template, mainApi) {
    super();
    this._template = template;
    this._saveArticle = mainApi.createArticle;
    this._removeArticle = mainApi.removeArticle;
  }
  create = (cardObj, params = {}) => {
    this._cardObj = cardObj;
    this._isUserLoggedIn = params.isUserLoggedIn;
    this._isSaved = params.isSaved;
    this._keyword = params.keyword;
    this._view = this._template.content.cloneNode(true).children[0];
    this._view.querySelector('.card__date').textContent = getFormatedDate(this._cardObj.publishedAt);
    this._view.querySelector('.card__news-link').setAttribute('href', this._cardObj.url);
    this._view.querySelector('.card__image').setAttribute('src', this._cardObj.urlToImage);
    this._view.querySelector('.card__title').textContent = this._cardObj.title;
    this._view.querySelector('.card__description').textContent = this._cardObj.description;
    const source = this._view.querySelector('.card__source-link');
    source.textContent = this._cardObj.source.name;
    source.setAttribute('href', this._cardObj.url);
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
        name: this._cardObj.source.name},
      url: this._cardObj.url,
      urlToImage: this._cardObj.urlToImage
    }
  };
  renderIcon = () => {
    this._iconsContainer = this._view.querySelector('.card__icons-container');
    this._icon = this._iconsContainer.querySelector('.card__icon');
    const messageContainer = this._iconsContainer.querySelector('.card__icon_type_message');
    if (this._isUserLoggedIn && !this._isSaved) {
      messageContainer.textContent = 'Добавить в сохраненные'
      this._icon.classList.remove('card__icon_type_saved');
    }
    if (this._isSaved) {
      messageContainer.textContent = 'Убрать из сохраненных'
      this._icon.classList.add('card__icon_type_saved');
    }
  };
  _save = () => {
    this._removeHandlers(this._handlers)
    this._saveArticle(this._createNewsObj())
    .then((res) => {
      this._id = res._id;
      this._isSaved = true;
      this.renderIcon();
      this._initHandlers();
    })
    .catch((err) => console.log(err));
  };
  _remove = () => {
    this._removeHandlers(this._handlers)
    if (this._id) {
      this._removeArticle(this._id)
      .then((res) => {
        this._isSaved = false;
        this.renderIcon();
        this._initHandlers();
      })
      .catch((err) => console.log(err));
    }
  };
  _initHandlers = () => {
    if (this._isUserLoggedIn && !this._isSaved) {
      this._handlers = [
        {
          element: this._iconsContainer,
          event: 'click',
          callbacks: [this._save]
        }
      ]
      this._setHandlers(this._handlers)
    }
    if (this._isUserLoggedIn && this._isSaved) {
      this._handlers = [
        {
          element: this._iconsContainer,
          event: 'click',
          callbacks: [this._remove]
        }
      ]
      this._setHandlers(this._handlers)
    }
  };
}
