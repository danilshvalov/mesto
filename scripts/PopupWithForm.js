import Popup from "./Popup.js";
import Form from "./Form.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submitHandler) {
    super(selector);
    this.form = new Form(this.popup.querySelector(".form"));
    this._setFormListeners(submitHandler);
    this.openEvent = new Event("open");
    this.closeEvent = new Event("close");
  }
  open() {
    this.form.getFormElement().dispatchEvent(this.openEvent);
    super.open();
  }
  close() {
    super.close();
    this.form.getFormElement().dispatchEvent(this.closeEvent);
    setTimeout(() => this.form.reset(), 200); // скрываем от пользователя очищение формы до конца анимации
  }
  _setFormListeners(handler) {
    this.form.setListener("submit", handler);
  }
}