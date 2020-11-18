export default class Form {
  constructor(form, {inputSelector, submitButtonSelector}) {
    this.form = form;
    this.inputs = Array.from(this.form.querySelectorAll(inputSelector));
    this.submitButton = this.form.querySelector(submitButtonSelector);
  }
  setListener(type, listener) {
    this.form.addEventListener(type, listener);
  }
  setProperties(data) {
    this.inputs.forEach((input) => {
      if (data[input.name]) {
        input.value = data[input.name];
      }
    });
  }
  getProperties() {
    const result = {};
    this.inputs.forEach((input) => result[input.name] = input.value);
    return result;
  }
  reset() {
    this.form.reset();
  }
  querySelector(selector) {
    return this.form.querySelector(selector);
  }
  querySelectorAll(selector) {
    return this.form.querySelectorAll(selector);
  }
  getFormElement() {
    return this.form;
  }
}
