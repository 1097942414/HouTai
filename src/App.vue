<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
//引全局入组件

export default {
  name: "App",
  //注册组件
  components: {
  },
};
</script>

<style lang="less">
#app {
  height: 100%;
    margin: 0;
    padding: 0;
}
</style>
