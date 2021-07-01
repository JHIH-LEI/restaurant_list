const express = require('express')
const app = express()
const restaurantList = require('./restaurant.json')
const exphbs = require('express-handlebars')

const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定靜態資料來源
app.use(express.static(`public`))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// 使用者可以看個別餐廳的show page
app.get('/restaurants/:restaurant_id', (req, res) => {
  // 根據不同的id回傳不同的資料
  const restaurant = restaurantList.results.find(restaurant => {
    return restaurant.id.toString() === req.params.restaurant_id
  })
  res.render('show', { restaurant })
})

// 使用者可以透過搜尋餐廳名稱或類別找到餐廳
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  // 獲得符合關鍵字的餐廳列表
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword)
  })
  res.render('index', { restaurants, keyword })
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})