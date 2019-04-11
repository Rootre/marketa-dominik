const AttendeeModel = require('../../mongo/models/Attendee');
const ContentModel = require('../../mongo/models/Content');
const GiftModel = require('../../mongo/models/Gift');
const HookModel = require('../../mongo/models/Hook');
const ImageModel = require('../../mongo/models/Image');

const prepopulateMainPages = async (req, res, next) => {
    let attendees = [];
    let gifts = [];
    let hookContents = [];
    let hooks = [];
    let images = [];

    try {
        gifts = await GiftModel.find({active: true});
        attendees = await AttendeeModel.find();
        hookContents = await ContentModel.find();
        hooks = await HookModel.find();
        images = await ImageModel.find();
    } catch (e) {
        throw new Error('' + e.message);
    }

    Object.assign(res, {
        attendees,
        gifts,
        hookContents,
        hooks,
        images,
    });

    next();
};

module.exports = prepopulateMainPages;