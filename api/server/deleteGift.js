const GiftModel = require('../../mongo/models/Gift');

const deleteGift = async (req, res) => {
    const {id} = req.body;

    try {
        await GiftModel.deleteOne({_id: id});

        res.status(200).json({success: true});
    } catch (e) {
        res.status(500).json(e);
    }
};

module.exports = deleteGift;