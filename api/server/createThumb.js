const fs = require('fs');
const mkdirp = require('mkdirp');
var getDirName = require('path').dirname;

const createThumb = async (req, res) => {
    const {dataUrl, thumbUrl} = req.body;

    const base64thumb = dataUrl.split(';base64,').pop();

    try {
        await mkdirp(getDirName(thumbUrl), function (err) {
            if (err) {
                throw err;
            }

            return fs.writeFile(thumbUrl, base64thumb, {encoding: 'base64', flag: 'w'}, function (err) {
                if (err) {
                    throw err;
                }

                console.log(' === CREATED THUMB IMAGE FILE: ===');
                console.log(thumbUrl);
            });
        });

        res.status(200).json({
            success: true,
        });
    } catch (e) {
        res.status(500).json(e);
    }
};

module.exports = createThumb;