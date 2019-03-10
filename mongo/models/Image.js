const mongoose = require('mongoose');
const ImageSchema = require('../schemas/Image');

const Image = mongoose.model('image', ImageSchema);

module.exports = Image;