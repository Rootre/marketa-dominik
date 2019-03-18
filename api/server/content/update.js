const Model = require('../../../mongo/models/Content');

const updateContent = async (req, res) => {
    const {selector, set} = req.body;

    try {
        await Model.updateOne(selector, {$set: set});

        res.status(200).json({success: true});
    } catch (e) {
        res.status(500).json(e);
    }
};

module.exports = updateContent;