const express = require('express')
const controller = require('../controllers/auth')

const router = express.Router()

///api/v1/auth/login
router.post('/login', controller.login)
///api/v1/auth/register
router.post('/register', controller.register)
router.get('/logout', controller.logout)

module.exports = router