import {
    createGift,
    deleteGift,
    editGift,
    fetchGiftById,
    fetchGifts,
} from 'Api/client';

let giftImage, giftName, giftUrl;

const Gift = (image = '', name = '', url = '') => {
    setImage(image);
    setName(name);
    setUrl(url);

    return {
        create,
        deleteOne,
        edit,
        fetchAll,
        fetchById,
        setImage,
        setName,
        setUrl,
    }
};

function create() {
    return createGift(giftImage, giftName, giftUrl);
}

function deleteOne(id) {
    return deleteGift(id);
}

function edit(id, set) {
    return editGift(id, set);
}

async function fetchAll() {
    let gifts = [];

    try {
        const result = await fetchGifts();

        gifts = result.data;
    } catch (e) {
        console.error(e);
    }

    return gifts;
}

async function fetchById(id) {
    let gift = [];

    try {
        const result = await fetchGiftById(id);

        gift = result.data;
    } catch (e) {
        console.error(e);
    }

    return gift;
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