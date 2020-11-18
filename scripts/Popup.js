export default class Popup {
  constructor(selector) {
    this.popup = document.querySelector(selector);
    this.closeButton = this.popup.querySelector(".popup__close-button");
    
    this.popup.addEventListener("click", (evt) => {
      if (evt.target == this.popup || evt.target.classList.contains("popup__container")) {
        this.close();
      }
    });
    this.escapeListener = (evt) => {
      if (evt.key == "Escape") {
        this.close();
      }
    };
    this._setEventListeners(() => this.close());
  }
  open() {
    document.addEventListener("keydown", this.escapeListener);
    this.popup.classList.add("popup_opened");
  }
  close() {
    this.popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this.escapeListener);
  }
  _setEventListeners(listener) {
    this.closeButton.addEventListener("click", listener);
  }
}