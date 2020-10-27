import { BaseComponent } from './BaseComponent';

export class Form extends BaseComponent {
  constructor(form, backendErrorEl) {
    super()
    this._form = form;
    this._backendErrorEl = backendErrorEl;

    this._setupHandlers()
    this._setHandlers(this._handlersArray);
  }
  setServerError = (message) => {
    this._backendErrorEl.textContent = message;
  };
  _validateInputElement = (evt) => {
    const input = evt.target;
    this._errorEl = input.nextElementSibling;
    if (input.validity.valueMissing) {
      this._errorEl.textContent = 'Это обязательное поле';
    }
    else if (input.validity.tooShort) {
      this._errorEl.textContent = `Должно быть от ${input.minLength} символов`;
    }
    else if (input.validity.tooLong) {
      this._errorEl.textContent = `Должно быть до ${input.maxLength} символов`;
    }
    else if (input.validity.typeMismatch && input.type === 'email') {
      this._errorEl.textContent = 'Здесь должен быть email';
    }
    else {
      this._errorEl.textContent = '';
    }
  };
  _validateForm = () => {
    const _submitButton = this._form.querySelector('.button');
    const _isFormValid = this._form.checkValidity();
    _submitButton.disabled = !_isFormValid;
  };
  _clear = () => {
  };
  _setupHandlers = () => {
    this._handlersArray = [];
    Array.from(this._form.querySelectorAll('input')).forEach((elem) => {
      this._handlersArray.push(
        {
          element: elem,
          event: 'input',
          callbacks: [this._validateInputElement, this._validateForm]
        }
      )
    });
    return this._handlersArray;
  };
}
