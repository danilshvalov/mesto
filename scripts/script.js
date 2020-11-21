import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Card from "./Card.js";
import UserInfo from "./UserInfo.js";
import enableValidation from "./validate.js";
import { initialCards, selectorsData } from "./config.js";


// UserInfo
const userInfo = new UserInfo(".profile__name", ".profile__about");


// EditProfilePopup
const editFormHandler = (evt) => {
  evt.preventDefault();
  const { nameInput, jobInput } = editPopup.getInputValues();
  userInfo.setUserInfo(nameInput, jobInput);
  editPopup.close();
};

const editPopup = new PopupWithForm(".popup_edit-profile", selectorsData, editFormHandler);
editPopup._setEventListeners();

const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", () => {
  const { name: nameInput, job: jobInput } = userInfo.getUserInfo();
  editPopup.setInputValues({ nameInput, jobInput });
  editPopup.open();
});

const editFormValidator = enableValidation(editPopup.form, selectorsData);


// AddElementPopup
const openCardCallback = (title, link) => {
  imagePopup.open({ title, link });
};

const addElementHandler = (evt) => {
  evt.preventDefault();
  const { titleInput: title, linkInput: link } = addPopup.getInputValues();
  elements.prepend(new Card({ title, link }, templateElement, openCardCallback).getElement());
  addPopup.close();
};

const addPopup = new PopupWithForm(".popup_add-element", selectorsData, addElementHandler);
addPopup._setEventListeners();

const addButton = document.querySelector(".profile__add-button");
addButton.addEventListener("click", () => addPopup.open());

const addFormValidator = enableValidation(addPopup.form, selectorsData);


// ImagePopup
const imagePopup = new PopupWithImage(".popup_full-size-image");
imagePopup._setEventListeners();


// Инициализация карточек
const templateElement = document
  .querySelector(".template-element")
  .content.querySelector(".element");
const elements = document.querySelector(".elements");

initialCards.forEach((data) => {
  elements.prepend(new Card(data, templateElement, openCardCallback).getElement());
});
