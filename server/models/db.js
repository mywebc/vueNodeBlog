var mongoose = require('mongoose')
// 连接数据库chatroom
mongoose.connect('mongodb://localhost/vueBlog')

var db = mongoose.connection
// 监听连接状态
db.once('open', function (callback) {
  console.log('数据库成功打开')
})

module.exports = db
