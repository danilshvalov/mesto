const notFoundImage = "images/not-found.svg";

export default class Element {
  constructor(data, templateElement) {
    this.body = templateElement.cloneNode(true);
    this.title = this.body.querySelector(".element__title");
    this.image = this.body.querySelector(".element__image");
    this.image.addEventListener("error", () => {
      this.image.src = notFoundImage;
      this.image.alt = "Not Found";
    });
    this.likeButton = this.body.querySelector(".element__like-button");
    this.deleteButton = this.body.querySelector(".element__delete-button");
    this.setProperties(data);
  }
  setProperties({ title, link}) {
    this.image.src = link;
    this.image.alt = title;
    this.title.textContent = title;
  }
  getElement() {
    return this.body;
  }
}