const Model = require('../../../mongo/models/{{name}}');

const read{{name}} = async (req, res) => {
    const {id} = req.body;

    let data;
    try {
        if (id) {
            data = await Model.findOne({_id: id});
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

module.exports = read{{name}};