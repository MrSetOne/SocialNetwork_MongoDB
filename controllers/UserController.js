const user = require('../models/User');
const bcrypt = require('bcryptjs')

const userController = {
    async create(req, res, next) {
        try {
            if (req.body.password) {
                req.body.role = "user";
                req.body.confirmed = false;
                req.body.password = await bcrypt.hash(req.body.password, 10)
                const newUser = await user.create(req.body)
                res.status(201).send({ message: `Se ha creado el usuario ${req.body.username}`, newUser });
            } else {
                res.status(400).send('Es necesario introducir una contraseña')
            }
        } catch (error) {
            error.origin = "user";
            next(error);
        }
    }
}

module.exports = userController