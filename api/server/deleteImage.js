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
                res.status(500).json(err);

                return;
            }

            console.log(' === DELETED IMAGE FILE: ===');
            console.log(image.url);
        });

        await ImageModel.deleteOne({_id: id});

        res.status(200).json({success: true});
    } catch (e) {
        res.status(500).json(e);
    }
};

module.exports = deleteImage;