const fs = require('fs');

const ImageModel = require('../../mongo/models/Image');

const createImage = async (req, res) => {
    const {url, thumb, thumbUrl} = req.body;

    try {
        fs.writeFile(thumbUrl, thumb.replace(/^data:image\/png;base64,/, ''), function (err) {
            if (err) {
                throw err;
            }

            console.log(' === CREATED THUMB IMAGE FILE: ===');
            console.log(thumbUrl);
        });

        const newImage = new ImageModel({
            url,
            thumb: thumbUrl,
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