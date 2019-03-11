const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    description: {
        type: String,
    },
    url: {
        required: true,
        type: String,
        unique: true,
    },
    thumb: {
        type: String,
    },
    created: {
        default: Date.now,
        type: Date,
    },
});

module.exports = ImageSchema;