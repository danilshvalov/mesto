import { Popup } from "./Popup.js";
import { selectors } from "../utils/constants.js";

const {
  PopupWithImageSelectors: { imageSelector, descriptionSelector },
} = selectors;

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.image = this._popup.querySelector(imageSelector);
    this.description = this._popup.querySelector(descriptionSelector);
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
