const GiftModel = require('../../mongo/models/Gift');

const readGift = async (req, res) => {
    const {id} = req.body;

    let gift;
    try {
        if (id) {
            gift = await GiftModel.findOne({_id: id});
        } else {
            gift = await GiftModel.find();
        }

        res.status(200).json({
            data: gift,
            success: true,
        });
    } catch (e) {
        res.status(500).json(e);
    }
};

module.exports = readGift;