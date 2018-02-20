import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/font/home'
import Labels from '@/components/font/labels'
import TimeLine from '@/components/font/timeLine'
import Contact from '@/components/font/contact'
import BlogDetail from 'components/font/blogDetail'
import LabelDetail from 'components/font/labelDetail'
import ArticleEdit from 'components/back/articleEdit'
import ArticleList from 'components/back/articleList'
import LabelsManage from 'components/back/labelsManage'
import LabelManageDetail from 'components/back/labelManageDetail'
import Sign from 'components/back/sign'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', name: 'Home', component: Home},
    {path: '/labels', name: 'Labels', component: Labels},
    {path: '/timeLine', name: 'timeLine', component: TimeLine},
    {path: '/contact', name: 'Contact', component: Contact},
    {path: '/article/:d', component: BlogDetail},
    {path: '/articleEdit', component: ArticleEdit},
    {path: '/articleEdit/:id', component: ArticleEdit},
    {path: '/articleList', component: ArticleList},
    {path: '/labelsManage', component: LabelsManage},
    {path: '/sign', component: Sign},
    {path: '/blogDetail/:id', component: BlogDetail},
    {path: '/labelDetail/:label', component: LabelDetail},
    {path: '/labelManageDetail/:label', component: LabelManageDetail}
  ]
})
