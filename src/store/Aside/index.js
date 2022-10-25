//向外导出aside模块
export default {
  // 存放数据和data类似
  state: {
    isCollapse: false,
  },
  // 用来修改state和getters里面的数据
  mutations: {
    COLLAPSEMENU(state) {
      state.isCollapse = !state.isCollapse
    }
  },
  // vuex中用于发起异步请求
  actions: {

  },
  // 相当于计算属性
  getters: {
  }
}