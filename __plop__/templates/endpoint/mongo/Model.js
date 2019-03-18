const mongoose = require('mongoose');
const Schema = require('../schemas/{{name}}');

const {{name}} = mongoose.model('{{toLowerCase name}}', Schema);

module.exports = {{name}};