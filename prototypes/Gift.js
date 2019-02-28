import useGlobalMap from 'Hooks/useGlobalMap';

const GiftDb = require('../mongo/models/Gift');

let giftImage = '';
let giftName = '';
let giftUrl = '';

const Gift = () => {
    return {
        create,
        getAll,
        setImage,
        setName,
        setUrl,
    }
}

async function create() {
    const [, addNotification] = useGlobalMap('notifications');

    const newGift = new GiftDb({
        image: giftImage,
        name: giftName,
        url: giftUrl,
    });

    try {
        await newGift.save();
    } catch (e) {
        addNotification(e.message);
    }
}

async function getAll() {
    const [, addNotification] = useGlobalMap('notifications');

    let gifts = [];

    try {
        gifts = await GiftDb.find();
    } catch (e) {
        addNotification(e.message);
    }

    return gifts;
}

function setImage(image) {
    giftImage = image;
}


function setName(name) {
    giftName = name;
}

function setUrl(url) {
    giftUrl = url;
}

module.exports = Gift;