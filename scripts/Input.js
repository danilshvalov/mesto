export default class Input {
  constructor(input, inputErrorClass, message, messageErrorClass) {
    this.input = input;
    this.inputErrorClass = inputErrorClass;
    this.message = message;
    this.messageErrorClass = messageErrorClass;
  }
  setListener(type, listener) {
    this.input.addEventListener(type, listener);
  }
  showError() {
    console.log(this.input);
    this.input.classList.add(this.inputErrorClass);
    this.message.classList.add(this.messageErrorClass);
    this.message.textContent = this.input.validationMessage;
  }
  hideError() {
    this.input.classList.remove(this.inputErrorClass);
    this.message.classList.remove(this.messageErrorClass);
    this.message.textContent = "";
  }
  isValid() {
    return this.input.validity.valid;
  }
}