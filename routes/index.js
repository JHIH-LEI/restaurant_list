const express = require('express')
const router = express.Router()

const home = require('./modules/home.js')
const restaurant = require('./modules/restaurant.js')
const search = require('./modules/search')
const user = require('./modules/user')
const { authenticator } = require('../middleware/auth')

router.use('/restaurant', authenticator, restaurant)
router.use('/search', authenticator, search)
router.use('/users', user)
router.use('/', authenticator, home)

module.exports = router