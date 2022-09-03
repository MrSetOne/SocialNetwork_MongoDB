const multer = require("multer");

const imgSource = multer({ storage: multer.memoryStorage() });

module.exports = imgSource