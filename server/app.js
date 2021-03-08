const express = require('express');
const cors = require('cors');
const queryString = require('query-string');
const bodyParser = require('body-parser');
const path = require('path');
const log4js = require('log4js');
const log4js_config = require('./configs/log4')
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
//接管console日志，自动区分类别
log4js.configure(log4js_config);
const loggerOfConsole = log4js.getLogger('console');
console.log = loggerOfConsole.info.bind(loggerOfConsole); // do the same for others - console.debug, etc.
console.debug = loggerOfConsole.info.bind(loggerOfConsole);
 
app.use(log4js.connectLogger(loggerOfConsole, { level: 'auto' }));
//app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));
//log4js.replaceConsole(log4js.getLogger("db"));

var log = log4js.getLogger(path.basename(__filename));
// log.info('app start...');
// log.trace('log trace test');
// log.debug('log debug test');
// log.info('log info test');
// log.warn('log warn test');
// log.error('log error test');
// log.fatal('log fatal test');
console.log('请在程序运行目录下查看log4js日志');//这里打一个console.log是为了让程序调试时，运行时，或者在pm2里，能够得一个提示，如果不输出任何信息可能会被识以为未启动，因为log4js可能已经接管了console。


app.listen(9099, function () {
  console.log('Node app start at port 9099')
})

