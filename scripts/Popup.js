export default class Popup {
  constructor(selector) {
    this.popup = document.querySelector(selector);
    this.closeButton = this.popup.querySelector(".popup__close-button");
    this._setEventListeners(() => this.close());
  }
  open() {
    this.popup.classList.add("popup_opened");
    return this;
  }
  close() {
    this.popup.classList.remove("popup_opened");
    return this;
  }
  _setEventListeners(listener) {
    this.closeButton.addEventListener("click", listener);
  }
}