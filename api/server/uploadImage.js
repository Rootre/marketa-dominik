var fs = require('fs');
var formidable = require('formidable');

var UPLOAD_IMAGES_DIR = require('../../consts/dirs').UPLOAD_IMAGES_DIR;

const ImageModel = require('../../mongo/models/Image');

const uploadImage = async (req, res) => {
    const form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, {file}) {
        fs.readFile(file.path, function (err, data) {
            const newPath = UPLOAD_IMAGES_DIR + file.name;

            fs.writeFile(newPath, data, function (err) {
                if (err) {
                    throw err;
                }

                const newImage = new ImageModel({
                    url: newPath,
                    thumb: newPath,
                });

                newImage.save();
            });
        });

        res.end();
    });
};

module.exports = uploadImage;