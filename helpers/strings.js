/**
 * Returns unique id by regex: ^_[a-z0-9]{9}$
 * @returns {string}
 */
export function generateID() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Returns inflected string
 * @param {int} count
 * @param {Array<string>} strings
 * @returns {string}
 */
export function inflectString(count, strings) {
    if (strings.length === 0) {
        return '';
    }

    if (strings.length === 1 || count === 1) {
        return strings[0];
    }

    if (count === 0 || count > 4 && strings.length >= 3) {
        return strings[2];
    }

    return strings[1];
}

/**
 * Converts object into url parameters
 * @param {object} params
 * @returns {string}
 */
export function getDataAsURL(params) {
    if (!params) {
        return '';
    }

    return Object.entries(params).map(([key, val]) => {
        if (Array.isArray(val)) {
            return val.map(val => `${key}[]=${val}`).join('&');
        }

        return `${key}=${val}`;
    }).join('&');
}