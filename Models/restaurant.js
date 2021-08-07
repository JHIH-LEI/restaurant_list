const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
  phone: String,
  rating: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    index: true,
    require: true
  }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)