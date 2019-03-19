const mongoose = require('mongoose');

const Model = require('../../../mongo/models/Content');

const readContent = async (req, res) => {
    const {belongsTo} = req.body;

    let data;
    try {
        if (belongsTo) {
            data = await Model.find({belongsTo: mongoose.Types.ObjectId(belongsTo)});
        } else {
            data = await Model.find();
        }

        res.status(200).json({
            data,
            success: true,
        });
    } catch (e) {
        res.status(500).json(e);
    }
};

module.exports = readContent;