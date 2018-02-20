<template>
  <div class="container-home">
    <Header></Header>
    <Nav :title1="title1" :title2="title2" :title3="title3" :title4="title4"></Nav>
    <div class="home-content">
      测试联系我
    </div>
    <Footer></Footer>
  </div>
</template>

<script type="text/ecmascript-6">
import Header from 'components/base/header'
import Nav from 'components/base/nav'
import Footer from 'components/base/footer'

export default {
  data () {
    return {
      title1: '博客',
      title2: '标签',
      title3: '归档',
      title4: '关于'
    }
  },
  methods: {
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
          display block
        p
          min-height 200px
</style>
