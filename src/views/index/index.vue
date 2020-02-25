<template>
  <el-container class="my-cont">
    <!-- 头部部分 -->
    <el-header class="my-header">
      <div class="left">
        <i :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'" @click="isCollapse=!isCollapse"></i>
        <img src="./images/index_logo.png" alt />
        <span>黑马面面</span>
      </div>
      <div class="right">
        <img :src="avatar" alt />
        <span class="right-txt">{{username}}，你好</span>
        <el-button type="primary" size="mini" @click="doLogout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 左侧部分 -->
      <el-aside width="auto" class="my-aside">
        <el-menu
          router
          default-active="/index/chart"
          :collapse="isCollapse"
          class="el-menu-vertical-demo"
        >
          <el-menu-item index="/index/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/business">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="my-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getInfo, userLogin } from "../../api/index.js";
import { moveToken, getToken } from "../../utilis/token.js";
export default {
  data() {
    return {
      username: "",
      avatar: "",
      isCollapse: false
    };
  },
  beforeCreate() {
    if (getToken() == null) {
      this.$message.error("请登陆");
      this.$router.push("/login");
    }
  },
  methods: {
    doLogout() {
      this.$confirm("此操作将退出浏览器, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          userLogin().then(res => {
            window.console.log(res);
            if (res.data.code == 200) {
              this.$message.success("退出成功");
              moveToken();
              this.$router.push("/login");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  },
  created() {
    getInfo().then(res => {
      window.console.log(res);
      if (res.data.code == 200) {
        this.username = res.data.data.username;
        this.avatar = process.env.VUE_APP_BASE_URL + "/" + res.data.data.avatar;
      } 
      //else if (res.data.code == 206) {
      //   this.$message.error("登录异常");
      //   moveToken();
      //   this.$router.push("/login");
      // }
    });
  }
};
</script>

<style lang="less">
html,
body {
  height: 100%;
}

.my-cont {
  width: 100%;
  height: 100%;
}

.my-header {
  height: 60px;
  display: flex;
  justify-content: space-between;

  .left {
    display: flex;
    align-items: center;

    i {
      font-size: 24px;
      margin-right: 24px;
    }

    img {
      width: 33px;
      height: 28px;
      margin-right: 11px;
    }

    span {
      font-size: 22px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(73, 161, 255, 1);
    }
  }

  .right {
    display: flex;
    align-items: center;

    img {
      width: 43px;
      height: 43px;
      margin-right: 9px;
    }

    .right-txt {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(99, 99, 99, 1);
      margin-right: 38px;
    }
  }
}

.my-aside {
  height: 100%;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.my-main {
  height: 100%;
  background-color: yellowgreen;
}
</style>