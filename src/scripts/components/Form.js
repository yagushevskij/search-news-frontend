import { BaseComponent } from './BaseComponent';

export class Form extends BaseComponent {
  constructor(form, backendErrorEl, config) {
    super()
    this._form = form;
    this._backendErrorEl = backendErrorEl;
    this._validationMessages = config.validationMessages;
    this._initHandlers();
    this._setHandlers(this._handlers);
  }
  setServerError = (message) => {
    this._backendErrorEl.textContent = message;
  };
  _validateInputElement = (evt) => {
    const input = evt.target;
    this._errorEl = input.nextElementSibling;
    if (input.validity.valueMissing) {
      this._errorEl.textContent = this._validationMessages.required;
    }
    else if (input.validity.tooShort) {
      this._errorEl.textContent = this._validationMessages.tooShort + ' ' + input.minLength;
    }
    else if (input.validity.tooLong) {
      this._errorEl.textContent = this._validationMessages.tooLong + ' ' + input.maxLength;
    }
    else if (input.validity.typeMismatch && input.type === 'email') {
      this._errorEl.textContent = this._validationMessages.email;
    }
    else {
      this._clear(this._errorEl);
    }
    this._clear(this._backendErrorEl);
  };
  _validateForm = () => {
    const _submitButton = this._form.querySelector('.button');
    const _isFormValid = this._form.checkValidity();
    _submitButton.disabled = !_isFormValid;
  };
  _clear = (el) => {
    el.textContent = '';
  };
  _initHandlers = () => {
    this._handlers = [];
    Array.from(this._form.querySelectorAll('input')).forEach((elem) => {
      this._handlers.push(
        {
          element: elem,
          event: 'input',
          callbacks: [this._validateInputElement, this._validateForm]
        }
      )
    });
  };
}
