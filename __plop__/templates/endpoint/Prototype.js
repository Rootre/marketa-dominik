import {apiFetch} from 'Api/client';
import {
    {{toUpperCase name}}_CREATE_URL,
    {{toUpperCase name}}_DELETE_URL,
    {{toUpperCase name}}_READ_URL,
    {{toUpperCase name}}_UPDATE_URL,
} from 'Api/urls';

const {{name}} = () => {
    return {
        create,
        deleteOne,
        get,
        update,
    }
};

function create(data) {
    return apiFetch({{toUpperCase name}}_CREATE_URL, 'POST', {
        data,
    });
}

function deleteOne(id) {
    return apiFetch({{toUpperCase name}}_DELETE_URL, 'POST', {
        id,
    });
}

function update(selector, set) {
    return apiFetch({{toUpperCase name}}_UPDATE_URL, 'POST', {
        selector,
        set,
    });
}

async function get(id) {
    let data;

    try {
        const result = await apiFetch({{toUpperCase name}}_READ_URL, 'GET', {
            id,
        });

        data = result.data;
    } catch (e) {
        console.error(e);
    }

    return data;
}

{{> componentExport}}