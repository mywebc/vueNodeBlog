<template>
  <div class="home-footer">
    <div class="homeFooter">
      <div>Copyright @ 2018 Powered by Vue. Designed by 陈晓拉尼 | <router-link to="/sign">站长登录</router-link></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style scoped lang="stylus">
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
