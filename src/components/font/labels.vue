<template>
  <div class="container-home">
    <Header></Header>
    <Nav :title1="title1" :title2="title2" :title3="title3" :title4="title4"></Nav>
    <div class="home-content">
      <div class="homeContent">
        <h3>所有标签：</h3>
        <div class="tag_container" v-for="item in articleTemp" :key="item.id" @click="goLabels(item)">
          <el-tag>{{item}}</el-tag>
        </div>
        <div class="tag_container"  v-if="showFlag" @click="goNoLabels">
          <el-tag>未分类</el-tag>
        </div>
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

export default {
  data () {
    return {
      title1: '博客',
      title2: '标签',
      title3: '归档',
      title4: '关于',
      articleTotal: [],
      articleTemp: [],
      showFlag: false
    }
  },
  methods: {
    goLabels (label) {
      this.$router.push('/labelDetail/' + label)
    },
    goNoLabels () {
      this.$router.push('/labelDetail/[]')
    }
  },
  mounted () {
    axios.get('http://192.168.43.54:3000/getArticle')
      .then((response) => {
        this.articleTotal = response.data.reverse()
        this.articleTotal.forEach((val) => {
          if (val.labels.length === 0) {
            this.showFlag = true
          }
          val.labels.forEach((val1) => {
            if (this.articleTemp.indexOf(val1) === -1) {
              this.articleTemp.push(val1)
            }
          })
        })
      })
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
        min-height 60vh
        text-align left
        .tag_container
          display inline-block
          span
            cursor: pointer;
            margin-left 10px
            margin-bottom 10px
</style>
