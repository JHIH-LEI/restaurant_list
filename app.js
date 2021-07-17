const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')


const restaurantList = require('./restaurant.json')
require('./config/mongoose.js')
const exphbs = require('express-handlebars')
const routes = require('./routes')

const app = express()

const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定靜態資料來源與bodyParser用於處理表單回傳資料
app.use(express.static(`public`), bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})