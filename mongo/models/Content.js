const mongoose = require('mongoose');
const ContentSchema = require('../schemas/Content');

const Content = mongoose.model('content', ContentSchema);

module.exports = Content;