import Vue from 'vue'
import App from './App.vue'

import elemenUI from './plugin/index'
//引入路由模块
import router from './router/index'
//引入store模块
import store from './store'
//引入mock模块
import './mock/mockServe'



import { MessageBox, Message } from 'element-ui'
// Vue.use(Message, MessageBox)
//将消息盒子挂载在Vue原型对象上
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;


elemenUI.forEach((item) => {
  Vue.use(item)
})
// Vue.config.productionTip = false

 
new Vue({
  render: h => h(App),
  //全局注册路由
  router,
  // 全局注册store
  store,
  // 全局注册api
  // http
  created() {
    store.commit('ADDROUTER', this.$router);
  }
}).$mount('#app')
