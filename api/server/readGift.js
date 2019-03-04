const GiftModel = require('../../mongo/models/Gift');

const readGift = async (req, res) => {
    const {id} = req.body;

    try {
        const gift = await GiftModel.findOne({_id: id});

        res.status(200).json({
            gift,
            success: true,
        });
    } catch (e) {
        res.status(500).json(e);
    }
};

module.exports = readGift;