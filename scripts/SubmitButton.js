export default class SubmitButton {
  constructor(submitButton, inactiveClass) {
    this.body = submitButton;
    this.inactiveClass = inactiveClass;
  }
  enable() {
    this.body.classList.remove(this.inactiveClass);
  }
  disable() {
    this.body.classList.add(this.inactiveClass);
  }
}

 