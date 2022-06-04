const mongoose = require('mongoose') //Nos traemos los metodos de mongoose
const ObjectId = mongoose.SchemaTypes.ObjectId; //No traemos la propiedad de ObjectId para porder linkear

const commentSchema = new mongoose.Schema({ //Definimos el tipo de dato que va a contener

    postId: { type: ObjectId, ref: 'Post' },

    author: { type: ObjectId, ref: 'User' },

    comment: {
        type: String,
        required: [true, 'Es necesario introducir un comentario'],
    },

    likes: [{ type: ObjectId, ref: 'User' }],

}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema); //Generamos el modelo como tal

module.exports = Comment //Lo exportamos