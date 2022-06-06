const express = require('express');
const PostController = require('../controllers/PostController');
const { authentication, isAdmin, isAuthorPost } = require('../middelwares/authentications');
const { imgSourcePost } = require('../middelwares/imgsource');
const router = express.Router();

router.post('/', authentication, imgSourcePost.single('img'), PostController.create);
router.put('/id/:_id', authentication, isAuthorPost, imgSourcePost.single('img'), PostController.update);
router.delete('/id/:_id', authentication, isAuthorPost, PostController.deleteByUser);
router.delete('/admin/id/:_id', authentication, isAdmin, PostController.deleteByAdmin);
router.get('/', authentication, PostController.getAll);
router.get('/title/:title', authentication, PostController.getByTitle);
router.get('/id/:_id', authentication, PostController.getById);
router.put('/like/id/:_id', authentication, PostController.like);
router.put('/unlike/id/:_id', authentication, PostController.unlike)


module.exports = router