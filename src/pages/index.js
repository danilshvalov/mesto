import { PopupWithForm } from "../components/popup-with-form.js";
import { PopupWithImage } from "../components/popup-with-image.js";
import { Card } from "../components/Card.js";
import { UserInfo } from "../components/user-info.js";
import { Section } from "../components/Section.js";
import { enableValidation } from "../components/FormValidator.js";
import { initialCards, selectors, keyCodes } from "../utils/constants.js";

import "./index.css";

const {
  formSelectors,
  popupSelectors: { editPopupSelector, addPopupSelector, imagePopupSelector },
  pageButtons: { editProfileButtonSelector, addElementButtonSelector },
  elementSelectors,
  elementSelectors: { templateSelector },
  elements: { elementsSelector },
  userInfoSelectors: { nameSelector, aboutSelector },
} = selectors;

const { enterKeyCode, escapeKeyCode } = keyCodes;

const createCard = (item) => {
  return new Card(
    templateSelector,
    item,
    openCardCallback,
    elementSelectors
  ).generateCard();
};

const userInfo = new UserInfo(nameSelector, aboutSelector);

const editPopup = new PopupWithForm(
  editPopupSelector,
  (evt) => {
    evt.preventDefault();
    const { nameInput, jobInput } = editPopup.getInputValues();
    userInfo.setUserInfo(nameInput, jobInput);
    editPopup.close();
  },
  escapeKeyCode
);
editPopup.setEventListeners();

const editFormValidator = enableValidation(
  formSelectors,
  editPopup.formElement,
  enterKeyCode
);

const editButton = document.querySelector(editProfileButtonSelector);
editButton.addEventListener("click", () => {
  const { name: nameInput, job: jobInput } = userInfo.getUserInfo();
  editPopup.setInputValues({ nameInput, jobInput });
  editFormValidator.clearErrors();
  editPopup.open();
});

const openCardCallback = (title, link) => {
  imagePopup.open({ title, link });
};

const addElementHandler = (evt) => {
  evt.preventDefault();
  const { titleInput: title, linkInput: link } = addPopup.getInputValues();
  elementsSection.addItem(createCard({ title, link }));
  addPopup.close();
};

const addPopup = new PopupWithForm(
  addPopupSelector,
  addElementHandler,
  escapeKeyCode
);
addPopup.setEventListeners();

const addButton = document.querySelector(addElementButtonSelector);
addButton.addEventListener("click", () => {
  addFormValidator.clearErrors();
  addPopup.open();
});

const addFormValidator = enableValidation(
  formSelectors,
  addPopup.formElement,
  enterKeyCode
);

const imagePopup = new PopupWithImage(imagePopupSelector, escapeKeyCode);
imagePopup.setEventListeners();

const elementsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      elementsSection.addItem(createCard(item));
    },
  },
  elementsSelector
);
elementsSection.renderItems();
