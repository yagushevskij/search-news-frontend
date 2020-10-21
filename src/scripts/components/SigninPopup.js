import { Popup } from './Popup';

export class SigninPopup extends Popup {
  constructor(template, container, createForm, mainApi) {
    super(template, container);
    this._createForm = createForm;
    this.mainApi = mainApi;
  }
  setDependencies = (dependencies = {}) => {
    this._signupPopup = dependencies.signupPopup;
  }
  _init() {
    super._init();
    this._form = this._createForm(this._view, this.mainApi);
  };
  _login = (event) => {
    event.preventDefault();
    this._form.submit()
      .then((result) => console.log(result))
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
