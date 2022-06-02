const TypeError = (error, req, res, next) => {
    if (error.errors) {
        error.feedback = []
        for (const fail in error.errors) {
            error.feedback.push(error.errors[fail].path);
        };
        return res.status(400).send({
            message: 'Faltan campos por rellenar',
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

    } else {
        return res.status(500).send({ message: `Algo ha fallado en el controlador de ${error.origin}`, error });
    }
};

module.exports = { TypeError }