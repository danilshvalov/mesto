import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler, escapeKeyCode) {
    super(popupSelector, escapeKeyCode);
    this._form = this._popup.querySelector(".form");
    this._inputs = Array.from(
      this.formElement.querySelectorAll(".field__input")
    );
    this._submitButton = this.formElement.querySelector(".button_type_submit");
    this._submitHandler = submitHandler;
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
  close() {
    super.close();
    setTimeout(() => this.formElement.reset(), this._animationDuration);
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._submitHandler);
  }
  // Добавляем геттер без сеттера, чтобы не было возможности изменить элемент формы
  get formElement() {
    return this._form;
  }
}
