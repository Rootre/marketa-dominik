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
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = ContentSchema;