const bcrypt = require('bcryptjs');
const { all } = require('express/lib/application');
const jwt = require('jsonwebtoken');
const { jwt_secret } = process.env
const transporter = require('../config/nodemailer');
const User = require('../models/User');



const userController = {
    async create(req, res, next) {
        try {
            if (req.body.password) {
                req.body.role = "user";
                req.body.confirmed = false;
                if (req.file) {
                    req.body.img = req.file.filename;
                }
                req.body.password = await bcrypt.hash(req.body.password, 10)
                const newUser = await User.create({...req.body })
                    // if (newUser) {
                    //     const initialToken = await jwt.sign({ _id: newUser._id }, jwt_secret, { expiresIn: '24h' })
                    //     const url = "http://localhost:8080/users/confirm/" + initialToken;
                    //     await transporter.sendMail({
                    //         from: "lara.sanchez.michael.dev@outlook.es",
                    //         to: newUser.email,
                    //         subject: "Confirma tu registro",
                    //         html: `<h2>¡Hola ${newUser.username}!</h2>
                    //                         <p>Para finalizar registro <a href=${url}>haz click aquí</a> UwU</p>
                    //                     `
                    //     })
                    // }
                res.status(201).send({ message: `Se ha creado el usuario ${req.body.username}`, newUser });
            } else {
                res.status(400).send(`Tu correo: ${req.body.email} no tiene un formato valido.`)
            }
        } catch (error) {
            error.origin = "user";
            console.log(error);
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
            res.status(201).send({ message: `¡Bienvenido ${loggedUser.username}!`, loggedUser, token: token })
        } catch (error) {
            error.origin = "user";
            next(error);
        }
    },
    async logout(req, res, next) {
        try {
            await User.findByIdAndUpdate(req.user._id, {
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
            if (req.file) {
                req.body.img = req.file.filename
                let { tokens, confirmed, role, posts, followers, following, likedPosts, ...data } = req.body
                if (data.password) {
                    data.password = await bcrypt.hash(data.password, 10)
                }
                const updatedUser = await User.findByIdAndUpdate(req.user._id, {...data }, { new: true })
                res.send({ message: `Has modificado tu perfil`, updatedUser })
            } else {
                const toUpdate = await User.findById(req.user._id);
                console.log(toUpdate);
                req.body.img = toUpdate.img
                let { tokens, confirmed, role, posts, followers, following, likedPosts, ...data } = req.body
                if (data.password) {
                    data.password = await bcrypt.hash(data.password, 10)
                }
                const updatedUser = await User.findByIdAndUpdate(req.user._id, {...data }, { new: true })
                res.send({ message: `Has modificado tu perfil`, updatedUser })
            }

        } catch (error) {
            res.send(error)
        }
    },
    async delete(req, res, next) {
        try {
            await User.findByIdAndDelete(req.params._id)
            res.send('Usuario eliminado con exito')
        } catch (error) {
            res.send({ message: 'Algo ha fallado en el controlador', error })
        }

    },
    async getAllUsers(req, res, next) {
        try {
            const allUsers = await User.find({}, { username: 1, postIds: 1, followers: 1, following: 1 })
                .populate('postIds', ["title"])
                .populate('followers')
                .populate('following')
            res.status(200).send({ message: 'La lista de usuarios es:', allUsers })
        } catch (error) {
            res.send(error)
        }
    },
    async getAllUsersByAdmin(req, res) {
        try {
            const allUsers = await User.find().populate(["postIds", "comments", "followers", "following", "likedPosts"])
            res.status(200).send({ message: 'Para mi admin lo mejor, TQ Bro', allUsers })
        } catch (error) {
            res.send(error)
        }
    },
    async getSession(req, res) {
        try {
            let sessionUser = await User.findById(req.user._id, { tokens: 0 })
                .populate("postIds")
                .populate("followers")
                .populate("following")
            res.status(200).send({ message: 'Tu sesión acual es:', currentToken: req.headers.authorization, sessionUser })
        } catch (error) {
            res.send({ error })
        }
    },
    async getById(req, res) {
        try {
            const foundUser = await User.findById(req.params._id)
                // .populate("postIds")
                .populate({
                    path: "postIds",
                    populate: ["likes", { path: "comments", populate: "author" }]
                })
            res.status(200).send({ message: `Los datos publicos del usuario ${foundUser.username}`, foundUser })
        } catch (error) {
            res.send(error)
        }
    },
    async getByUsername(req, res) {
        try {
            if (req.params.username.length > 20) {
                return res.status(400).send('Busqueda demasiado larga')
            }
            const search = new RegExp(req.params.username, "i");
            const foundUser = await User.find({ username: search });
            res.send(foundUser);
        } catch (error) {
            res.send(error)
        }
    },
    async follow(req, res) {
        try {
            if (req.params._id == req.user._id) {
                return res.send(`No te puedes seguir a ti mismo`)
            }
            const toFollow = await User.findById(req.params._id)
            if (toFollow.followers.includes(req.user._id)) {
                res.send('Ya sigues a este usuario')
            } else {
                await User.findByIdAndUpdate(req.params._id, { $push: { followers: req.user._id } }, { new: true })
                const follower = await User.findByIdAndUpdate(req.user._id, { $push: { following: req.params._id } }, { new: true })
                res.send(`El usuario ${follower.username} ahora sigue a ${toFollow.username}`)
            }
        } catch (error) {
            res.send({ message: `El usuario con id ${req.params._id} no existe`, error })
        }
    },
    async unfollow(req, res) {
        try {
            if (req.params._id == req.user._id) {
                return res.send(`No te puedes dejar de seguir a ti mismo`)
            }
            const target = await User.findById(req.params._id);
            if (target.followers.includes(req.user._id)) {
                const toUnfollow = await User.findByIdAndUpdate(req.params._id, { $pull: { followers: req.user._id } }, { new: true })
                const unfollower = await User.findByIdAndUpdate(req.user._id, { $pull: { following: req.params._id } }, { new: true })
                res.send(`El usuario ${unfollower.username} ha dejado de seguir a ${toUnfollow.username}`)
            } else {
                res.send(`No sigues al usuario con id ${req.params._id}`)
            }
        } catch (error) {
            res.send({ message: `El usuario con id ${req.params._id} no existe`, error })
        }
    },
    async doAnAdmin(req, res, next) {
        try {
            const newAdmin = await User.findByIdAndUpdate(req.params._id, { role: "admin" });
            if (newAdmin.role == "admin") {
                return res.status(400).send(`El usuario ${newAdmin.username} ya era admin`)
            }
            res.status(200).send(`Ahora el usuario ${newAdmin.username} es ${newAdmin.role}`)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = userController