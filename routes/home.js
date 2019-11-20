const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

// restaurant首頁
router.get('/', (req, res) => {
  Restaurant.find({})
    .sort({ _id: 'asc' })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { restaurants })
    })
})

module.exports = router