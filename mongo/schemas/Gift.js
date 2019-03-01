const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GiftSchema = new Schema({
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
    image: {
        type: String,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    url: {
        type: String,
        required: true,
        unique: true,
    },
    reserved: {
        type: Boolean,
        required: true,
        default: false,
    },
    reservedBy: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = GiftSchema;