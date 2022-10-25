//对store统一管理

import Vue from 'vue'
import Vuex from 'vuex'
//使用插件
Vue.use(Vuex);

//引入状态管理模块
import Aside from './Aside/index'
import Home from './Home/index'
import Tab from './Tab'; 
import Menu from './Menu';

//创建store对象并按模块默认导出
export default new Vuex.Store({
  modules: {
    Aside,
    Home,
    Tab,
    Menu
  }
})
