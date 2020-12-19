import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector, escapeKeyCode) {
    super(popupSelector, escapeKeyCode);
    this.image = this._popup.querySelector(".picture__image");
    this.description = this._popup.querySelector(".picture__description");
  }
  open({ title, link }) {
    this.image.src = link;
    this.image.alt = title;
    this.description.textContent = title;
    super.open();
  }
  close() {
    super.close();
    setTimeout(() => this._clear(), this._animationDuration);
  }
  _clear() {
    this.image.src = "";
    this.image.alt = "";
    this.description.textContent = "";
  }
}
