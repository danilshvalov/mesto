export default class Form {
  constructor(form) {
    this.form = form;
    this.inputs = Array.from(this.form.querySelectorAll(".field__input"));
    this.submitButton = this.form.querySelector(".button_type_submit");
    this.proxy = new Proxy(this.form, () => console.log("hi"));
  }
  setListener(type, listener) {
    this.form.addEventListener(type, listener);
    return this;
  }
  setProperties(data) {
    this.inputs.forEach((input) => {
      if (data[input.name]) {
        input.value = data[input.name];
      }
    });
    return this;
  }
  getProperties() {
    const result = {};
    this.inputs.forEach((input) => result[input.name] = input.value);
    return result;
  }
  reset() {
    this.form.reset();
    return this;
  }
  querySelector(selector) {
    return this.form.querySelector(selector);
  }
  querySelectorAll(selector) {
    return this.form.querySelectorAll(selector);
  }
}
