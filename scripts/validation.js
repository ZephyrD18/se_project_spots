function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  if (!errorEl) return;

  inputEl.classList.add(inputErrorClass);
  errorEl.textContent = inputEl.validationMessage;
  errorEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  if (!errorEl) return;

  inputEl.classList.remove(inputErrorClass);
  errorEl.textContent = "";
  errorEl.classList.remove(errorClass);
}

function hasInvalidInput(inputList) {
  return inputList.some((inputEl) => !inputEl.validity.valid);
}

function toggleButtonState(inputList, buttonEl, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonEl.disabled = true;
    buttonEl.classList.add(inactiveButtonClass);
  } else {
    buttonEl.disabled = false;
    buttonEl.classList.remove(inactiveButtonClass);
  }
}

function setEventListeners(formEl, config) {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonEl = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonEl, config.inactiveButtonClass);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      if (!inputEl.validity.valid) {
        showInputError(formEl, inputEl, config);
      } else {
        hideInputError(formEl, inputEl, config);
      }

      toggleButtonState(inputList, buttonEl, config.inactiveButtonClass);
    });
  });
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
}

function resetValidation(formEl, config) {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonEl = formEl.querySelector(config.submitButtonSelector);

  inputList.forEach((inputEl) => hideInputError(formEl, inputEl, config));
  toggleButtonState(inputList, buttonEl, config.inactiveButtonClass);
}

// -------------------- Validation Config + Enable --------------------

const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(validationConfig);

window.resetValidation = resetValidation;
window.validationConfig = validationConfig;
