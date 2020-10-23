import { Popup } from './Popup';

export class SignupPopup extends Popup {
  constructor(template, container, createForm) {
    super(template, container);
    this._createForm = createForm;
  }
  setDependencies = (dependencies = {}) => {
    this._informPopup = dependencies.informPopup;
    this._signinPopup = dependencies.signinPopup;
  }
  _init() {
    super._init();
    const form = this._view.querySelector('form');
    this._form = this._createForm(form);
  };
  _registration = (evt) => {
    evt.preventDefault();
    this._form.signup()
      .then((data) => {
        if (data) {
          this.close();
          this._informPopup.open();
        }
      })
      .catch((err) => console.log(err))
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
        callbacks: [this._registration]
      })
  };
}
