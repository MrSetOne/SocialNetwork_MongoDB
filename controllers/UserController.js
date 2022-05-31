const user = require('../models/User');
const bcrypt = require('bcryptjs')

const userController = {
    async create(req, res) {
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
            error.origin = "user"
            if (error.errors) {
                error.feedback = []
                for (const fail in error.errors) {
                    console.log(error.errors[fail].path);
                    error.feedback.push(error.errors[fail].path)
                };
                res.status(400).send({
                    message: 'Faltan campos por rellenar',
                    feedback: error.feedback
                })
            } else if (error.keyPattern) {
                const failed = Object.keys(error.keyPattern)
                const failedValue = error.keyValue[failed[0]]
                res.status(400).send({
                    message: `El ${failed[0]} ${failedValue} ya está en uso.`,
                    failedField: failed[0],
                    failedValue
                });

            }
            // console.log(Object.keys(error.errors).length)


        }
    }
}

module.exports = userController