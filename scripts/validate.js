class Validator {
  constructor(form, {inactiveButtonClass, inputErrorClass, errorClass}) {
    this.form = form;
    this.inactiveButtonClass = inactiveButtonClass;
    this.inputErrorClass = inputErrorClass;
    this.errorClass = errorClass;
  }
  _checkValidation() {
    return !this.form.inputs.some((input) => !input.validity.valid);
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
      this.form.submitButton.classList.remove(this.inactiveButtonClass);
      this.form.submitButton.removeAttribute("disabled");
    } else {
      this.form.submitButton.classList.add(this.inactiveButtonClass);
      this.form.submitButton.setAttribute("disabled", true);
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
    this.form.setListener("input", (evt) => {
      if (this.form.inputs.includes(evt.target)) {
        this._checkInputValidity(evt.target);
      }
      this._toggleButtonState();
    });
    // при попытке отправить форму с неправильными данными тоже показывается предупреждение
    this.form.setListener("keydown", (evt) => {
      if (evt.key == "Enter") {
        this.form.inputs.forEach((input) => this._checkInputValidity(input)); 
      }
    });
    this.form.setListener("open", () => this._toggleButtonState());
    this.form.setListener("close", () => this.form.inputs.forEach((input) => this._hideInputError(input)));
  }
}

export default function enableValidation(forms, {inactiveButtonClass, inputErrorClass, errorClass}) {
  forms.forEach((form) => new Validator(form, {inactiveButtonClass, inputErrorClass, errorClass}).enableValidation());
}


