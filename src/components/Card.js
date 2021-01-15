import { notFoundImage, selectors } from "../utils/constants.js";

const {
  elementSelectors: {
    elementSelector,
    titleSelector,
    imageSelector,
    likeActiveClass,
    likeButtonSelector,
    deleteButtonSelector,
    likeCountSelector,
    hiddenButtonClass,
  },
} = selectors;

export class Card {
  constructor(
    templateSelector,
    data,
    { clickHandler, deleteHandler, likeHandler }
  ) {
    this._clickHandler = clickHandler.bind(this);
    this._deleteHandler = deleteHandler.bind(this);
    this._likeHandler = likeHandler.bind(this);
    this._errorLoadHandler = this._errorLoadHandler.bind(this);
    this._data = data;
    this._isLiked = false;
    this._template = document
      .querySelector(templateSelector)
      .content.querySelector(elementSelector);
  }
  _getTemplate() {
    return this._template.cloneNode(true);
  }
  configureCard() {
    this._element = this._getTemplate();
    this._title = this._element.querySelector(titleSelector);
    this._image = this._element.querySelector(imageSelector);
    this._likeButton = this._element.querySelector(likeButtonSelector);
    this._deleteButton = this._element.querySelector(deleteButtonSelector);
    this._likeCountElement = this._element.querySelector(likeCountSelector);
    this._id = this._data._id;
    this.setProperties(this._data);
    this._setListeners();
    return this;
  }
  getElement() {
    return this._element;
  }
  get likeCount() {
    return this._likeCountElement.textContent;
  }
  set likeCount(count) {
    this._likeCountElement.textContent = count;
  }
  setProperties({ name, link, likes }) {
    this._image.src = link;
    this._image.alt = name;
    this._title.textContent = name;
    this._likeCountElement.textContent = likes.length;
    return this;
  }
  setLike() {
    this._likeButton.classList.add(likeActiveClass);
    this._isLiked = true;
  }
  removeLike() {
    this._likeButton.classList.remove(likeActiveClass);
    this._isLiked = false;
  }
  enableDeleteButton() {
    this._deleteButton.classList.remove(hiddenButtonClass);
    this._deleteButton.addEventListener("click", this._deleteHandler);
    return this;
  }
  disableDeleteButton() {
    this._deleteButton.classList.add(hiddenButtonClass);
    this._deleteButton.removeEventListener("click", this._deleteHandler);
    return this;
  }
  _setListeners() {
    this._image.addEventListener("click", () =>
      this._clickHandler(this._title.textContent, this._image.src)
    );
    this._image.addEventListener("error", this._errorLoadHandler);
    this._likeButton.addEventListener("click", this._likeHandler);
  }
  _errorLoadHandler() {
    this._image.src = notFoundImage;
    this._image.alt = "Not Found";
  }
}

export class CardBuilder {
  setTemplateSelector(selector) {
    this._templateSelector = selector;
    return this;
  }
  setClickHandler(handler) {
    this._clickHandler = handler;
    return this;
  }
  setDeleteHandler(handler) {
    this._deleteHandler = handler;
    return this;
  }
  setLikeHandler(handler) {
    this._likeHandler = handler;
    return this;
  }
  setData(data) {
    this._data = data;
    return this;
  }
  build() {
    return new Card(this._templateSelector, this._data, {
      clickHandler: this._clickHandler,
      deleteHandler: this._deleteHandler,
      likeHandler: this._likeHandler,
    });
  }
}
