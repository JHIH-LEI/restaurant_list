const mongoose = require('mongoose')
const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: String,
  location: {
    type: String,
    required: true,
  },
  phone: Number,
  rating: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    require: true,
  }
})

module.exports('restaurant', restaurantSchema)