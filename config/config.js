const mongoose = require("mongoose"); //Nos importamos mongoose para usarlo en la funcion dbConnection

const { MONGO_URI } = require("./keys"); //Nos traemos MONGO_URI del archivo keys.js

const dbConnection = async() => {
    try {
        await mongoose.connect(MONGO_URI); //Metodo que se intenta conectar a la BBDD
        console.log("BBDD conectada con éxito");
    } catch (error) {
        console.error(error);
        throw new Error("Algo ha fallado a la hora de conectar con la BBDD");
    }
};

module.exports = {
    dbConnection, //Exportamos la funcion dbConnection
};