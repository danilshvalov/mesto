export default class UserInfo {
  constructor(nameSelector, jobSelector) {
    this.name = document.querySelector(nameSelector);
    this.job = document.querySelector(jobSelector);
  }
  getUserInfo() {
    return {
      name : this.name.textContent.trim(),
      job: this.job.textContent.trim()
    };
  }
  setUserInfo(name, job) {
    this.name.textContent = name;
    this.job.textContent = job;
  }
}