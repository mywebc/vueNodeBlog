let express = require('express')
let app = express()
// 引入db,目的打开数据库
let db = require('./models/db')  // eslint-disable-line
let session = require('express-session')
let router = require('./controller/router')
let cors = require('cors')
let bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

// 设置跨域(所有)
app.use(cors())
// 使用session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// 保存文章
app.post('/saveArticle', jsonParser, router.saveArticle)
// 读取全部文章
app.get('/getArticle', jsonParser, router.getArticle)
// 根据id获取文章内容
app.get('/getArticleDetail/:id', jsonParser, router.getArticleDetail)
// 更新文章
app.post('/updateArticle', jsonParser, router.updateArticle)
// 删除文章
app.post('/deleteArticle', jsonParser, router.deleteArticle)
// 获取标签相关文章
app.get('/getLabelDetail/:label', jsonParser, router.getLabelDetail)
// 查看用户名是否重复
app.get('/getUser/:name', jsonParser, router.getUser)
// 注册
app.post('/signup', jsonParser, router.signup)
// 登录
app.post('/signin', jsonParser, router.signin)
app.listen(3000)
