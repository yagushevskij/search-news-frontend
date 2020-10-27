export class BaseComponent {
  constructor(domElement) {
    this._domElement = domElement;
  }
  _setHandlers = (handlersArray) => {
    handlersArray.forEach((el) => {
      /// Если обработчиков у элемента несколько, то на каждый будет создан отдельный слушатель
      el.callbacks.forEach((callback) => {
        el.element.addEventListener(el.event, callback);
      })
    })
  };
  _removeHandlers = (handlersArray) => {
    handlersArray.forEach((el) => {
      el.callbacks.forEach((callback) => {
        el.element.removeEventListener(el.event, callback);
      })
    })
  };
}
