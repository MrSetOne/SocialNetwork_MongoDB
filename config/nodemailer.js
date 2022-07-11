const nodemailer = require('nodemailer');
require("dotenv").config();
const { EMAIL_USER, EMAIL_PASS } = process.env

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
})


module.exports = transporter;