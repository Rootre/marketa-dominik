const mongoose = require('mongoose');
const Schema = require('../schemas/Content');

const Content = mongoose.model('content', Schema);

module.exports = Content;