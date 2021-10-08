import {API_OPTIONS, baseAuthUrl} from "./constants";


class AuthApi {
    constructor(options) {
        this._options = options;
    }

    signup(user) {
        return fetch(`${baseAuthUrl}/signup`, {
            method: 'POST',
            ...this._options,
            body: JSON.stringify(
                user
            )
        }).then(this._checkResponse);
    }

    signin(user) {
        return fetch(`${baseAuthUrl}/signin`, {
            method: 'POST',
            ...this._options,
            body: JSON.stringify(
                user
            )
        }).then(this._checkResponse);
    }

    getUserEmailByToken(token) {
        return fetch(`${baseAuthUrl}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(this._checkResponse);
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

}

const api = new AuthApi(API_OPTIONS);

export default api;