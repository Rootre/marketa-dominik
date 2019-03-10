const mongoose = require('mongoose');
const GiftSchema = require('../schemas/Gift');

const Gift = mongoose.model('gift', GiftSchema);

module.exports = Gift;