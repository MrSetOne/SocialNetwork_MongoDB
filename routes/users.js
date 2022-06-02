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
router.delete('/admin/:id', authentication, isAdmin, userController.deleteByAdmin)

module.exports = router