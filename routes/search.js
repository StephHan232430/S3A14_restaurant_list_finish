const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

router.get('/', (req, res) => {
  const keyword = req.query.keyword
  const sort = req.query.sort
  const regex = new RegExp(keyword, 'i')
  let filter
  let sortType

  switch (sort) {
    case 'ascend':
      filter = { name_en: 'asc' }
      sortType = '英文店名A-Z'
      break
    case 'descend':
      filter = { name_en: 'desc' }
      sortType = '英文店名Z-A'
      break
    case 'category':
      filter = { category: 'asc' }
      sortType = '類型'
      break
    case 'location':
      filter = { location: 'asc' }
      sortType = '地區'
      break
    case 'ratingDescend':
      filter = { rating: 'desc' }
      sortType = '評分高至低'
      break
    case 'ratingAscend':
      filter = { rating: 'asc' }
      sortType = '評分低至高'
      break
    default:
      filter = { _id: 'asc' }
      break
  }

  Restaurant.find()
    .or([
      { name: regex },
      { name_en: regex },
      { category: regex }
    ])
    .sort(filter)
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      const noMatched = restaurants.length === 0 ? true : false
      return res.render('index', { restaurants, keyword, sortType, noMatched })
    })
})

module.exports = router