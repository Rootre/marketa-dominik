const mongoose = require('mongoose');
const UserSchema = require('../schemas/User');

const User = mongoose.model('user', UserSchema);

module.exports = User;