export class UserInfo {
  constructor(nameSelector, jobSelector, avatarImageSelector, id) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(jobSelector);
    this._avatarImage = document.querySelector(avatarImageSelector);
    this._id = id;
  }
  getUserInfo() {
    return {
      name: this._name.textContent.trim(),
      job: this._about.textContent.trim(),
    };
  }
  // геттер без сеттера для запрета изменения
  get id() {
    return this._id;
  }
  setUserInfo(name, about) {
    if (name) {
      this._name.textContent = name;
    }
    if (about) {
      this._about.textContent = about;
    }
    return this;
  }
  setAvatarImage(avatarImage) {
    if (avatarImage) {
      this._avatarImage.src = avatarImage;
      this._avatarImage.alt = this._name;
    }
    return this;
  }
}

export class UserInfoBuilder {
  setId(id) {
    this._id = id;
    return this;
  }
  setName(name) {
    this._name = name;
    return this;
  }
  setAbout(about) {
    this._about = about;
    return this;
  }
  setAvatarImage(image) {
    this._avatarImage = image;
    return this;
  }
  setNameSelector(selector) {
    this._nameSelector = selector;
    return this;
  }
  setAboutSelector(selector) {
    this._aboutSelector = selector;
    return this;
  }
  setAvatarImageSelector(selector) {
    this._avatarImageSelector = selector;
    return this;
  }
  build() {
    const userInfo = new UserInfo(
      this._nameSelector,
      this._aboutSelector,
      this._avatarImageSelector,
      this._id
    );
    userInfo
      .setAvatarImage(this._avatarImage)
      .setUserInfo(this._name, this._about);
    return userInfo;
  }
}
