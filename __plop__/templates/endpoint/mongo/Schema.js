const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {{name}}Schema = new Schema({
    name: {
        type: String,
    },
    created: {
        default: Date.now,
        type: Date,
    },
});

module.exports = {{name}}Schema;