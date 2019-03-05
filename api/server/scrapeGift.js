const rp = require('request-promise');

const scrapeGift = async (req, res) => {
    const {url} = req.body;

    try {
        const data = await rp(url);

        res.status(200).json({
            data,
            success: true,
        });
    } catch (e) {
        res.status(500).json(e);
    }
};

module.exports = scrapeGift;