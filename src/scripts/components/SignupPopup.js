import { Popup } from './Popup';

export class SignupPopup extends Popup {
  constructor(template, container, createForm, mainApi) {
    super(template, container);
    this._createForm = createForm;
    this.mainApi = mainApi;
  }
  setDependencies = (dependencies = {}) => {
    this._informPopup = dependencies.informPopup;
    this._signinPopup = dependencies.signinPopup;
  }
  _init() {
    super._init();
    this._form = this._createForm(this._view, this.mainApi);
  };
  _registration = () => {
    event.preventDefault();
    this._form.submit()
      .then((result) => {
        if (result) {
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
