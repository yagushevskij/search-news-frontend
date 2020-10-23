import { BaseComponent } from './BaseComponent';

export class Popup extends BaseComponent {
  constructor(template, container) {
    super();
    this._template = template;
    this._container = container;
    this._init = this._init.bind(this);
    this._setupHandlers = this._setupHandlers.bind(this);
  }
  _init() {
    this._setupHandlers()
    this._setHandlers(this._handlersArray);
  }
  open = () => {
    this._setContent();
    this._init();
    this._container.classList.add('popup_is-opened');
    event.preventDefault();
  };
  close = () => {
    this._container.classList.remove('popup_is-opened');
    // this._removeHandlers(this._handlersArray);
    this._clearContent();
  }
  _setContent = () => {
    this._view = this._template.content.cloneNode(true).children[0];
    this._container.append(this._view);
  };
  _clearContent = () => {
    this._view.remove();
  };
  // _submit = (event) => {
  //   event.preventDefault();
  //   this._form.submit(this.mainApi)
  //   .then((result) => console.log(result))
  //   // this._form.send(this.mainApi) ? console.log('Успешно!') : console.log('Неудача...');
  //   // this.close();
  // };

  // // _setEventListeners = () => {
  // //     /// Пробуем найти в DOM элементе ссылки переключения попапов и если находится, то добавляем слушатели
  // //   try {
  // //     const signupLink = this._view.querySelector('.popup__alt-link_register');
  // //     const signinLink = this._view.querySelector('.popup__alt-link_login');
  // //     if (signupLink) {
  // //       signupLink.addEventListener('click', this.close);
  // //       signupLink.addEventListener('click', () => {this.open('signup')})
  // //     }
  // //     if (signinLink) {
  // //       signinLink.addEventListener('click', this.close);
  // //       signinLink.addEventListener('click', () => {
  // //         event.preventDefault();
  // //         this.open('signin');
  // //       })
  // //     }
  // //   }
  // //   finally {
  // //     this._view.querySelector('.popup__close').addEventListener('click', this.close);
  // //     // this._form.setEventListeners();
  // //   }
  // // };
  _setupHandlers() {
    return this._handlersArray = [{
      element: this._view.querySelector('.popup__close'),
      event: 'click',
      callbacks: [this.close]
    }];
  };
      // {
      //   element: this._view,
      //   event: 'submit',
      //   callbacks: [this._submit]
      // }
    // /// Пробуем найти в DOM элементе ссылки переключения попапов и если находится, то добавляем в массив обработчкиков
    // try {
    //   const signupLink = this._view.querySelector('.popup__alt-link_register');
    //   const signinLink = this._view.querySelector('.popup__alt-link_login');
    //   if (signupLink) {
    //     this._handlersArray.push({
    //       element: signupLink,
    //       event: 'click',
    //       callbacks: [this.close, () => { this.open('signup') }]
    //     })
    //   }
    //   if (signinLink) {
    //     this._handlersArray.push({
    //       element: signinLink,
    //       event: 'click',
    //       callbacks: [this.close, () => {
    //         event.preventDefault();
    //         this.open('signin')
    //       }]
    //     })
    //   }
    // }
    // finally {
    //   return this._handlersArray;
    // }
}
