<template>
  <div>
    <el-container>
      <el-aside width="200px;height:100%">
        <!-- 侧边导航 -->
        <AsideNav></AsideNav>
      </el-aside>
      <el-container>
        <el-header>
          <!-- 顶部导航 -->
          <HeaderNav></HeaderNav>
        </el-header>
        <!-- 标签栏 -->
        <Tags></Tags>
        <!-- 路由组件 -->
        <el-main>
          <!-- 路由组件出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//引全局入组件
import HeaderNav from "@/components/HeaderNav/index.vue";
import AsideNav from "@/components/AsideNav/index.vue";
import Tags from '@/components/Tags/index.vue'

export default {
  name: "App",
  //注册组件
  components: {
    AsideNav,
    HeaderNav,
    Tags
  },
};
</script>

<style lang="less">
.el-header {
  text-align: center;
  line-height: 75px;
  color: #fff;
  background-color: #333;
}
.el-main{
  background: #F2F6FC;
}
</style>
