const user = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/keys');
const transporter = require('../config/nodemailer');

const userController = {
    async create(req, res, next) {
        try {
            if (req.body.password) {
                req.body.role = "user";
                req.body.confirmed = false;
                req.body.password = await bcrypt.hash(req.body.password, 10)
                const newUser = await user.create(req.body)
                const initialToken = await jwt.sign({ _id: newUser._id }, jwt_secret, { expiresIn: '24h' })
                const url = "http://localhost:8080/users/confirm/" + initialToken;
                await transporter.sendMail({
                    from: "lara.sanchez.michael.dev@outlook.es",
                    to: newUser.email,
                    subject: "Confirma tu registro",
                    html: `<h2>¡Hola ${newUser.username}!</h2>
                <p>Para finalizar registro <a href=${url}>haz click aquí</a> UwU</p>
                `
                })
                res.status(201).send({ message: `Se ha creado el usuario ${req.body.username}`, newUser });
            } else {
                res.status(400).send('Es necesario introducir una contraseña')
            }
        } catch (error) {
            console.error(error)
            error.origin = "user";
            next(error);
        }
    }




}

module.exports = userController