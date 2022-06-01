const express = require('express');
const userController = require('../controllers/UserController');
const { authentication } = require('../middelwares/authentication');
const router = express.Router();

router.post('/', userController.create);
router.get('/confirm/:authorization', userController.verify);
router.put('/login', userController.login);
router.put('/logout', authentication, userController.logout)

module.exports = router