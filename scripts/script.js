import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
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

const editFormHandler = (evt) => {
  evt.preventDefault();
  const { nameInput, jobInput } = editPopup.form.getProperties();
  userInfo.setUserInfo(nameInput, jobInput);
  editPopup.close();
};
const addElementHandler = (evt) => {
  evt.preventDefault();
  const { titleInput: title, linkInput: link } = addPopup.form.getProperties();
  elements.prepend(new Element({ title, link }, templateElement).getElement());
  addPopup.close();
};
const editPopup = new PopupWithForm(".popup_edit-profile", editFormHandler);
const addPopup = new PopupWithForm(".popup_add-element", addElementHandler);
const imagePopup = new PopupWithImage(".popup_image-block");

// Listeners

editPopup.form.setListener("open", () => {
  const { name: nameInput, job: jobInput } = userInfo.getUserInfo();
  editPopup.form.setProperties({ nameInput, jobInput });
});

editButton.addEventListener("click", () => editPopup.open());
addButton.addEventListener("click", () => addPopup.open());

elements.addEventListener("click", (evt) => {
  const target = evt.target;
  if (target.classList.contains("button_type_like")) {
    target.classList.toggle("button_like-active");
  }
  if (target.classList.contains("button_type_delete")) {
    target.closest(".element").remove();
  }
  if (target.classList.contains("element__image")) {
    imagePopup.open({ title: target.alt, link: target.src });
  }
});

// Инициализация карточке
initialCards.forEach((data) => {
  elements.prepend(new Element(data, templateElement).getElement());
});