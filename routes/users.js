const express = require('express');
const userController = require('../controllers/UserController');
const { authentication, isAdmin } = require('../middelwares/authentications');
const router = express.Router();

router.post('/', userController.create);
router.get('/confirm/:authorization', userController.verify);
router.put('/login', userController.login);
router.put('/logout', authentication, userController.logout);
router.put('/modify', authentication, userController.updateUser);
router.delete('/', authentication, userController.deleteByUser);
router.delete('/admin/:_id', authentication, isAdmin, userController.deleteByAdmin)
router.get('/', authentication, userController.getAllUsers)
router.get('/admin', authentication, isAdmin, userController.getAllUsersByAdmin);
router.get('/session', authentication, userController.getSession);
router.get('/id/:_id', authentication, userController.getById)
module.exports = router