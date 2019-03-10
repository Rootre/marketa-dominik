const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    description: {
        type: String,
    },
    url: {
        type: String,
        required: true,
        unique: true,
    },
    thumb: {
        type: String,
        required: true,
        unique: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = ImageSchema;