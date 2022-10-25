<template>
  <div>
    <div class="user-manage">
      <!-- 新增区域 -->
      <div class="add-user">
        <el-button @click="handleAdd" type="primary">+ 新增</el-button>
        <el-dialog
          :title="modelType === 0 ? '新增用户' : '编辑用户'"
          :visible.sync="dialogVisible"
          width="40%"
          :before-close="handleClose"
          ref="dialog"
        >
          <!-- 用户的表单信息 -->
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="80px"
            inline
          >
            <el-form-item label="姓名" prop="name">
              <el-input
                type="text"
                v-model.trim="form.name"
                placeholder="请输入姓名"
              ></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input
                v-model.number="form.age"
                type="age"
                placeholder="请输入年龄"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-select v-model="form.sex" placeholder="请选择">
                <el-option label="男" :value="1"></el-option>
                <el-option label="女" :value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出生日期" prop="birth">
              <el-date-picker
                v-model="form.birth"
                type="date"
                placeholder="请选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="地址" prop="addr">
              <el-input
                v-model.trim="form.addr"
                placeholder="请输入地址"
              ></el-input>
            </el-form-item>
          </el-form>
          <!--  -->
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submit">提 交</el-button>
            <el-button @click="handleClose">取 消</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 搜索区域 -->
      <div class="search">
        <el-form>
          <el-form-item>
            <el-input
              type="search"
              placeholder="输入关键字搜索"
              v-model.lazy="searchFilter.name"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getFiterUserList()"
              >搜索</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 用户数据列表 -->
    <div class="user-info">
      <div class="user-table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            prop="name"
            label="姓名"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="age"
            label="年龄"
            width="180"
          ></el-table-column>
          <el-table-column prop="sex" label="性别" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.sex === 1 ? "男" : "女" }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="birth"
            label="出生日期"
            width="280"
          ></el-table-column>
          <el-table-column
            prop="addr"
            label="地址"
            width="280"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页器 -->
      <div class="block" style="text-align: right">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
          background
          @current-change="changeCurrentPage"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getUserListApi,
  addUserApi,
  editUserApi,
  delUserApi,
} from "@/api/index";

export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        age: [
          { required: true, message: "请输入年龄" },
          { type: "number", message: "年龄必须为数字值" },
        ],
        sex: [{ required: true, message: "请选择性别。" }],
        birth: [{ required: true, message: "请选择出生日期" }],
        addr: [{ required: true, message: "请输入地址" }],
      },
      tableData: [],
      searchFilter: {
        name: "",
      },
      //模式类别，0表示新增，1表示编辑
      modelType: 0,
      //每页最大数据量
      pageSize: 10,
      //请求数据总数
      total: 0,
      //get请求参数对象
      userPageParams: {
        page: 1,
        limit: 10,
      },
    };
  },
  methods: {
    //打开对话框
    handleOpenDialog() {
      this.dialogVisible = true;
    },
    //关闭对话框时
    handleClose() {
      //清空表单
      this.$refs.form.resetFields();
      // this.form = null;
      //关闭对话框
      this.dialogVisible = false;
    },
    //新增按钮
    handleAdd() {
      this.modelType = 0;
      this.handleOpenDialog();
      this.form = {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      };
    },
    //搜索按钮
    getFiterUserList() {
      this.getUserList();
    },
    //编辑按钮
    handleEdit(row) {
      this.modelType = 1;
      this.handleOpenDialog();
      //对当前数据深拷贝,将数据格式转为js数据格式
      this.form = JSON.parse(JSON.stringify(row));

      // console.log(index, row);
    },
    //删除按钮
    handleDelete(row) {
      // console.log(this);
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUserApi({ id: row.id }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getUserList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //获取用户列表数据
    getUserList() {
      getUserListApi({
        params: { ...this.searchFilter, ...this.userPageParams },
      }).then(({ data: res }) => {
        // console.log(res);
        this.tableData = res.list;
        this.total = res.count ? res.count : 0;
        // console.log(tableData);
      });
    },
    //提交用户表单
    submit() {
      this.$refs.form.validate((valid) => {
        //校验表单规则
        if (valid === true) {
          //当规则校验结果为true时
          if (this.modelType === 0) {
            //新增操作
            addUserApi(this.form).then(
              (res) => {
                console.log(res, "res");
                this.getUserList(); //重新获取列表数据
              },
              (rej) => {
                console.error(new Error(rej));
              }
            );
          } else {
            //编辑操作
            editUserApi(this.form).then(
              (res) => {
                console.log(res, "res");
                this.getUserList();
              },
              (rej) => {
                console.error(new Error(rej));
              }
            );
          }
        }
        //关闭对话框
        this.handleClose();
      });
    },
    //currentPage改变时会触发
    changeCurrentPage(indexPage) {
      // console.log(indexPage);
      this.userPageParams.page = indexPage;
      console.log(this.userPageParams.page);
      this.getUserList();
    },
  },
  created() {
    this.userPageParams.page = 1;
    this.getUserList();
  },
};
</script>
<style lang="less" scoped>
.user-manage {
  display: flex;
  justify-content: space-between;
  .search {
    .el-form {
      display: flex;
      .el-form-item:nth-child(1) {
        width: 80%;
      }
    }
  }
  .user-info {
    margin-top: 10px;
    // border: 10px solid #000!important;
  }
}
</style>