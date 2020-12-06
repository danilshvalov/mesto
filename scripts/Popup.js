export default class Popup {
  constructor({
    popupSelector,
    closeButtonSelector,
    openClass,
    containerClass,
    escapeKeyCode
  }) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(closeButtonSelector);
    this._escapeKeyHandler = this._escapeKeyHandler.bind(this);
    this._openClass = openClass;
    this._containerClass = containerClass;
    this._escapeKeyCode = escapeKeyCode;
  }
  open() {
    document.addEventListener("keydown", this._escapeKeyHandler);
    this._popup.classList.add(this._openClass);
  }
  close() {
    this._popup.classList.remove(this._openClass);
    document.removeEventListener("keydown", this._escapeKeyHandler);
  }
  _escapeKeyHandler(evt) {
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
