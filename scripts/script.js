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
    addButton: document.querySelector(".profile__button_type_add"),
    editButton: document.querySelector(".profile__button_type_edit")
};

const addPopup = document.querySelector(".popup_add-element");
const addPopupInfo = {
    popup: addPopup,
    form: addPopup.querySelector(".popup__form"),
    closeButton: addPopup.querySelector(".popup__button_type_close"),
    titleInput: addPopup.querySelector(".popup__field_type_title"),
    imageLinkInput: addPopup.querySelector(".popup__field_type_image-link")
};

const editPopup = document.querySelector(".popup_edit-profile");
const editPopupInfo = {
    popup: editPopup,
    form: editPopup.querySelector(".popup__form"),
    closeButton: editPopup.querySelector(".popup__button_type_close"),
    nameInput: editPopup.querySelector(".popup__field_type_name"),
    jobInput: editPopup.querySelector(".popup__field_type_job")
};

const imagePopup = document.querySelector(".popup_image-block");
const imagePopupInfo = {
    popup: imagePopup,
    image: imagePopup.querySelector(".popup__image"),
    description: imagePopup.querySelector(".popup__image-description"),
    closeButton: imagePopup.querySelector(".popup__button_type_close")
};


// Popup logic
function closePopup(popup) {
    popup.classList.remove("popup_opened");
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
}


// Form logic
function fillEditForm() {
    editPopupInfo.nameInput.value = profile.name.textContent.trim();
    editPopupInfo.jobInput.value = profile.job.textContent.trim();
}


function editFormSubmitHandler(evt) {
    evt.preventDefault();
    let nameInput = document.querySelector('.edit-form__item_el_name');
    let jobInput = document.querySelector('.edit-form__item_el_about');

    profile.name.textContent = editPopupInfo.nameInput.value;
    profile.job.textContent = editPopupInfo.jobInput.value;

    closePopup(editPopupInfo.popup);
}

function addFormSubmitHandler(evt) {
    evt.preventDefault();

    renderNewElement({
        name: addPopupInfo.titleInput.value,
        link: addPopupInfo.imageLinkInput.value
    });

    closePopup(addPopupInfo.popup);
}


// Listeners
profile.editButton.addEventListener("click", () => {
    fillEditForm();
    openPopup(editPopupInfo.popup);
});
profile.addButton.addEventListener("click", () => openPopup(addPopupInfo.popup));

editPopupInfo.form.addEventListener("submit", editFormSubmitHandler);
editPopupInfo.closeButton.addEventListener("click", () => closePopup(editPopupInfo.popup));

addPopupInfo.form.addEventListener("submit", addFormSubmitHandler);
addPopupInfo.closeButton.addEventListener("click", () => closePopup(addPopupInfo.popup));

imagePopupInfo.closeButton.addEventListener("click", () => closePopup(imagePopupInfo.popup));
imagePopupInfo.popup.addEventListener("click", (evt) => {
    if (evt.target == imagePopupInfo.popup) {
        closePopup(imagePopupInfo.popup);
    }
});
document.addEventListener("keydown", (evt) => {
    if (evt.code === "Escape" && imagePopupInfo.popup.classList.contains("popup_opened")) {
        closePopup(imagePopupInfo.popup);
    }
})


// Add new element
const templateElement = document.querySelector(".template-element").content.querySelector(".element");
const elementsSection = document.querySelector(".elements");

function createNewElement({name, link}) {
    const newElement = templateElement.cloneNode(true);

    const title = newElement.querySelector(".element__title");
    const image = newElement.querySelector(".element__image");
    const likeButton = newElement.querySelector(".element__like-button");
    const deleteButton = newElement.querySelector(".element__delete-button");

    title.textContent = name;
    image.src = link;
    image.alt = name;

    likeButton.addEventListener("click", (event) => {
        event.target.classList.toggle("element__like-button_active");
    });

    deleteButton.addEventListener("click", (event) => {
        event.target.closest(".element").remove();
    });

    image.addEventListener("click", (event) => {
        const {image, description} = imagePopupInfo;
        const {src, alt} = event.target;

        image.src = src;
        image.alt = alt;
        description.textContent = alt;

        openPopup(imagePopupInfo.popup);
    });

    return newElement;
}

function renderNewElement(data) {
    elementsSection.prepend(createNewElement(data));
}

initialCards.forEach((cardData) => {
    renderNewElement(cardData);
});

