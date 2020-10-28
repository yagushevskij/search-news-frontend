import { Popup } from './Popup';
import { getInputsObj } from '../utils';

export class SigninPopup extends Popup {
  constructor(template, container, login, createForm, renderHeader) {
    super(template, container);
    this._login = login;
    this._createForm = createForm;
    this._renderHeader = renderHeader;
  }
  setDependencies = (dependencies = {}) => {
    this._signupPopup = dependencies.signupPopup;
  }
  _init() {
    super._init();
    this._formElem = this._view.querySelector('form');
    const backendErrorEl = this._formElem.querySelector('.popup__backend-error-message');
    this._form = this._createForm(this._formElem, backendErrorEl);
  };
  _signin = (evt) => {
    evt.preventDefault();
    return this._login(getInputsObj(this._formElem))
      .then((data) => {
        this._renderHeader({ isLoggedIn: true, userName: data.username })
        this.close();
      })
      .catch((err) => {
        this._form.setServerError(err.message)
      });
  };
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
