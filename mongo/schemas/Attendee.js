const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Attendee = new Schema({
    name: {
        required: true,
        type: String,
        unique: true,
    },
    guests: {
        default: 0,
        required: true,
        type: Number,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Attendee;