const Model = require('../../../mongo/models/Content');

const createContent = async (req, res) => {
    const {data: inputData} = req.body;

    try {
        let data;

        if (Array.isArray(inputData)) {
            data = await Model.insertMany(inputData);
        } else {
            data = new Model(inputData);

            await data.save();
        }

        res.status(200).json({
            data,
            success: true,
        });
    } catch (e) {
        res.status(500).json(e);
    }
};

module.exports = createContent;