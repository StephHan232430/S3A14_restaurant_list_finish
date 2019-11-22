const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

// 註冊檢查
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  let errors = []

  if (!email || !password || !password2) {
    errors.push('註冊失敗...email、password和confirm password為必填')
  }

  if (password !== password2) {
    errors.push('註冊失敗...password與confirm password不符')
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push('註冊失敗...此email已被註冊過')
        res.render('register', { errors, name, email, password, password2 })
      } else {
        const newUser = new User({
          name,
          email,
          password
        })

        // 新使用者存入資料庫前，先處理密碼雜湊
        // 先產生salt，複雜度係數設為10，callback傳入err和產生的salt
        bcrypt.genSalt(10, (err, salt) => {
          // 再以newUser.password為目標，用salt做雜湊，callback傳入err和產生的hash
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            // 如果有err，直接丟出err; 如果沒有err，將newUser的password設為hash
            if (err) throw err
            newUser.password = hash

            // bcrypt處理完newUser的密碼後，馬上將newUser存入資料庫
            newUser
              .save()
              .then(user => {
                res.redirect('/')
              })
              .catch(err => console.log(err))
          })
        })
      }
    })
  }
})

// 登入頁面
router.get('/login', (req, res) => {
  const errors = req.flash().error
  res.render('login', { errors })
})

// 登入檢查
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
    failureMessage: 'true'
  })(req, res, next)
})

// 登出
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已成功登出~')
  res.redirect('/users/login')
})

module.exports = router




// const { email, password } = req.body
  // , (err, user, info) => {
  //   let errors = []
  //   if (err) {
  //     return console.error(err)
  //   }
  //   if (info.message === '密碼錯誤' || info.message === '請先註冊才可登入使用') {
  //     errors.push({ message: info.message })
  //     return res.render('login', { errors, email, password })
  //   }
  //   if (user) {
  //     return res.redirect('/')
  //   }