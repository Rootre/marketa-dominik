const ImageModel = require('../../mongo/models/Gift');

const updateImage = async (req, res) => {
    const {selector, set} = req.body;

    try {
        await ImageModel.updateOne(selector, {$set: set});

        res.status(200).json({success: true});
    } catch (e) {
        res.status(500).json(e);
    }
};

module.exports = updateImage;