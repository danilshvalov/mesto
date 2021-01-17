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
  setUserInfo({ name, about, avatar, _id }) {
    this.setName(name);
    this.setAbout(about);
    this.setAvatarImage(avatar);
    this.setId(_id);
    return this;
  }
  setAvatarImage(link) {
    this._avatarImage.src = link;
    this._avatarImage.alt = this._name;
    return this;
  }
}

