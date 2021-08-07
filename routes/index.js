const express = require('express')
const router = express.Router()

const home = require('./modules/home.js')
const restaurant = require('./modules/restaurant.js')
const search = require('./modules/search')
const user = require('./modules/user')

router.use('/restaurant', restaurant)
router.use('/search', search)
router.use('/user', user)
router.use('/', home)

module.exports = router