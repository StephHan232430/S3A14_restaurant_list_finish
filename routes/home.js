const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

// 載入auth middleware裡的authenticated方法
const { authenticated } = require('../config/auth')

// restaurant首頁，加入authenticated驗證
router.get('/', authenticated, (req, res) => {
  Restaurant.find({})
    .sort({ _id: 'asc' })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { restaurants })
    })
})

module.exports = router