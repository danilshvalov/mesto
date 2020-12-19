export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".popup__close-button");
    this._escapeKeyHandler = this._handleEscClose.bind(this);
    this._openClass = "popup_opened";
    this._containerClass = "popup__container";
    this._escapeKeyCode = "Escape";
    this._animationDuration =
      parseFloat(getComputedStyle(this._popup).transitionDuration) * 1000;
  }
  open() {
    document.addEventListener("keydown", (evt) => this._handleEscClose(evt));
    this._popup.classList.add(this._openClass);
  }
  close() {
    this._popup.classList.remove(this._openClass);
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose(evt) {
    if (evt.key === this._escapeKeyCode) {
      this.close();
    }
  }
  _setEventListeners() {
    this._closeButton.addEventListener("click", () => this.close());
    this._popup.addEventListener("click", (evt) => {
      if (
        evt.target == this._popup ||
        evt.target.classList.contains(this._containerClass)
      ) {
        this.close();
      }
    });
  }
}
