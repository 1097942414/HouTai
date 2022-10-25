import http from "@/api/index";
export default {
  // 存放数据和data类似
  state: {
    isCollapse: false,
  },
  // 用来修改state和getters里面的数据
  mutations: {
  },
  // vuex中用于发起异步请求
  actions: {
    //获取主页数据
    // getData() {
    //   http.getData().then((data) => { console.log(data); }, (error) => { console.log(error); });
    // },
  },
  // 相当于计算属性
  getters: {
  }
}
