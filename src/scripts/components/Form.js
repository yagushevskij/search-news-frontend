import { BaseComponent } from './BaseComponent';

export class Form extends BaseComponent {
  constructor(mainApi, form) {
    super()
    this._form = form;
    this.mainApi = mainApi;

    this._setupHandlers()
    this._setHandlers(this._handlersArray);
  }
  signin = () => {
    return this.mainApi.signin(this._getInfo())
      .then((data) => data)
      .catch((err) => {
        this.setServerError(err.message)
        return false;
      });
  };
  signup = () => {
    return this.mainApi.signup(this._getInfo())
      .then((data) => data)
      .catch((err) => {
        this.setServerError(err.message)
        return false;
      });
  };
  setServerError = (message) => {
    const errorEl = this._form.querySelector('.popup__backend-error-message');
    errorEl.textContent = message;
  };
  _validateInputElement = (event) => {
    const input = event.target;
    this._errorEl = input.nextElementSibling;
    if (input.validity.valueMissing) {
      this._errorEl.textContent = 'Это обязательное поле';
    }
    else if (input.validity.tooLong || input.validity.tooShort) {
      this._errorEl.textContent = 'Должно быть от 2 до 30 символов';
    }
    else if (input.validity.typeMismatch && input.type === 'email') {
      this._errorEl.textContent = 'Здесь должен быть email';
    }
    else {
      this._errorEl.textContent = '';
    }
  };
  _validateForm = () => {
    const _submitButton = this._form.querySelector('.popup__button');
    const _isFormValid = this._form.checkValidity();
    _submitButton.disabled = !_isFormValid;
  };
  _clear = () => {
  };
  _getInfo = () => {
    // Array.from(this._form.elements).filter((elem) => {
    //   if (!elem.classList.contains('button')) {
    //     return elem;
    //   }
    // });
    const info = {};
    Array.from(this._form.elements).forEach((elem) => {
      if (!elem.classList.contains('button')) {
        info[elem.name] = elem.value;
      }
    });
    return info;
  };
  // setEventListeners = () => {
  //   Array.from(this._form.querySelectorAll('.popup__input')).forEach((elem) => {
  //     elem.addEventListener('input', this._validateInputElement);
  //     elem.addEventListener('input', this._validateForm);
  //   })
  //   // this._form.addEventListener('submit', this._submit);
  // };
  // removeEventListeners = () => {
  //   Array.from(this._form.querySelectorAll('.popup__input')).forEach((elem) => {
  //     elem.removeEventListener('input', this._validateInputElement);
  //     elem.removeEventListener('input', this._validateForm);
  //   });
  //   this._form.removeEventListener('submit', this._submit);
  // };
  _setupHandlers = () => {
    this._handlersArray = [];
    Array.from(this._form.querySelectorAll('.popup__input')).forEach((elem) => {
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
