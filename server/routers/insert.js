const express = require('express');
const postList = require('../models/postList');

let router = express.Router();

router.post('/', function (req, res) {
  // debugger;
  console.log(req.body);
  let list = req.body;

  // let list = {
  //   "createTime": new Date(),
  //   "content": "@[toc](目录) \n #### how to use mavonEditor in nuxt.js",
  //   "title": "new post1"
  // }
  postList.insertMany(list, function (err, doc) {
    if (!err) {
      res.send({
        message: '创建成功!',
        code: 1
      })
    }
    // res.json(doc)
  })
})

module.exports = router;