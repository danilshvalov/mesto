import FormValidator from "./FormValidator.js";

export default function enableValidation(selectorsData, formElement) {
  const result = new FormValidator(selectorsData, formElement);
  result.enableValidation();
  return result;
}


