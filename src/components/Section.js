export class Section {
  constructor({ items = [], renderer }, containerSelector) {
    this._renderItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems() {
    this.clear();
    this._renderItems.forEach((item) => this._renderer(item));
  }
  clear() {
    this._container.innerHTML = "";
  }
  addItem(item) {
    this._container.prepend(item);
  }
}
