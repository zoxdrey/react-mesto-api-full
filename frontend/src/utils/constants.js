export const baseUrl = 'https://mesto.nomoreparties.co';
export const baseAuthUrl = 'https://auth.nomoreparties.co';
export const authToken = 'c5f24e43-1913-44e6-ba53-ef3a44b15d52';
export const groupId = 'cohort-25';
export const API_OPTIONS = {
    headers: {
        authorization: authToken,
        'Content-Type': 'application/json'
    }
}
export const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__form-input",
    submitButtonSelector: ".popup__form-submit-button",
    inactiveButtonClass: "popup__form-submit-button_state_disabled",
    inputErrorClass: "popup__form-input_error_active",
    errorClass: "popup__form-error_active",
    formErrorClass: ".popup__form-error",
};