const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/Restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const Restaurant = require('../restaurant') //載入餐廳model
const db = mongoose.connection
const restaurantList = require('../../restaurant.json')

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  //利用json檔案，產生種子資料
  restaurantList.results.forEach(restaurant => {
    Restaurant.create({
      name: restaurant.name,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      rating: restaurant.rating,
      description: restaurant.description
    })
  })
})