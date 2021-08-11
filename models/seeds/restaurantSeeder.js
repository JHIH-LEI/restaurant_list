const db = require('../../config/mongoose.js')
const Restaurant = require('../restaurant')//載入餐廳model
const User = require('../user')

const restaurantList = require('../../restaurant.json').results
const bcrypt = require('bcryptjs')

//使用者原始資料
const SEED_USERS = [
  {
    name: 'Alicia',
    email: '123@gmail.com',
    password: '123',
    haveRestaurantId: [1, 2, 3]
  },
  {
    name: 'Darius',
    email: 'abc@gmail.com',
    password: 'abc',
    haveRestaurantId: [1, 2, 3]
  }]

db.once('open', () => {
  Promise.all(Array.from(SEED_USERS, (SEED_USER, i) => {
    //創建使用者，並加密密碼
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(SEED_USER.password, salt))
      .then(hash =>
        User.create({
          name: SEED_USER.name,
          email: SEED_USER.email,
          password: hash
        }))
      //創建該使用者的餐廳資料
      .then(user => {
        const userId = user._id //獲取該名使用者的id
        const restaurants = restaurantList.filter(restaurant => SEED_USER.haveRestaurantId.includes(restaurant.id)) //返回該名使用者的餐廳列表
        restaurants.forEach(restaurant => restaurant.userId = userId) //將這些餐廳資料寫入該名使用者的id
        return Restaurant.create(restaurants) //將餐廳新增到資料庫
      })
  }))
    .then(() => {
      console.log('done')
      process.exit()
    })
    .catch(err => console.log(err))
})