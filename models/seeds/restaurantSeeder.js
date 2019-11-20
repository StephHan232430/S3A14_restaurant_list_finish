const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantSeeds = require('./restaurant.json')

mongoose.connect('mongodb://localhost/restaurants', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('db error!')
})

db.once('open', () => {
  console.log('db connected!')
})

for (let i = 0; i < restaurantSeeds.results.length; i++) {
  Restaurant.create(restaurantSeeds.results[i])
}