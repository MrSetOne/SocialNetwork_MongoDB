const mongoose = require("mongoose");

require("dotenv").config();
const { MONGO_URI_TEST, MONGO_URI, DB_TEST } = process.env

const dbConnection = async() => {
    try {
        if (DB_TEST == 'true') {
            await mongoose.connect(MONGO_URI_TEST);
            console.log('Te has conectado a la DB de testing');
        } else {
            await mongoose.connect(MONGO_URI);
            console.log('Te has conectado a la DB del deploy');
        }
        console.log("BBDD conectada con éxito");
    } catch (error) {
        console.error(error);
        throw new Error("Algo ha fallado a la hora de conectar con la BBDD");
    }
};

module.exports = {
    dbConnection,
};