const COOKIE = require('../../consts/jwt/cookie');
const UserModel = require('../../mongo/models/User');

const User = require('../../prototypes/User');

const loginUser = async (req, res) => {
    try {
        const dbUser = await UserModel.findOne({
            login: req.body.login,
            password: req.body.password,
        });

        if (!dbUser) {
            return res.status(200).json({error: 'Špatné přihlašovací údaje'});
        }

        const user = new User(dbUser.login);

        const token = user.login();

        res.cookie(COOKIE.name, token, {maxAge: COOKIE.maxAge});

        res.status(200).json({
            success: true,
        });
    } catch (e) {
        res.status(500).json(e);
    }
};

module.exports = loginUser;