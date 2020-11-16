const selectorsData = {
  formSelector: ".form",
  inputSelector: ".input",
  submitButtonSelector: ".button_type_submit",
  inactiveButtonClass: "button_type_submit-disabled",
  inputErrorClass: "input_error",
  messageErrorClass: "field-error_visible"
};

function Input({ input, inputErrorClass, message, messageErrorClass }) {
  this.input = input;
  this.inputErrorClass = inputErrorClass;
  this.message = message;
  this.messageErrorClass = messageErrorClass;

  this.showMessage = function () {
    this.input.classList.add(this.inputErrorClass);
    this.message.classList.add(this.messageErrorClass);
    this.message.textContent = this.input.validationMessage;
  };
  this.hideMessage = function () {
    this.input.classList.remove(this.inputErrorClass);
    this.message.classList.remove(this.messageErrorClass);
    this.message.textContent = "";
  };
  this.setListener = function (type, listener) {
    this.input.addEventListener(type, listener);
  };
  this.isValid = function () {
    return this.input.validity.valid;
  };
  this.hasErrorClass = function () {
    return this.input.classList.contains(this.inputErrorClass);
  };
}

function SubmitButton({ submitButton, errorClass }) {
  this.submitButton = submitButton;
  this.errorClass = errorClass;

  this.disable = function () {
    this.submitButton.classList.add(this.errorClass);
  };
  this.enable = function () {
    this.submitButton.classList.remove(this.errorClass);
  };
  this.hasErrorClass = function () {
    return this.submitButton.classList.contains(this.errorClass);
  };
  this.setListener = function (type, listener) {
    this.submitButton.addEventListener(type, listener);
  };
}

function Form(form, { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, messageErrorClass }) {
  this.form = form;
  this.inputs = Array.from(this.form.querySelectorAll(inputSelector)).map((input) => {
    const message = input.nextElementSibling;
    return new Input({ input, inputErrorClass, message, messageErrorClass });
  });
  this.submitButton = new SubmitButton({ submitButton: this.form.querySelector(submitButtonSelector), errorClass: inactiveButtonClass });

  this.setListener = function (type, listener) {
    this.form.addEventListener(type, listener);
  };
  this.isValid = function () {
    return !this.inputs.some((input) => !input.isValid());
  };
}

function enableValidation(data) {

  const { formSelector } = data;
  const forms = document.querySelectorAll(formSelector);
  forms.forEach((info) => {
    const form = new Form(info, data);

    const inputListener = (input) => {
      if (!input.isValid()) {
        input.showMessage();
      } else if (input.isValid() && input.hasErrorClass()) {
        input.hideMessage();
      }
    };

    const formListener = (form) => {
      if (!form.isValid() && !form.submitButton.hasErrorClass()) {
        form.submitButton.disable();
      } else if (form.isValid() && form.submitButton.hasErrorClass()) {
        form.submitButton.enable();
      }
    };

    /* 

    mutationObserver используется корректной работы ошибок полей: Если поля формы изменения профиля сделать
    невалидными, а затем закрыть и снова открыть форму изменения профиля, то, не смотря на валидность полей,
    так как не будет произведен ввод, поля будут подсвечены как некорректные.

    Долго ломал голову, что с этим делать. Хотелось сохранить независимость функции, поэтому выбрал
    этот вариант. Отслеживание кнопки не вариант, т.к. Popup можно закрыть с помощью ESC и нажатия
    вне области формы
       
    Демонстрация проблемы: https://yadi.sk/i/bO0d35rVdg56MQ    

    */

    const mutationObserver = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (getComputedStyle(mutation.target, null).visibility == "visible") {
          form.inputs.forEach((input) => input.hideMessage());
          form.submitButton.enable();
        }
      });
    });

    const popup = form.form.parentElement.parentElement;

    mutationObserver.observe(popup, {
      attributes: true,
    });

    // Установка listeners

    form.submitButton.setListener("click", () => formListener(form));
    form.setListener("input", () => formListener(form));
    form.inputs.forEach((input) => {
      form.submitButton.setListener("click", () => inputListener(input));
      input.setListener("input", () => inputListener(input));
    });
  });
}

enableValidation(selectorsData);
