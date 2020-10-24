let editForm = document.querySelector('.edit-form');

let currentName = document.querySelector('.profile__name');
let currentAbout = document.querySelector('.profile__about');

let formName = document.querySelector('.edit-form__item_el_name');
let formAbout = document.querySelector('.edit-form__item_el_about');

formName.value = currentName.textContent.trim();
formAbout.value = currentAbout.textContent.trim();


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

editForm.addEventListener('submit', formSubmitHandler);