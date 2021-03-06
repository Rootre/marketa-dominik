const Model = require('../../../mongo/models/{{name}}');

const delete{{name}} = async (req, res) => {
    const {id} = req.body;

    try {
        await Model.deleteOne({_id: id});

        res.status(200).json({success: true});
    } catch (e) {
        res.status(500).json(e);
    }
};

module.exports = delete{{name}};