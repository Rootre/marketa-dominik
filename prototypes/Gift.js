import {
    createGift,
    deleteGift,
    editGift,
    fetchGiftById,
    fetchGifts,
} from 'Api/client';

let giftImage = '';
let giftName = '';
let giftUrl = '';

const Gift = () => {
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

async function create() {
    try {
        await createGift(giftImage, giftName, giftUrl);
    } catch (e) {
        console.error(e);
    }
}

async function deleteOne(id) {
    try {
        await deleteGift(id);
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