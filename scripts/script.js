// Popup-логика
function closePopup(popup) {
    popup.classList.remove("popup_opened");
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
}

// Добавление нового элемента

function Element(template) {
    this.element = template.cloneNode(true);
    this.title = this.element.querySelector(".element__title");
    this.image = this.element.querySelector(".element__image");
    this.likeButton = this.element.querySelector(".element__like-button");
    this.deleteButton = this.element.querySelector(".element__delete-button");

    this.configure = function ({ title: text, link }, imagePopup) {
        this.title.textContent = text;
        this.image.src = link;
        this.image.alt = text;
        this.likeButton.addEventListener("click", (event) => {
            event.target.classList.toggle("button_like-active");
        });

        this.deleteButton.addEventListener("click", (event) => {
            event.target.closest(".element").remove();
        });

        this.image.addEventListener("click", (event) => {
            const { src: link, alt: title } = event.target;
            imagePopup.fill({ title, link });
            imagePopup.open();
        });

        return this;
    };

    this.render = function(parent) {
        parent.prepend(this.element);
        return this;
    };
}

// Перемененные
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


const profile = {
    name: document.querySelector(".profile__name"),
    job: document.querySelector(".profile__about"),
    addButton: document.querySelector(".profile__add-button"),
    editButton: document.querySelector(".profile__edit-button"),
    update({ name, job }) {
        profile.name.textContent = name;
        profile.job.textContent = job;
    },
    getFieldsValues() {
        return { name: this.name.textContent.trim(), job: this.job.textContent.trim() };
    }
};

const addElement = {
    popup: document.querySelector(".popup_add-element"),
    form: document.querySelector(".popup__add-element-form"),
    closeButton: document.querySelector(".popup_add-element .popup__close-button"),
    titleInput: document.querySelector(".popup__title-field"),
    imageLinkInput: document.querySelector(".popup__image-link-field"),
    template: document.querySelector(".template-element").content.querySelector(".element"),
    parent: document.querySelector(".elements"),
    open() {
        openPopup(this.popup);
    },
    close() {
        closePopup(this.popup);
        this.form.reset();
    },
    getFieldsValues() {
        return { title: this.titleInput.value, link: this.imageLinkInput.value };
    },
    formSubmitHandler(evt, imagePopup) {
        evt.preventDefault();

        const { title, link } = this.getFieldsValues();
        if (title && link) {
            new Element(this.template).configure({title, link}, imagePopup).render(parent);
        }

        this.close();
    }
};

const editProfile = {
    popup: document.querySelector(".popup_edit-profile"),
    form: document.querySelector(".popup__edit-profile-form"),
    closeButton: document.querySelector(".popup_edit-profile .popup__close-button"),
    nameInput: document.querySelector(".popup__name-field"),
    jobInput: document.querySelector(".popup__job-field"),
    open() {
        this.fill(profile.getFieldsValues());
        openPopup(this.popup);
    },
    close() {
        closePopup(this.popup);
    },
    fill({ name, job }) {
        this.nameInput.value = name;
        this.jobInput.value = job;
    },
    getFieldsValues() {
        return { name: this.nameInput.value, job: this.jobInput.value };
    },
    formSubmitHandler(evt, profile) {
        evt.preventDefault();
        profile.update(editProfile.getFieldsValues());
        this.close();
    }
};

const imagePopup = {
    popup: document.querySelector(".popup_image-block"),
    image: document.querySelector(".popup__image"),
    description: document.querySelector(".popup__image-description"),
    closeButton: document.querySelector(".popup_image-block .popup__close-button"),
    open() {
        openPopup(this.popup);
    },
    close() {
        closePopup(this.popup);
    },
    fill({ title, link }) {
        this.image.src = link;
        this.image.alt = title;
        this.description.textContent = title;
    }
};

// Listeners
profile.editButton.addEventListener("click", () => editProfile.open());
profile.addButton.addEventListener("click", () => addElement.open());

editProfile.form.addEventListener("submit", (evt) => editProfile.formSubmitHandler(evt, profile));
editProfile.closeButton.addEventListener("click", () => editProfile.close());

addElement.form.addEventListener("submit", (evt) => addElement.formSubmitHandler(evt, template, elementsSection, imagePopup));
addElement.closeButton.addEventListener("click", () => addElement.close());

imagePopup.closeButton.addEventListener("click", () => imagePopup.close());
imagePopup.popup.addEventListener("click", (evt) => {
    if (evt.target == imagePopup.popup) {
        imagePopup.close();
    }
});

document.addEventListener("keydown", (evt) => {
    const popup = document.querySelector(".popup_opened");
    if (evt.code === "Escape" && popup) {
        closePopup(popup);
    }
});

// Инициализация карточек
initialCards.forEach((data) => {
    new Element(template).configure(data, imagePopup).render(elementsSection);
});