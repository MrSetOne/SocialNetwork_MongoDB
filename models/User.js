const mongoose = require('mongoose') //Nos traemos los metodos de mongoose

const userSchema = new mongoose.Schema({ //Definimos el tipo de dato que va a contener
    username: {
        type: String,
        required: [true, 'es necesario introducir un Username'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'es necesario introducir un email'],
        unique: true
    },
    password: String,
    img: String,
    confirmed: Boolean,
    role: String
}, { timestamps: true });

const User = mongoose.model('User', userSchema); //Generamos el modelo como tal

module.exports = User //Lo exportamos