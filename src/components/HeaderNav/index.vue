<template>
  <header>
    <div class="l-content">
      <el-button
        icon="el-icon-menu"
        @click="handleMenu"
        style="margin-right: 20px"
      ></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in breadCrumbTags"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" szie="mini" @command="handelCommand">
        <div class="user-icon">
          <img src="@/assets/images/user.jpg" alt="" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import Cookie from "js-cookie";

export default {
  data() {
    return {
    };
  },
  methods: {
    handleMenu() {
      this.$store.commit("COLLAPSEMENU");
    },
    handelCommand(command) {
      //判断是否为退出操作
      if (command === "exit") {
        const token = Cookie.get("token");
        if (token) {
          Cookie.remove("token");
          Cookie.remove("menu");
          Cookie.remove('userName');
          Cookie.remove('userType');
          this.$router.push("/login");
        }
      }
    },
  },
  computed: {
    breadCrumbTags() {
      return this.$store.state.Tab.tabList;
    },
  },
};
</script>
<style lang="less" scoped>
header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .l-content {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /deep/.el-breadcrumb__item {
      .el-breadcrumb__inner {
        font-weight: normal;
        &.is-link {
          color: #888;
        }
      }
      &:last-child {
        .el-breadcrumb__inner {
          color: #fff;
        }
      }
    }
  }
  .r-content {
    width: 2vw;
    height: 2vw;
    cursor: pointer;
    .el-dropdown {
      width: 100%;
      height: 100%;
      .user-icon {
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
