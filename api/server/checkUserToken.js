const cookie = require('cookie');
const jwt = require('jsonwebtoken');

const COOKIE = require('../../consts/jwt/cookie');
const SALT = require('../../consts/jwt/salt');

const User = require('../../prototypes/User');

const checkUserToken = (req, res, next) => {
    // but only for page and api's requests
    if (req.url.match(/\/(static|_next)\//) || !req.headers.cookie) {
        return next();
    }

    const token = cookie.parse(req.headers.cookie)[COOKIE.name];

    try {
        const {login} = jwt.verify(token, SALT);

        const user = new User(login);

        const newToken = user.login();

        res.cookie(COOKIE.name, newToken, {maxAge: COOKIE.maxAge});

        Object.assign(res,{isLogged: newToken});
    } catch (e) {
    }

    next();
};

module.exports = checkUserToken;