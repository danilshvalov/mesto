const selectorsData = {
  formSelector: ".form",
  inputSelector: ".input",
  submitButtonSelector: ".button_type_submit",
  inactiveButtonClass: "button_type_submit-disabled",
  inputErrorClass: "input_error",
  messageErrorClass: "field-error_visible"
};

import Form from "./Form.js";

class Validator {
  constructor(form, selectors) {
    this.form = form;
    this.openButton = document.querySelector(".profile__edit-button");
  }
  _checkValidation(formElement) {
    return !formElement.inputs.some((input) => !input.validity.valid);
  }
  _showInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add("field__input_error");
    errorElement.classList.add("field__input-error_active");
    errorElement.textContent = inputElement.validationMessage;
  }
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove("field__input_error");
    errorElement.classList.remove("field__input-error_active");
    errorElement.textContent = "";
  }
  _toggleButtonState(buttonElement, isValid) {
    if (isValid) {
      buttonElement.classList.remove("button_type_submit-disabled");
    } else {
      buttonElement.classList.add("button_type_submit-disabled");
    }
  }
  _inputValidator(input) {
    input.addEventListener("input", () => {
      this._checkInputValidity(input);

      this._toggleButtonState(this.form.submitButton, this._checkValidation(this.form));
    });
  }
  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(this.form, inputElement);
    } else {
      this._showInputError(this.form, inputElement);
    }
  }
  _onOpenValidator() {
    this.openButton.addEventListener("click", () => {
      this._toggleButtonState(this.form.submitButton, this._checkValidation(this.form));

      this.form.inputs.forEach((input) => {
        this._checkInputValidity(input);
      });
    });
  }
  enableValidation() {
    this.form.inputs.forEach((input) => {
      this._inputValidator(input);
    });
    this._onOpenValidator();
    this.form.setListener("input", () => console.log("hi"));
  }
}

const editForm = new Form(document.querySelector(".popup__edit-profile-form"));

const editValid = new Validator(editForm);
editValid.enableValidation();

const add = new Validator(new Form(document.querySelector(".popup__add-element-form")));
add.enableValidation();
