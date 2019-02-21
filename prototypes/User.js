const jwt = require('jsonwebtoken');

const SALT = 'Bud3Sv4tb5';
const IDLE_TIME = 10 * 60; // s

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