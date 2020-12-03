export default class FormValidator {
  constructor({inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}, formElement) {
    this._form = formElement;
    this._inputs = Array.from(this._form.querySelectorAll(inputSelector));
    this._submitButton = this._form.querySelector(submitButtonSelector);
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
  }
  _checkValidation() {
    return !this._inputs.some((input) => !input.validity.valid);
  }
  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }
  _toggleButtonState() {
    if (this._checkValidation()) {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute("disabled");
    } else {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute("disabled", true);
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
    this._form.addEventListener("input", (evt) => {
      if (this._inputs.includes(evt.target)) {
        this._checkInputValidity(evt.target);
      }
      this._toggleButtonState();
    });
    // при попытке отправить форму с неправильными данными тоже показывается предупреждение
    this._form.addEventListener("keydown", (evt) => {
      if (evt.key == "Enter") {
        this._inputs.forEach((input) => this._checkInputValidity(input)); 
      }
    });
    this._form.addEventListener("open", () => this._toggleButtonState());
    // ожидаем окончание анимации закрытия формы, затем сбрасываем ошибки
    this._form.addEventListener("close", () => setTimeout(() => this._inputs.forEach((input) => this._hideInputError(input)), 100));
  }
}