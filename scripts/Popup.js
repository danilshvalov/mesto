export default class Popup {
  constructor(selector) {
    this.popup = document.querySelector(selector);
    this.closeButton = this.popup.querySelector(".popup__close-button");
    this._escapeKeyHandler = this._escapeKeyHandler.bind(this);
  }
  open() {
    document.addEventListener("keydown", this._escapeKeyHandler);
    this.popup.classList.add("popup_opened");
  }
  close() {
    this.popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._escapeKeyHandler);
  }
  _escapeKeyHandler(evt) {
    if (evt.key == "Escape") {
      this.close();
    }
  }
  _setEventListeners() {
    this.closeButton.addEventListener("click", () => this.close());
    this.popup.addEventListener("click", (evt) => {
      if (evt.target == this.popup || evt.target.classList.contains("popup__container")) {
        this.close();
      }
    });
  }
}