const express = require('express')
const router = express.Router()
const Restaurant = require('../../Models/restaurant.js')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => {
      // 將餐廳名單重新排序，根據評分由低到高/由高到低,不需排序的話就直接傳原始資料
      if (req.query.order === 'asc' && req.query.sortBy === 'rating') {
        restaurants.sort((a, b) => {
          // 評分由低到高
          return a.rating - b.rating
        })
      } else if (req.query.order === 'desc' && req.query.sortBy === 'rating') {
        restaurants.sort((a, b) => {
          // 評分由高到低
          return b.rating - a.rating
        })
      }
      res.render('index', { restaurants })
    })
    .catch(error => console.log(error))
})

module.exports = router