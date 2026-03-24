import "./index.css";
import Api from "../utils/Api.js";
import {
  enableValidation,
  resetValidation,
  validationConfig,
} from "../scripts/validation.js";
import {
  apiConfig,
  modalSelectors,
  profileSelectors,
  cardSelectors,
  formSelectors,
  previewSelectors,
  buttonText,
} from "../utils/constants.js";

const api = new Api(apiConfig);

// ================= DOM =================
const editProfileButton = document.querySelector(profileSelectors.editButton);
const newPostButton = document.querySelector(profileSelectors.addButton);
const avatarEditButton = document.querySelector(
  profileSelectors.avatarEditButton,
);

const editProfileModal = document.querySelector(
  modalSelectors.editProfileModal,
);
const newPostModal = document.querySelector(modalSelectors.newPostModal);
const previewModal = document.querySelector(modalSelectors.previewModal);
const deleteModal = document.querySelector(modalSelectors.deleteModal);
const avatarModal = document.querySelector(modalSelectors.avatarModal);

const profileNameEl = document.querySelector(profileSelectors.name);
const profileDescriptionEl = document.querySelector(
  profileSelectors.description,
);
const profileAvatar = document.querySelector(profileSelectors.avatar);

const editProfileForm = editProfileModal.querySelector(".modal__form");
const addCardForm = newPostModal.querySelector(".modal__form");
const deleteForm = deleteModal.querySelector(".modal__form");
const avatarForm = avatarModal.querySelector(".modal__form");

const editProfileNameInput = document.querySelector(
  formSelectors.profileNameInput,
);
const editProfileDescriptionInput = document.querySelector(
  formSelectors.profileDescriptionInput,
);
const linkInputEl = document.querySelector(formSelectors.postLinkInput);
const nameInputEl = document.querySelector(formSelectors.postCaptionInput);
const avatarInput = document.querySelector(formSelectors.avatarInput);

const previewImageEl = previewModal.querySelector(previewSelectors.image);
const previewCaptionEl = previewModal.querySelector(previewSelectors.caption);

const cardTemplate = document
  .querySelector(cardSelectors.template)
  .content.querySelector(".card");
const cardsList = document.querySelector(cardSelectors.list);

const cancelButtons = document.querySelectorAll(".modal__cancel-button");

// ================= STATE =================
let selectedCard = null;
let selectedCardId = null;

// ================= MODALS =================
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal.modal_is-opened");

    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");

  if (!document.querySelector(".modal.modal_is-opened")) {
    document.removeEventListener("keydown", handleEscClose);
  }
}

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});

document.querySelectorAll(".modal__close-button").forEach((button) => {
  const modal = button.closest(".modal");

  button.addEventListener("click", () => {
    closeModal(modal);
  });
});

cancelButtons.forEach((button) => {
  const modal = button.closest(".modal");

  button.addEventListener("click", () => {
    closeModal(modal);
  });
});

// ================= HELPERS =================
function setButtonText(button, text) {
  button.textContent = text;
}

function renderLoading(button, isLoading, loadingText, defaultText) {
  setButtonText(button, isLoading ? loadingText : defaultText);
}

function openPreviewModal({ name, link }) {
  previewImageEl.src = link;
  previewImageEl.alt = name;
  previewCaptionEl.textContent = name;
  openModal(previewModal);
}

function handleLike(cardLikeBtnEl, cardData) {
  const isLiked = cardLikeBtnEl.classList.contains("card__like-button_active");

  const likeRequest = isLiked
    ? api.unlikeCard(cardData._id)
    : api.likeCard(cardData._id);

  likeRequest
    .then((updatedCard) => {
      cardLikeBtnEl.classList.toggle(
        "card__like-button_active",
        updatedCard.isLiked,
      );
    })
    .catch(console.error);
}

function handleDeleteCard(cardElement, cardData) {
  selectedCard = cardElement;
  selectedCardId = cardData._id;
  openModal(deleteModal);
}

// ================= CARDS =================
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtnEl = cardElement.querySelector(".card__like-button");
  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-button");

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  cardLikeBtnEl.classList.toggle("card__like-button_active", cardData.isLiked);

  cardLikeBtnEl.addEventListener("click", () => {
    handleLike(cardLikeBtnEl, cardData);
  });

  cardDeleteBtnEl.addEventListener("click", () => {
    handleDeleteCard(cardElement, cardData);
  });

  cardImageEl.addEventListener("click", () => {
    openPreviewModal(cardData);
  });

  return cardElement;
}

function renderCard(cardData, method = "prepend") {
  const cardElement = getCardElement(cardData);
  cardsList[method](cardElement);
}

// ================= PROFILE =================
function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  renderLoading(submitButton, true, buttonText.saving, buttonText.save);

  api
    .editUserInfo({
      name: editProfileNameInput.value.trim(),
      about: editProfileDescriptionInput.value.trim(),
    })
    .then((userData) => {
      profileNameEl.textContent = userData.name;
      profileDescriptionEl.textContent = userData.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(submitButton, false, buttonText.saving, buttonText.save);
    });
}

editProfileButton.addEventListener("click", () => {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  resetValidation(editProfileForm, validationConfig);
  openModal(editProfileModal);
});

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

// ================= ADD CARD =================
function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  renderLoading(submitButton, true, buttonText.saving, buttonText.save);

  api
    .addCard({
      name: nameInputEl.value.trim(),
      link: linkInputEl.value.trim(),
    })
    .then((cardData) => {
      renderCard(cardData);
      evt.target.reset();
      resetValidation(addCardForm, validationConfig);
      closeModal(newPostModal);
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(submitButton, false, buttonText.saving, buttonText.save);
    });
}

newPostButton.addEventListener("click", () => {
  resetValidation(addCardForm, validationConfig);
  openModal(newPostModal);
});

addCardForm.addEventListener("submit", handleAddCardSubmit);

// ================= DELETE CARD =================
function handleDeleteSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  renderLoading(submitButton, true, buttonText.deleting, buttonText.delete);

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      selectedCard = null;
      selectedCardId = null;
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(
        submitButton,
        false,
        buttonText.deleting,
        buttonText.delete,
      );
    });
}

deleteForm.addEventListener("submit", handleDeleteSubmit);

// ================= AVATAR =================
function handleAvatarSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  renderLoading(submitButton, true, buttonText.saving, buttonText.save);

  api
    .updateAvatar({ avatar: avatarInput.value.trim() })
    .then((userData) => {
      profileAvatar.src = userData.avatar;
      profileAvatar.alt = userData.name;
      evt.target.reset();
      resetValidation(avatarForm, validationConfig);
      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(submitButton, false, buttonText.saving, buttonText.save);
    });
}

avatarEditButton.addEventListener("click", () => {
  resetValidation(avatarForm, validationConfig);
  openModal(avatarModal);
});

avatarForm.addEventListener("submit", handleAvatarSubmit);

// ================= INITIAL LOAD =================
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    profileNameEl.textContent = userData.name;
    profileDescriptionEl.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    profileAvatar.alt = userData.name;

    cards.forEach((cardData) => {
      renderCard(cardData, "append");
    });
  })
  .catch(console.error);

// ================= VALIDATION =================
enableValidation(validationConfig);
