import { Popup } from './Popup';
import { getInputsObj } from '../utils';

export class SignupPopup extends Popup {
  constructor(template, container, register, createForm) {
    super(template, container);
    this._register = register;
    this._createForm = createForm;
  }
  setDependencies = (dependencies = {}) => {
    this._informPopup = dependencies.informPopup;
    this._signinPopup = dependencies.signinPopup;
  }
  _init() {
    super._init();
    this._formElem = this._view.querySelector('form');
    const backendErrorEl = this._formElem.querySelector('.popup__backend-error-message');
    this._form = this._createForm(this._formElem, backendErrorEl);
  };
  _signup = (evt) => {
    evt.preventDefault();
    return this._register(getInputsObj(this._formElem))
    .then((data) => {
      this.close();
      this._informPopup.open();
    })
    .catch((err) => {
      this._form.setServerError(err.message)
    });
  };
  _setupHandlers() {
    super._setupHandlers();
    this._handlersArray.push({
      element: this._view.querySelector('.popup__alt-link_login'),
      event: 'click',
      callbacks: [this.close, this._signinPopup.open]
    },
      {
        element: this._view,
        event: 'submit',
        callbacks: [this._signup]
      })
  };
}
