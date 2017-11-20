const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.post('/signup', userController.signup)
router.post('/signin', userController.signin)
router.get('/', userController.getAllUser)

module.exports = router;
