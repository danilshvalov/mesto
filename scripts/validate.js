const selectorsData = {
  formSelector: ".form",
  inputSelector: ".field__input",
  submitButtonSelector: ".button_type_submit",
  inactiveButtonClass: "button_type_submit-disabled",
  inputErrorClass: "field__input-error",
  messageErrorClass: "field__input-error_active"
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
      buttonElement.removeAttribute("disabled");
    } else {
      buttonElement.classList.add("button_type_submit-disabled");
      buttonElement.setAttribute("disabled", true);
    }
  }
  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(this.form, inputElement);
    } else {
      this._showInputError(this.form, inputElement);
    }
  }
  enableValidation() {
    this.form.setListener("input", (evt) => {
      if (evt.target.classList.contains("field__input")) {
        this._checkInputValidity(evt.target);
      }
      this._toggleButtonState(this.form.submitButton, this._checkValidation(this.form));
    });
    this.form.setListener("open", () => this._toggleButtonState(this.form.submitButton, this._checkValidation(this.form)));
    this.form.setListener("close", () => this.form.inputs.forEach((input) => {
      this._hideInputError(this.form, input);
    })
    );
  }
}

const editFormValidator = new Validator(new Form(document.querySelector(".popup__edit-profile-form")));
const addElementValidator = new Validator(new Form(document.querySelector(".popup__add-element-form")));

editFormValidator.enableValidation();
addElementValidator.enableValidation();
