const Model = require('../../../mongo/models/Content');

const deleteContent = async (req, res) => {
    const {id, conditions} = req.body;

    try {
        if (id) {
            await Model.deleteOne({_id: id});
        } else if (conditions) {
            await Model.deleteMany(conditions);
        }

        res.status(200).json({success: true});
    } catch (e) {
        res.status(500).json(e);
    }
};

module.exports = deleteContent;