<template>
  <div class="home-nav">
    <div class="homeNav">
      <router-link class="tab-item" to="/home">
        <span class="active">{{title1}}</span>
      </router-link>
      <router-link class="tab-item" to="/labels">
        <span class="active">{{title2}}</span>
      </router-link>
      <router-link class="tab-item" to="/timeLine">
        <span class="active">{{title3}}</span>
      </router-link>
      <router-link class="tab-item" to="/contact">
        <span class="active">{{title4}}</span>
      </router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    title1: {
      type: String,
      Default: '博客'
    },
    title2: {
      type: String,
      Default: '标签'
    },
    title3: {
      type: String,
      Default: '归档'
    },
    title4: {
      type: String,
      Default: '关于'
    }
  },
  data () {
    return {
      isTab: true
    }
  },
  methods: {}
}
</script>

<style scoped lang="stylus">
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
</style>
