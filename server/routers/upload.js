const express = require('express');
const path = require('path');
const multer = require('multer');

const dir = path.resolve(__dirname, '../statics/img/');
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

let router = express.Router();

router.post('/', upload.single('file'), (req, res) => {
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

module.exports = router;