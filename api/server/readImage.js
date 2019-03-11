const ImageModel = require('../../mongo/models/Image');

const readImage = async (req, res) => {
    const {id} = req.body;

    let image;
    try {
        if (id) {
            image = await ImageModel.findOne({_id: id});
        } else {
            image = await ImageModel.find();
        }

        res.status(200).json({
            data: image,
            success: true,
        });
    } catch (e) {
        res.status(500).json(e);
    }
};

module.exports = readImage;