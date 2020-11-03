function Form(selector) {
    this.body = document.querySelector(selector);
    this.setSubmitHandler = function (handler) {
        this.body.addEventListener("submit", handler);
    };
    this.setProperties = function({name, job}) {
        const {nameInput, jobInput} = this.body;
        nameInput.value = name;
        jobInput.value = job;
    };
}

function Popup(selector) {
    this.popup = document.querySelector(selector);
    this.popup.querySelector(".popup__close-button").addEventListener("click", () => this.close());
    this.open = function () {
        this.popup.classList.add("popup_opened");
    };
    this.close = function () {
        this.popup.classList.remove("popup_opened");
    };
}

function Element(template) {
    this.body = template.cloneNode(true);
    this.title = this.body.querySelector(".element__title");
    this.image = this.body.querySelector(".element__image");
    this.likeButton = this.body.querySelector(".element__like-button");
    this.deleteButton = this.body.querySelector(".element__delete-button");

    this.setListener = function (property, type, callback) {
        this[property].addEventListener(type, callback);
        return this;
    };

    this.setProperties = function ({ title, link }) {
        this.image.src = link;
        this.image.alt = title;
        this.title.textContent = title;
        return this;
    };

    this.render = function (parent) {
        parent.prepend(this.body);
        return this;
    };
}

function createElement(data, template, parent) {
    const element = new Element(template);
    element.setProperties(data)
        .setListener("likeButton", "click", (event) => {
            event.target.classList.toggle("button_like-active");
        }).setListener("deleteButton", "click", (event) => {
            event.target.closest(".element").remove();
        }).setListener("image", "click", (event) => {
            image.open({ title: element.title.textContent, link: element.image.src });
        }).render(parent);
}

const initialCards = [
    {
        title: "Карелия",
        link: "https://source.unsplash.com/pf07Opq5Zx4"
    },
    {
        title: "Камчатка",
        link: "https://source.unsplash.com/Jjs9INF8U8M"
    },
    {
        title: "Судак",
        link: "https://source.unsplash.com/xwL6wxkzBvk"
    },
    {
        title: "Роза Хутор",
        link: "https://source.unsplash.com/P7Ij0GY36sA"
    },
    {
        title: "Остров Ольхон",
        link: "https://source.unsplash.com/y-b_FOmJXdg"
    },
    {
        title: "Карачаевск",
        link: "https://source.unsplash.com/vrPqM2OB9nA"
    }
];

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const templateElement = document.querySelector(".template-element").content.querySelector(".element");
const elements = document.querySelector(".elements");

const userInfo = {
    name: document.querySelector(".profile__name"),
    job: document.querySelector(".profile__about"),
    setUserInfo({ name, job }) {
        this.name.textContent = name;
        this.job.textContent = job;
    },
    getUserInfo() {
        return { name: this.name.textContent.trim(), job: this.job.textContent.trim() };
    }
};

const edit = {
    popup: new Popup(".popup_edit-profile"),
    form: new Form(".popup__edit-profile-form"),
    user: userInfo,
    open() {
        this.form.setProperties(this.user.getUserInfo());
        this.popup.open();
    },
    close() {
        this.popup.close();
    }
};

const add = {
    popup: new Popup(".popup_add-element"),
    form: new Form(".popup__add-element-form"),
    open() {
        this.popup.open();
    },
    close() {
        this.form.body.reset();
        this.popup.close();
    }
};

const image = {
    popup: new Popup(".popup_image-block"),
    image: document.querySelector(".popup__image"),
    description: document.querySelector(".popup__image-description"),
    open({ title, link }) {
        this.image.src = link;
        this.image.alt = title;
        this.description.textContent = title;
        this.popup.open();
    }
};

edit.form.setSubmitHandler(function (evt) {
    evt.preventDefault();

    const { nameInput, jobInput } = edit.form.body;
    edit.user.setUserInfo({ name: nameInput.value, job: jobInput.value });
    edit.close();
});

add.form.setSubmitHandler(function (evt) {
    evt.preventDefault();

    const {titleInput, linkInput} = add.form.body;
    createElement({title: titleInput.value, link: linkInput.value}, templateElement, elements);
    add.close();
});


editButton.addEventListener("click", () => edit.open());
addButton.addEventListener("click", () => add.open());


initialCards.forEach((data) => {
    createElement(data, templateElement, elements);
});



