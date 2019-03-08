const AttendeeModel = require('../../mongo/models/Attendee');

const createAttendee = async (req, res) => {
    const {name, guests} = req.body;

    try {
        const newAttendee = new AttendeeModel({
            name,
            guests,
        });

        await newAttendee.save();

        res.status(200).json({
            newAttendee,
            success: true,
        });
    } catch (e) {
        res.status(500).json(e);
    }
};

module.exports = createAttendee;