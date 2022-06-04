const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/CommentsController');
const { authentication, isAuthorComment } = require('../middelwares/authentications');

router.post('/id/:_id', authentication, commentsController.create);
router.put('/id/:_id', authentication, isAuthorComment, commentsController.update)

module.exports = router