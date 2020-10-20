import { BaseComponent } from './BaseComponent';

export class Popup extends BaseComponent {
  constructor(container, templates) {
    super();
    this._templates = templates;
    this._container = container;
  }
  open = (popupName) => {
    this._setContent(this._templates[popupName]);
    this._container.classList.add('popup_is-opened');
    this._setHandlers(this._setupHandlers());
  };
  close = () => {
    this._container.classList.remove('popup_is-opened');
    this._clearContent();
    this._removeHandlers(this._setupHandlers());
  };
  _setContent = (template) => {
    this._view = template.content.cloneNode(true).children[0];
    this._container.append(this._view);
  };
  _clearContent = () => {
    this._view.remove();
  };
  _setupHandlers = () => {
    this._handlersArray = [
      {
        element: this._view.querySelector('.popup__close'),
        event: 'click',
        callbacks: [this.close]
      }
    ]
    /// Пробуем найти в DOM элементе ссылки переключения попапов и если находится, то добавляем в массив обработчкиков
    try {
      const signupLink = this._view.querySelector('.popup__alt-link_register');
      const signinLink = this._view.querySelector('.popup__alt-link_login');
      if (signupLink) {
        this._handlersArray.push({
          element: signupLink,
          event: 'click',
          callbacks: [this.close, () => { this.open('signup') }]
        })
      }
      if (signinLink) {
        this._handlersArray.push({
          element: signinLink,
          event: 'click',
          callbacks: [this.close, () => {
            event.preventDefault();
            this.open('signin')
          }]
        })
      }
    }
    finally {
      return this._handlersArray;
    }
  };
}
