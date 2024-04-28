const express = require("express");
const router = express.Router()
const userController = require('../controllers/UserController');


router.get('/sign-up', userController.createUser)
router.get('/sign-in', userController.loginUser)


module.exports = router