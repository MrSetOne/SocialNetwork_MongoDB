const express = require('express');
const userController = require('../controllers/UserController');
const UserController = require('../controllers/UserController');
const { authentication, isAdmin } = require('../middelwares/authentications');
const { deleterUser } = require('../middelwares/deleters');
const router = express.Router();

router.post('/', UserController.create);
router.get('/confirm/:authorization', UserController.verify);
router.put('/login', UserController.login);
router.put('/logout', authentication, UserController.logout);
router.put('/modify', authentication, UserController.updateUser);
router.delete('/', authentication, deleterUser, UserController.delete);
router.delete('/admin/:_id', authentication, isAdmin, deleterUser, UserController.delete)
router.get('/', authentication, UserController.getAllUsers)
router.get('/admin', authentication, isAdmin, UserController.getAllUsersByAdmin);
router.get('/session', authentication, UserController.getSession);
router.get('/id/:_id', authentication, UserController.getById);
router.get('/user/:username', authentication, UserController.getByUsername);
router.put('/follow/:_id', authentication, userController.follow);
router.put('/unfollow/:_id', authentication, userController.unfollow);


module.exports = router