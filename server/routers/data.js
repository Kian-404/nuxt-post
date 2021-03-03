const express = require('express');
const postList = require('../models/postList');

let router = express.Router();


router.get('/', async function (req, res) {
  //查询数据
  // console.log(User);
  console.log(res)
  let currentPage = parseInt(req.query['currentPage']) // 转换前端传入当前页码
  let pageSize = parseInt(req.query['pageSize']) // 转换前端传入的每页大小
  let skip = (currentPage - 1) * pageSize // 实现分割查询的skip
  let params = {}
  let post = postList.find(params, { 'title': 1, "createTime": 1, 'pic': 1 }).skip(skip).limit(pageSize);
  let postLength = 0;
  await postList.find({}, function (err, doc) {
    postLength = doc.length;
  })
  console.log(post);
  post.exec(function (err, doc) {
    console.log(doc);
    let list = doc
    res.json({ list: list, count: Math.ceil(postLength / pageSize) })
  })
  // postList.find({}).then(res =>{
  //   res.json(doc)
  // })
  // res.json({name:'imooc React App',type:'IT'}) //发送json
})

module.exports = router;