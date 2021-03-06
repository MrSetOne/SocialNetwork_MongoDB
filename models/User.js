const mongoose = require('mongoose') //Nos traemos los metodos de mongoose
const ObjectId = mongoose.SchemaTypes.ObjectId; //No traemos la propiedad de ObjectId para porder linkear
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({ //Definimos el tipo de dato que va a contener
    username: {
        type: String,
        unique: true,
        required: [true, 'es necesario introducir un Username'],
    },

    email: {
        type: String,
        validate: [isEmail, 'Introduce un correo valido'],
        required: [true, 'es necesario introducir un email'],
        unique: true
    },

    password: String,

    img: String,

    confirmed: Boolean,

    bio: String,

    firstVisit: Boolean,

    role: String,

    tokens: [],

    postIds: [{ type: ObjectId, ref: 'Post' }],

    comments: [{ type: ObjectId, ref: 'Comment' }],

    followers: [{ type: ObjectId, ref: 'User' }],

    following: [{ type: ObjectId, ref: 'User' }],

    likedPosts: [{ type: ObjectId, ref: 'Post' }],

}, { timestamps: true });

userSchema.methods.toJSON = function() {
    const user = this._doc;
    delete user.tokens;
    delete user.password;
    return user;
}

const User = mongoose.model('User', userSchema); //Generamos el modelo como tal

module.exports = User //Lo exportamos