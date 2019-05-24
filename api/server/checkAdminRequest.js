const cookie = require('cookie');
const jwt = require('jsonwebtoken');

const COOKIE = require('../../consts/jwt/cookie');
const SALT = require('../../consts/jwt/salt');

const checkUserToken = (req, res, next) => {
    try {
        const token = cookie.parse(req.headers.cookie)[COOKIE.name];
        jwt.verify(token, SALT);

        next();
    } catch (e) {
        return res.status(200).json({
            error: 'Nemáte platný přihlašovací token',
        });
    }
};

module.exports = checkUserToken;