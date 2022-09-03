const multer = require("multer");

// ! STABLE VERSION

// const storagePorfile = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './assets/porfile');
//     },
//     filename: function(req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// })
// const imgSourcePorfile = multer({ storage: storagePorfile });


// * TESTING VERSION


const imgSourcePorfile = multer({ storage: multer.memoryStorage() });




const storagePost = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './assets/postsImgs');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const imgSourcePost = multer({ storage: storagePost });





module.exports = { imgSourcePorfile, imgSourcePost }