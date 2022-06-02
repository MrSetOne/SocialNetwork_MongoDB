const mongoose = require('mongoose') //Nos traemos los metodos de mongoose
const ObjectId = mongoose.SchemaTypes.ObjectId; //No traemos la propiedad de ObjectId para porder linkear


const userSchema = new mongoose.Schema({ //Definimos el tipo de dato que va a contener
    username: {
        type: String,
        unique: true,
        required: [true, 'es necesario introducir un Username'],
    },
    email: {
        type: String,
        required: [true, 'es necesario introducir un email'],
        unique: true
    },
    password: String,
    img: String,
    confirmed: Boolean,
    role: String,
    tokens: [],
    posts: [
        { postId: { type: ObjectId, ref: 'Post' } }
    ],
    followers: [
        { userId: { type: ObjectId, ref: 'User' } }
    ],
    following: [
        { userId: { type: ObjectId, ref: 'User' } }
    ],
    likedPosts: [
        { postId: { type: ObjectId, ref: 'Post' } }
    ],
    // TODO Faltan los likes en Comentarios
}, { timestamps: true });

const User = mongoose.model('User', userSchema); //Generamos el modelo como tal

module.exports = User //Lo exportamos