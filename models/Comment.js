const mongoose = require('mongoose') //Nos traemos los metodos de mongoose
const ObjectId = mongoose.SchemaTypes.ObjectId; //No traemos la propiedad de ObjectId para porder linkear

const commentSchema = new mongoose.Schema({ //Definimos el tipo de dato que va a contener

    author: [
        { userId: { type: ObjectId, ref: 'User' } }
    ],

    comment: String,

    likes: [
        { userId: { type: ObjectId, ref: 'User' } }
    ],

}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema); //Generamos el modelo como tal

module.exports = Comment //Lo exportamos