import {apiFetch} from 'Api/client';
import {
    IMAGE_CREATE_URL,
    IMAGE_DELETE_URL,
    IMAGE_READ_URL,
} from 'Api/urls';

const Image = () => {
    return {
        create,
        deleteOne,
        fetchAll,
    }
};

function create(url) {
    return apiFetch(IMAGE_CREATE_URL, 'POST', {
        url,
    });
}

function deleteOne(id) {
    return apiFetch(IMAGE_DELETE_URL, 'POST', {
        id,
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