<template>
  <div class="container-home">
    <Header></Header>
    <Nav :title1="title1" :title2="title2" :title3="title3" :title4="title4"></Nav>
    <div class="home-content">
      <div class="homeContent" v-for="item in articleTotal" :key="item._id">
        <h1 @click="readMore(item._id)" style="cursor: pointer">{{item.title}}</h1>
        <label>{{item.date}}</label>
        <span class="article_label">标签：
        <span v-if="item.labels && item.labels.length === 0">未分类</span>
        <el-tag v-else class="tags" type="primary" v-for="tag in item.labels" :key="tag.id">{{ tag }}</el-tag>
        </span>
        <hr>
        <div class="listContent" v-html="compiledMarkdown(item.content)">
        </div>
        <el-button type="primary" @click="readMore(item._id)" style="margin-bottom: 10px;margin-top: 10px">阅读全文</el-button>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script type="text/ecmascript-6">
import Header from 'components/base/header'
import Nav from 'components/base/nav'
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
      title1: '博客',
      title2: '标签',
      title3: '归档',
      title4: '关于',
      articleTotal: []
    }
  },
  methods: {
    // marked编译
    compiledMarkdown: function (content) {
      return marked(content, {sanitize: true})
    },
    // 更新数据
    fetchData: function () {
      axios.get('http://192.168.43.54:3000/getArticle').then((response) => {
        this.articleTotal = response.data.reverse()
      })
    },
    readMore (id) {
      this.$router.push('/blogDetail/' + id)
    }
  },
  mounted () {
    this.fetchData()
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
          max-height 400px
          overflow hidden
          text-align left
          padding 10px
</style>
