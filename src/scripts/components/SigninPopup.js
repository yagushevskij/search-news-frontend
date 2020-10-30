import { Popup } from './Popup';
import { getInputsObj } from '../utils';

export class SigninPopup extends Popup {
  constructor(template, container, login, createForm, renderHeader, cardlist) {
    super(template, container);
    this._login = login;
    this._createForm = createForm;
    this._renderHeader = renderHeader;
    this._cardList = cardlist;
  }
  setDependencies = (dependencies = {}) => {
    this._signupPopup = dependencies.signupPopup;
  }
  _init() {
    super._init();
    this._formElem = this._view.querySelector('form');
    this._submitButton = this._formElem.querySelector('.button');
    const backendErrorEl = this._formElem.querySelector('.popup__backend-error-message');
    this._form = this._createForm(this._formElem, backendErrorEl);
  };
  _signin = (evt) => {
    evt.preventDefault();
    this._disableButton();
    return this._login(getInputsObj(this._formElem))
      .then((data) => {
        this._renderHeader({ isLoggedIn: true, userName: data.username })
        if (this._cardList.cardsArray) { // Проверяем есть ли в объекте массив с карточками.
          this._cardList.renderResults(null, {userData: data}); // Перерисовываем карточки для возможности сохранения.
        };
        this.close();
      })
      .catch((err) => {
        this._form.setServerError(err.message)
        this._enableButton();
      });
  };
  _disableButton = () => {
    this._submitButton.setAttribute('disabled', 'true');
  }
  _enableButton = () => {
    this._submitButton.removeAttribute('disabled');
  }
  _initHandlers() {
    super._initHandlers();
    this._handlers.push({
      element: this._view.querySelector('.popup__alt-link_register'),
      event: 'click',
      callbacks: [this.close, this._signupPopup.open]
    },
      {
        element: this._view,
        event: 'submit',
        callbacks: [this._signin]
      })
  };
}
