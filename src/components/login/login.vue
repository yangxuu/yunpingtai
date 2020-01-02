<template>
  <div>
    <div class="login-box" :style="'height:'+height+'px'">
      <div class="login">
        <div class="content-box">
          <div class="form-head">会员登录</div>

          <div class="form-row m-t-25">
            <div class="form-key">用户名：</div>
            <div class="form-val">
              <el-input placeholder="请输入账号" v-model="adminVal" clearable></el-input>
            </div>
          </div>

          <div class="form-row m-t-25">
            <div class="form-key">密&#x3000;码：</div>
            <div class="form-val">
              <el-input placeholder="请输入密码" v-model="passVal" clearable></el-input>
            </div>
          </div>

          <div class="form-row m-t-25">
            <div class="form-key"></div>
            <div class="form-forget">
              <div class="for-left">
                <input class="checkbox" v-model="checkFlag" type="checkbox" />
                <span>自动登录</span>
              </div>
              <div class="for-right">忘记密码？</div>
            </div>
          </div>
          <div class="form-row m-t-20">
            <div class="form-key"></div>
            <div class="form-forget">
              <div class="login-btn" to="login">
                <el-button :plain="true" @click="logBtn">登录</el-button>
              </div>
              <router-link class="register-btn" to="register">
                <el-button :plain="true">注册</el-button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      height: "", //获取屏幕高度
      adminVal: "", //账号
      passVal: "", //密码
      checkFlag: true //自动登录单选框
    };
  },
  mounted() {
    this.resize();
    window.addEventListener(
      "resize",
      () => {
        this.resize();
      },
      false
    );
  },
  methods: {
    resize() {
      var clientw = window.innerWidth; //1920（包含滚动条）
      var clienth = window.innerHeight; //883（不含工具条）
      this.height = clienth;
    },
    // 登录按钮
    logBtn() {
      let _this = this;
      if (this.adminVal && this.passVal) {
        let loginData = {
          action: "cailiaof.user.login",
          param: {
            username: _this.adminVal,
            password: _this.passVal,
            domain: ""
          }
        };
        _this.$axios
          .get("/api", { params: loginData })
          .then(res => {
            console.log(res);
            // // 1、发请求，登录失败/成功。验证账号密码 清空账号密码
            // this.adminVal = "";
            // this.passVal = "";
            // // 2、弹出提示信息
            // this.$message({
            //   showClose: true,
            //   message: "登录成功！",
            //   type: "warning",
            //   // 3、回调函数自动跳转到index首页
            //   onClose: () => {
            //     if (this.$route.query.url) {
            //       this.$router.push(this.$route.query.url);
            //     } else {
            //       this.$router.push("/");
            //     }
            //   }
            // });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        // 弹出错误提示信息
        this.$message({
          showClose: true,
          message: "请输入完整的登录信息！",
          type: "warning"
        });
        // 清空账号密码
        this.adminVal = "";
        this.passVal = "";
      }
    }
  }
};
</script>
<style>
.login-btn .el-button,
.register-btn .el-button {
  width: 140px;
  font-size: 20px;
  color: #fff;
  background: rgba(252, 105, 32, 1);
}
.login-btn .el-button:hover,
.register-btn .el-button:hover {
  border: 1px solid rgba(252, 105, 32, 1);
  color: rgba(252, 105, 32, 1);
}
.form-val {
  width: 320px;
  height: 40px;
  margin-left: 10px;
}
.form-val .el-input {
  width: 100%;
}
</style>
<style scoped>
.login-box {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-image: url(../../assets/images/allimages/login-bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.login {
  width: 550px;
  height: 380px;
  padding: 20px 15px;
  position: absolute;
  left: 50%;
  top: 25%;
  background: rgba(240, 240, 240, 0.3);
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.35);
  border-radius: 10px;
}
.content-box {
  width: 100%;
  height: 100%;
  background: rgba(240, 240, 240, 1);
  box-shadow: 0px 0px 3px 0px rgba(5, 0, 1, 0.45);
  border-radius: 5px;
}
.form-head {
  padding-top: 20px;
  padding-bottom: 15px;
  text-align: center;
  font-size: 30px;
  color: #fc6920;
  border-bottom: 1px solid #fc6920;
}
.form-row {
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-key {
  width: 100px;
  text-align: right;
  font-size: 18px;
  color: rgba(64, 64, 64, 1);
}

.form-forget {
  display: flex;
  justify-content: space-around;
  width: 320px;
  margin-left: 10px;
}
.for-left,
.for-right {
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(64, 64, 64, 1);
  font-size: 14px;
}
.checkbox {
  width: 14px;
  height: 14px;
  border: 1px solid rgba(170, 170, 170, 1);
}
</style>