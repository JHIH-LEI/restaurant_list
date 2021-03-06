const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const usePassport = require('./config/passport')
require('dotenv').config()
require('./config/mongoose.js')
const exphbs = require('express-handlebars')
const routes = require('./routes')

const app = express()

const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(flash())
usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.error = req.flash('error') //登陸錯誤訊息
  res.locals.success = req.flash('success')
  res.locals.googleMapApi = process.env.GOOGLE_MAP_API_KEY
  next()
})
// 設定靜態資料來源與bodyParser用於處理表單回傳資料
app.use(express.static(`public`), bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})