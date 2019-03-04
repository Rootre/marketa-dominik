const GiftModel = require('../../mongo/models/Gift');

const createGift = async (req, res) => {
    const {image, name, url} = req.body;

    try {
        const gift = await GiftModel.save({
            image,
            name,
            url,
        });

        res.status(200).json({
            gift,
            success: true,
        });
    } catch (e) {
        res.status(500).json(e);
    }
};

module.exports = createGift;