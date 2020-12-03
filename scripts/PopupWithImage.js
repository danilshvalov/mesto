import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelectors, {imageSelector, descriptionSelector}) {
    super(popupSelectors);
    this.image = this._popup.querySelector(imageSelector);
    this.description = this._popup.querySelector(descriptionSelector);
    this._setEventListeners();
  }
  open({ title, link }) {
    this.image.src = link;
    this.image.alt = title;
    this.description.textContent = title;
    super.open();
  }
  close() {
    super.close();
    setTimeout(() => {
      this.image.src = "";
      this.image.alt = "";
      this.description.textContent = "";
    }, 400); // ожидаем окончание анимации, потом чистим Popup
  }
}
