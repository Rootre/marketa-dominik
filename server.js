const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';

const AttendeeModel = require('./mongo/models/Attendee');
const GiftModel = require('./mongo/models/Gift');
const ImageModel = require('./mongo/models/Image');

const checkUserToken = require('./api/server/checkUserToken');
const createAttendee = require('./api/server/createAttendee');
const deleteAttendee = require('./api/server/deleteAttendee');
const readAttendee = require('./api/server/readAttendee');
const createGift = require('./api/server/createGift');
const createImage = require('./api/server/createImage');
const createImages = require('./api/server/createImages');
const createThumb = require('./api/server/createThumb');
const deleteGift = require('./api/server/deleteGift');
const deleteImage = require('./api/server/deleteImage');
const loginUser = require('./api/server/loginUser');
const readGift = require('./api/server/readGift');
const readImage = require('./api/server/readImage');
const scrapeGift = require('./api/server/scrapeGift');
const updateGift = require('./api/server/updateGift');
const updateImage = require('./api/server/updateImage');
const uploadImage = require('./api/server/uploadImage');

const {
    ATTENDEE_CREATE_URL,
    ATTENDEE_DELETE_URL,
    ATTENDEE_READ_URL,
    GIFT_CREATE_URL,
    GIFT_DELETE_URL,
    GIFT_EDIT_URL,
    GIFT_READ_URL,
    GIFT_SCRAPE_URL,
    IMAGE_CREATE_URL,
    IMAGE_CREATE_THUMB_URL,
    IMAGE_DELETE_URL,
    IMAGE_READ_URL,
    IMAGE_UPDATE_URL,
    IMAGE_UPLOAD_URL,
    IMAGES_CREATE_URL,
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
        server.use(bodyParser.urlencoded({extended: true}));
        server.use(cookieParser());

        server.all('*', checkUserToken);

        server.get('*', async (req, res) => {
            let attendees = [];
            let gifts = [];
            let images = [];

            const url = req.url.replace(/\?.*$/, '');

            if (['/', '/admin'].indexOf(url) >= 0) {
                try {
                    gifts = await GiftModel.find({active: true});
                    attendees = await AttendeeModel.find();
                    images = await ImageModel.find();
                } catch (e) {
                    console.error(e);
                }
            }

            return handle(req, Object.assign(res, {
                attendees,
                gifts,
                images,
            }));
        });

        // image handling
        server.get(IMAGE_READ_URL, readImage);

        server.post(IMAGE_CREATE_URL, createImage);
        server.post(IMAGES_CREATE_URL, createImages);
        server.post(IMAGE_CREATE_THUMB_URL, createThumb);
        server.post(IMAGE_DELETE_URL, deleteImage);
        server.post(IMAGE_UPDATE_URL, updateImage);
        server.post(IMAGE_UPLOAD_URL, uploadImage);

        // api handling
        server.post(ATTENDEE_CREATE_URL, createAttendee);
        server.post(ATTENDEE_DELETE_URL, deleteAttendee);
        server.post(ATTENDEE_READ_URL, readAttendee);
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