const ImageModel = require('../../mongo/models/Image');

const createImage = async (req, res) => {
    const {url} = req.body;

    try {
        const newImage = new ImageModel({
            url,
            thumb: url,
        });

        await newImage.save();

        res.status(200).json({
            newImage,
            success: true,
        });
    } catch (e) {
        res.status(500).json(e);
    }
};

module.exports = createImage;