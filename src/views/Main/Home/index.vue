<template>
  <!-- 首页 -->
  <el-row>
    <!-- 首页组件左侧内容 -->
    <el-col :span="8" style="padding-right: 10px">
      <!-- 首页名片 -->
      <el-card class="box-card">
        <div class="user">
          <img class="user-icon" src="@/assets/images/user.jpg" alt="" />
          <div class="user-name">
            <h1>{{ userName }}</h1>
            <p>{{ userType }}</p>
          </div>
        </div>
        <div class="login-info">
          <div class="pre-login-time">
            <span>上一次登录时间:</span>
            <span>{{ preLoginTime }}</span>
          </div>
          <div class="pre-login-address">
            <span>上一次登录地点:</span>
            <span>{{ preLoginAddress }}</span>
          </div>
        </div>
      </el-card>
      <!-- 首页数据表格 -->
      <el-card style="margin-top: 30px; width: 100%">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            prop="name"
            label="课程"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="todayBuy"
            label="今日购买"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="monthBuy"
            label="本月购买"
            width="100"
          ></el-table-column>
          <el-table-column prop="totalBuy" label="总购买购买"></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <!--首页右侧内容  -->
    <el-col :span="16" style="padding-left: 10px">
      <!-- 统计卡片区域 -->
      <div class="count-card">
        <el-card
          shadow="hover"
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="'el-icon-' + item.icon"
            :style="{ background: item.color }"
          />
          <div class="detail">
            <p>￥{{ item.value }}</p>
            <p>{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- 折线图区域 -->
      <el-card style="height: 280px">
        <div ref="echartsLine" style="height: 280px"></div>
      </el-card>
      <!-- 树状图、饼状图区域 -->
      <div class="garph">
        <el-card style="height: 260px">
          <div ref="echartsBar" style="height: 260px"></div>
        </el-card>
        <el-card style="height: 260px">
          <div ref="echartsPie" style="height: 240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "@/api/index";
import Cookie from 'js-cookie';
import * as echarts from "echarts";
import Tags from "@/components/Tags/index.vue";
export default {
  name: "home",
  data() {
    return {
      // userIcon: "../../assets/images/user1.jpg",
      preLoginTime: "2022-10-10",
      preLoginAddress: "福州",
      tableData: [],
      orderData: [],
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      userName: '',
      userType: '',
    };
  },
  //注册组件
  components: { Tags },
  created() {
    const userName = Cookie.get("userName");
    const userType = Cookie.get("userType");
    this.userName = userName;
    this.userType = userType;
  },
  mounted() {
    getData().then(({ data: res }) => {
      const { tableData } = res.data;
      this.tableData = tableData;
      // console.log(res.data);

      //折线图
      const echartsLine = echarts.init(this.$refs.echartsLine);
      const { orderData } = res.data;
      // console.log(orderData);
      //图表的配置项以及数据
      var echartsOptionLine = {};
      //设置x轴数据
      const xAxis1 = Object.keys(orderData.data[0]);
      echartsOptionLine.xAxis = {
        data: xAxis1,
      };
      //设置y轴数据
      echartsOptionLine.yAxis = {};
      //设置图例
      echartsOptionLine.legend = {
        data: xAxis1,
      };
      //获取series具体数据
      echartsOptionLine.series = [];
      xAxis1.forEach((key) => {
        echartsOptionLine.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: "line",
        });
      });
      // console.log(echartsOptionLine);
      echartsLine.setOption(echartsOptionLine);

      //柱状图
      const echartsBar = echarts.init(this.$refs.echartsBar);
      const { userData } = res.data;
      // console.log(userData);
      //图表的配置项以及数据
      var echartsOptionBar = {
        legend: {},
        xAxis: {
          data: userData.map((item) => item.date),
        },
        yAxis: {},
        series: [
          {
            name: "新增用户",
            type: "bar",
            data: userData.map((item) => item.new),
          },
          {
            name: "活跃用户",
            type: "bar",
            data: userData.map((item) => item.active),
          },
        ],
      };
      // console.log(echartsOptionBar);
      echartsBar.setOption(echartsOptionBar);

      //饼状图
      const echartsPie = echarts.init(this.$refs.echartsPie);
      const { videoData } = res.data;
      // console.log(videoData);
      //图表的配置项以及数据
      var echartsOptionPie = {
        series: [
          {
            type: "pie",
            data: videoData,
          },
        ],
      };
      // console.log(echartsOptionPie)
      echartsPie.setOption(echartsOptionPie);
    });
  },
};
</script>

<style lang="less" scoped>
.el-tag {
  margin: 15px 15px;
}
.box-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  .user {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-bottom: 30px;
    border-bottom: 1px solid #ccc;
    .user-icon {
      display: block;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      // background-color: pink;
    }
    .user-name {
      flex: 1;
      margin-left: 20px;
      h1 {
        font-size: 36px;
      }
      p {
        font-size: 14px;
        color: #aaa;
      }
    }
  }
  .login-info {
    display: flex;
    flex-direction: column;
    padding-top: 30px;
    .pre-login-time {
      flex: 1;
      display: flex;
      span:nth-child(1) {
        width: 35%;
      }
    }
    .pre-login-address {
      flex: 1;
      display: flex;
      span:nth-child(1) {
        width: 35%;
      }
    }
  }
}
.count-card {
  display: flex;
  flex-wrap: wrap;
  justify-content: right;
  .el-card {
    width: 31%;
    margin-bottom: 20px;
    margin-right: 20px;
    .icon {
      width: 80px;
      height: 80px;
      text-align: center;
      line-height: 80px;
      color: #fff;
      background-color: pink;
      font-size: 30px;
    }
    .detail {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-left: 30px;
      p:nth-child(1) {
        font-size: 30px;
      }
      p:nth-child(2) {
        color: #ccc;
        font-size: 14px;
      }
    }
  }
}
.garph {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  .el-card {
    width: 48%;
  }
}
</style>