import { PopupWithFormBuilder } from "../components/popup-with-form.js";
import { PopupWithImage } from "../components/popup-with-image.js";
import { PopupWithMessage } from "../components/popup-with-message.js";
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
  popupsSelectors: {
    editPopupSelector,
    addPopupSelector,
    imagePopupSelector,
    messagePopupSelector,
    confirmPopupSelector,
    changeAvatarPopupSelector,
  },
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

// MessagePopup
// ---------------------------------------------------------------
const messagePopup = new PopupWithMessage(messagePopupSelector);

const errorHandler = (promise, successCallback, failureCallback) => {
  return promise
    .then((data) => successCallback(data))
    .catch((error) => {
      if (error instanceof TypeError) {
        messagePopup.open(
          "Потеряно соединение с сервером, повторите попытку позднее"
        );
      } else if (typeof error === "string") {
        messagePopup.open(error);
      } else {
        messagePopup.open(
          "Непредвиденная ошибка, повторите попытку позднее"
        );
      }
      if (failureCallback) {
        failureCallback();
      }
    });
};
// ---------------------------------------------------------------

// Api
// ---------------------------------------------------------------
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-19/",
  headers: {
    authorization: "68d238d8-54dd-4a8c-9a47-e308386a3ea7",
    "Content-Type": "application/json",
  },
  errorHandler: errorHandler,
});
// ---------------------------------------------------------------

// UserInfo
// ---------------------------------------------------------------
const userInfo = new UserInfoBuilder()
  .setNameSelector(nameSelector)
  .setAboutSelector(aboutSelector)
  .setAvatarImageSelector(avatarImageSelector)
  .build();

errorHandler(api.getProfileData(), (data) => {
  userInfo.setUserInfo(data);
});

// ---------------------------------------------------------------

// Edit Popup
// ---------------------------------------------------------------
const editPopup = new PopupWithFormBuilder()
  .setPopupSelector(editPopupSelector)
  .setSubmitHandler((evt) => {
    evt.preventDefault();
    editPopup.renderLoading(true);
    const { nameInput: name, jobInput: about } = editPopup.getInputValues();
    errorHandler(api.editProfile({ name, about }), ({ name, about }) =>
      userInfo.setName(name).setAbout(about)
    ).finally(() => {
      editPopup.close();
      editPopup.renderLoading(false);
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

// ChangeAvatar Popup
// ---------------------------------------------------------------
const changeAvatarPopup = new PopupWithFormBuilder()
  .setPopupSelector(changeAvatarPopupSelector)
  .setSubmitHandler((evt) => {
    evt.preventDefault();
    const { avatarInput: avatar } = changeAvatarPopup.getInputValues();
    changeAvatarPopup.renderLoading(true);
    errorHandler(api.changeAvatar(avatar), ({ avatar }) => {
      userInfo.setAvatarImage(avatar);
    }).finally(() => {
      changeAvatarPopup.close();
      changeAvatarPopup.renderLoading(false);
    });
  })
  .setSubmitButtonText("Сохранить")
  .build();

const changeAvatarFormValidator = enableValidation(
  formSelectors,
  changeAvatarPopup.formElement
);

const editAvatarButton = document.querySelector(editAvatarButtonSelector);

editAvatarButton.addEventListener("click", () => {
  changeAvatarFormValidator.clearErrors();
  changeAvatarPopup.open();
});
// ---------------------------------------------------------------

// AddCard Popup
// ---------------------------------------------------------------

const addPopup = new PopupWithFormBuilder()
  .setPopupSelector(addPopupSelector)
  .setSubmitHandler((evt) => {
    evt.preventDefault();
    addPopup.renderLoading(true);
    const { titleInput: name, linkInput: link } = addPopup.getInputValues();
    errorHandler(api.addCard({ name, link }), (data) =>
      elementsSection.prependItem(
        createCard(data).enableDeleteButton().getElement()
      )
    ).finally(() => {
      addPopup.renderLoading(false);
      addPopup.close();
    });
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

// Image Popup
// ---------------------------------------------------------------
const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();
// ---------------------------------------------------------------

// Confirm Popup
// ---------------------------------------------------------------
const confirmPopup = new PopupWithFormBuilder()
  .setPopupSelector(confirmPopupSelector)
  .setSubmitButtonText("Да")
  .setSubmitHandler((evt) => {
    evt.preventDefault();
    confirmPopup.renderLoading(true);
    errorHandler(api.deleteCard(confirmPopup._cardElement._id), () =>
      confirmPopup._cardElement._element.remove()
    ).finally(() => {
      confirmPopup.close();
      confirmPopup.renderLoading(false);
    });
  })
  .build();
// ---------------------------------------------------------------

// Cards
// ---------------------------------------------------------------

/* 
  Сначала изменяем кол-вол лайков и значок лайка, чтобы пользователь
  не видел задержки интерфейса из-за запроса на сервер. 
  
  После получения ответа в зависимости от исхода либо обновляем количество
  лайков по данным сервера, либо отменяем операцию и выводим сообщение об ошибке
*/

const createCard = (item) => {
  return new CardBuilder()
    .setTemplateSelector(templateSelector)
    .setData(item)
    .setLikeHandler(function () {
      if (this._isLiked) {
        this.removeLike();
        --this.likeCount;
        errorHandler(
          api.removeLike(this._id),
          (data) => {
            this.likeCount = data.likes.length;
          },
          () => {
            this.setLike();
            ++this.likeCount;
          }
        );
      } else {
        this.setLike();
        ++this.likeCount;
        errorHandler(
          api.setLike(this._id),
          (data) => {
            this.likeCount = data.likes.length;
          },
          () => {
            this.removeLike();
            --this.likeCount;
          }
        );
      }
    })
    .setDeleteHandler(function () {
      confirmPopup._cardElement = this;
      confirmPopup.open();
    })
    .setClickHandler((title, link) => imagePopup.open({ title, link }))
    .build()
    .configureCard();
};

const elementsSection = new Section(
  {
    renderer: (cardData) => {
      elementsSection.prependItem(createCard(cardData).getElement());
    },
  },
  elementsSelector
);
elementsSection.renderItems();

errorHandler(api.getInitialCards(), (data) =>
  data.forEach((cardData) => {
    const card = createCard(cardData);
    if (
      cardData.likes.some((responseUser) => userInfo._id === responseUser._id)
    ) {
      card.setLike();
    }
    if (cardData.owner._id == userInfo._id) {
      card.enableDeleteButton();
    }
    elementsSection.addItem(card.getElement());
  })
);

// ---------------------------------------------------------------
