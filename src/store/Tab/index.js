
export default {
  // 存放数据和data类似
  state: {
    //面包屑
    tabList:[
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "s-home",
        url: "Home/Home",
      }
    ],
  },
  // 用来修改state和getters里面的数据
  mutations: {
    //更新面包屑
    UPBREADCRUMB(state, itemMenu) {
      //判断添加的是否为首页且面包屑列表不存在当前组件
      if (itemMenu.name !== 'home') {
        const index = state.tabList.findIndex((itemTabList) => itemTabList.name === itemMenu.name)
          //如果不存在，则添加
          if (index === -1) {
            state.tabList.push(itemMenu)
          //  state.tabList=set(state.tabList);
        }
        return
      }
    },
    CLOSETAGANDSUBTABLIST(state, itemTag) {
      if (itemTag.name !== 'home') {
         const index = state.tabList.findIndex((itemTabList) => itemTabList.name === itemTag.name)
        state.tabList.splice(index, 1)
      };
    }//如果不存在，则添加
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
