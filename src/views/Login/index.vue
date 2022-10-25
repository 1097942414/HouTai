<template>
  <div class="login">
    <div class="login-info">
      <h3 class="login-title">后台管理系统登录</h3>
      <el-form :model="form" :rules="rules" label-width="80px" ref="loginForm">
        <el-form-item prop="username" label="账号">
          <el-input
            type="text"
            v-model.trim="form.username"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            type="password"
            v-model.trim="form.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width: 100%"
            @click="submit"
            @keyup.enter="keyDown"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { permissionApi } from "@/api";
import Cookie from "js-cookie";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, trigger: 'blur', message: "请输入账号" }],
        password: [{ required: true, trigger: 'blur', message: "请输入密码" }],
      },
    };
  },
  methods: {
    keyDown(e) {
      if (e.keyCode == 13) {
        this.submit();
      }
    },
    submit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid===true) {
          permissionApi(this.form).then(
            ({ data: res }) => {
              console.log(res);
              if (res.code === 20000) {
                //设置登陆后服务器给的token存储到Coookie中
                Cookie.set("token", res.data.token);
                Cookie.set("userName", res.data.userName);
                Cookie.set("userType", res.data.userType);
                //触发仓库设置菜单
                this.$store.commit("SETMENU", res.data.menu);
                //触发根据菜单动态添加路由
                this.$store.commit('ADDROUTER', this.$router);
                //跳转主页
                this.$router.push("/home");
                this.$message({
                  type: "success",
                  message: "登陆成功",
                });
              } else {
                this.$message({
                  type: "error",
                  message: '登陆失败',
                });
              }
            },
            (rej) => {
              console.log(new Error(rej));
              // this.form.username = "";
              // this.form.password = "";
            }
          );
        }
        this.$refs.loginForm.resetFields();
      });
    },
  },
  mounted() {
    window.addEventListener("keyup", this.keyDown);
  },
};
</script>

<style lang="less" scoped>
.login {
  position: relative;
  height: 100%;
  background-image: url(./images/mqm.gif);
  background-repeat: no-repeat;
  background-size: cover;
  .login-info {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.6);
    .login-title {
      height: 80px;
      text-align: center;
      line-height: 80px;
      font-size: larger;
    }
    .el-form {
      padding-right: 40px;
    }
  }
}
</style>

