import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this.image = this.popup.querySelector(".picture__image");
    this.description = this.popup.querySelector(".picture__description");
  }
  open({title, link}) {
    this.image.src = link;
    this.image.alt = title;
    this.description.textContent = title;
    super.open();
  }
}