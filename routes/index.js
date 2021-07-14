const express = require('express')
const router = express.Router()

const home = require('./modules/home.js')
const restaurant = require('./modules/restaurant.js')
const search = require('./modules/search')

router.use('/', home)
router.use('/restaurant', restaurant)
router.use('/', search)


module.exports = router