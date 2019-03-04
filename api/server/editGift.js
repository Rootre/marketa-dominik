const GiftModel = require('../../mongo/models/Gift');

const editGift = async (req, res) => {
    const {id, set} = req.body;

    try {
        await GiftModel.updateOne({_id: id}, {$set: set});

        res.status(200).json({success: true});
    } catch (e) {
        res.status(500).json(e);
    }
};

module.exports = editGift;