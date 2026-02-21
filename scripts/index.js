const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

// -------------------- Config from validation.js --------------------

const validationSettings = window.validationConfig;

// -------------------- DOM Elements --------------------

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");

const newPostButton = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

// Forms + inputs
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input",
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input",
);

const addCardFormElement = newPostModal.querySelector(".modal__form");
const linkInputEl = newPostModal.querySelector("#post-link-input");
const nameInputEl = newPostModal.querySelector("#post-caption-input");

// Preview modal
const previewModal = document.querySelector("#preview-modal");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaptionEl = previewModal.querySelector(".modal__caption");

// Cards
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

// -------------------- Modal Functions --------------------

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal.modal_is-opened");
    if (openedModal) closeModal(openedModal);
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");

  // Reset form + validation on close (overlay/Esc/X)
  const form = modal.querySelector(".modal__form");
  if (form) {
    form.reset();
    window.resetValidation(form, validationSettings);
  }

  if (!document.querySelector(".modal.modal_is-opened")) {
    document.removeEventListener("keydown", handleEscClose);
  }
}

// Close buttons
const closeButtons = document.querySelectorAll(".modal__close-button");
closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

// Overlay click close
const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});

// -------------------- Card Functions --------------------

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  // Like
  const cardLikeBtnEl = cardElement.querySelector(".card__like-button");
  cardLikeBtnEl.addEventListener("click", () => {
    cardLikeBtnEl.classList.toggle("card__like-button_active");
  });

  // Delete
  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-button");
  cardDeleteBtnEl.addEventListener("click", () => {
    cardElement.remove();
  });

  // Preview
  cardImageEl.addEventListener("click", () => {
    previewCaptionEl.textContent = data.name;
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardsList[method](cardElement);
}

// -------------------- Helpers --------------------

function triggerValidationUI(formEl) {
  const inputs = Array.from(
    formEl.querySelectorAll(validationSettings.inputSelector),
  );
  inputs.forEach((input) =>
    input.dispatchEvent(new Event("input", { bubbles: true })),
  );
}

function isTrimmedTextTooShort(inputEl) {
  if (inputEl.type !== "text") return false;

  const min = inputEl.minLength || 0;
  if (!min) return false;

  const trimmedLength = inputEl.value.trim().length;

  if (inputEl.required && trimmedLength === 0) return true;

  if (trimmedLength > 0 && trimmedLength < min) return true;

  return false;
}

function applyTrimmedValidityMessage(inputEl) {
  if (!isTrimmedTextTooShort(inputEl)) {
    inputEl.setCustomValidity("");
    return;
  }

  if (inputEl.required && inputEl.value.trim().length === 0) {
    inputEl.setCustomValidity("Please fill out this field.");
    return;
  }

  inputEl.setCustomValidity(
    `Please enter at least ${inputEl.minLength} characters.`,
  );
}

// -------------------- Edit Profile --------------------

editProfileButton.addEventListener("click", () => {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;

  window.resetValidation(editProfileForm, validationSettings);

  openModal(editProfileModal);
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  applyTrimmedValidityMessage(editProfileNameInput);
  applyTrimmedValidityMessage(editProfileDescriptionInput);

  if (!editProfileForm.checkValidity()) {
    triggerValidationUI(editProfileForm);
    return;
  }

  profileNameEl.textContent = editProfileNameInput.value.trim();
  profileDescriptionEl.textContent = editProfileDescriptionInput.value.trim();

  closeModal(editProfileModal);
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

// -------------------- New Post --------------------

newPostButton.addEventListener("click", () => {
  openModal(newPostModal);
});

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  applyTrimmedValidityMessage(nameInputEl);

  if (!addCardFormElement.checkValidity()) {
    triggerValidationUI(addCardFormElement);
    return;
  }

  const name = nameInputEl.value.trim();
  const link = linkInputEl.value.trim();

  renderCard({ name, link });

  evt.target.reset();
  window.resetValidation(addCardFormElement, validationSettings);

  closeModal(newPostModal);
}

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

// -------------------- Initial Cards --------------------

initialCards.forEach((item) => {
  renderCard(item, "append");
});
