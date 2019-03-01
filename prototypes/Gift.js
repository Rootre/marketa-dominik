const GiftModel = require('../mongo/models/Gift');

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
};

async function create() {
    try {
        await GiftModel.save({
            image: giftImage,
            name: giftName,
            url: giftUrl,
        });
    } catch (e) {
        console.error(e);
    }
}

async function getAll() {
    let gifts = [];

    try {
        gifts = await GiftModel.find();
    } catch (e) {
        console.error(e);
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