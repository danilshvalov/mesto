function togglePopupState() {
    popup.classList.toggle('popup_opened');
}

function loadFormInfo() {
    let submitButton = document.querySelector('.edit-form__button');
    submitButton.focus();

    let profileName = document.querySelector('.profile__name');
    let profileAbout = document.querySelector('.profile__about');
    
    let nameInput = document.querySelector('.edit-form__item_el_name');
    let jobInput = document.querySelector('.edit-form__item_el_about');
    
    nameInput.value = profileName.textContent.trim();
    jobInput.value = profileAbout.textContent.trim();
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    let nameInput = document.querySelector('.edit-form__item_el_name');
    let jobInput = document.querySelector('.edit-form__item_el_about');

    let name = nameInput.value;
    let job = jobInput.value;

    let profileName = document.querySelector('.profile__name');
    let profileAbout = document.querySelector('.profile__about');

    profileName.textContent = name;
    profileAbout.textContent = job;

    let popup = document.querySelector('.popup');
    popup.classList.remove('popup_opened');
}

let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let editForm = document.querySelector('.edit-form');
let popup = document.querySelector('.popup');


editButton.addEventListener('click', togglePopupState);
editButton.addEventListener('click', loadFormInfo);

closeButton.addEventListener('click', togglePopupState);

editForm.addEventListener('submit', formSubmitHandler);