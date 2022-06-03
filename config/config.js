const mongoose = require("mongoose"); //Nos importamos mongoose para usarlo en la funcion dbConnection

require("dotenv").config();
const { MONGO_URI_TEST, MONGO_URI, DB_TEST } = process.env

const dbConnection = async() => {
    try {
        if (DB_TEST == 'true') {
            await mongoose.connect(MONGO_URI_TEST); //Metodo que se intenta conectar a la BBDD
            console.log('Te has conectado al test');
        } else {
            await mongoose.connect(MONGO_URI);
            console.log('te as conectado al deploy');
        }
        console.log("BBDD conectada con éxito");
    } catch (error) {
        console.error(error);
        throw new Error("Algo ha fallado a la hora de conectar con la BBDD");
    }
};

module.exports = {
    dbConnection, //Exportamos la funcion dbConnection
};