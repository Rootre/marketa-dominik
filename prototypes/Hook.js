import {apiFetch} from 'Api/client';
import {
    HOOK_CREATE_URL,
    HOOK_DELETE_URL,
    HOOK_READ_URL,
    HOOK_UPDATE_URL,
} from 'Api/urls';

const Hook = () => {
    return {
        create,
        deleteOne,
        get,
        update,
    }
};

function create(data) {
    return apiFetch(HOOK_CREATE_URL, 'POST', {
        data,
    });
}

function deleteOne(id) {
    return apiFetch(HOOK_DELETE_URL, 'POST', {
        id,
    });
}

function update(selector, set) {
    return apiFetch(HOOK_UPDATE_URL, 'POST', {
        selector,
        set,
    });
}

async function get(id) {
    let data;

    try {
        const result = await apiFetch(HOOK_READ_URL, 'GET', {
            id,
        });

        data = result.data;
    } catch (e) {
        console.error(e);
    }

    return data;
}

module.exports = Hook;