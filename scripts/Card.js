import {notFoundImage} from "./config.js";

export default class Card {
  constructor(data, templateElement, openCardCallback) {
    this.body = templateElement.cloneNode(true);
    this.title = this.body.querySelector(".element__title");
    this.image = this.body.querySelector(".element__image");
    this.likeButton = this.body.querySelector(".element__like-button");
    this.deleteButton = this.body.querySelector(".element__delete-button");
    this.openCardCallback = openCardCallback;
    this.setProperties(data);
  }
  setProperties({ title, link }) {
    this.image.src = link;
    this.image.alt = title;
    this.title.textContent = title;
  }
  toggleLike() {
    this.likeButton.classList.toggle("button_like-active");
  }
  deleteCard() {
    this.body.remove();
  }
  getElement() {
    this._setListeners();
    return this.body;
  }
  _setListeners() {
    this.deleteButton.addEventListener("click", () => this.deleteCard());
    this.image.addEventListener("click", () => this.openCardCallback(this.title.textContent, this.image.src));
    this.image.addEventListener("error", () => {
      this.image.src = notFoundImage;
      this.image.alt = "Not Found";
    });
    this.likeButton.addEventListener("click", () => this.toggleLike());
  }
}