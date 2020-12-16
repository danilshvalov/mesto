import { notFoundImage } from "../utils/constants.js";

export default class Card {
  constructor(templateSelector, data, handleCardClick) {
    this._handleCardClick = handleCardClick;
    this._data = data;
    this._selectors = {
      elementSelector: ".element",
      titleSelector: ".element__title",
      imageSelector: ".element__image",
      likeButtonSelector: ".element__like-button",
      deleteButtonSelector: ".element__delete-button",
      likeActiveClass: "button_like-active",
    };
    this._template = document
      .querySelector(templateSelector)
      .content.querySelector(this._selectors.elementSelector);
  }
  _getTemplate() {
    return this._template.cloneNode(true);
  }
  generateCard() {
    this._element = this._getTemplate();
    this._title = this._element.querySelector(this._selectors.titleSelector);
    this._image = this._element.querySelector(this._selectors.imageSelector);
    this._likeButton = this._element.querySelector(
      this._selectors.likeButtonSelector
    );
    this._deleteButton = this._element.querySelector(
      this._selectors.deleteButtonSelector
    );

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
    this._likeButton.classList.toggle(this._selectors.likeActiveClass);
  }
  deleteCard() {
    this._element.remove();
  }
  _setListeners() {
    this._deleteButton.addEventListener("click", () => this.deleteCard());
    this._image.addEventListener("click", () =>
      this._handleCardClick(this._title.textContent, this._image.src)
    );
    this._image.addEventListener("error", () => this._errorLoadHandler());
    this._likeButton.addEventListener("click", () => this.toggleLike());
  }
  _errorLoadHandler() {
    this._image.src = notFoundImage;
    this._image.alt = "Not Found";
  }
}
