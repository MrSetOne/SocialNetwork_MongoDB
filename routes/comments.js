const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/CommentsController');
const { authentication, isAuthorComment, isAdmin } = require('../middelwares/authentications');

router.post('/id/:_id', authentication, commentsController.create);
router.put('/id/:_id', authentication, isAuthorComment, commentsController.update);
router.delete('/id/:_id', authentication, isAuthorComment, commentsController.deleteByUser);
router.delete('/admin/id/:_id', authentication, isAdmin, commentsController.deleteByAdmin);
router.put('/like/id/:_id', authentication, commentsController.like);
router.put('/unlike/id/:_id', authentication, commentsController.unlike)

module.exports = router