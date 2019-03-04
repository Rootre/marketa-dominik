import fetch from 'cross-fetch';
import {remove as removeCookie} from 'js-cookie';

import {AppError, ApiError, API_ERRORS, ERR_NETWORK, ERR_NETWORK_MSG} from './errors';
import {
    GIFT_CREATE_URL,
    GIFT_EDIT_URL,
    GIFT_READ_URL,
    USER_LOGIN_URL,
} from './urls';
import COOKIE from 'Consts/jwt/cookie';

export function createGift(image, name, url) {
    return apiFetch(GIFT_CREATE_URL, 'POST', {
        image,
        name,
        url,
    });
}
export function editGift(id, set) {
    return apiFetch(GIFT_EDIT_URL, 'POST', {
        id,
        set,
    });
}
export function fetchGiftById(id) {
    return apiFetch(GIFT_READ_URL, 'POST', {
        id,
    });
}
export function login(login, password) {
    return apiFetch(USER_LOGIN_URL, 'POST', {
        login,
        password,
    });
}
export function logout() {
    return removeCookie(COOKIE.name);
}

async function apiFetch(url, method = 'POST', body) {
    let result;

    try {
        result = await fetch(url, {
            body: JSON.stringify(body),
            method,
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
        });
    } catch (e) {
        throw new AppError(ERR_NETWORK, ERR_NETWORK_MSG);
    }

    if (result.status >= 400) {
        result = await result.json();

        //TODO: better way to parse error messages
        throw new AppError(ERR_NETWORK, result.errmsg || result.message);
    }

    result = await result.json();

    if (result.error) {
        throw new ApiError(result.error, API_ERRORS[result.error] || result.error);
    }

    return result;
}