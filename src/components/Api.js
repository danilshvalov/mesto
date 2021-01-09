export class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl_ = baseUrl;
    this.headers_ = headers;
  }

  getInitialCards() {
    return fetch(new URL("cards", this.baseUrl_), {
      method: "GET",
      headers: this.headers_,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          `При запросе карточек возникла ошибка. Код ошибки: ${res.status}`
        );
      })
      .catch((error) => alert(error));
  }

  addCard({ name, link }) {
    return fetch(new URL("cards", this.baseUrl_), {
      method: "POST",
      headers: this.headers_,
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          `При добавлении карточки возникла ошибка. Код ошибки: ${res.status}`
        );
      })
      .catch((error) => alert(error));
  }

  deleteCard(id) {
    return fetch(new URL(`cardfs/${id}`, this.baseUrl_), {
      method: "DELETE",
      headers: this.headers_,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          `При удалении карточки возникла ошибка. Код ошибки: ${res.status}`
        );
      })
      .catch((error) => {
        // Если ошибка fetch = выводим сообщение о проблемах сети
        if (error instanceof TypeError) {
          alert("Потеряно соединение с сервером, повторите попытку позднее");
        } else {
          alert(error);
        }
      });
  }

  setLike(id) {
    return fetch(new URL(`cards/likes/${id}`, this.baseUrl_), {
      method: "PUT",
      headers: this.headers_,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          `При попытке поставить like возникла ошибка. Код ошибки: ${res.status}`
        );
      })
      .catch((error) => alert(error));
  }

  removeLike(id) {
    return fetch(new URL(`cards/likes/${id}`, this.baseUrl_), {
      method: "DELETE",
      headers: this.headers_,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          `При попытке убрать like возникла ошибка. Код ошибки: ${res.status}`
        );
      })
      .catch((error) => alert(error));
  }

  getProfileData() {
    return fetch(new URL("users/me", this.baseUrl_), {
      headers: this.headers_,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          `При получении данных профиля возникла ошибка. Код ошибки: ${res.status}`
        );
      })
      .catch((error) => alert(error));
  }

  editProfile({ name, about }) {
    return fetch(new URL("users/me", this.baseUrl_), {
      method: "PATCH",
      headers: this.headers_,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          `При редактировании профиля возникла ошибка. Код ошибки: ${res.status}`
        );
      })
      .catch((error) => alert(error));
  }

  // changeAvatar(link) {
  //   return fetch(URL(this.baseUrl_, "users/me"), {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: name,
  //       about: about,
  //     }),
  //   }).then((res) => {
  //     if (res.ok) {
  //       return res.json();
  //     }
  //     return Promise.reject(
  //       `При редактировании профиля возникла ошибка. Код ошибки: ${res.status}`
  //     );
  //   });
  // }

  // другие методы работы с API
}
