export default class Form {
  constructor(formSelector, inputSelector = ".field__input", submitButtonSelector = ".button_type_submit") {
    this.form = document.querySelector(formSelector);
    this.inputs = Array.from(this.form.querySelectorAll(inputSelector));
    this.submitButton = this.form.querySelector(submitButtonSelector);
  }
  setSubmitHandler(handler) {
    this.form.addEventListener("submit", handler);
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
}
