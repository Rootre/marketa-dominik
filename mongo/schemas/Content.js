const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContentSchema = new Schema({
    belongsTo: {
        type: Schema.ObjectId,
        ref: 'hook',
    },
    heading: {
        type: String,
    },
    text: {
        type: String,
        required: true,
    },
    position: {
        type: Number,
        default: 0,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = ContentSchema;