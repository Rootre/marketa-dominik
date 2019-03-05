const GiftModel = require('../../mongo/models/Gift');

const createGift = async (req, res) => {
    const {image, name, url} = req.body;

    try {
        const newGift = new GiftModel({
            image,
            name,
            url,
        });

        await newGift.save();

        res.status(200).json({
            newGift,
            success: true,
        });
    } catch (e) {
        res.status(500).json(e);
    }
};

module.exports = createGift;