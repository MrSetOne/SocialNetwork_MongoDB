const TypeError = (error, req, res, next) => {
    if (error.errors) {
        error.feedback = []
        for (const fail in error.errors) {
            error.feedback.push({ path: error.errors[fail].path, message: error.errors[fail].message });
        };
        return res.status(400).send({
            message: 'Error en la validacion de los campos:',
            feedback: error.feedback
        });
    } else if (error.keyPattern) {
        const failed = Object.keys(error.keyPattern);
        const failedValue = error.keyValue[failed[0]];
        return res.status(400).send({
            message: `El ${failed[0]} ${failedValue} ya está en uso.`,
            failedField: failed[0],
            failedValue
        });

    } else if (error.kind == "ObjectId") {
        return res.send(`El id ${error.value} no existe`)
    } else {
        return res.status(500).send({ message: `Algo ha fallado en el controlador de ${error.origin}`, error });
    }
};

module.exports = { TypeError }