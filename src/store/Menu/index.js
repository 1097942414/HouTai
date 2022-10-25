import Cookie from "js-cookie"


export default {
  // 存放数据和data类似,在浏览器内存中
  state: {
    //菜单
    menu: [],
  },
  // 用来修改state和getters里面的数据
  mutations: {
    //设置菜单
    SETMENU(state, val) {
      state.menu = val
      //cookie中存放字符串的键值对，对菜单做长久保存cookie中
      Cookie.set('menu', JSON.stringify(val));
    },
    //根据菜单动态添加路由
    ADDROUTER(state, router) {
      const menuArr = [];
      //判断缓存是否有菜单数据
      if (Cookie.get('menu')) {
        const menu =JSON.parse(Cookie.get('menu')) 
        state.menu = menu;
        menu.forEach(item => {
          if (item.children) {
            item.children=item.children.map(childrenItem => {
              childrenItem.component = () => import(`@/views/Main/${childrenItem.url}`)
              return childrenItem
            })
            menuArr.push(...item.children)
          }
          else {
            item.component = () => import(`@/views/Main/${item.url}`)
            menuArr.push(item)
          }
        })
        console.log(menuArr);
        //动态添加路由
        menuArr.forEach(item => {
          router.addRoute('Main',item)
        });
      }
    }
  },
  // vuex中用于发起异步请求
  actions: {

  },
  // 相当于计算属性
  getters: {
  }
}
