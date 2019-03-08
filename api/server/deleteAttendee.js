const AttendeeModel = require('../../mongo/models/Attendee');

const deleteAttendee = async (req, res) => {
    const {id} = req.body;

    try {
        await AttendeeModel.deleteOne({_id: id});

        res.status(200).json({success: true});
    } catch (e) {
        res.status(500).json(e);
    }
};

module.exports = deleteAttendee;