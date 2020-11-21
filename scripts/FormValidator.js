export default class FormValidator {
  constructor(form, {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {
    this.form = form;
    this.inputs = Array.from(this.form.querySelectorAll(inputSelector));
    this.submitButton = this.form.querySelector(submitButtonSelector);
    this.inactiveButtonClass = inactiveButtonClass;
    this.inputErrorClass = inputErrorClass;
    this.errorClass = errorClass;
  }
  _checkValidation() {
    return !this.inputs.some((input) => !input.validity.valid);
  }
  _showInputError(inputElement) {
    const errorElement = this.form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this.inputErrorClass);
    errorElement.classList.add(this.errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  _hideInputError(inputElement) {
    const errorElement = this.form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this.inputErrorClass);
    errorElement.classList.remove(this.errorClass);
    errorElement.textContent = "";
  }
  _toggleButtonState() {
    if (this._checkValidation()) {
      this.submitButton.classList.remove(this.inactiveButtonClass);
      this.submitButton.removeAttribute("disabled");
    } else {
      this.submitButton.classList.add(this.inactiveButtonClass);
      this.submitButton.setAttribute("disabled", true);
    }
  }
  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }
  enableValidation() {
    this.form.addEventListener("input", (evt) => {
      if (this.inputs.includes(evt.target)) {
        this._checkInputValidity(evt.target);
      }
      this._toggleButtonState();
    });
    // при попытке отправить форму с неправильными данными тоже показывается предупреждение
    this.form.addEventListener("keydown", (evt) => {
      if (evt.key == "Enter") {
        this.inputs.forEach((input) => this._checkInputValidity(input)); 
      }
    });
    this.form.addEventListener("open", () => this._toggleButtonState());
    // ожидаем окончание анимации закрытия формы, затем сбрасываем ошибки
    this.form.addEventListener("close", () => setTimeout(() => this.inputs.forEach((input) => this._hideInputError(input)), 100));
  }
}