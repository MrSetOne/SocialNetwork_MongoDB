const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/keys');
const User = require('../models/User');

const authentication = async(req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, jwt_secret);
        const user = User.findOne({
            _id: payload.id,
            token
        });
        if (!user) {
            return res.status(400).send('No estas autorizado')
        };
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(400).send({
            message: 'Al parecer ha habido un error con el token',
            error
        })
    }
};

module.exports = { authentication }