export default class Element {
  constructor(data, templateElement) {
    this.body = templateElement.cloneNode(true);
    this.title = this.body.querySelector(".element__title");
    this.image = this.body.querySelector(".element__image");
    this.likeButton = this.body.querySelector(".element__like-button");
    this.deleteButton = this.body.querySelector(".element__delete-button");
    this.setProperties(data);
  }
  setListener(property, type, callback) {
    this[property].addEventListener(type, callback);
    return this;
  }
  setProperties({ title = "Not found", link = "notFound" }) {
    this.image.src = link;
    this.image.alt = title;
    this.title.textContent = title;
    return this;
  }
  getElement() {
    return this.body;
  }
}