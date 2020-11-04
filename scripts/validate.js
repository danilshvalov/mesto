const selectorsData = {
  formSelector: ".form",
  inputSelector: ".input",
  submitButtonSelector: ".button_type_submit",
  inactiveButtonClass: "button_type_submit-disabled",
  inputErrorClass: "input_error",
  errorClass: "field-error_visible",
};

function validate() {
  if (this.validity.valid) {
    this.classList.remove(this.inputErrorClass);
    this.errorSpan.classList.remove(this.errorClass);
    this.errorSpan.textContent = "";
    if (this.parent.every((input) => input.validity.valid)) {
      this.submitButton.classList.remove(this.inactiveButtonClass);
    }
  } else {
    this.classList.add(this.inputErrorClass);
    this.errorSpan.classList.add(this.errorClass);
    this.errorSpan.textContent = this.validationMessage;
    this.submitButton.classList.add(this.inactiveButtonClass);
  }
}


function enableValidation(data) {
  const forms = getElements(data);

  forms.forEach((form) => {
    const inputs = modifyInputs(form, data);
    inputs.forEach((input) => {
      if (!input.validity.valid) {
        input.submitButton.classList.add(input.inactiveButtonClass);
      }
      input.addEventListener("input", validate);
    });
  });
}

function getElements({ formSelector, inputSelector, submitButtonSelector }) {
  const forms = Array.from(document.querySelectorAll(formSelector));
  return forms.map((form) => {
    const submitButton = form.querySelector(submitButtonSelector);
    const inputs = Array.from(form.querySelectorAll(inputSelector));
    return { form, inputs, submitButton };
  });
}

function modifyInputs({ inputs, submitButton }, { inactiveButtonClass, inputErrorClass, errorClass }) {
  return inputs.map((input) => {
    input.submitButton = submitButton;
    input.inactiveButtonClass = inactiveButtonClass;
    input.inputErrorClass = inputErrorClass;
    input.errorSpan = input.nextElementSibling;
    input.errorClass = errorClass;
    input.parent = inputs;
    return input;
  });
}

enableValidation(selectorsData);
