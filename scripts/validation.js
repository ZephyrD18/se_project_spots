// -------------------- Helpers --------------------

function getTrimmedValue(inputEl) {
  return inputEl.value.trim();
}

function setTrimmedCustomValidity(inputEl) {
  if (inputEl.type !== "text") {
    inputEl.setCustomValidity("");
    return;
  }

  const trimmed = getTrimmedValue(inputEl);
  const min = inputEl.minLength || 0;

  // Required (trim-aware)
  if (inputEl.required && trimmed.length === 0) {
    inputEl.setCustomValidity("Please fill out this field.");
    return;
  }

  // Minlength (trim-aware)
  if (min && trimmed.length > 0 && trimmed.length < min) {
    inputEl.setCustomValidity(`Please enter at least ${min} characters.`);
    return;
  }

  inputEl.setCustomValidity("");
}

// -------------------- Error UI --------------------

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

// -------------------- Core Validation --------------------

function hasInvalidInput(inputList) {
  return inputList.some((inputEl) => !inputEl.checkValidity());
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

function validateInput(formEl, inputEl, config) {
  setTrimmedCustomValidity(inputEl);

  if (!inputEl.checkValidity()) {
    showInputError(formEl, inputEl, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
}

function setEventListeners(formEl, config) {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonEl = formEl.querySelector(config.submitButtonSelector);

  // Initial state
  inputList.forEach((inputEl) => setTrimmedCustomValidity(inputEl));
  toggleButtonState(inputList, buttonEl, config.inactiveButtonClass);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      validateInput(formEl, inputEl, config);
      toggleButtonState(inputList, buttonEl, config.inactiveButtonClass);
    });

    inputEl.addEventListener("blur", () => {
      validateInput(formEl, inputEl, config);
      toggleButtonState(inputList, buttonEl, config.inactiveButtonClass);
    });
  });
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formEl) => setEventListeners(formEl, config));
}

function resetValidation(formEl, config) {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonEl = formEl.querySelector(config.submitButtonSelector);

  inputList.forEach((inputEl) => {
    inputEl.setCustomValidity("");
    hideInputError(formEl, inputEl, config);
  });

  toggleButtonState(inputList, buttonEl, config.inactiveButtonClass);
}

// -------------------- Config + Enable (Required in validation.js) --------------------

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
