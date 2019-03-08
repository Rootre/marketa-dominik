import fetch from 'cross-fetch';
import {remove as removeCookie} from 'js-cookie';

import {AppError, ApiError, API_ERRORS, ERR_NETWORK, ERR_NETWORK_MSG} from './errors';
import {
    ATTENDEE_CREATE_URL,
    ATTENDEE_DELETE_URL,
    ATTENDEE_READ_URL,
    GIFT_CREATE_URL,
    GIFT_DELETE_URL,
    GIFT_EDIT_URL,
    GIFT_READ_URL,
    GIFT_SCRAPE_URL,
    USER_LOGIN_URL,
} from './urls';
import COOKIE from 'Consts/jwt/cookie';
import {getDataAsURL} from 'Helpers/strings';

export function createGift(image, name, url) {
    return apiFetch(GIFT_CREATE_URL, 'POST', {
        image,
        name,
        url,
    });
}
export function createAttendee(name, guests = 0) {
    return apiFetch(ATTENDEE_CREATE_URL, 'POST', {
        name,
        guests,
    });
}
export function deleteAttendee(id) {
    return apiFetch(ATTENDEE_DELETE_URL, 'POST', {
        id,
    });
}
export function deleteGift(id) {
    return apiFetch(GIFT_DELETE_URL, 'POST', {
        id,
    });
}
export function editGift(id, set) {
    return apiFetch(GIFT_EDIT_URL, 'POST', {
        id,
        set,
    });
}
export function fetchAttendeeById(id) {
    return apiFetch(ATTENDEE_READ_URL, 'POST', {
        id,
    });
}
export function fetchGiftById(id) {
    return apiFetch(GIFT_READ_URL, 'POST', {
        id,
    });
}
export function fetchGifts() {
    return apiFetch(GIFT_READ_URL, 'POST');
}
export function fetchAttendees() {
    return apiFetch(ATTENDEE_READ_URL, 'POST');
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
export function scrapeGift(url) {
    return apiFetch(GIFT_SCRAPE_URL, 'POST', {
        url,
    });
}

export async function apiFetch(url, method = 'POST', body, headers = {
    'Content-Type': 'application/json',
}) {
    let result;

    if (method.toUpperCase() === 'GET') {
        url += getDataAsURL(body);
    }

    try {
        result = await fetch(url, {
            body: method.toUpperCase() === 'GET' ? null : JSON.stringify(body),
            method,
            headers,
            mode: 'no-cors',
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