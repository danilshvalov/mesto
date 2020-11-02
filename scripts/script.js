const initialCards = [
    {
        name: "Карелия",
        link: "https://source.unsplash.com/pf07Opq5Zx4"
    },
    {
        name: "Камчатка",
        link: "https://source.unsplash.com/Jjs9INF8U8M"
    },
    {
        name: "Судак",
        link: "https://source.unsplash.com/xwL6wxkzBvk"
    },
    {
        name: "Роза Хутор",
        link: "https://source.unsplash.com/P7Ij0GY36sA"
    },
    {
        name: "Остров Ольхон",
        link: "https://source.unsplash.com/y-b_FOmJXdg"
    },
    {
        name: "Карачаевск",
        link: "https://source.unsplash.com/vrPqM2OB9nA"
    }
];

const profile = {
    name: document.querySelector(".profile__name"),
    job: document.querySelector(".profile__about"),
    addButton: document.querySelector(".profile__add-button"),
    editButton: document.querySelector(".profile__edit-button")
};

const addElement = {
    popup: document.querySelector(".popup_add-element"),
    form: document.querySelector(".popup__add-element-form"),
    closeButton: document.querySelector(".popup_add-element .popup__close-button"),
    titleInput: document.querySelector(".popup__title-field"),
    imageLinkInput: document.querySelector(".popup__image-link-field")
};

const editProfile = {
    popup: document.querySelector(".popup_edit-profile"),
    form: document.querySelector(".popup__edit-profile-form"),
    closeButton: document.querySelector(".popup_edit-profile .popup__close-button"),
    nameInput: document.querySelector(".popup__name-field"),
    jobInput: document.querySelector(".popup__job-field")
};

const imagePopup = {
    popup: document.querySelector(".popup_image-block"),
    image: document.querySelector(".popup__image"),
    description: document.querySelector(".popup__image-description"),
    closeButton: document.querySelector(".popup_image-block .popup__close-button")
};


// Popup-логика
function closePopup(popup) {
    popup.classList.remove("popup_opened");
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
}

// Form-логика
function fillEditForm() {
    editProfile.nameInput.value = profile.name.textContent.trim();
    editProfile.jobInput.value = profile.job.textContent.trim();
}

function editFormSubmitHandler(evt) {
    evt.preventDefault();

    profile.name.textContent = editProfile.nameInput.value;
    profile.job.textContent = editProfile.jobInput.value;

    closePopup(editProfile.popup);
}

function addFormSubmitHandler(evt) {
    evt.preventDefault();

    renderNewElement({
        name: addElement.titleInput.value,
        link: addElement.imageLinkInput.value
    });

    closePopup(addElement.popup);
    addElement.form.reset();
}

// Listeners
profile.editButton.addEventListener("click", () => {
    fillEditForm();
    openPopup(editProfile.popup);
});
profile.addButton.addEventListener("click", () => openPopup(addElement.popup));

editProfile.form.addEventListener("submit", editFormSubmitHandler);
editProfile.closeButton.addEventListener("click", () => closePopup(editProfile.popup));

addElement.form.addEventListener("submit", addFormSubmitHandler);
addElement.closeButton.addEventListener("click", () => closePopup(addElement.popup));

imagePopup.closeButton.addEventListener("click", () => closePopup(imagePopup.popup));
imagePopup.popup.addEventListener("click", (evt) => {
    if (evt.target == imagePopup.popup) {
        closePopup(imagePopup.popup);
    }
});
document.addEventListener("keydown", (evt) => {
    if (evt.code === "Escape" && imagePopup.popup.classList.contains("popup_opened")) {
        closePopup(imagePopup.popup);
    }
});

// Добавление нового элемента
const templateElement = document.querySelector(".template-element").content.querySelector(".element");
const elementsSection = document.querySelector(".elements");

function createNewElement({ name, link }) {
    const newElement = templateElement.cloneNode(true);

    const title = newElement.querySelector(".element__title");
    const image = newElement.querySelector(".element__image");
    const likeButton = newElement.querySelector(".element__like-button");
    const deleteButton = newElement.querySelector(".element__delete-button");

    title.textContent = name;
    image.src = link;
    image.alt = name;

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

        openPopup(imagePopup.popup);
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

