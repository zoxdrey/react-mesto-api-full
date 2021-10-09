import {API_OPTIONS, baseUrl} from "./constants";

class Api {
    constructor(options) {
        this._options = options;
    }

    getInitialCards() {
        return fetch(`${baseUrl}/cards`, this._options).then(this._checkResponse);
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${baseUrl}/users/me`, this._options).then(this._checkResponse);
    }

    setUserInfo(userName, userAbout) {
        return fetch(`${baseUrl}/users/me`, {
            method: 'PATCH',
            ...this._options,
            body: JSON.stringify({
                name: userName,
                about: userAbout
            })
        }).then(this._checkResponse);
    }

    setUserAvatar(avatarLink) {
        return fetch(`${baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            ...this._options,
            body: JSON.stringify({
                avatar: avatarLink
            })
        }).then(this._checkResponse);
    }

    createCard(cardName, cardLink) {
        return fetch(`${baseUrl}/cards`, {
            method: 'POST',
            ...this._options,
            body: JSON.stringify({
                name: cardName,
                link: cardLink
            })
        }).then(this._checkResponse);
    }

    deleteCard(cardId) {
        return fetch(`${baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            ...this._options,
        }).then(this._checkResponse);
    }

    addLike(cardId) {
        return fetch(`${baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            ...this._options,
        }).then(this._checkResponse);
    }

    removeLike(cardId) {
        return fetch(`${baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            ...this._options,
        }).then(this._checkResponse);
    }

    getAllData() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()]);
    }

    changeLikeCardStatus(cardId, isLiked) {
        return isLiked ? this.addLike(cardId) : this.removeLike(cardId)
    }


}

const api = new Api(API_OPTIONS);

export default api;