const nodemailer = require('nodemailer');
require("dotenv").config();
const { EMAIL_USER, EMAIL_PASS } = process.env

let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
})


module.exports = transporter;