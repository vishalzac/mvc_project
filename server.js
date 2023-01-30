require('dotenv').config();
const mongoose = require('mongoose')
const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const app = express()
const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))


// const dotenv = require('dotenv').config
// dotenv.config()
if (process.env.NODE_ENV != 'production') {
    // require('dotenv').parse()
}

mongoose.connect(process.env.DATABASE_URL)
mongoose.set('strictQuery', true)
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('connected to mongoose'))



app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)