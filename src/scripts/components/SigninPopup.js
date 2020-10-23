import { Popup } from './Popup';

export class SigninPopup extends Popup {
  constructor(template, container, createForm, renderHeader) {
    super(template, container);
    this._createForm = createForm;
    this._renderHeader = renderHeader;
  }
  setDependencies = (dependencies = {}) => {
    this._signupPopup = dependencies.signupPopup;
  }
  _init() {
    super._init();
    const form = this._view.querySelector('form');
    this._form = this._createForm(form);
  };
  _login = (evt) => {
    evt.preventDefault();
    this._form.signin()
      .then((data) => {
        if (data) {
          this._renderHeader({ isLoggedIn: true, userName: data.username })
          this.close();
        }
      })
      .catch((err) => console.log(err))
  };
  _setupHandlers() {
    super._setupHandlers();
    this._handlersArray.push({
      element: this._view.querySelector('.popup__alt-link_register'),
      event: 'click',
      callbacks: [this.close, this._signupPopup.open]
    },
      {
        element: this._view,
        event: 'submit',
        callbacks: [this._login]
      })
  };
}
