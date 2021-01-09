export const keyCodes = {
  enterKeyCode: "Enter",
  escapeKeyCode: "Escape",
};

export const selectors = {
  userInfoSelectors: {
    nameSelector: ".profile__name",
    aboutSelector: ".profile__about",
    avatarImageSelector: ".profile__avatar",
  },
  formSelectors: {
    formSelector: ".form",
    inputSelector: ".field__input",
    submitButtonSelector: ".button_type_submit",
    inactiveButtonClass: "button_type_submit-disabled",
    inputErrorClass: "field__input_error",
    errorClass: "field__error-message_visible",
  },
  pageButtons: {
    editProfileButtonSelector: ".profile__edit-button",
    addElementButtonSelector: ".profile__add-button",
    editAvatarButtonSelector: ".profile__edit-avatar-button",
  },
  elements: {
    elementsSelector: ".elements",
  },
  elementSelectors: {
    templateSelector: ".template-element",
    elementSelector: ".element",
    titleSelector: ".element__title",
    imageSelector: ".element__image",
    likeCountSelector: ".element__like-count",
    likeButtonSelector: ".element__like-button",
    deleteButtonSelector: ".element__delete-button",
    likeActiveClass: "button_like-active",
  },
  popupSelectors: {
    editPopupSelector: ".popup_edit-profile",
    addPopupSelector: ".popup_add-element",
    imagePopupSelector: ".popup_full-size-image",
  },
};

import notFoundImage from "../images/not-found.svg";

export { notFoundImage };
