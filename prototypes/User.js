const cookie = require('js-cookie');
const jwt = require('jsonwebtoken');

const {name: cookieName} = require('../consts/jwt/cookie');
const SALT = require('../consts/jwt/salt');
const IDLE_TIME = require('../consts/jwt/idle_time');

let userName = '';

function User(name) {
    userName = name;

    return {
        isLogged,
        login,
    }
}

function isLogged() {
    const token = cookie.get(cookieName);

    if (!token) {
        return false;
    }

    return jwt.verify(token, SALT);
}

function login() {
    return jwt.sign({
        login: userName,
    }, SALT, {
        expiresIn: IDLE_TIME,
    });
}

module.exports = User;