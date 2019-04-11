const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';

if (dev) {
    mongoose.set('debug', true);
}

const checkUserToken = require('./api/server/checkUserToken');
const prepopulateMainPages = require('./api/server/prepopulateMainPages');
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
const createContent = require('./api/server/content/create');
const readContent = require('./api/server/content/read');
const updateContent = require('./api/server/content/update');
const deleteContent = require('./api/server/content/delete');
const createHook = require('./api/server/hook/create');
const readHook = require('./api/server/hook/read');
const updateHook = require('./api/server/hook/update');
const deleteHook = require('./api/server/hook/delete');
// API_METHODS_IMPORT

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
    CONTENT_CREATE_URL,
    CONTENT_DELETE_URL,
    CONTENT_READ_URL,
    CONTENT_UPDATE_URL,
    HOOK_CREATE_URL,
    HOOK_DELETE_URL,
    HOOK_READ_URL,
    HOOK_UPDATE_URL,
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

        // checks and updates login token
        server.all('*', checkUserToken);

        // fetching data for relevant pages
        server.get('/', prepopulateMainPages);
        server.get('/admin', prepopulateMainPages);

        // next.js handler
        server.get('*', (req, res) => handle(req, res));

        // IMAGE_HANDLING
        server.get(IMAGE_READ_URL, readImage);

        server.post(IMAGE_CREATE_URL, createImage);
        server.post(IMAGES_CREATE_URL, createImages);
        server.post(IMAGE_CREATE_THUMB_URL, createThumb);
        server.post(IMAGE_DELETE_URL, deleteImage);
        server.post(IMAGE_UPDATE_URL, updateImage);
        server.post(IMAGE_UPLOAD_URL, uploadImage);

        // API_HANDLING
        server.post(HOOK_CREATE_URL, createHook);
        server.post(HOOK_DELETE_URL, deleteHook);
        server.post(HOOK_READ_URL, readHook);
        server.post(HOOK_UPDATE_URL, updateHook);
        server.post(CONTENT_CREATE_URL, createContent);
        server.post(CONTENT_DELETE_URL, deleteContent);
        server.post(CONTENT_READ_URL, readContent);
        server.post(CONTENT_UPDATE_URL, updateContent);
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