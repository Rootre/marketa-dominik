const ImageModel = require('../../mongo/models/Image');

const createImages = async (req, res) => {
    const {images} = req.body;

    try {
        const newImages = await ImageModel.insertMany(images);

        res.status(200).json({
            newImages,
            success: true,
        });
    } catch (e) {
        res.status(500).json(e);
    }
};

module.exports = createImages;