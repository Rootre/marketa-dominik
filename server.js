const cookie = require('cookie');
const cookieParser = require('cookie-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const next = require('next');

const SALT = require('Consts/jwt/salt');
const COOKIE = require('Consts/jwt/cookie');
const User = require('Prototypes/User');

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

const APP_PORT = 3000;

mongoose
    .connect(
        'mongodb://mongo:27017/marketa_dominik',
        { useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

app.prepare()
    .then(() => {
        const server = express();

        server.use(cookieParser());

        // check and update jwt token
        server.all('*', (req, res, next) => {
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

                // when reaching admin api
                if (!newToken && req.url.match(/\/admin\//)) {
                    return res.status(200).json({error: 'Musíte být přihlášený'});
                }

            } catch (e) {
            }

            next();
        });

        server.get('*', function (req, res) {
            return handle(req, res);
        });

        server.listen(APP_PORT, (err) => {
            if (err) {
                throw err;
            }
            console.log(`> Ready on http://localhost:${APP_PORT}`);
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1)
    });