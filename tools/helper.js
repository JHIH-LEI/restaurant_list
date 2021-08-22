const Restaurant = require('../models/restaurant')

const functions = {
  getCategories: function (userId) {
    let rawCategory = []
    let categoryList = []
    return Restaurant.find({ userId })
      .lean()
      .then(restaurants => {
        console.log(`餐廳：${restaurants}`)
        restaurants.forEach(restaurant => {
          rawCategory.push(restaurant.category)
          categoryList = [...new Set(rawCategory)]
        })
        return categoryList
      })
      .catch(error => console.log(error))
  }
}


module.exports = functions