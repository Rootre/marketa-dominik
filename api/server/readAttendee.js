const AttendeeModel = require('../../mongo/models/Attendee');

const readAttendee = async (req, res) => {
    const {id} = req.body;

    let attendees;
    try {
        if (id) {
            attendees = await AttendeeModel.findOne({_id: id});
        } else {
            attendees = await AttendeeModel.find();
        }

        res.status(200).json({
            data: attendees,
            success: true,
        });
    } catch (e) {
        res.status(500).json(e);
    }
};

module.exports = readAttendee;