import { Popup } from "./Popup.js";
import { selectors } from "../utils/constants.js";

const {
  popupWithFormSelectors: { formSelector, inputSelector, submitButtonSelector },
} = selectors;

export class PopupWithForm extends Popup {
  constructor(
    popupSelector,
    submitHandler,
    submitButtonText,
    loadingText = "Сохранение..."
  ) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelector);
    this._inputs = Array.from(this.formElement.querySelectorAll(inputSelector));
    this._submitButton = this.formElement.querySelector(submitButtonSelector);
    this._submitButtonText = submitButtonText;
    this._submitButton.textContent = submitButtonText;
    this._submitHandler = submitHandler;
    this._loadingText = loadingText;
  }
  getInputValues() {
    const result = {};
    this._inputs.forEach((input) => (result[input.name] = input.value));
    return result;
  }
  setInputValues(data) {
    this._inputs.forEach((input) => {
      if (data[input.name]) {
        input.value = data[input.name];
      }
    });
  }
  close() {
    super.close();
    setTimeout(() => this.formElement.reset(), this._animationDuration);
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._submitHandler);
    return this;
  }
  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = this._loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
  // Добавляем геттер без сеттера, чтобы не было возможности изменить элемент формы
  get formElement() {
    return this._form;
  }
}

export class PopupWithFormBuilder {
  setPopupSelector(selector) {
    this._popupSelector = selector;
    return this;
  }
  setSubmitHandler(handler) {
    this._submitHandler = handler;
    return this;
  }
  setSubmitButtonText(text) {
    this._submitButtonText = text;
    return this;
  }
  setLoadingText(text) {
    this._loadingText = text;
    return this;
  }
  build() {
    return new PopupWithForm(
      this._popupSelector,
      this._submitHandler,
      this._submitButtonText,
      this._loadingText
    ).setEventListeners();
  }
}
