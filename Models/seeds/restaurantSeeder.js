const db = require('../../config/mongoose.js')
const Restaurant = require('../restaurant') //載入餐廳model

const restaurantList = require('../../restaurant.json')

db.once('open', () => {
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