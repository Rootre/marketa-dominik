import {
    MONGO_ERROR_CODES,
    MONGO_ERRORS,
    MONGO_INPUTS,
} from 'Api/errors';

export default function (result) {
    const {code, errors, name} = result;

    let message = MONGO_ERRORS[name] || name;
    message += ': ';

    if (code) {
        message += MONGO_ERROR_CODES[code] || result.errmsg;
    } else {
        message += Object.keys(errors).map(err => MONGO_INPUTS[err] || err).join(', ');
    }

    return message;
}