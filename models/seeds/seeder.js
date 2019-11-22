const mongoose = require('mongoose')
const User = require('../user')
const Restaurant = require('../restaurant')
const restaurantSeeds = require('./restaurant.json').results
const userSeeds = require('./user.json').results
const bcrypt = require('bcryptjs')

mongoose.connect('mongodb://localhost/restaurants', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('db error!')
})

db.once('open', () => {
  console.log('db connected!')
})

for (let uNum = 0; uNum < userSeeds.length; uNum++) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(userSeeds[uNum].password, salt, (err, hash) => {
      if (err) throw err
      userSeeds[uNum].password = hash
      User.create(userSeeds[uNum])
        .then(user => {
          for (let rNum = uNum * 3; rNum < (uNum + 1) * 3; rNum++) {
            Restaurant.create({
              name: restaurantSeeds[rNum].name,
              name_en: restaurantSeeds[rNum].name_en,
              category: restaurantSeeds[rNum].category,
              image: restaurantSeeds[rNum].image,
              location: restaurantSeeds[rNum].location,
              phone: restaurantSeeds[rNum].phone,
              google_map: restaurantSeeds[rNum].google_map,
              rating: restaurantSeeds[rNum].rating,
              description: restaurantSeeds[rNum].description,
              userId: user._id
            })
          }
        })
        .catch(err => console.log(err))
    })
  })
}