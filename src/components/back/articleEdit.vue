<template>
  <div class="container-home">
    <Header></Header>
    <div class="home-nav">
      <div class="homeNav">
        <router-link class="tab-item" to="/articleList">
          <span class="active">文章管理</span>
        </router-link>
        <router-link class="tab-item" to="/articleEdit">
          <span class="active">写文章</span>
        </router-link>
        <router-link class="tab-item" to="/labelsManage">
          <span class="active">标签管理</span>
        </router-link>
        <router-link class="tab-item" to="/sign">
          <span class="active">关于我</span>
        </router-link>
      </div>
    </div>
    <div class="home-content">
      <div class="homeContent">
        <h1>文章标题：</h1>
        <el-input
          placeholder="请输入文章标题"
          v-model="title"
          clearable
          style="width: 200px;clear: both;display: block;float: left;margin: 10px;"
        >
        </el-input>
        <span style="display: block;clear: both;float: left;font-size: 24px;margin: 10px;">标签：</span>
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
          style="clear: both;display: block">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
          style="clear: both;display: block"
        >
        </el-input>
        <el-button v-else class="button-new_tag" size="small" @click="showInput" style="clear: both;display: block">+ New Tag</el-button>
        <h1>文章内容(markdown)：</h1>
        <div class="markdown">
          <textarea class="markdown_input" v-model="content" @input="update"></textarea>
        </div>
        <el-button type="primary"  @click="dialogVisible = true">预览</el-button>
        <el-button type="primary" @click="saveArticle">保存</el-button>
        <el-dialog title="文章内容预览" :visible.sync="dialogVisible" style="text-align: left">
          <div v-html="compiledMarkdown()"></div>
        </el-dialog>
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
import marked from 'marked'
import highlight from 'highlight.js'
import '../../assets/stylus/atom-one-light.css'
import _ from 'lodash'
import axios from 'axios'

marked.setOptions({
  hightlight: function (code) {
    return highlight.highlightAuto(code).value
  }
})
export default {
  data () {
    return {
      title: '',
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      dialogVisible: false,
      content: ''
    }
  },
  methods: {
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    // marked编译
    compiledMarkdown: function () {
      return marked(this.content, {sanitize: true})
    },
    // 延时赋值给content
    update: _.debounce(function (e) {
      this.content = e.target.value
    }, 300),
    // 保存文章
    saveArticle () {
      let self = this
      if (this.title.length === 0) {
        this.$notify({
          title: '提醒',
          message: '请输入标题',
          type: 'warning'
        })
        return
      }
      if (this.content.length === 0) {
        this.$notify({
          title: '提醒',
          message: '请输入内容',
          type: 'warning'
        })
        return
      }
      if (this.$route.params.id) {
        axios.post('http://192.168.43.54:3000/updateArticle', {
          params: {
            'title': this.title,
            'date': this.moment().format('YYYY-MM-DD HH:mm:ss'),
            'label': this.dynamicTags,
            'content': this.content,
            '_id': this.$route.params.id
          }
        }).then(response => {
          self.$notify({
            title: '提示',
            message: '文章更新成功！',
            type: 'success'
          })
        })
        self.refreshArticleList()
      } else {
        axios.post('http://192.168.43.54:3000/saveArticle', {
          params: {
            'title': this.title,
            'date': this.moment().format('YYYY-MM-DD HH:mm:ss'),
            'label': this.dynamicTags,
            'content': this.content
          }
        }).then((response) => {
          self.$notify({
            title: '提示',
            message: '发布成功！',
            type: 'success'
          })
        }).catch((error) => {
          console.log(error)
        })
        self.refreshArticleList()
      }
    },
    // 保存成功后跳转至文章列表页
    refreshArticleList: function () {
      this.$router.push('/articleList')
      this.$router.go(0)
    }
  },
  mounted () {
    if (this.$route.params.id) {
      axios.get('http://192.168.43.54:3000/getArticleDetail/' + this.$route.params.id).then(
        response => {
          let article = response.data
          this.title = article.title
          this.date = article.date
          this.content = article.content
          this.dynamicTags = article.labels
        },
        response => console.log(response)
      )
    }
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
      flex 5
      background-color #fff
      min-height 60vh
      display flex
      display -webkit-flex
      flex-direction column
      .homeContent
        width: 50%
        margin 10px
        border: 1px solid #aaa
        box-shadow 1px 1px 1px gray
        padding-bottom 5px
        margin 10px auto
        min-height 80vh
        .el-tag + .el-tag {
          margin-left: 10px;
        }
        .button-new_tag {
          margin-left: 10px;
          height: 32px;
          line-height: 30px;
          padding-top: 0;
          padding-bottom: 0;
        }
        .input-new-tag {
          width: 90px;
          margin-left: 10px;
          vertical-align: bottom;
        }
        h1
          font-size 24px;
          float left
          margin 10px
        .markdown {
          text-align: left;
          border: 1px solid #bfcbd9;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
          width: 100%;
          height: 700px;
          vertical-align: top;
          background: #f5f7f9;
          overflow: hidden;
        }
        .markdown textarea {
          border: none;
          resize: none;  /*不可拖动*/
        }
        .markdown_input {
          display: inline-block;
          width: 100%;
          height: 100%;
          background-color: white;
          padding-left: 1%;
          padding-top: 1%;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
        }
        .el-dialog__body
          text-align left
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
