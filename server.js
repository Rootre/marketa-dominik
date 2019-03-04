const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';

const GiftModel = require('./mongo/models/Gift');

const checkUserToken = require('./api/server/checkUserToken');
const editGift = require('./api/server/editGift');
const loginUser = require('./api/server/loginUser');

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

            if (req.url === '/') {
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

        server.post('/admin/user/login', loginUser);
        server.post('/admin/gift/edit', editGift);

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