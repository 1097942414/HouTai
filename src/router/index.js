//导入依赖吧包
import Vue from 'vue';
import VueRouter from 'vue-router';
import Cookie from 'js-cookie';
//使用插件
Vue.use(VueRouter);

import Login from '@/views/Login'

//路由配置信息
const routes = [
  {
    name:'Main',
    path: '/',
    redirect: '/home',
    component: ()=>import ('@/views/Main'),
    children: [
      // { name: 'home', path: 'home', component: () =>import ('@/views/Main/Home'), meta: { show: true } },
      // { name: 'user', path: 'user', component: () =>  import ('@/views/Main/User') , meta: { show: true } },
      // { name: 'mall', path: 'mall', component: () =>  import ('@/views/Main/Mall') , meta: { show: true } },
      // { name: 'page1', path: 'page1', component: () =>  import ('@/views/Main/Page1'), meta: { show: true } },
      // { name: 'page2', path: 'page2', component: () =>  import ('@/views/Main/Page2') , meta: { show: true } },
      ]
  },
  { name: 'login', path: '/login', component: ()=>import('@/views/Login'), meta: { show: true } },
]

//创建路由实例对象
const router = new VueRouter({
  history,
  routes
})

//创建全局导航守卫
router.beforeEach((to, from, next) => {
  const token = Cookie.get('token')
  //token不存在且将要跳转不为登录页为，强制跳转到登录页
  if (!token && to.name !== 'login') {
    next({
      name: 'login',
      path: '/login'
    })
  }
  //如果token存在且要去登录页，就强制到首页
    else if (token && to.name==='login') {
    next({
      name: 'home',
      path: '/home'
    })
  }
  else {
    next()
  }
})
 

//默认导出路由实例
export default router

