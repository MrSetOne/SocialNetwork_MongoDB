const express = require('express');
const userController = require('../controllers/UserController');
const router = express.Router();

router.post('/', userController.create);
router.get('/confirm/:authorization', userController.verify);
router.put('/login', userController.login)

module.exports = router