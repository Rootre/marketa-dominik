const mongoose = require('mongoose');
const GiftSchema = require('../schemas/Gift');

module.exports = Gift = mongoose.model('gift', GiftSchema);