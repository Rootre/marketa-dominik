const mongoose = require('mongoose');
const GiftSchema = require('../schemas/Gift');

module.exports = mongoose.models && mongoose.models.gift
    ? mongoose.models.gift
    : mongoose.model
        ? mongoose.model('gift', GiftSchema)
        : null;