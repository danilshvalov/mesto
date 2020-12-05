export const initialCards = [
  {
    title: "Карелия",
    link: "https://source.unsplash.com/pf07Opq5Zx4",
  },
  {
    title: "Камчатка",
    link: "https://source.unsplash.com/Jjs9INF8U8M",
  },
  {
    title: "Судак",
    link: "https://source.unsplash.com/xwL6wxkzBvk",
  },
  {
    title: "Роза Хутор",
    link: "https://source.unsplash.com/P7Ij0GY36sA",
  },
  {
    title: "Остров Ольхон",
    link: "https://source.unsplash.com/y-b_FOmJXdg",
  },
  {
    title: "Карачаевск",
    link: "https://source.unsplash.com/vrPqM2OB9nA",
  },
];

export const selectors = {
  userInfoSelectors: {
    nameSelector: ".profile__name",
    aboutSelector: ".profile__about",
  },
  formSelectors: {
    formSelector: ".form",
    inputSelector: ".field__input",
    submitButtonSelector: ".button_type_submit",
    inactiveButtonClass: "button_type_submit-disabled",
    inputErrorClass: "field__input_error",
    errorClass: "field__error-message_visible",
  },
  popupSelectors: {
    editPopupSelector: ".popup_edit-profile",
    addPopupSelector: ".popup_add-element",
    imagePopupSelector: ".popup_full-size-image",
    closeButtonSelector: ".popup__close-button",
    openClass: "popup_opened",
    containerClass: "popup__container",
  },
  imagePopupSelectors: {
    imageSelector: ".picture__image",
    descriptionSelector: ".picture__description",
  },
  pageButtons: {
    editProfileButtonSelector: ".profile__edit-button",
    addElementButtonSelector: ".profile__add-button",
  },
  elements: {
    elementsSelector: ".elements",
  },
  element: {
    templateSelector: ".template-element",
    elementSelector: ".element",
    titleSelector: ".element__title",
    imageSelector: ".element__image",
    likeButtonSelector: ".element__like-button",
    deleteButtonSelector: ".element__delete-button",
    likeActiveClass: "button_like-active",
  },
};

export const notFoundImage = "images/not-found.svg";
