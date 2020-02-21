<template>
  <div class="login-wrap">
    <!-- 左侧登录盒子 -->
    <div class="login-box">
      <div class="login-title">
        <img src="../images/login_logo.png" alt />
        <span class="title_left">黑马面面</span>
        <span class="line"></span>
        <span class="title_right">用户登录</span>
      </div>
      <el-form ref="form" :rules="rules" :model="form" label-width="0px">
        <!-- 用户名 -->
        <el-form-item prop="user">
          <el-input v-model="form.user" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input show-password v-model="form.password" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-row>
            <el-col :span="17">
              <el-input v-model="form.code" prefix-icon="el-icon-key"></el-input>
            </el-col>
            <el-col :span="7">
              <img src="../images/login_captcha.png" class="code-img" />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 用户协议 -->
        <el-form-item prop="agree">
          <el-checkbox v-model="form.agree" class="agree">
            我已阅读并同意
            <el-link type="primary" :underline="false">用户协议</el-link>和
            <el-link type="primary" :underline="false">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <!-- 登陆与注册 -->
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="onSubmit">登录</el-button>
          <el-button class="login-btn" type="primary" @click="showReg">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右侧图片 -->
    <img src="../images/login_banner_ele.png" alt />

    <!-- 注册对话框 -->
    <register ref="register"></register>
  </div>
</template>

<script>
import register from "../components/register.vue";
export default {
  components: {
    register
  },
  data() {
    return {
      form: {
        user: "",
        password: "",
        code: "",
        agree: false
      },
      rules: {
        user: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "change"
          }
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        agree: [
          // { required: true, message: "请勾选", trigger: "change" },
          { pattern: /true/, message: "请勾选", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      // console.log("submit!");
      this.$refs["form"].validate(valid => {
        if (valid) {
          alert("成功");
        } else {
          alert("111");
          return false;
        }
      });
    },
    showReg() {
      this.$refs.register.dialogFormVisible = true;
    }
  }
};
</script>

<style lang="less">
.login-wrap {
  width: 100%;
  height: 100%;
  background: linear-gradient(225deg, rgba(20, 147, 250, 1), rgb(1, 233, 250));
  display: flex;
  justify-content: space-around;
  align-items: center;

  .login-box {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 48px 41px 0 43px;

    .login-title {
      display: flex;
      align-items: center;
      margin-bottom: 29px;

      img {
        width: 22px;
        height: 17px;
        margin-left: 5px;
        margin-right: 16px;
      }

      .title_left {
        font-size: 22px;
      }

      .line {
        width: 1px;
        height: 28px;
        margin-left: 14px;
        margin-right: 12px;
        background-color: #c7c7c7;
      }

      .title_right {
        font-size: 21px;
      }
    }
  }
  .code-img {
    width: 100%;
    height: 42px;
    vertical-align: top;
  }
  .agree {
    display: flex;
    align-items: center;
  }

  .el-checkbox__label {
    display: flex;
    align-items: center;
  }

  .login-btn {
    width: 100%;

    &:nth-child(1) {
      margin-bottom: 26px;
    }

    &:nth-child(2) {
      margin-left: 0px;
    }
  }
}
</style>