const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HookSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = HookSchema;