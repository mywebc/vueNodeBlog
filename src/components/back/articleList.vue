<template>
  <div class="container-home">
    <Header></Header>
    <div class="home-nav">
      <div class="homeNav">
        <router-link class="tab-item" to="/articleList">
          <span class="active">{{title1}}</span>
        </router-link>
        <router-link class="tab-item" to="/articleEdit">
          <span class="active">{{title2}}</span>
        </router-link>
        <router-link class="tab-item" to="/labelsManage">
          <span class="active">{{title3}}</span>
        </router-link>
        <!--<router-link class="tab-item" to="/sign">-->
          <!--<span class="active">{{title4}}</span>-->
        <!--</router-link>-->
      </div>
    </div>
    <div class="home-content">
      <div class="homeContent" v-for="item in articleTotal" :key="item._id">
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
import Footer from 'components/base/footer'
import axios from 'axios'
import marked from 'marked'
import highlight from 'highlight.js'
import '../../assets/stylus/atom-one-light.css'

marked.setOptions({
  hightlight: function (code) {
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
      articleTotal: []
    }
  },
  methods: {
    // marked编译
    compiledMarkdown: function (content) {
      return marked(content, {sanitize: true})
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
    // 更新数据
    fetchData: function () {
      axios.get('http://120.77.241.163:3000/getArticle').then((response) => {
        this.articleTotal = response.data.reverse()
      })
    },
    goDetail (id) {
      this.$router.push('/blogDetail/' + id)
    }
  },
  mounted () {
    this.fetchData()
  },
  components: {
    Header,
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
          min-height 200px
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
