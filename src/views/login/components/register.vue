<template>
  <div>
    <el-dialog title="用户注册" center width="603px" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="regForm">
        <!-- 头像 -->
        <el-form-item label="头像" prop="avatar" :label-width="formLabelWidth">
          <el-upload
            v-model="form.avatar"
            name="image"
            class="avatar-uploader"
            :action="avatarUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
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
            <el-col :span="16">
              <el-input v-model="form.rcode" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
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
        <el-button type="primary" @click="regBtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import axios from "axios";
import { getCode, postData } from "@/api/register.js";
// import {} from "../../../api/register.js";
export default {
  data() {
    return {
      avatarUrl: process.env.VUE_APP_BASE_URL + "//uploads",
      imgCode: process.env.VUE_APP_BASE_URL + "/captcha?type=sendsms",
      code_num: 0,
      imageUrl: "",
      form: {
        avatar: "",
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
        //头像
        avatar: [{ required: true, message: "请上传头像", trigger: "change" }],
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
            message: "邮箱格式不对",
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
        imgCode: [
          { required: true, message: "请输入图形码", trigger: "blur" },
          { len: 4, message: "图形码的长度为4位", trigger: "blur" }
        ],
        // 手机验证码的正则表达式
        rcode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { len: 4, message: "手机验证码的长度为4位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    regBtn() {
      this.$refs.regForm.validate(valid => {
        if (valid) {
          alert("成功");
          postData({
            username: this.form.name,
            phone: this.form.tel,
            email: this.form.email,
            avatar: this.form.avatar,
            password: this.form.password,
            rcode: this.form.rcode
          }).then(res => {
            if (res.data.code == 200) {
              window.console.log(res);
              // 重置表单,他只能重置表单元素
              // 而img不是表单元素，所以只要img绑定的url还在，他就一直在显示
              this.$refs.regForm.resetFields();
              this.imageUrl = "";
              //注册成功，关闭对话框
              this.dialogFormVisible = false;
            } else {
              this.$message.error(res.data.message);
            }
          });
        } else {
          alert("111");
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // this.form.avatar不能等于URL.createObjectURL(file.raw) 因为这是临时路径
      // 因此用上传成功后返回的值中的路径，但这是手动赋值的，没有事件重新校验
      this.form.avatar = res.data.file_path;
      // 这个时候我们就要想办法，单独对这一个属性做一次校验
      this.$refs.regForm.validateField('avatar');
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 图片 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    reGetUrl() {
      this.imgCode =
        process.env.VUE_APP_BASE_URL + "/captcha?type=sendsms" + "&t=" + Date.now();
    },
    btnNum() {
      if (!/0?(13|14|15|18|17)[0-9]{9}/.test(this.form.tel)) {
        return this.$message.error("手机输入长度不对");
      }
      if (this.form.imgCode.length != 4) {
        return this.$message.error("图形码长度不对");
      }
      this.code_num = 60;
      let timer = setInterval(() => {
        this.code_num--;
        if (this.code_num == 0) {
          clearInterval(timer);
        }
      }, 1000);
      // axios({
      //   method: "post",
      //   url: process.env.VUE_APP_BASE_URL + "/sendsms",
      //   data: {
      //     code: this.form.imgCode,
      //     phone: this.form.tel,
      //   },
      //   //可以携带cookie
      //   withCredentials:true,
      // }).then(res=>{
      //     window.console.log(res);
      //     if(res.data.code == 200) {
      //       this.$message.success(res.data.message);
      //     } else {
      //       this.$message.error((res.data.message));
      //     }
      // });
      getCode({
        code: this.form.imgCode,
        phone: this.form.tel
      }).then(res => {
        window.console.log(res);
        if (res.data.code == 200) {
          this.$message.success(res.data.data.captcha);
        } else {
          this.$message.error(res.data.message);
        }
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

.avatar-uploader {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px !important;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>