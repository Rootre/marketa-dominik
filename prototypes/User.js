const jwt = require('jsonwebtoken');

const SALT = require('Consts/jwt/salt');
const IDLE_TIME = require('Consts/jwt/idle_time');

let userName = '';

function User(name) {
    userName = name;

    return {
        login
    }
}

function login() {
    return jwt.sign({
        login: userName,
    }, SALT, {
        expiresIn: IDLE_TIME,
    });
}

module.exports = User;