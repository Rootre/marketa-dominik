import {apiFetch} from 'Api/client';
import {
    IMAGE_CREATE_URL,
    IMAGES_CREATE_URL,
    IMAGE_CREATE_THUMB_URL,
    IMAGE_DELETE_URL,
    IMAGE_READ_URL,
    IMAGE_UPDATE_URL,
} from 'Api/urls';

const Image = () => {
    return {
        create,
        createMany,
        createThumb,
        deleteOne,
        fetchAll,
        update,
    }
};

function create(url, thumbUrl) {
    return apiFetch(IMAGE_CREATE_URL, 'POST', {
        url,
        thumbUrl,
    });
}

function createMany(images) {
    return apiFetch(IMAGES_CREATE_URL, 'POST', {
        images,
    });
}

function createThumb(dataUrl, thumbUrl) {
    return apiFetch(IMAGE_CREATE_THUMB_URL, 'POST', {
        dataUrl,
        thumbUrl,
    });
}

function deleteOne(id) {
    return apiFetch(IMAGE_DELETE_URL, 'POST', {
        id,
    });
}

function update(selector, set) {
    return apiFetch(IMAGE_UPDATE_URL, 'POST', {
        selector,
        set,
    });
}

async function fetchAll() {
    let images = [];

    try {
        const result = await apiFetch(IMAGE_READ_URL, 'GET');

        images = result.data;
    } catch (e) {
        console.error(e);
    }

    return images;
}

module.exports = Image;