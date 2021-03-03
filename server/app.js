const express = require('express');
const cors = require('cors');
const queryString = require('query-string')
const bodyParser = require('body-parser');
const path = require('path');

require('./configs/connect.js')

const Router  = require('./routers/index.js');

//新建app模块
const app = express()

app.use('/public', express.static(path.join(__dirname, './statics')));

app.use(bodyParser.json())
app.use(cors());

app.get('/', function (req, res) {
  res.send('<h1>Hello world</h1>')   //发送Html
})

app.use(Router);


app.listen(9099, function () {
  console.log('Node app start at port 9099')
})

