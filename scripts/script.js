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
    open() {
        openPopup(this.popup);
    },
    close() {
        closePopup(this.popup);
        this.form.reset();
    },
    getFieldsValues() {
        return { title: this.titleInput.value, link: this.imageLinkInput.value };
    }
};

const editProfile = {
    popup: document.querySelector(".popup_edit-profile"),
    form: document.querySelector(".popup__edit-profile-form"),
    closeButton: document.querySelector(".popup_edit-profile .popup__close-button"),
    nameInput: document.querySelector(".popup__name-field"),
    jobInput: document.querySelector(".popup__job-field"),
    open() {
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
        return {name: this.nameInput.value, job: this.jobInput.value};
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
    }
};


// Popup-логика
function closePopup(popup) {
    popup.classList.remove("popup_opened");
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
}

// Form-логика

function editFormSubmitHandler(evt) {
    evt.preventDefault();

    profile.update(editProfile.getFieldsValues());
    editProfile.close();
}

function addFormSubmitHandler(evt) {
    evt.preventDefault();

    const { title, link } = addElement.getFieldsValues();
    if (title && link) {
        renderNewElement({ title, link });
    }

    addElement.close();
}

// Listeners
profile.editButton.addEventListener("click", () => {
    editProfile.fill(profile.getFieldsValues());
    editProfile.open();
});
profile.addButton.addEventListener("click", () => addElement.open());

editProfile.form.addEventListener("submit", editFormSubmitHandler);
editProfile.closeButton.addEventListener("click", () => editProfile.close());

addElement.form.addEventListener("submit", addFormSubmitHandler);
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

// Добавление нового элемента
const templateElement = document.querySelector(".template-element").content.querySelector(".element");
const elementsSection = document.querySelector(".elements");

function createNewElement({ title: text, link }) {
    const newElement = templateElement.cloneNode(true);

    const title = newElement.querySelector(".element__title");
    const image = newElement.querySelector(".element__image");
    const likeButton = newElement.querySelector(".element__like-button");
    const deleteButton = newElement.querySelector(".element__delete-button");

    title.textContent = text;
    image.src = link;
    image.alt = text;

    likeButton.addEventListener("click", (event) => {
        event.target.classList.toggle("button_like-active");
    });

    deleteButton.addEventListener("click", (event) => {
        event.target.closest(".element").remove();
    });

    image.addEventListener("click", (event) => {
        const { image, description } = imagePopup;
        const { src, alt } = event.target;

        image.src = src;
        image.alt = alt;
        description.textContent = alt;

        imagePopup.open();
    });

    return newElement;
}

function renderNewElement(data) {
    elementsSection.prepend(createNewElement(data));
}

// Инициализация карточек

initialCards.forEach((cardData) => {
    renderNewElement(cardData);
});

