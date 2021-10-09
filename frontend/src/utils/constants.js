export const baseUrl = 'https://api.zoxdrey.mesto.nomoredomains.club';
export const baseAuthUrl = 'https://api.zoxdrey.mesto.nomoredomains.club';
export const authToken = 'c5f24e43-1913-44e6-ba53-ef3a44b15d52';
export const groupId = 'cohort-25';
export const API_OPTIONS = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
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