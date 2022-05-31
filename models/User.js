const mongoose = require('mongoose') //Nos traemos los metodos de mongoose

const userSchema = new mongoose.Schema({ //Definimos el tipo de dato que va a contener
    username: String,
    email: String,
    password: String,
    img: String,
    confirmed: Boolean
}, { timestamps: true });

const User = mongoose.model('User', userSchema); //Generamos el modelo como tal

module.exports = User //Lo exportamos