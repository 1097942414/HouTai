<template>
  <div>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <h3>{{ isCollapse === true ? "后台" : "后台管理系统" }}</h3>
      <el-menu-item
        :index="item.path"
        v-for="item in noChildren"
        :key="item.path"
        @click="clickPushMenu(item)"
      >
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <el-submenu
        :index="item.path + ''"
        v-for="item in hasChildren"
        :key="item.path"
      >
        <template slot="title">
          <i :class="'el-icon-' + item.icon"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item
            :index="subItem.path"
            v-for="subItem in item.children"
            :key="subItem.path"
            @click="clickPushMenu(subItem)"
            >{{ subItem.label }}</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import Cookie from 'js-cookie';
export default {
  data() {
    return {
      
    };
  },
  methods: {
    //打开侧边栏
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //点击路由跳转
    clickPushMenu(itemMenu) {
      //当前页面与跳转的路由不一致才跳转
      if (this.$route.path !== itemMenu.path) {
        this.$router.push(itemMenu.path);
      }
      //触发面包屑更新
      this.$store.commit("UPBREADCRUMB", itemMenu);
    },
  },
  computed: {
    //计算属性以方法形式定义，返回计算过的值
    hasChildren() {
      return this.menuData.filter((item) => item.children);
    },
    noChildren() {
      return this.menuData.filter((item) => !item.children);
    },
    isCollapse() {
      // console.log(this);
      return this.$store.state.Aside.isCollapse;
    },
    //获取菜单，将cookie中的菜单数据转为JS数据如果cookie中没有就去store中拿数据
    menuData() {
      return JSON.parse(Cookie.get('menu')) || this.$store.state.Menu.menu;
    },
  },
};
</script>

<style scoped lang="less">
.el-menu-vertical-demo {
  height: 100vh;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 12.5vw;
  height: 100vh;
  min-height: 400px;
}
h3 {
  color: #fff;
  width: 100%;
  height: 10vh;
  line-height: 100px;
  text-align: center;
  font-size: 24px;
}
.el-menu {
  border-right: 0;
}
</style>