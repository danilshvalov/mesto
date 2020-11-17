import Popup from "./Popup.js";
import Form from "./Form.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submitHandler) {
    super(selector);
    this.form = new Form(this.popup.querySelector(".form"));
    this._setFormListeners(submitHandler);
  }
  close() {
    super.close();
    this.form.reset();
  }
  _setFormListeners(handler) {
    this.form.setListener("submit", handler);
  }
}