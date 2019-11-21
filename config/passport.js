const LocalStrategy = require('passport-local').Strategy
// 載入passport-facebook，加入FacebookStrategy常數
const FacebookStrategy = require('passport-facebook').Strategy
const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' })
        }

        // 在查無此已註冊使用者錯誤狀況後，開始用bcrypt的compare方法來比對使用者輸入的密碼(password)和該使用者註冊實在資料庫內儲存的密碼(user.password)是否符合，callback傳入err和isMatch狀態
        bcrypt.compare(password, user.password, (err, isMatch) => {
          // 如果有err，直接丟出err; 如果isMatch狀態為true，就return done，並將null和user物件傳入done，其他狀態則必為password錯誤，就return done，並將null、false和訊息傳入done
          if (err) throw err
          if (isMatch) {
            return done(null, user)
          } else {
            return done(null, false, { message: 'Password incorrect' })
          }
        })
      })
    })
  )

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ email: profile._json.email })
      .then(user => {
        // 若查無user，代表使用者未註冊過，產生亂數密碼雜湊後，依facebook回傳之profile._json內容建立新使用者，並存入資料庫; 若有則直接將null和user傳入done完成驗證
        if (!user) {
          const randomPassword = Math.random().toString(36).slice(-8)
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(randomPassword, salt, (err, hash) => {
              const newUser = User({
                name: profile._json.name,
                email: profile._json.email,
                password: hash
              })
              newUser.save()
                .then(user => {
                  return done(null, user)
                })
                .catch(err => {
                  console.log(err)
                })
            })
          })
        } else {
          return done(null, user)
        }
      })
  }
  ))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}