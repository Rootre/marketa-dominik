const mongoose = require('mongoose');
const Schema = require('../schemas/Hook');

const Hook = mongoose.model('hook', Schema);

module.exports = Hook;