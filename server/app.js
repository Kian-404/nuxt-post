/**
 * express Demo
 */
const express = require('express');
const cors = require('cors');
const queryString = require('query-string')
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

const mongoose = require('mongoose')

//链接mongo 并且使用react这个集合
const DB_URL = 'mongodb://127.0.0.1:27017/Kpost'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function () {
  console.log('mongo connect success')
})

//类似于mysql的表 mongo里有文档、字段的概念
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  createTime: Date
  // content: {type:String, require:true},
  // createTime: {type:String, require:true},
  // title: {type:String, require:true}
})
const postList = mongoose.model('postList', postSchema)
// User.find({}, function(err, doc){
//   console.log(doc);
// })
// User.find({}).then(res =>{
//   // console.log(res)
// })
// console.log(User.find({}));


//新建app模块
const app = express()

app.use('/public', express.static(path.join(__dirname, './statics')));
const dir = path.resolve(__dirname, './statics/img/');
const SIZELIMIT = 500000;
const storage = multer.diskStorage({
  // 指定文件路径
  destination: function (req, file, cb) {
    // ！！！相对路径时以node执行目录为基准，避免权限问题，该目录最好已存在*
    // cb(null, './uploads');
    cb(null, dir);
  },
  // 指定文件名
  filename: function (req, file, cb) {
    // filedname指向参数key值
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage
});

app.use(bodyParser.json())
app.use(cors());

app.get('/', function (req, res) {
  res.send('<h1>Hello world</h1>')   //发送Html
})

app.post('/upload', upload.single('file'), (req, res) => {
  // 即将上传图片的key值 form-data对象{key: value}
  // 检查是否有文件待上传
  if (req.file === undefined) {
    return res.send({
      errno: -1,
      msg: 'no file'
    });
  }
  const { size, mimetype, filename } = req.file;
  const types = ['jpg', 'jpeg', 'png', 'gif'];
  const tmpTypes = mimetype.split('/')[1];
  // 检查文件大小
  if (size >= SIZELIMIT) {
    return res.send({
      errno: -1,
      msg: 'file is too large'
    });
  }
  // 检查文件类型
  else if (types.indexOf(tmpTypes) < 0) {
    return res.send({
      errno: -1,
      msg: 'not accepted filetype'
    });
  }
  // 路径可根据设置的静态目录指定
  const url = 'http://localhost:9099' + '/public/img/' + filename;
  res.json({
    errno: 0,
    msg: 'upload success',
    url
  });
});

app.get('/data', async function (req, res) {
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

app.get('/query', function (req, res) {
  console.log(req.query);
  let articleId = req.query.articleId;
  postList.find({ _id: articleId }, function (err, doc) {
    let detail = doc
    res.json({ detail })
  })
})


app.post('/insert', function (req, res) {
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

app.listen(9099, function () {
  console.log('Node app start at port 9093')
})

