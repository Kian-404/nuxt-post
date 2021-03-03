const express = require('express');

const app = express()

const Upload = require('./upload.js');
const Data = require('./data.js');
const Query = require('./query.js');
const Insert = require('./insert.js');


app.use('/upload', Upload);
app.use('/data', Data);
app.use('/query', Query);
app.use('/insert', Insert);

module.exports = app;