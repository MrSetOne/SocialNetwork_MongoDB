const express = require('express');
const PostController = require('../controllers/PostController');
const { authentication, isAdmin, isAuthorPost } = require('../middelwares/authentications');
const router = express.Router();

router.post('/', authentication, PostController.create);
router.put('/id/:_id', authentication, isAuthorPost, PostController.update);
router.delete('/id/:_id', authentication, isAuthorPost, PostController.deleteByUser);
router.delete('/admin/id/:_id', authentication, isAdmin, PostController.deleteByAdmin);
router.get('/', authentication, PostController.getAll);
router.get('/title/:title', authentication, PostController.getByTitle);
router.get('/id/:_id', authentication, PostController.getById)


module.exports = router