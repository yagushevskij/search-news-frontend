import { BaseComponent } from './BaseComponent';

export class Popup extends BaseComponent {
  constructor(template, container) {
    super();
    this._template = template;
    this._container = container;
    this._init = this._init.bind(this);
    this._initHandlers = this._initHandlers.bind(this);
  }
  _init() {
    this._initHandlers()
    this._setHandlers(this._handlers);
  }
  open = () => {
    this._setContent();
    this._init();
    this._container.classList.add('popup_is-opened');
    event.preventDefault();
  };
  close = () => {
    this._container.classList.remove('popup_is-opened');
    this._clearContent();
  }
  _setContent = () => {
    this._view = this._template.content.cloneNode(true).children[0];
    this._container.append(this._view);
  };
  _clearContent = () => {
    this._view.remove();
  };
  _initHandlers() {
    return this._handlers = [{
      element: this._view.querySelector('.popup__close'),
      event: 'click',
      callbacks: [this.close]
    }];
  };
}
