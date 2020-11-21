import FormValidator from "./FormValidator.js";

export default function enableValidation(form, selectorsData) {
  const result = new FormValidator(form, selectorsData);
  result.enableValidation();
  return result;
}


