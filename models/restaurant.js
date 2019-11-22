const mongoose = require('mongoose')
const Schema = mongoose.Schema
require('mongoose-type-url')

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  name_en: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: mongoose.SchemaTypes.Url,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    maxlength: 12,
    required: true,
    validate: {
      validator: function (v) {
        return /\d{2} \d{4} \d{4}/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  google_map: {
    type: mongoose.SchemaTypes.Url,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true
  },
  description: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)