const ImageModel = require('../../mongo/models/Image');

const deleteImage = async (req, res) => {
    const {id} = req.body;

    try {
        await ImageModel.deleteOne({_id: id});

        res.status(200).json({success: true});
    } catch (e) {
        res.status(500).json(e);
    }
};

module.exports = deleteImage;