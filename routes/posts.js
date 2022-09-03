const express = require('express');
const PostController = require('../controllers/PostController');
const { authentication, isAdmin, isAuthorPost } = require('../middelwares/authentications');
const { deleterPost } = require('../middelwares/deleters');
const imgSource = require('../middelwares/imgsource');
const uploadFirebase = require('../services/firebase')
const router = express.Router();

router.post('/', authentication, imgSource.single('img'), uploadFirebase, PostController.create);
router.put('/id/:_id', authentication, isAuthorPost, imgSource.single('img'), uploadFirebase, PostController.update);
router.delete('/id/:_id', authentication, isAuthorPost, deleterPost, PostController.delete);
router.delete('/admin/id/:_id', authentication, isAdmin, deleterPost, PostController.delete);
router.get('/', authentication, PostController.getAll);
router.get('/author/:_id', authentication, PostController.getByAuthor)
router.get('/title/:title', authentication, PostController.getByTitle);
router.get('/id/:_id', authentication, PostController.getById);
router.put('/like/id/:_id', authentication, PostController.like);
router.put('/unlike/id/:_id', authentication, PostController.unlike)


module.exports = router