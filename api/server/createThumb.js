const fs = require('fs');

const createThumb = async (req, res) => {
    const {dataUrl, thumbUrl} = req.body;

    const base64thumb = dataUrl.split(';base64,').pop();

    try {
        fs.writeFile(thumbUrl, base64thumb, {encoding: 'base64'}, function (err) {
            if (err) {
                throw err;
            }

            console.log(' === CREATED THUMB IMAGE FILE: ===');
            console.log(thumbUrl);
        });

        res.status(200).json({
            success: true,
        });
    } catch (e) {
        res.status(500).json(e);
    }
};

module.exports = createThumb;