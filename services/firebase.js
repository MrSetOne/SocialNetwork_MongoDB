const { FIREBASESTORAGE, TYPE, PROJECT_ID, PRIVATE_KEY_ID, PRIVATE_KEY, CLIENT_EMAIL, CLIENT_ID, AUTH_URI, TOKEN_URI, AUTH_PROVIDER_X509_CERT_URL, CLIENT_X509_CERT_URL } = process.env

var admin = require("firebase-admin");

// var serviceAccount = require("../config/firebase.json");

admin.initializeApp({
    credential: admin.credential.cert({
        type: TYPE,
        project_id: PROJECT_ID,
        private_key_id: PRIVATE_KEY_ID,
        private_key: PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: CLIENT_EMAIL,
        client_id: CLIENT_ID,
        auth_uri: AUTH_URI,
        token_uri: TOKEN_URI,
        auth_provider_x509_cert_url: AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: CLIENT_X509_CERT_URL
    }),
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
            req.body.img = file.metadata.mediaLink
            next()
        })

        stream.end(image.buffer)
    }

};

module.exports = uploadFirebase;