const mongoose = require('mongoose')
const settings = require('./settings')


const DB_URL = `mongodb://${settings.host}:${settings.port}/${settings.db}`
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function () {
  console.log('mongo connect success')
})