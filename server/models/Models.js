var mongoose = require('mongoose')

// 定义users文档结构(schema)
var articleSchema = new mongoose.Schema({
  title: String,
  date: String,
  labels: Array,
  content: String
})
// 定义users文档结构(schema)
var userSchema = new mongoose.Schema({
  username: String,
  password: String
})
const Models = {
  User: mongoose.model('User', userSchema),
  Article: mongoose.model('Article', articleSchema)
}

module.exports = Models
