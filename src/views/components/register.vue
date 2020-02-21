<template>
  <div>
    <el-dialog title="用户注册" center width="603px" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules">
        <!-- 用户名 -->
        <el-form-item label="昵称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item label="手机" prop="tel" :label-width="formLabelWidth">
          <el-input v-model="form.tel" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 图形验证码 -->
        <el-form-item label="图形码" prop="imgCode" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="17">
              <el-input v-model="form.imgCode" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="6" :offset="1">
              <img class="img-code" :src="imgCode" @click="reGetUrl" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 手机验证码 -->
        <el-form-item label="验证码" prop="rcode" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="17">
              <el-input v-model="form.rcode" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-button
                @click="btnNum"
                :disabled="code_num !=0"
              >{{code_num==0?"获取用户验证码":"还剩"+ code_num +"秒"}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      imgCode: process.env.VUE_APP_BASE_URL + "/captcha?type=sendsms",
      code_num: 0,
      form: {
        name: "",
        email: "",
        tel: "",
        password: "",
        imgCode: "",
        rcode: ""
      },
      formLabelWidth: "65px",
      dialogFormVisible: false,
      rules: {
        // 用户名的正则表达式
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        // 手机号的正则表达式
        tel: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /0?(13|14|15|18|17)[0-9]{9}/,
            message: "手机格式不对",
            trigger: "blur"
          }
        ],
        // 邮箱的正则表达式
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            message: "手机格式不对",
            trigger: "blur"
          }
        ],
        // 密码的正则表达式
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "change"
          }
        ],
        // 图形验证码的正则表达式
        imgCode: [{ required: true, message: "请输入图形码", trigger: "blur" }],
        // 手机验证码的正则表达式
        rcode: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  methods: {
    reGetUrl() {
      this.imgCode =
        process.env.VUE_APP_BASE_URL + "/captcha?type=sendsms" + "&t=" + Date();
    },
    btnNum() {
      this.code_num = 60;
      let timer = setInterval(() => {
        this.code_num--;
        if (this.code_num == 0) {
          clearInterval(timer);
        }
      }, 1000);
      axios({
        method: "post",
        url: process.env.VUE_APP_BASE_URL + "/sendsms",
        data: {
          code: this.form.imgCode,
          phone: this.form.tel,
        },
        //可以携带cookie
        withCredentials:true,
      }).then(res=>{
          window.console.log(res);
      });
    }
  }
};
</script>

<style lang="less">
.el-dialog__header {
  background: linear-gradient(to right, #07c3f5, #1b91f4);

  .el-dialog__title {
    color: #fff;
    font-size: 17px;
  }
}

.img-code {
  width: 100%;
  height: 41px;
  vertical-align: top;
}
</style>