const mongoose = require("mongoose"); //Nos importamos mongoose para usarlo en la funcion dbConnection

const { MONGO_URI } = require("./keys"); //Nos traemos MONGO_URI del archivo keys.js

const dbConnection = async() => {
    try {
        await mongoose.connect(MONGO_URI); //Metodo que se intenta conectar a la BBDD
        console.log("Base de datos conectada con éxito");
    } catch (error) {
        console.error(error);
        throw new Error("Error a la hora de iniciar la base de datos");
    }
};

module.exports = {
    dbConnection, //Exportamos la funcion dbConnection
};