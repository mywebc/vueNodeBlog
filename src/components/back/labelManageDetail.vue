-<template>
  <div class="container-home">
    <Header></Header>
    <div class="home-nav">
      <div class="homeNav">
        <router-link class="tab-item" to="/articleList" style="color: deepskyblue">
          <span class="active">{{title1}}</span>
        </router-link>
        <router-link class="tab-item" to="/articleEdit" >
          <span class="active">{{title2}}</span>
        </router-link>
        <router-link class="tab-item" to="/labelsManage">
          <span class="active">{{title3}}</span>
        </router-link>
        <router-link class="tab-item" to="/sign">
          <span class="active">{{title4}}</span>
        </router-link>
      </div>
    </div>
    <div class="home-content">
      <div class="return_button">
        <el-button icon="arrow-left" size="small" @click="goBack">返回</el-button>
      </div>
      <div class="homeContent" v-for="item in labelArticle" :key="item._id">
        <h1 @click="goDetail(item._id)" style="cursor: pointer">{{item.title}}</h1>
        <label>{{item.date}}</label>
        <span class="article_label">标签：
        <span v-if="item.labels && item.labels.length === 0">未分类</span>
        <el-tag v-else class="tags" type="primary" v-for="tag in item.labels" :key="tag.id">{{ tag }}</el-tag>
        </span>
        <hr>
        <div class="listContent" v-html="compiledMarkdown(item.content)">
        </div>
        <el-button type="primary" @click="articleEdit(item._id)" style="margin-bottom: 10px">修改</el-button>
        <el-button type="danger" @click="deleteArticle(item._id)" style="margin-bottom: 10px">删除</el-button>
      </div>
    </div>
    <div class="home-footer">
      <div class="homeFooter">
        <div>Copyright @ 2018 Powered by Vue. Designed by 陈晓拉尼 | <router-link to="/home">退出</router-link></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Header from 'components/base/header'
import Nav from 'components/base/nav'
import Footer from 'components/base/footer'
import marked from 'marked'
import highlight from 'highlight.js'
import '../../assets/stylus/atom-one-light.css'
import axios from 'axios'
marked.setOptions({
  highlight: function (code) {
    return highlight.highlightAuto(code).value
  }
})
export default {
  data () {
    return {
      title1: '文章管理',
      title2: '写文章',
      title3: '标签管理',
      title4: '关于我',
      labelArticle: []
    }
  },
  mounted () {
    axios.get('http://192.168.43.54:3000/getLabelDetail/' + this.$route.params.label).then(
      (response) => {
        this.labelArticle = response.data
      }
    ).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    compiledMarkdown: function (content) {
      return marked(content || '', {sanitize: true})
    },
    goBack: function () {
      this.$router.go(-1)
    },
    readMore (id) {
      this.$router.push('/blogDetail/' + id)
    },
    articleEdit (id) {
      this.$router.push({
        path: '/articleEdit/' + id
      })
    },
    // 删除文章
    deleteArticle: function (id) {
      let self = this
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('http://192.168.43.54:3000/deleteArticle', {
          params: {
            _id: id
          }
        }).then(
          (response) => {
            self.$message({
              type: 'success',
              message: '删除成功!'
            })
            self.fetchData()
          },
          response => {
            console.log(response)
          }
        )
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    goDetail (id) {
      this.$router.push('/blogDetail/' + id)
    }
  },
  components: {
    Header,
    Nav,
    Footer
  }
}
</script>

<style scoped lang="stylus">
  .container-home
    display flex
    display -webkit-flex
    flex-flow column
    min-height 100vh
    .home-nav
      display flex
      display -webkit-flex
      flex 0.5
      background-color #3d3d3d
      justify-content center
      align-items stretch
      min-height 5vh
      .homeNav
        width: 50%
        display: flex
        justify-content center
        align-items center
        .tab-item
          width: 25%
        a
          display: block
          list-style none
          color: #fff
          flex 1
          cursor pointer
          text-decoration none
          &.router-link-active
            .active
              color deepskyblue
    .home-content
      display flex
      display -webkit-flex
      flex-direction column
      flex 5
      background-color #fff
      justify-content center
      align-items center
      min-height 60vh
      .return_button
        width: 50%
        margin 10px
        text-align left
      .homeContent
        width: 50%
        margin 10px
        border: 1px solid #aaa
        box-shadow 1px 1px 1px gray
        h1
          color #000
          font-size 24px
          font-family "新宋体"
          margin 10px
        label
          color #000
          font-size 16px
          display inline-block
        .listContent
          min-height 300px
          text-align left
          padding 10px
    .home-footer
      display flex
      display -webkit-flex
      flex 1
      background-color cadetblue
      justify-content center
      align-items stretch
      min-height 10vh
      .homeFooter
        width: 50%
        display flex
        justify-content center
        align-items center
        color #fff
        font-size 16px
        a
          color #fff
          font-size 14px
          &:hover
            color #000
</style>
