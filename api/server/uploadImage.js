const ImageModel = require('../../mongo/models/Image');

const uploadImage = async (req, res) => {
    const {id, set} = req.body;

    try {
        await ImageModel.updateOne({_id: id}, {$set: set});

        res.status(200).json({success: true});
    } catch (e) {
        res.status(500).json(e);
    }
};

module.exports = uploadImage;