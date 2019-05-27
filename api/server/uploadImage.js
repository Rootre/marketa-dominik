const fs = require('fs');
const formidable = require('formidable');

const UPLOAD_IMAGES_DIR = require('../../consts/dirs').UPLOAD_IMAGES_DIR;

const uploadImage = async (req, res) => {
    const form = new formidable.IncomingForm();

    try {
        form.parse(req, function (err, fields, {file}) {
            fs.readFile(file.path, function (err, data) {
                const newPath = UPLOAD_IMAGES_DIR + file.name;

                fs.writeFile(newPath, data, function (err) {
                    if (err) {
                        throw err;
                    }

                    console.log(' === CREATED IMAGE FILE: ===');
                    console.log(newPath);
                });
            });

            res.end();
        });
    } catch (e) {
        console.error(e);
    }
};

module.exports = uploadImage;