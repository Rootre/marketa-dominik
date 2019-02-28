let giftImage = '';
let giftName = '';
let giftLink = '';

function Gift(name) {
    giftName = name;

    return {
        create,
        setImage,
        setUrl,
    }
}

function create() {

}

function setImage(image) {
    giftImage = image;
}

function setUrl(url) {
    giftLink = url;
}

module.exports = Gift;