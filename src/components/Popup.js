import { selectors, keyCodes } from "../utils/constants.js";

const {
  popupSelectors: { closeButtonSelector, openClass, containerClass },
} = selectors;
const { escapeKeyCode } = keyCodes;

export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(closeButtonSelector);
    this._animationDuration =
      parseFloat(getComputedStyle(this._popup).transitionDuration) * 1000;
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popup.classList.add(openClass);
  }
  close() {
    this._popup.classList.remove(openClass);
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose(evt) {
    if (evt.key === escapeKeyCode) {
      this.close();
    }
  }
  _overlayClickCallback(evt) {
    if (
      evt.target == this._popup ||
      evt.target.classList.contains(containerClass)
    ) {
      this.close();
    }
  }
  setEventListeners() {
    this._closeButton.addEventListener("click", () => this.close());
    this._popup.addEventListener("click", (evt) =>
      this._overlayClickCallback(evt)
    );
  }
}
