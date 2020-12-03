import { notFoundImage } from "./config.js";

export default class Card {
  constructor(selectors, data, templateSelector, openCardCallback) {
    this._templateSelector = templateSelector;
    this._openCardCallback = openCardCallback;
    this._data = data;
    this._selectors = selectors;
  }
  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(this._selectors.elementSelector)
      .cloneNode(true);
  }
  generateCard() {
    this._element = this._getTemplate();
    this._title = this._element.querySelector(this._selectors.titleSelector);
    this._image = this._element.querySelector(this._selectors.imageSelector);
    this._likeButton = this._element.querySelector(this._selectors.likeButtonSelector);
    this._deleteButton = this._element.querySelector(this._selectors.deleteButtonSelector);

    this.setProperties(this._data);

    this._setListeners();

    return this._element;
  }
  setProperties({ title, link }) {
    this._image.src = link;
    this._image.alt = title;
    this._title.textContent = title;
  }
  toggleLike() {
    this._likeButton.classList.toggle("button_like-active");
  }
  deleteCard() {
    this._element.remove();
  }
  getElement() {
    this._setListeners();
    return this.body;
  }
  _setListeners() {
    this._deleteButton.addEventListener("click", () => this.deleteCard());
    this._image.addEventListener("click", () =>
      this._openCardCallback(this._title.textContent, this._image.src)
    );
    this._image.addEventListener("error", () => this._errorLoadHandler());
    this._likeButton.addEventListener("click", () => this.toggleLike());
  }
  _errorLoadHandler() {
    this._image.src = notFoundImage;
    this._image.alt = "Not Found";
  }
}
