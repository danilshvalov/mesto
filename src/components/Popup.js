export default class Popup {
  constructor({
    popupSelector,
    closeButtonSelector,
    openClass,
    containerClass,
    escapeKeyCode,
  }) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(closeButtonSelector);
    this._escapeKeyHandler = this._handleEscClose.bind(this);
    this._openClass = openClass;
    this._containerClass = containerClass;
    this._escapeKeyCode = escapeKeyCode;
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
