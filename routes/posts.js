const express = require('express');
const PostController = require('../controllers/PostController');
const { authentication, isAdmin } = require('../middelwares/authentications');
const router = express.Router();

router.post('/', authentication, PostController.create);


module.exports = router