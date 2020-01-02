<template>
  <div>
    <!-- 右侧固定条 -->
    <div class="right-fixed-box">
      <div class="clickarea" @click="clickarea"></div>
      <div class="hoverarea">
        <ul class="ularea">
          <li class="icon-man" @mouseleave="hidevip($event)" @mouseenter="showvip($event)">
            <a href class="icon-block"></a>
            <a href class="put-man" ref="vip">会员中心</a>
          </li>
          <li class="icon-wx" @mouseleave="hideweixin($event)" @mouseenter="showweixin($event)">
            <a href class="icon-block"></a>
            <img class="skanimg" v-show="flag_img" src="../../assets/images/skanimg.png" alt />
          </li>
          <li class="icon-server" @mouseleave="hideserver($event)" @mouseenter="showserver($event)">
            <a href class="icon-block"></a>
            <a href class="put-server" ref="server">客服电话</a>
          </li>
          <li
            class="icon-top"
            @mouseleave="hidetop($event)"
            @mouseenter="showtop($event)"
            @click="totop"
          >
            <div class="put-top" ref="top">返回顶部</div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 弹出留言框 -->
    <div class="fixed-sidebox" ref="formbox">
      <button class="shutdown" @click="shutdown"></button>
      <div class="form-warn"></div>
      <div class="sidebox-form">
        <form class="real-form" action method="post">
          <div class="warn"></div>
          <div class="form-row">
            <div class="form-key">联系人</div>
            <input class="form-value val_name" type="text" placeholder="请输入联系人" />
          </div>
          <div class="form-row">
            <div class="form-key">手机号</div>
            <input
              class="form-value val_mobile"
              maxlength="11"
              oninput="value=value.replace(/[^\d]/g,'')"
              type="text"
              placeholder="请输入手机号"
            />
          </div>
          <div class="form-row">
            <div class="form-key">公司名称</div>
            <input class="form-value val_company" type="text" placeholder="请输入公司名称" />
          </div>
          <button class="form-submit" type="submit">在线留言</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 0,
      flag_img:false,
    };
  },
  methods: {
    clickarea() {
      this.count++;
      if (this.count % 2) {
        this.$refs.formbox.style.right = "40px";
      } else {
        this.$refs.formbox.style.right = "-362px";
      }
    },
    shutdown() {
      this.clickarea();
    },
    showtop(e) {
      e.target.style.backgroundColor = "#FF8800";
      this.$refs.top.style.left = "-100px";
    },
    hidetop(e) {
      e.target.style.backgroundColor = "#3F3C3C";
      this.$refs.top.style.left = "0";
    },
    totop() {
      window.scrollTo(0, 0);
    },
    showserver(e) {
      e.target.style.backgroundColor = "#FF8800";
      this.$refs.server.style.left = "-100px";
    },
    hideserver(e) {
      e.target.style.backgroundColor = "#3F3C3C";
      this.$refs.server.style.left = "0";
    },
    showweixin(e) {
      e.target.style.backgroundColor = "#FF8800";
      this.flag_img=true;
    },
    hideweixin(e) {
      e.target.style.backgroundColor = "#3F3C3C";
      this.flag_img=false;
    },
    showvip(e) {
      e.target.style.backgroundColor = "#FF8800";
      this.$refs.vip.style.left = "-100px";
    },
    hidevip(e) {
      e.target.style.backgroundColor = "#3F3C3C";
      this.$refs.vip.style.left = "0";
    }
  }
};
</script>
<style scoped>
/* 右侧固定条 */
.right-fixed-box {
  width: 40px;
  height: 100%;
  position: fixed;
  right: 0;
  top: 0;
  background-color: #3f3c3c;
  z-index: 1000;
}

.clickarea {
  cursor: pointer;
  height: 652px;
  overflow: hidden;
  background-image: url(../../assets/images/sidebar.png);
  background-repeat: no-repeat;
  background-size: 40px auto;
}
.hoverarea {
  width: 40px;
  position: absolute;
  bottom: 5%;
  z-index: 1100;
}
.ularea li {
  width: 40px;
  height: 40px;
  margin: 10px 0;
  background-color: #3f3c3c;
  background-position: center center;
  background-repeat: no-repeat;
}

.icon-block {
  display: block;
  width: 100%;
  height: 100%;
}
.icon-man {
  background-image: url(../../assets/images/vipclient.png);
  background-size: 23px 26px;
  position: relative;
}
.put-man {
  display: block;
  width: 100px;
  height: 40px;
  position: absolute;
  left: 0;
  top: 0;
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  background-color: #ff8800;
  transition: all 0.2s ease-in;
  z-index: -500;
  border-radius: 3px 0 0 3px;
}
.icon-wx {
  background-image: url(../../assets/images/weixin.png);
  background-size: 28px 28px;
  position: relative;
}
.skanimg {
  width: 243px;
  height: 140px;
  position: absolute;
  top: -22px;
  left: -250px;
  z-index: 999999999;
  cursor: pointer;
}
.icon-server {
  background-image: url(../../assets/images/servetele.png);
  background-size: 26px 27px;
  position: relative;
}
.put-server {
  display: block;
  width: 100px;
  height: 40px;
  position: absolute;
  left: 0;
  top: 0;
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  background-color: #ff8800;
  transition: all 0.2s ease-in;
  z-index: -500;
  border-radius: 3px 0 0 3px;
}
.icon-top {
  background-image: url(../../assets/images/totop.png);
  background-size: 23px 29px;
  position: relative;
}
.put-top {
  width: 100px;
  height: 40px;
  position: absolute;
  left: 0;
  top: 0;
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  background-color: #ff8800;
  transition: all 0.2s ease-in;
  z-index: -500;
  border-radius: 3px 0 0 3px;
  cursor: pointer;
}

/* 弹出留言框 */
.fixed-sidebox {
  position: fixed;
  width: 362px;
  height: 680px;
  top: 0;
  right: -362px;
  z-index: 999;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  transition: all 0.5s ease;
  background-image: url(../../assets/images/formbg.png);
  background-size: 100% 100%;
}

.shutdown {
  width: 25px;
  height: 25px;
  position: absolute;
  right: 5px;
  top: 5px;
  outline: 0;
  cursor: pointer;
  border-radius: 50%;
  background-image: url(../../assets/images/close.png);
  background-size: 100% 100%;
}
.form-warn {
  position: absolute;
  left: 0;
  top: 115px;
  width: 362px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: red;
}
.sidebox-form {
  width: 362px;
  position: absolute;
  top: 137px;
  overflow: hidden;
}
.real-form {
  width: 100%;
  overflow: hidden;
}
.form-row {
  width: 280px;
  height: 43px;
  margin-top: 10px;
  margin-left: 53px;
  height: 43px;
  overflow: hidden;
}

.form-key {
  width: 60px;
  float: left;
  height: 43px;
  line-height: 43px;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  color: #3f3c3c;
}

.form-value {
  width: 220px;
  float: left;
  height: 43px;
  border: 1px solid rgba(193, 192, 192, 1);
  border-radius: 3px;
  background-color: #fff;
  outline: 0;
  padding-left: 10px;
  font-size: 13px;
}

.form-submit {
  display: block;
  width: 263px;
  height: 43px;
  background: rgba(255, 132, 0, 1);
  border-radius: 3px;
  font-size: 18px;
  text-align: center;
  line-height: 43px;
  color: #fff;
  margin-top: 10px;
  margin-left: 70px;
  cursor: pointer;
  outline: 0;
}
</style>

