const express = require('express')
const app = express()
const restaurantList = require('./restaurant.json')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./Models/restaurant')
const bodyParser = require('body-parser')

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
const port = 3000

mongoose.connect('mongodb://localhost/Restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

//取得資料庫連線狀態
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定靜態資料來源與bodyParser用於處理表單回傳資料
app.use(express.static(`public`), bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
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

//新增一筆餐廳資料頁面
app.get('/restaurant/new', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurant => {
      res.render('new', { restaurant, categoryList })
    })
    .catch(error => console.log(error))
})

// 新增一筆餐廳資料
app.post('/restaurant', (req, res) => {
  const name = req.body.name
  const category = req.body.category
  const location = req.body.location
  const phone = req.body.phone
  const rating = req.body.rating
  const image = req.body.image
  const description = req.body.description
  return Restaurant.create({ name, category, location, phone, rating, image, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 使用者可以看個別餐廳的show page
app.get('/restaurants/:restaurant_id', (req, res) => {
  // 根據不同的id回傳不同的資料
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//編輯餐廳頁面
app.get('/restaurant/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => {
      res.render('edit', { restaurant, categoryList })
    })
    .catch(error => console.log(error))
})

// 編輯餐廳
app.post('/restaurant/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  //儲存表單資料
  const name = req.body.name
  const category = req.body.category
  const location = req.body.location
  const phone = req.body.phone
  const rating = req.body.rating
  const image = req.body.image
  const description = req.body.description
  return Restaurant.findById(id)
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
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// 刪除餐廳
app.post('/restaurant/:restaurant_id/delete', (req, res) => {
  const id = req.params.restaurant_id
  const name = req.body.name
  return Restaurant.findById(id)
    .then(restaurant => {
      return restaurant.remove()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 使用者可以透過搜尋餐廳名稱或類別找到餐廳
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  // 獲得符合關鍵字的餐廳列表
  const restaurants = restaurantList.results.filter(restaurant => {
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

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})