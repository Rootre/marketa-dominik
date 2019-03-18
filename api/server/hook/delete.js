const Model = require('../../../mongo/models/Hook');

const deleteHook = async (req, res) => {
    const {id} = req.body;

    try {
        await Model.deleteOne({_id: id});

        res.status(200).json({success: true});
    } catch (e) {
        res.status(500).json(e);
    }
};

module.exports = deleteHook;