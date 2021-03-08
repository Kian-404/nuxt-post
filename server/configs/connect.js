const mongoose = require('mongoose')
const settings = require('./settings')


const DB_URL = `mongodb://${settings.host}:${settings.port}/${settings.db}`
mongoose.connect(DB_URL)

mongoose.connection.on('connected', function () {
  console.log('mongo connect success')
})

mongoose.connection.on('error', function () {
  console.log('mongo connect error');
})

mongoose.connection.on('close', function () {
  console.log('mogo connect close')
})