const express = require('express')
const router = express.Router()
const Restaurant = require('../../Models/restaurant.js')

const rawCategory = []
let categoryList = []

Restaurant.find()
  .lean()
  .then(restaurant => {
    restaurant.forEach(restaurant => {
      rawCategory.push(restaurant.category)
      categoryList = [...new Set(rawCategory)]
    })
  })
  .catch(error => console.log(error))


// 使用者可以透過搜尋餐廳名稱或類別找到餐廳
router.get('/', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  return Restaurant.find()
    .lean()
    .then(restaurants => {
      // 獲得符合關鍵字的餐廳列表
      restaurants = restaurants.filter(restaurant => {
        // 餐廳名稱or類別關鍵字都能查找餐廳
        return restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword)
      })

      // 判斷是否有匹配結果，若無則回傳no_result，有則回傳index
      if (restaurants.length === 0) {
        res.render('no_result', { keyword, categoryList })
      } else {
        res.render('index', { restaurants, keyword })
      }
    })
})

module.exports = router