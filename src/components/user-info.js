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
  setName(name) {
    this._name.textContent = name;
    return this;
  }
  setId(id) {
    this._id = id;
    return this;
  }
  setAbout(about) {
    this._about.textContent = about;
    return this;
  }
  setUserInfo(name, about) {
    this.setName(name);
    this.setAbout(about);
    return this;
  }
  setAvatarImage(avatarImage) {
    this._avatarImage.src = avatarImage;
    this._avatarImage.alt = this._name;
    return this;
  }
}

export class UserInfoBuilder {
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
    return new UserInfo(
      this._nameSelector,
      this._aboutSelector,
      this._avatarImageSelector
    );
  }
}
