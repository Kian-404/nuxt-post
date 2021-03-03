const express = require('express');
const postList = require('../models/postList');

let router = express.Router();

router.get('/', function (req, res) {
  console.log(req.query);
  let articleId = req.query.articleId;
  postList.find({ _id: articleId }, function (err, doc) {
    let detail = doc
    res.json({ detail })
  })
})

module.exports = router;