const models = require('./../models/Models')

// 根据用户名获取信息
exports.getUser = function (req, res, next) {
  models.User.findOne({ username: req.params.name }, function (err, docs) {
    if (err) {
      console.error(err)
      return
    }
    res.send(docs)
  })
}
// 注册
exports.signup = function (req, res, next) {
  models.User.create(req.body.userInfo, function (err, doc) {
    if (err) {
      res.status(500).send()
      return
    }
    res.send()
  })
}
// 登录
exports.signin = function (req, res, next) {
  res.send()
}
// 保存文章
exports.saveArticle = function (req, res, next) {
  // 接受前台数据
  var queryData = req.body.params
  models.Article.create({
    'title': queryData.title,
    'date': queryData.date,
    'labels': queryData.label,
    'content': queryData.content
  }, function (err, doc) {
    if (err) {
      res.status(500).send()
      return
    }
    res.send('插入数据库成功！')
  })
}
// 读取全部文章
exports.getArticle = function (req, res, next) {
  models.Article.find({}, function (err, doc) {
    if (err) {
      console.log(err)
      return
    }
    res.json(doc)
  })
}
// 根据文章id获取文章内容
exports.getArticleDetail = function (req, res, next) {
  models.Article.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) {
      console.error(err)
      return
    }
    res.json(doc)
  })
}
// 文章更新
exports.updateArticle = function (req, res, next) {
  var updateData = req.body.params
  models.Article.find({_id: updateData._id}, function (err, doc) {
    if (err) {
      res.status(500).send()
      return
    }
    doc[0].title = updateData.title
    doc[0].date = updateData.date
    doc[0].content = updateData.content
    doc[0].labels = updateData.label
    models.Article(doc[0]).save(function (err) {
      if (err) {
        res.status(500).send()
        return
      }
      res.send()
    })
  })
}
// 删除文章
exports.deleteArticle = function (req, res, next) {
  var deleteData = req.body.params
  models.Article.remove({_id: deleteData._id}, function (err) {
    if (err) {
      res.status(500).send()
      return
    }
    res.send()
  })
}
// 获取标签文章
exports.getLabelDetail = function (req, res, next) {
  if (req.params.label === '[]') {
    models.Article.find({ labels: [] }, function (err, doc) {
      if (err) {
        console.error(err)
        return
      }
      res.json(doc)
    })
  } else {
    models.Article.find({ labels: req.params.label }, function (err, doc) {
      if (err) {
        console.error(err)
        return
      }
      res.json(doc)
    })
  }
}
