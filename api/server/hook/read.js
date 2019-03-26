const Model = require('../../../mongo/models/Hook');

const readHook = async (req, res) => {
    const {name} = req.body;

    let data;
    try {
        if (name) {
            data = await Model.findOne({name});
        } else {
            data = await Model.find();
        }

        res.status(200).json({
            data,
            success: true,
        });
    } catch (e) {
        res.status(500).json(e);
    }
};

module.exports = readHook;