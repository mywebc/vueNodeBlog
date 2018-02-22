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
import axios from 'axios'

export default {
  data () {
    return {
      title1: '文章管理',
      title2: '写文章',
      title3: '标签管理',
      title4: '关于我',
      articleTotal: [],
      articleTemp: [],
      showFlag: false
    }
  },
  methods: {
    goLabels (label) {
      this.$router.push('/labelManageDetail/' + label)
    },
    goNoLabels () {
      this.$router.push('/labelManageDetail/[]')
    }
  },
  mounted () {
    axios.get('http://120.77.241.163:3000/getArticle')
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
        min-height 60vh
        text-align left
        .tag_container
          display inline-block
          span
            cursor: pointer;
            margin-left 10px
            margin-bottom 10px
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
