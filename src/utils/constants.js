export const apiConfig = {
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c9b6c7ca-419b-45e4-97f6-4dffa3fbb160",
    "Content-Type": "application/json",
  },
};

export const modalSelectors = {
  editProfileModal: "#edit-profile-modal",
  newPostModal: "#new-post-modal",
  previewModal: "#preview-modal",
  deleteModal: "#delete-modal",
  avatarModal: "#avatar-modal",
};

export const profileSelectors = {
  editButton: ".profile__edit-button",
  addButton: ".profile__add-button",
  avatarEditButton: ".profile__avatar-edit",
  name: ".profile__name",
  description: ".profile__description",
  avatar: ".profile__avatar",
};

export const cardSelectors = {
  template: "#card-template",
  list: ".cards__list",
};

export const formSelectors = {
  profileNameInput: "#profile-name-input",
  profileDescriptionInput: "#profile-description-input",
  postLinkInput: "#post-link-input",
  postCaptionInput: "#post-caption-input",
  avatarInput: "#avatar-input",
};

export const previewSelectors = {
  image: ".modal__image",
  caption: ".modal__caption",
};

export const buttonText = {
  save: "Save",
  saving: "Saving...",
  delete: "Delete",
  deleting: "Deleting...",
};
