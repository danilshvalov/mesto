const notFound = "images/not-found.svg";

import Form from "./Form.js";
import Popup from "./Popup.js";
import PopupWithForm from "./PopupWithForm.js";
import Element from "./Element.js";
import UserInfo from "./UserInfo.js";


// Переменные
const initialCards = [
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

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const templateElement = document
  .querySelector(".template-element")
  .content.querySelector(".element");
const elements = document.querySelector(".elements");


const userInfo = new UserInfo(".profile__name", ".profile__about");

function editFormHandler(evt) {
  evt.preventDefault();
  const info = editPopup.form.getProperties();
  userInfo.setUserInfo(info.nameInput, info.jobInput);
  editPopup.close();
}
function addElementHandler(evt) {
  evt.preventDefault();
  const {titleInput: title, linkInput: link} = addPopup.form.getProperties();
  elements.prepend(new Element({title, link}, ".template-element").getElement());
  addPopup.close();
}
const editPopup = new PopupWithForm(".popup_edit-profile", editFormHandler);
const addPopup = new PopupWithForm(".popup_add-element", addElementHandler);




editButton.addEventListener("click", () => {
  const {name: nameInput, job: jobInput} = userInfo.getUserInfo();
  editPopup.form.setProperties({nameInput, jobInput});
  editPopup.open();
});
addButton.addEventListener("click", () => addPopup.open());

// Инициализация карточке
initialCards.forEach((data) => {
  elements.prepend(new Element(data, ".template-element").getElement());
});

elements.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("button_type_like")) {
    evt.target.classList.toggle("button_like-active");
  }
});
elements.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("button_type_delete")) {
    evt.target.closest(".element").remove();
  }
});


