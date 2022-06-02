const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/keys');
const transporter = require('../config/nodemailer');
const User = require('../models/User');
const { isEmail } = require('validator');



const userController = {
    async create(req, res, next) {
        try {
            if (req.body.password) {
                req.body.role = "user";
                req.body.confirmed = false;
                req.body.password = await bcrypt.hash(req.body.password, 10)
                const newUser = await User.create(req.body)
                if (newUser) {
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
                }
                res.status(201).send({ message: `Se ha creado el usuario ${req.body.username}`, newUser });
            } else {
                res.status(400).send(`Tu correo: ${req.body.email} no tiene un formato valido.`)
            }
        } catch (error) {
            error.origin = "user";
            next(error);
        }
    },
    async verify(req, res) {
        try {
            const payload = jwt.verify(req.params.authorization, jwt_secret);
            const user = await User.findOne({ _id: payload._id });
            if (!user) {
                res.status(400).send('El usuario no existe')
            } else {
                const updatedUser = await User.findByIdAndUpdate(
                    payload._id, { confirmed: true }, {
                        new: true
                    }
                );
                res.send({ message: `El usuario ${user.username} se ha verificado`, updatedUser })
            }
        } catch (error) {
            res.status(404).send('Algo ha fallado en la validacion')
        }


    },
    async login(req, res, next) {
        try {
            if (!req.body.email || !req.body.password) {
                res.send('Por favor introduce email y contraseña')
            }
            const loggedUser = await User.findOne({
                email: req.body.email
            });
            if (!loggedUser) {
                res.status(404).send('Email o contraseña incorrectos');
            };
            const isMatch = await bcrypt.compare(req.body.password, loggedUser.password)
            if (!isMatch) {
                res.status(404).send('Email o contraseña incorrectos');
            };
            if (!loggedUser.confirmed) {
                return res.status(200).send(`El correo ${req.body.email} no ha sido verificado, comprueba la bandeja de entrada.`)
            };
            const token = jwt.sign({ id: loggedUser._id }, jwt_secret);
            if (loggedUser.tokens.length > 4) {
                loggedUser.tokens.shift();
            }
            loggedUser.tokens.push(token);
            await loggedUser.save();
            res.status(201).send({ message: `¡Bienvenido ${loggedUser.username}!`, loggedUser })
        } catch (error) {
            error.origin = "user";
            next(error);
        }
    },
    async logout(req, res, next) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.user._id, {
                $pull: { tokens: req.headers.authorization },
            }, { new: true });
            res.status(200).send(`Se ha cerrado la sesión.`)
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Hubo un problema al cerrar sesión' })
        }
    },
    async updateUser(req, res, next) {
        try {
            const { tokens, confirmed, role, posts, followers, following, likedPosts, ...data } = req.body
            const updatedUser = await User.findByIdAndUpdate(req.user._id, data, { new: true })
            res.send({ message: `Has modificado tu perfil`, updatedUser })
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = userController