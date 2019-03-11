const fs = require('fs');

const ImageModel = require('../../mongo/models/Image');

const deleteImage = async (req, res) => {
    const {id} = req.body;

    try {
        const image = await ImageModel.findOne({_id: id});

        if (!image) {
            res.end();

            return;
        }

        fs.unlink(image.url, err => {
            if (err) {
                throw err;
            }

            console.log(' === DELETED IMAGE FILE: ===');
            console.log(image);
        });

        await ImageModel.deleteOne({_id: id});

        res.status(200).json({success: true});
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
};

module.exports = deleteImage;