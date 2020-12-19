<<<<<<< HEAD:scripts/index.js
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Card from "./Card.js";
import UserInfo from "./UserInfo.js";
import { enableValidation } from "./FormValidator.js";
import { initialCards, keyCodes, selectors } from "./config.js";
=======
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import { enableValidation } from "../components/FormValidator.js";
import { initialCards, keyCodes, selectors } from "../utils/constants.js";

import "./index.css";
>>>>>>> develop:src/pages/index.js

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

<<<<<<< HEAD:scripts/index.js
=======
const editFormValidator = enableValidation(
  { ...formSelectors, ...keyCodes },
  editPopup.formElement
);

>>>>>>> develop:src/pages/index.js
// AddElementPopup
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

<<<<<<< HEAD:scripts/index.js
const addFormValidator = enableValidation(
  { ...formSelectors, ...keyCodes },
  addPopup.formElement
);

const addButton = document.querySelector(addElementButtonSelector);
addButton.addEventListener("click", () => {
  addFormValidator.clearErrors();
  addPopup.open();
});
=======
const addButton = document.querySelector(addElementButtonSelector);
addButton.addEventListener("click", () => {
  addFormValidator.clearErrors();
  addPopup.open();
});

const addFormValidator = enableValidation(
  { ...formSelectors, ...keyCodes },
  addPopup.formElement
);
>>>>>>> develop:src/pages/index.js

// ImagePopup
const imagePopup = new PopupWithImage(
  {
    ...popupSelectors,
    ...keyCodes,
    popupSelector: imagePopupSelector,
  },
  imagePopupSelectors
);

<<<<<<< HEAD:scripts/index.js
// Инициализация карточек
const elements = document.querySelector(elementsSelector);

function renderCard(data) {
  elements.prepend(
    new Card(
      templateSelector,
      data,
      openCardCallback
    ).generateCard()
  );
}

initialCards.forEach((data) => {
  renderCard(data);
});
=======
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
>>>>>>> develop:src/pages/index.js
