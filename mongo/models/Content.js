const mongoose = require('mongoose');
const Schema = require('../schemas/Content');

const Content = mongoose.model('contents', Schema);

module.exports = Content;