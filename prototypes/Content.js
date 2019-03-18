import {apiFetch} from 'Api/client';
import {
    CONTENT_CREATE_URL,
    CONTENT_DELETE_URL,
    CONTENT_READ_URL,
    CONTENT_UPDATE_URL,
} from 'Api/urls';

const Content = () => {
    return {
        create,
        deleteOne,
        get,
        update,
    }
};

function create(data) {
    return apiFetch(CONTENT_CREATE_URL, 'POST', {
        data,
    });
}

function deleteOne(id) {
    return apiFetch(CONTENT_DELETE_URL, 'POST', {
        id,
    });
}

function update(selector, set) {
    return apiFetch(CONTENT_UPDATE_URL, 'POST', {
        selector,
        set,
    });
}

async function get(id) {
    let data;

    try {
        const result = await apiFetch(CONTENT_READ_URL, 'GET', {
            id,
        });

        data = result.data;
    } catch (e) {
        console.error(e);
    }

    return data;
}

module.exports = Content;