export class Api {
  constructor({ baseUrl, headers, errorHandler }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._errorHandler = errorHandler;
  }

  sendRequest({ path, method = "GET", body, errorMessage }) {
    return fetch(new URL(path, this._baseUrl), {
      method: method,
      headers: this._headers,
      body: body,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`${errorMessage}. Код ошибки: ${res.status}`);
    });
  }

  getInitialCards() {
    return this.sendRequest({
      path: "cards",
      errorMessage: "При запросе карточек произошла ошибка",
    });
  }

  addCard({ name, link }) {
    return this.sendRequest({
      path: "cards",
      method: "POST",
      body: JSON.stringify({
        name,
        link,
      }),
      errorMessage: "При добавлении карточки произошла ошибка",
    });
  }

  deleteCard(id) {
    return this.sendRequest({
      path: `cards/${id}`,
      method: "DELETE",
      errorMessage: "При удалении карточки произошла ошибка",
    });
  }

  setLike(id) {
    return this.sendRequest({
      path: `cards/likes/${id}`,
      method: "PUT",
      errorMessage: "При попытке поставить like произошла ошибка",
    });
  }

  removeLike(id) {
    return this.sendRequest({
      path: `cards/likes/${id}`,
      method: "DELETE",
      errorMessage: "При попытке убрать like произошла ошибка",
    });
  }

  getProfileData() {
    return this.sendRequest({
      path: "users/me",
      errorMessage: "При получении данных профиля произошла ошибка",
    });
  }

  editProfile({ name, about }) {
    return this.sendRequest({
      path: "users/me",
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        about: about,
      }),
      errorMessage: "При редактировании профиля произошла ошибка",
    });
  }

  changeAvatar(link) {
    return this.sendRequest({
      path: "users/me/avatar",
      method: "PATCH",
      body: JSON.stringify({
        avatar: link,
      }),
      errorMessage: "При обновлении аватара произошла ошибка",
    });
  }
}
