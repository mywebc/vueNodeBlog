<template>
  <div class="home-header">
    <div class="homeHeader">
      <img src="./../../assets/boy.jpeg" alt="图片显示错误" @click="goHome" style="cursor: pointer">
      <h1>vue/node个人博客</h1>
      <h3>前端笔记</h3>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  methods: {
    goHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="stylus">
  .home-header
    display flex
    display -webkit-flex
    flex 1
    background-color #2d2d2d
    justify-content center
    align-items stretch
    min-height 25vh
    .homeHeader
      width: 50%
      display flex
      flex-direction column
      justify-content center
      align-items center
      img
        border-radius 50%
        width 100px
        height 100px
        margin-bottom 20px
      h1
        color #fff
        font-size 30px
        margin-bottom 20px
      h3
        color: #fff
        font-style: 14px
</style>
