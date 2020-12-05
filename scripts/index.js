import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Card from "./Card.js";
import UserInfo from "./UserInfo.js";
import { enableValidation } from "./FormValidator.js";
import { initialCards, selectors } from "./config.js";

const {
  formSelectors,
  popupSelectors,
  popupSelectors: { editPopupSelector, addPopupSelector, imagePopupSelector },
  pageButtons: { editProfileButtonSelector, addElementButtonSelector },
  imagePopupSelectors,
  element: elementSelectors,
  element: { templateSelector },
  elements: { elementsSelector },
  userInfoSelectors: { nameSelector, aboutSelector },
} = selectors;

// UserInfo
const userInfo = new UserInfo(nameSelector, aboutSelector);

// EditProfilePopup
const editFormHandler = (evt) => {
  evt.preventDefault();
  const { nameInput, jobInput } = editPopup.getInputValues();
  userInfo.setUserInfo(nameInput, jobInput);
  editPopup.close();
};

const editPopup = new PopupWithForm(
  {
    ...popupSelectors,
    popupSelector: editPopupSelector,
  },
  formSelectors,
  editFormHandler
);

const editButton = document.querySelector(editProfileButtonSelector);
editButton.addEventListener("click", () => {
  const { name: nameInput, job: jobInput } = userInfo.getUserInfo();
  editPopup.setInputValues({ nameInput, jobInput });
  editPopup.open();
});

const editFormValidator = enableValidation(
  formSelectors,
  editPopup.formElement
);

// AddElementPopup
const openCardCallback = (title, link) => {
  imagePopup.open({ title, link });
};

const addElementHandler = (evt) => {
  evt.preventDefault();
  const { titleInput: title, linkInput: link } = addPopup.getInputValues();
  renderCard({ title, link });
  addPopup.close();
};

const addPopup = new PopupWithForm(
  {
    ...popupSelectors,
    popupSelector: addPopupSelector,
  },
  formSelectors,
  addElementHandler
);

const addButton = document.querySelector(addElementButtonSelector);
addButton.addEventListener("click", () => addPopup.open());

const addFormValidator = enableValidation(formSelectors, addPopup.formElement);

// ImagePopup
const imagePopup = new PopupWithImage(
  {
    ...popupSelectors,
    popupSelector: imagePopupSelector,
  },
  imagePopupSelectors
);

// Инициализация карточек
const elements = document.querySelector(elementsSelector);

function renderCard(data) {
  elements.prepend(
    new Card(
      elementSelectors,
      templateSelector,
      data,
      openCardCallback
    ).generateCard()
  );
}

initialCards.forEach((data) => {
  renderCard(data);
});
