const user = require('../models/User');

const userController = {
    async create(req, res) {
        try {
            const newUser = await user.create(req.body)
            res.status(201).send({ message: `Se ha creado el usuario ${req.body.username}`, newUser });
        } catch (error) {
            console.error(error);
            res.status(500).send(`No se ha podido crear el usuario D:`)
        }
    }
}

module.exports = userController