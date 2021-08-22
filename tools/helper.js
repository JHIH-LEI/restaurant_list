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
  },

  updateCityList: function (userId) {
    //取得縣市列表
    const rawCityList = []
    let cityList = []
    return Restaurant.find({ userId })
      .lean()
      .then(restaurants => {
        restaurants.forEach(restaurant => {
          const indexEnd = restaurant.location.indexOf('市' || '縣')
          //如果是空字串，代表無填入縣市，就存入其他；如果有縣市，就存入該縣市名稱。
          const city = restaurant.location.slice(indexEnd - 2, indexEnd + 1) || '其他'
          rawCityList.push(city)
          // 取得不重複的縣市名單
          cityList = [...new Set(rawCityList)]
        })
        return cityList
      })
      .catch(error => console.log(error))
  }
}


module.exports = functions