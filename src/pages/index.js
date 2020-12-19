import PopupWithForm from "../components/popup-with-form.js";
import PopupWithImage from "../components/popup-with-image.js";
import Card from "../components/Card.js";
import UserInfo from "../components/user-info.js";
import Section from "../components/Section.js";
import { enableValidation } from "../components/FormValidator.js";
import { initialCards, keyCodes, selectors } from "../utils/constants.js";

import "./index.css";

const {
  formSelectors,
  popupSelectors,
  popupSelectors: { editPopupSelector, addPopupSelector, imagePopupSelector },
  pageButtons: { editProfileButtonSelector, addElementButtonSelector },
  imagePopupSelectors,
  element: { templateSelector },
  elements: { elementsSelector },
  userInfoSelectors: { nameSelector, aboutSelector },
} = selectors;

const userInfo = new UserInfo(nameSelector, aboutSelector);

const editPopup = new PopupWithForm(
  {
    ...popupSelectors,
    ...keyCodes,
    popupSelector: editPopupSelector,
  },
  formSelectors,
  (evt) => {
    evt.preventDefault();
    const { nameInput, jobInput } = editPopup.getInputValues();
    userInfo.setUserInfo(nameInput, jobInput);
    editPopup.close();
  }
);

const editFormValidator = enableValidation(
  { ...formSelectors, ...keyCodes },
  editPopup.formElement
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
  elementsSection.addItem(
    new Card(templateSelector, { title, link }, openCardCallback).generateCard()
  );
  addPopup.close();
};

const addPopup = new PopupWithForm(
  {
    ...popupSelectors,
    ...keyCodes,
    popupSelector: addPopupSelector,
  },
  formSelectors,
  addElementHandler
);

const addButton = document.querySelector(addElementButtonSelector);
addButton.addEventListener("click", () => {
  addFormValidator.clearErrors();
  addPopup.open();
});

const addFormValidator = enableValidation(
  { ...formSelectors, ...keyCodes },
  addPopup.formElement
);

// ImagePopup
const imagePopup = new PopupWithImage(
  {
    ...popupSelectors,
    ...keyCodes,
    popupSelector: imagePopupSelector,
  },
  imagePopupSelectors
);

const elementsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      elementsSection.addItem(
        new Card(templateSelector, item, openCardCallback).generateCard()
      );
    },
  },
  elementsSelector
);
elementsSection.renderItems();
