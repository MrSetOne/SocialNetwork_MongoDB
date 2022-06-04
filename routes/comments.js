const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/CommentsController');
const { authentication } = require('../middelwares/authentications');

router.post('/id/:_id', authentication, commentsController.create);

module.exports = router