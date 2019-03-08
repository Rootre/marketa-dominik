const mongoose = require('mongoose');
const AttendeeSchema = require('../schemas/Attendee');

const Attendee = mongoose.model('attendee', AttendeeSchema);

module.exports = Attendee;