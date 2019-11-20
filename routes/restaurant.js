const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

router.get('/', (req, res) => {
  return res.redirect('/restaurants')
})

// 新增一間restaurant頁面
router.get('/new', (req, res) => {
  res.render('new')
})

// 新增一間restaurant
router.post('/', (req, res) => {
  // 建立Restaurant model的實例
  const restaurant = new Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    google_map: req.body.google_map,
    phone: req.body.phone,
    rating: req.body.rating,
    description: req.body.description
  })
  // 存入資料庫
  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')  //儲存完成後，導回首頁
  })
})

// 顯示一間restaurant的詳細資訊
router.get('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('detail', { restaurant })
  })
})

// detail頁面的restaurant修改頁面
router.get('/:id/detail_edit', (req, res) => {
  const backURL = req.headers.referer
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('detail_edit', { restaurant, backURL })
  })
})

// index頁面的restaurant修改頁面
router.get('/:id/index_edit', (req, res) => {
  const backURL = req.headers.referer
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('index_edit', { restaurant, backURL })
  })
})

// 以session紀錄進入編輯模式的路徑，修改restaurant後，依session的記錄代號重導向至對應頁面
router.put('/:id', (req, res) => {
  if (req.headers.referer.includes('detail')) {
    req.session = 1
  } else if (req.headers.referer.includes('index')) {
    req.session = 0
  }
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.name = req.body.name
    restaurant.name_en = req.body.name_en
    restaurant.category = req.body.category
    restaurant.image = req.body.image
    restaurant.location = req.body.location
    restaurant.google_map = req.body.google_map
    restaurant.phone = req.body.phone
    restaurant.rating = req.body.rating
    restaurant.description = req.body.description
    restaurant.save(err => {
      if (err) {
        return console.error(err)
      } else if (req.session === 1) {
        return res.redirect(`/restaurants/${restaurant.id}`)
      } else if (req.session === 0) {
        return res.redirect('/')
      }
    })
  })
})

// 確認刪除restaurant頁面
router.get('/:id/delete', (req, res) => {
  const backURL = req.headers.referer
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('warning', { restaurant, backURL })
  })
})

// 刪除restaurant
router.delete('/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router