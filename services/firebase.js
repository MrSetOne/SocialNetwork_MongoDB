const { FIREBASESTORAGE } = process.env

var admin = require("firebase-admin");

var serviceAccount = require("../config/firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: FIREBASESTORAGE
});

const bucket = admin.storage().bucket()

const uploadFirebase = (req, res, next) => {
    if (!req.file) {
        return next()
    } else {
        const image = req.file
        const imageName = `${Date.now()}.${req.file.originalname.split('.').pop()}`
        const file = bucket.file(imageName);

        const stream = file.createWriteStream({
            metadata: {
                contentType: image.mimetype
            }
        });

        stream.on("error", (e) => {
            console.error(e)
        });

        stream.on('finish', async() => {
            await file.makePublic();
            req.body.imgUrl = file.metadata.mediaLink
            next()
        })

        stream.end(image.buffer)
    }

};

module.exports = uploadFirebase;