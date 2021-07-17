const express = require('express')
const router = express.Router()
const Restaurant = require('../../Models/restaurant.js')

let rawCityList = []
let cityList = []

//取得縣市列表
function updateCityList() {
  Restaurant.find()
  .lean()
  .then(restaurants => {
    restaurants.forEach(restaurant => {
      const indexEnd = restaurant.location.indexOf('市' || '縣')
      //如果是空字串，代表無填入縣市，就存入其他；如果有縣市，就存入該縣市名稱。
      const city = restaurant.location.slice(indexEnd-2 , indexEnd+1) ? restaurant.location.slice(indexEnd-2 , indexEnd+1) : '其他'
      rawCityList.push(city)
      // 取得不重複的縣市名單
      return cityList = [...new Set(rawCityList)]
      res.render('index', { cityList})
    })
  })
  .catch(error => console.log(error))
}


router.get('/', (req, res) => {
  const sortBy = req.query.sortBy ? req.query.sortBy : '_id'
  const order = req.query.order ? req.query.order : 'asc'
  const condition = req.query.condition
  updateCityList()
  if(condition) {
    //根據篩選條件，只顯示含有condition字串的資料
     Restaurant.find({[sortBy]: {$regex:new RegExp(condition)}})
      .lean()
      .then(restaurants => {
      res.render('index', {restaurants, cityList})
    })
    .catch(error => console.log(error))
  } else {
    Restaurant.find()
    .lean()
    .collation( { locale: 'en_US' } ) //不分大小寫
    .sort({[sortBy]:order})
    .then(restaurants => {
      res.render('index', {restaurants, cityList})
    })
    .catch(error => console.log(error))
  }
})

module.exports = router