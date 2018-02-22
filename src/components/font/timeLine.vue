<template>
  <div class="container-home">
    <Header></Header>
    <Nav :title1="title1" :title2="title2" :title3="title3" :title4="title4"></Nav>
    <div class="home-content">
      <div class="homeContent" v-for="item in articleTotal" :key="item._id">
       <ul>
         <li>
           <label>{{item.date}}</label>
           <span @click="goDetail(item._id)">{{item.title}}</span>
         </li>
       </ul>
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
      articleTotal: []
    }
  },
  methods: {
    goDetail (id) {
      this.$router.push('/blogDetail/' + id)
    }
  },
  mounted () {
    axios.get('http://120.77.241.163:3000/getArticle').then((response) => {
      this.articleTotal = response.data.reverse()
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
        border-bottom: 1px dashed #aaa
        &:hover
          border-bottom: 1px dashed #000
        ul
          li
            text-align left
            label
              display: inline-block
            span
              display: inline-block
              margin-left 10px
              cursor pointer
</style>
