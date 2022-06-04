const mongoose = require('mongoose') //Nos traemos los metodos de mongoose
const ObjectId = mongoose.SchemaTypes.ObjectId; //No traemos la propiedad de ObjectId para porder linkear

const postSchema = new mongoose.Schema({ //Definimos el tipo de dato que va a contener

    userId: { type: ObjectId, ref: 'User' },

    title: {
        type: String,
        required: [true, 'es necesario introducir un Titulo'],
    },

    body: {
        type: String,
        required: [true, 'es necesario introducir un email'],
    },

    img: String,

    likes: [{ type: ObjectId, ref: 'User' }],

    comments: [{ type: ObjectId, ref: 'Comment' }]

}, { timestamps: true });

const Post = mongoose.model('Post', postSchema); //Generamos el modelo como tal

module.exports = Post //Lo exportamos