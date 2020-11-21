import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, { formSelector, inputSelector, submitButtonSelector }, submitHandler) {
    super(selector);
    this.form = this.popup.querySelector(formSelector);
    this.inputs = Array.from(this.form.querySelectorAll(inputSelector));
    this.submitButton = this.form.querySelector(submitButtonSelector);
    this.submitHandler = submitHandler;
    this.openEvent = new Event("open");
    this.closeEvent = new Event("close");
  }
  getInputValues() {
    const result = {};
    this.inputs.forEach((input) => result[input.name] = input.value);
    return result;
  }
  setInputValues(data) {
    this.inputs.forEach((input) => {
      if (data[input.name]) {
        input.value = data[input.name];
      }
    });
  }
  open() {
    this.form.dispatchEvent(this.openEvent);
    super.open();
  }
  close() {
    super.close();
    this.form.dispatchEvent(this.closeEvent);
    setTimeout(() => this.form.reset(), 200); // скрываем от пользователя сброс формы, очищением только после анимации
  }
  _setEventListeners() {
    super._setEventListeners();
    this.form.addEventListener("submit", this.submitHandler);
  }
}