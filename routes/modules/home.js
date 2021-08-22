const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant.js')
const { updateCityList } = require('../../tools/helper')

router.get('/', (req, res) => {
  const sortBy = req.query.sortBy || '_id'
  const order = req.query.order || 'asc'
  const condition = req.query.condition
  const userId = req.user._id
  const getCityList = updateCityList(userId)
  let restaurants = ''

  if (condition) {
    //根據篩選條件，只顯示含有condition字串的資料
    Restaurant.find({ userId, [sortBy]: { $regex: new RegExp(condition) } })
      .lean()
      .then(data => {
        restaurants = data
        return getCityList
          .then(cityList => {
            res.render('index', { restaurants, cityList })
          })
      })
      .catch(error => console.log(error))
  } else {
    Restaurant.find({ userId })
      .lean()
      .collation({ locale: 'en_US' }) //不分大小寫
      .sort({ [sortBy]: order })
      .then(data => {
        restaurants = data
        return getCityList
          .then(cityList => {
            res.render('index', { restaurants, cityList })
          })
      })
      .catch(error => console.log(error))
  }
})

module.exports = router