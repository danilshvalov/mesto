import { PopupWithFormBuilder } from "../components/popup-with-form.js";
import { PopupWithImage } from "../components/popup-with-image.js";
import { CardBuilder } from "../components/Card.js";
import { UserInfoBuilder } from "../components/user-info.js";
import { Section } from "../components/Section.js";
import { enableValidation } from "../components/FormValidator.js";
import { selectors } from "../utils/constants.js";
import { Api } from "../components/Api.js";

import "./index.css";

// Constants
// ---------------------------------------------------------------
const {
  formSelectors,
  popupSelectors: { editPopupSelector, addPopupSelector, imagePopupSelector },
  pageButtons: {
    editProfileButtonSelector,
    addElementButtonSelector,
    editAvatarButtonSelector,
  },
  elementSelectors: { templateSelector },
  elements: { elementsSelector },
  userInfoSelectors: { nameSelector, aboutSelector, avatarImageSelector },
} = selectors;

// ---------------------------------------------------------------

// Api
// ---------------------------------------------------------------
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-19/",
  headers: {
    authorization: "68d238d8-54dd-4a8c-9a47-e308386a3ea7",
    "Content-Type": "application/json",
  },
});
// ---------------------------------------------------------------

// UserInfo
// ---------------------------------------------------------------
const userInfo = new UserInfoBuilder()
  .setNameSelector(nameSelector)
  .setAboutSelector(aboutSelector)
  .setAvatarImageSelector(avatarImageSelector)
  .build();

api.getProfileData().then(({ name, about, avatar, _id }) => {
  userInfo.setName(name).setAbout(about).setAvatarImage(avatar).setId(_id);
});

// ---------------------------------------------------------------

// TODO DEV

const editAvatarButton = document.querySelector(editAvatarButtonSelector);

editAvatarButton.addEventListener("click", () => console.log("hi"));

// EditPopup
// ---------------------------------------------------------------
const editPopup = new PopupWithFormBuilder()
  .setPopupSelector(editPopupSelector)
  .setSubmitHandler((evt) => {
    evt.preventDefault();
    editPopup.renderLoading(true);
    const { nameInput: name, jobInput: about } = editPopup.getInputValues();
    api
      .editProfile({ name, about })
      .then(({ name, about }) => userInfo.setName(name).setAbout(about))
      .finally(() => {
        editPopup.renderLoading(false);
        editPopup.close();
      });
  })
  .setSubmitButtonText("Сохранить")
  .build();

const editFormValidator = enableValidation(
  formSelectors,
  editPopup.formElement
);

const editButton = document.querySelector(editProfileButtonSelector);
editButton.addEventListener("click", () => {
  const { name: nameInput, job: jobInput } = userInfo.getUserInfo();
  editPopup.setInputValues({ nameInput, jobInput });
  editFormValidator.clearErrors();
  editPopup.open();
});
// ---------------------------------------------------------------

// AddCard Popup
// ---------------------------------------------------------------

const addPopup = new PopupWithFormBuilder()
  .setPopupSelector(addPopupSelector)
  .setSubmitHandler((evt) => {
    evt.preventDefault();
    const { titleInput: name, linkInput: link } = addPopup.getInputValues();
    api
      .addCard({ name, link })
      .then((data) => elementsSection.addItem(createCard(data)));
    addPopup.close();
  })
  .setSubmitButtonText("Добавить")
  .build();

const addFormValidator = enableValidation(formSelectors, addPopup.formElement);

const addButton = document.querySelector(addElementButtonSelector);
addButton.addEventListener("click", () => {
  addFormValidator.clearErrors();
  addPopup.open();
});

// ---------------------------------------------------------------

// imagePopup
// ---------------------------------------------------------------
const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();
// ---------------------------------------------------------------

// Cards
// ---------------------------------------------------------------
const openCardCallback = (title, link) => {
  imagePopup.open({ title, link });
};

function deleteCardCallback() {
  api.deleteCard(this._id).then(() => this._element.remove());
}

function toggleLikeCallback() {
  if (this._isLiked) {
    api.removeLike(this._id).then((data) => {
      this.removeLike();
      this.likeCount = data.likes.length;
    });
  } else {
    api.setLike(this._id).then((data) => {
      this.setLike();
      this.likeCount = data.likes.length;
    });
  }
}

const createCard = (item) => {
  return new CardBuilder()
    .setTemplateSelector(templateSelector)
    .setData(item)
    .setLikeHandler(toggleLikeCallback)
    .setDeleteHandler(deleteCardCallback)
    .setClickHandler(openCardCallback)
    .build()
    .configureCard();
};

const elementsSection = new Section(
  {
    renderer: (cardData) => {
      elementsSection.addItem(createCard(cardData).getElement());
    },
  },
  elementsSelector
);
elementsSection.renderItems();

api.getInitialCards().then((data) =>
  data.forEach((cardData) => {
    const card = createCard(cardData);

    if (cardData.likes.some((responseUser) => userInfo.id == responseUser.id)) {
      card.setLike();
    }
    elementsSection.addItem(card.getElement());
  })
);

// ---------------------------------------------------------------

/* 

Токен: 68d238d8-54dd-4a8c-9a47-e308386a3ea7
Идентификатор группы: cohort-19

*/
