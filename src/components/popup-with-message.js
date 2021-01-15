import { Popup } from "./Popup.js";
import { selectors } from "../utils/constants.js";

const {
  popupWithMessageSelectors: { textElementSelector },
  popupSelectors: { openClass },
} = selectors;

export class PopupWithMessage extends Popup {
  constructor(popupSelector, time = 7000) {
    super(popupSelector);
    super.setEventListeners();
    this._textElement = this._popup.querySelector(textElementSelector);
    this._durationTime = time;
  }
  open(text) {
    clearTimeout(this._timerId);
    this._textElement.textContent = text;
    this._timerId = setTimeout(() => this._closeCallback(), this._durationTime);
    if (!this._popup.classList.contains(openClass)) {
      super.open();
    }
  }
  _closeCallback() {
    if (this._popup.classList.contains(openClass)) {
      this.close();
    }
  }
}
