import {
    editGift,
    fetchGiftById,
} from 'Api/client';

let giftImage = '';
let giftName = '';
let giftUrl = '';

const Gift = () => {
    return {
        create,
        edit,
        fetchById,
        setImage,
        setName,
        setUrl,
    }
};

async function create() {
    try {

    } catch (e) {
        console.error(e);
    }
}

async function edit(id, set) {
    try {
        await editGift(id, set);
    } catch (e) {
        console.error(e);
    }
}

async function fetchById(id) {
    let gifts = [];

    try {
        gifts = await fetchGiftById(id);
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