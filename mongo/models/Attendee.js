const mongoose = require('mongoose');
const AttendeeSchema = require('../schemas/Attendee');

const Attendee = mongoose.model('user', AttendeeSchema);

module.exports = Attendee;