// 載入框架、套件
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
// 載入connect-flash
const flash = require('connect-flash')
const app = express()

// 判別開發環境，如果不是正式上線模式，就使用dotenv讀取.env檔案
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// 設定連線至mongoDB，連線後回傳connection物件
mongoose.connect('mongodb://localhost/restaurants', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection
// db連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

// db連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 設定靜態資料夾
app.use(express.static('public'))

// 設定樣版引擎
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'main' }))
app.set('view engine', 'hbs')

// 設定body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// 設定method-override
app.use(methodOverride('_method'))


// 設定express-session
app.use(session({
  secret: 'restaurants',
  resave: false,
  saveUninitialized: true
}))

// 使用connect-flash
app.use(flash())

// 使用passport
app.use(passport.initialize())
app.use(passport.session())

// 載入passport config
require('./config/passport')(passport)

// 把req.user內的使用者資訊放進res.locals，方便後續view使用
// 把req.isAuthenticated()結果放進res.locals，讓view可以用來辨識使用者是否已登入
// 將req的flash訊息存入res.locals
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// 設定路由
app.use('/', require('./routes/home'))
app.use('/restaurants', require('./routes/restaurant'))
app.use('/search', require('./routes/search'))
app.use('/users', require('./routes/user'))
app.use('/auth', require('./routes/auths'))

// 啟動並監聽伺服器
app.listen(3000, () => {
  console.log('App is running!')
})