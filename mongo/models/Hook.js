const mongoose = require('mongoose');
const HookSchema = require('../schemas/Hook');

const Hook = mongoose.model('hook', HookSchema);

module.exports = Hook;