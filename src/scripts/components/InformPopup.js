import { Popup } from './Popup';

export class InformPopup extends Popup {
  constructor(...args) {
    super(...args);
  }
  setDependencies = (dependencies = {}) => {
    this._signinPopup = dependencies.signinPopup;
  }
  _setupHandlers() {
    super._setupHandlers();
    this._handlersArray.push({
      element: this._view.querySelector('.popup__alt-link_login'),
      event: 'click',
      callbacks: [this.close, this._signinPopup.open]
    })
  }
}
