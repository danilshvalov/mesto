let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__about');

let nameInput = document.querySelector('.popup__field_type_name');
let jobInput = document.querySelector('.popup__field_type_job');

let editButton = document.querySelector('.profile__button_type_edit');
let closeButton = document.querySelector('.popup__button_type_close');

let editForm = document.querySelector('.popup__container_edit-profile');

let popup = document.querySelector('.popup');

function toggleEditProfilePopup() {
    if (!popup.classList.contains('popup_opened')) {
        nameInput.value = profileName.textContent.trim();
        jobInput.value = profileJob.textContent.trim();
    }

    popup.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();

    let name = nameInput.value;
    let job = jobInput.value;

    profileName.textContent = name;
    profileJob.textContent = job;

    toggleEditProfilePopup();
}

editButton.addEventListener('click', toggleEditProfilePopup);
closeButton.addEventListener('click', toggleEditProfilePopup);
editForm.addEventListener('submit', formSubmitHandler); 