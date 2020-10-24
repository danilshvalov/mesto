let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');

let popup = document.querySelector('.popup');

function togglePopupState() {
    popup.classList.toggle('popup_opened');
}

editButton.addEventListener('click', togglePopupState);
closeButton.addEventListener('click', togglePopupState);