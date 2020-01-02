<template>
  <div>
    <div class="login-box" :style="'height:'+height+'px'">
      <div class="login">
        <div class="content-box">
          <div class="form-head">注册</div>

          <div class="form-row m-t-20">
            <div class="form-key">用户名：</div>
            <input
              v-model="user_name"
              :class="{activeStyle:nameFlag}"
              @focus="nameFocus"
              @blur="nameBlur"
              class="form-val"
              type="text"
              placeholder="请输入您的登录用户名"
            />
          </div>

          <div class="form-row m-t-20">
            <div class="form-key">手机号：</div>
            <input
              v-model="user_mobile"
              :class="{activeStyle:teleFlag}"
              @focus="teleFocus"
              @blur="teleBlur"
              class="form-val"
              type="text"
              placeholder="请输入您要注册的手机号"
            />
          </div>
          <div class="form-row m-t-20">
            <div class="form-key">服务商：</div>
            <input
              v-model="user_type"
              :class="{activeStyle:serveFlag}"
              @focus="serveFocus"
              @blur="serveBlur"
              class="form-val"
              id="server"
              type="text"
            />
          </div>
          <div class="form-row m-t-20">
            <div class="form-key">验证码：</div>
            <div class="codeRight">
              <div class="test-code">
                <input
                  v-model="user_pic_code"
                  type="text"
                  :class="{activeStyle:codeFlag1}"
                  @focus="codeFocus1"
                  @blur="codeBlur1"
                  class="writeCode"
                  placeholder="请输入验证码"
                />
                <div class="codeBox" @click="getIdentifyingCode()">
                  <img
                    ref="codeImg"
                    :src="'http://192.168.18.35:10000/captcha/new.html?font_size=24&time='+codetime"
                    style="height:40px; width: 160px; cursor: pointer;"
                    alt="点击更换"
                    title="点击更换"
                  />
                </div>
              </div>
              <div class="test-code m-t-20">
                <input
                  v-model="user_mobile_code"
                  type="text"
                  :class="{activeStyle:codeFlag2}"
                  @focus="codeFocus2"
                  @blur="codeBlur2"
                  class="writeCode"
                  placeholder="请输入验证码"
                />
                <button class="getCode" v-if="flag" @click="getCode">获取验证码</button>
                <!-- <a
                  class="getCode"
                  v-if="flag"
                  :href="'http://192.168.18.35:10000/member/verification_code/send.html?username='+user_mobile+'captcha='+user_pic_code+'captcha_id='+user_pic_code"
                >获取验证码</a>-->
                <button class="getCode" v-if="!flag">{{time}}s后可重新发送</button>
              </div>
            </div>
          </div>

          <div class="form-row m-t-20">
            <div class="form-key">密&#x3000;码：</div>
            <div class="codeRight">
              <div class="test-code">
                <input
                  v-model="user_password"
                  class="password"
                  :class="{activeStyle:passwordFlag}"
                  @focus="passwordFocus"
                  @blur="passwordBlur"
                  type="password"
                  placeholder="请设置密码"
                />
              </div>
              <div class="test-code m-t-20">
                <input
                  v-model="user_sure_password"
                  class="password"
                  :class="{activeStyle:passwordFlag1}"
                  @focus="passwordFocus1"
                  @blur="passwordBlur1"
                  type="password"
                  placeholder="请再次输入密码"
                />
              </div>
            </div>
          </div>
          <div class="form-row m-t-20">
            <div class="form-key"></div>
            <button class="registerRight" @click="regBtn">立即注册</button>
          </div>
          <div class="already m-t-20">
            <span>已有账户，</span>
            <router-link class="linkLogin" to="/login">马上登录</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
import _ from "underscore";
export default {
  data() {
    return {
      // 时间倒计时
      time: 60,
      setTimer: "",
      flag: true, //发送验证码 和 倒计时切换
      // 双向绑定
      user_name: "",
      user_mobile: "",
      user_type: "服务商中国材料网",
      user_pic_code: "",
      user_mobile_code: "",
      user_password: "",
      user_sure_password: "",
      height: "",
      //名字输入框聚焦
      nameFlag: false,
      teleFlag: false,
      serveFlag: false,
      codeFlag1: false,
      codeFlag2: false,
      passwordFlag: false,
      passwordFlag1: false,
      codetime: "" //时间戳
    };
  },
  created() {
    this.codetime = Date.parse(new Date());
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
    // 图片验证码
    getIdentifyingCode() {
      this.codetime = Math.random(Date.parse(new Date()));
    },
    // 获取手机验证码
    getCode() {
      //手机号正则
      var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
      if (!phoneReg.test(this.user_mobile)) {
        this.$message({
          showClose: true,
          message: "请输入有效的手机号码！",
          type: "warning"
        });
        this.user_mobile = "";
        console.log(this.$refs.codeImg.src);
        this.$refs.codeImg.src='http://192.168.18.35:10000/captcha/new.html?font_size=24&refresh='+this.codetime
          console.log(this.$refs.codeImg.src);
        return false;
      } else {
        // 发请求
        let _this = this;
        let post_data = {
          action: "cailiaof.user.sendmsg",
          param: {
            username: _this.user_mobile,
            captcha: _this.user_pic_code,
            captcha_id: "",
            domain: ""
          }
        };

        _this.$axios.get("/api", { params: post_data }).then(res => {
          console.log(res);
          this.flag = false;
          this.startTimer();
        });
      }
    },
    // 触发定时器
    startTimer() {
      this.setTimer = window.setInterval(() => {
        //要写成 window.setInterval，否则清除不掉
        if (this.time > 0 && this.flag == false) {
          this.time--;
        } else {
          window.clearInterval(this.setTimer);
          this.flag = true;
          this.time = 60;
        }
      }, 1000);
    },
    // 注册按钮（判断用户名是否已经存在*手机号已经注册过*图片/手机验证码错误*两次输入密码不一致）
    regBtn() {
      // 判断是否完整填写信息
      if (
        this.user_name != "" &&
        this.user_mobile != "" &&
        this.user_type != "" &&
        this.user_pic_code != "" &&
        this.user_mobile_code != "" &&
        this.user_password != "" &&
        this.user_sure_password != ""
      ) {
        // 判断两次输入的密码是否一致
        if (this.user_password == this.user_sure_password) {
          // let _this = this;
          // var data = {
          //   action: "cailiaof.user.register",
          //   param: {
          //     user_login: "user",
          //     username: "13100000000",
          //     captcha: "abcd",
          //     code: "1234",
          //     password: "123456",
          //     repassword: "123456",
          //     agent_name: "中国材料网",
          //     domain: ""
          //   }
          // };
          // _this.$axios
          //   .get("/api", { params: data })
          //   .then(res => {
          //     if (res.data.code == 0) {
          //       document.title = res.data.result.head.title;
          //       this.info = res.data.result;
          //     } else {
          //       alert("defeat");
          //     }
          //   })
          //   .catch(err => {
          //     console.log(err);
          //   });

          // 所有信息都正确发请求成功后跳转登录页
          this.$message({
            showClose: true,
            message: "注册成功！即将跳转到登录页",
            type: "warning",
            onClose: () => {
              this.$router.push("/login");
            }
          });
        } else {
          this.$message({
            showClose: true,
            message: "两次输入的密码不一致",
            type: "warning"
          });
        }
      } else {
        this.$message({
          showClose: true,
          message: "请填写完整的注册信息",
          type: "warning"
        });
      }
    },
    resize() {
      var clientw = window.innerWidth; //1920（包含滚动条）
      var clienth = window.innerHeight; //883（不含工具条）
      this.height = clienth;
    },
    nameFocus() {
      this.nameFlag = true;
    },
    nameBlur() {
      this.nameFlag = false;
    },
    teleFocus() {
      this.teleFlag = true;
    },
    teleBlur() {
      this.teleFlag = false;
    },
    serveFocus() {
      this.serveFlag = true;
    },
    serveBlur() {
      this.serveFlag = false;
    },
    codeFocus1() {
      this.codeFlag1 = true;
    },
    codeBlur1() {
      this.codeFlag1 = false;
    },
    codeFocus2() {
      this.codeFlag2 = true;
    },
    codeBlur2() {
      this.codeFlag2 = false;
    },
    passwordFocus() {
      this.passwordFlag = true;
    },
    passwordBlur() {
      this.passwordFlag = false;
    },
    passwordFocus1() {
      this.passwordFlag1 = true;
    },
    passwordBlur1() {
      this.passwordFlag1 = false;
    }
  }
};
</script>

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
  padding: 20px 15px;
  position: absolute;
  right: 19%;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(240, 240, 240, 0.3);
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.35);
  border-radius: 10px;
}
.content-box {
  width: 100%;
  background: #f0f0f0;
  box-shadow: 0px 0px 3px 0px rgba(5, 0, 1, 0.45);
  border-radius: 5px;
}
.form-head {
  padding-top: 20px;
  padding-bottom: 15px;
  text-align: center;
  font-size: 30px;
  color: rgba(252, 105, 32, 1);
  border-bottom: 1px solid rgba(252, 105, 32, 1);
}
.form-row {
  display: flex;
  justify-content: center;
}
.form-key {
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: right;
  font-size: 18px;
  color: rgba(64, 64, 64, 1);
}
.form-val {
  width: 320px;
  height: 40px;
  margin-left: 10px;
  padding-left: 10px;
  border: 1px solid rgba(170, 170, 170, 1);
}
#server::-webkit-input-placeholder {
  color: #404040;
}
.codeRight {
  width: 320px;
  margin-left: 10px;
}
.test-code {
  width: 320px;
  height: 40px;
  border: 1px solid rgba(170, 170, 170, 1);
  border: none;
  overflow: hidden;
  padding: 0;
}
.writeCode {
  float: left;
  width: 150px;
  height: 40px;
  padding-left: 10px;
  border: 1px solid rgba(170, 170, 170, 1);
}
.codeBox {
  float: right;
  width: 160px;
  height: 40px;
  background: #fff;
  cursor: pointer;
}
.getCode {
  float: right;
  width: 160px;
  height: 40px;
  color: #404040;
  font-size: 14px;
  text-align: center;
  line-height: 40px;
  background: rgba(230, 230, 230, 1);
  border-radius: 6px;
  cursor: pointer;
  border: none;
  outline: 0;
}
.password {
  width: 320px;
  height: 40px;
  padding-left: 10px;
  border: 1px solid rgba(170, 170, 170, 1);
}
.registerRight {
  width: 320px;
  height: 40px;
  margin-left: 10px;
  text-align: center;
  line-height: 36px;
  color: #fff;
  font-size: 16px;
  background: #fc6920;
  border-radius: 6px;
  outline: 0;
  border: none;
  cursor: pointer;
}
.already {
  width: 430px;
  margin: 20px auto 0;
  color: #7c7c7c;
  font-size: 14px;
  padding-bottom: 20px;
  text-align: right;
}
.linkLogin {
  font-size: 14px;
  color: #fc6920;
}
.activeStyle {
  border: 1px solid #fc6920;
}
</style>