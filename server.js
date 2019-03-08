const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';

const GiftModel = require('./mongo/models/Gift');

const checkUserToken = require('./api/server/checkUserToken');
const createGift = require('./api/server/createGift');
const deleteGift = require('./api/server/deleteGift');
const loginUser = require('./api/server/loginUser');
const readGift = require('./api/server/readGift');
const scrapeGift = require('./api/server/scrapeGift');
const updateGift = require('./api/server/updateGift');
const {
    GIFT_CREATE_URL,
    GIFT_DELETE_URL,
    GIFT_EDIT_URL,
    GIFT_READ_URL,
    GIFT_SCRAPE_URL,
    USER_LOGIN_URL,
} = require('./api/urls');

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

        server.use(bodyParser.json());
        server.use(cookieParser());

        server.all('*', checkUserToken);

        server.get('*', async (req, res) => {
            let gifts = [];

            if (req.url.replace(/\?.*$/, '') === '/') {
                try {
                    gifts = await GiftModel.find({active: true});
                } catch (e) {
                    console.error(e);
                }
            }

            return handle(req, Object.assign(res, {
                gifts,
            }));
        });

        server.post(GIFT_CREATE_URL, createGift);
        server.post(GIFT_DELETE_URL, deleteGift);
        server.post(GIFT_EDIT_URL, updateGift);
        server.post(GIFT_READ_URL, readGift);
        server.post(GIFT_SCRAPE_URL, scrapeGift);
        server.post(USER_LOGIN_URL, loginUser);

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