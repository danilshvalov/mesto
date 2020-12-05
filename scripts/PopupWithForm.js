import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(
    popupSelectors,
    { formSelector, inputSelector, submitButtonSelector },
    submitHandler
  ) {
    super(popupSelectors);
    this._form = this._popup.querySelector(formSelector);
    this._inputs = Array.from(this.formElement.querySelectorAll(inputSelector));
    this._submitButton = this.formElement.querySelector(submitButtonSelector);
    this._submitHandler = submitHandler;
    this._openEvent = new Event("open");
    this._closeEvent = new Event("close");
    this._setEventListeners();
  }
  getInputValues() {
    const result = {};
    this._inputs.forEach((input) => (result[input.name] = input.value));
    return result;
  }
  setInputValues(data) {
    this._inputs.forEach((input) => {
      if (data[input.name]) {
        input.value = data[input.name];
      }
    });
  }
  open() {
    this._form.dispatchEvent(this._openEvent);
    super.open();
  }
  close() {
    super.close();
    this._form.dispatchEvent(this._closeEvent);
    setTimeout(() => this.formElement.reset(), 100); // скрываем от пользователя сброс формы, очищением только после анимации
  }
  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener("submit", this._submitHandler);
  }
  // Добавляем геттер без сеттера, чтобы не было возможности изменить элемент формы
  get formElement() {
    return this._form;
  }
}
