const express = require('express');
const UserController = require('../controllers/UserController');
const { authentication, isAdmin } = require('../middelwares/authentications');
const router = express.Router();

router.post('/', UserController.create);
router.get('/confirm/:authorization', UserController.verify);
router.put('/login', UserController.login);
router.put('/logout', authentication, UserController.logout);
router.put('/modify', authentication, UserController.updateUser);
router.delete('/', authentication, UserController.deleteByUser);
router.delete('/admin/:_id', authentication, isAdmin, UserController.deleteByAdmin)
router.get('/', authentication, UserController.getAllUsers)
router.get('/admin', authentication, isAdmin, UserController.getAllUsersByAdmin);
router.get('/session', authentication, UserController.getSession);
router.get('/id/:_id', authentication, UserController.getById);
router.get('/user/:username', authentication, UserController.getByUsername);

module.exports = router