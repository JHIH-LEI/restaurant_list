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

//新增一筆餐廳資料頁面
router.get('/new', (req, res) => {
  res.render('new', { categoryList })
})

// 新增一筆餐廳資料
router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, category, location, phone, rating, image, description } = req.body
  return Restaurant.create({ name, category, location, phone, rating, image, description, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 使用者可以看個別餐廳的show page
router.get('/:restaurant_id', (req, res) => {
  // 根據不同的id回傳不同的資料
  const _id = req.params.restaurant_id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//編輯餐廳頁面

router.get('/:restaurant_id/edit', (req, res) => {
  const _id = req.params.restaurant_id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => {
      res.render('edit', { restaurant, categoryList })
    })
    .catch(error => console.log(error))
})

// 編輯餐廳

router.put('/:restaurant_id', (req, res) => {
  const _id = req.params.restaurant_id
  //儲存表單資料
  const userId = req.user._id
  const { name, category, location, phone, rating, image, description } = req.body
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      //更新資料
      restaurant.name = name
      restaurant.category = category
      restaurant.location = location
      restaurant.phone = phone
      restaurant.rating = rating
      restaurant.image = image
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurant/${_id}`))
    .catch(error => console.log(error))
})

// 刪除餐廳

router.delete('/:restaurant_id', (req, res) => {
  const _id = req.params.restaurant_id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      return restaurant.remove()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router