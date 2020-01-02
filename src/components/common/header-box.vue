<template>
  <div>
    <div class="headerbox1">
      <div class="header1 safe auto">
        <!-- <div>
          <button
            style="margin-top:10px; width:50px;height:37px;border:1px solid red"
            @click="change_color('a')"
          >红色</button>
          <button
            style="margin-top:10px; width:50px;height:37px;border:1px solid yellow"
            @click="change_color('b')"
          >黄色</button>
          <button
            style="margin-top:10px; width:50px;height:37px;border:1px solid blue"
            @click="change_color('c')"
          >蓝色</button>
        </div>-->
        <div class="header1-left">
          <span class="welcome">Hi, 欢迎来到瓯达网络</span>
          <router-link class="login" to="/login">登录</router-link>
          <router-link class="register" to="/register">注册</router-link>
        </div>
        <div class="header1-right clearfix">
          <ul class="clearfix linkIndex">
            <li>
              <i class="vip"></i>
              <router-link to="/login">会员中心</router-link>
            </li>
            <li>
              <i class="help"></i>
              <router-link to="/login">帮助中心</router-link>
            </li>
            <li>
              <i class="adver"></i>
              <router-link to="/login">黄金广告位</router-link>
            </li>
          </ul>
          <div class="strLine"></div>
          <div class="siteNav" @mouseleave="pullShow = false">
            <div class="webNav" @mouseenter="pullShow = true">
              <span :class="{active:pullShow}">网站导航</span>
              <i class="down-ico"></i>
            </div>
            <div class="hoverNav" v-if="pullShow">
              <router-link to="/supply">供应库</router-link>
              <!-- <router-link to="/purchase">求购中心</router-link> -->
              <!-- <router-link to="/goods">产品中心</router-link> -->
              <router-link to="/yellowpage">黄页中心</router-link>
              <router-link to="/information">新闻资讯</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="headerbox2">
      <div class="header2 safe auto">
        <router-link to="/" class="header2-left">
          <img src="../../assets/images/logo.png" alt />
        </router-link>
        <div class="header2-ipt">
          <div class="iptbox-t clearfix">
            <div class="float-left clearfix">
              <div class="select-type" @mouseleave="AccessLeave()">
                <div class="default-type" @mouseenter="AccessSeenter()">
                  <span ref="innerhtml">供应</span>
                  <i class="down-ico m-l-5"></i>
                </div>
                <div class="hover-show" v-if="Access">
                  <div @click="selected('供应','supply')">供应</div>
                  <!-- <div @click="selected('求购','purchase')">求购</div> -->
                  <div @click="selected('公司','company')">公司</div>
                  <div @click="selected('资讯','news')">资讯</div>
                </div>
              </div>
              <input placeholder="搜索商品/店铺" v-model="keywords" class="search-ipt" type="text" />
            </div>
            <button class="float-right" @click="search">搜索</button>
          </div>
          <div class="iptbox-d">
            <span>热门搜索：</span>
            <router-link :to="{path:'/differ',query:{type:'jixie'}}" class="color-active">工程机械</router-link>
            <router-link :to="{path:'/differ',query:{type:'huanbao'}}" class="color-active">环保</router-link>
            <router-link :to="{path:'/differ',query:{type:'wujin'}}">五金</router-link>
            <router-link :to="{path:'/differ',query:{type:'huagong'}}">化工</router-link>
            <router-link :to="{path:'/differ',query:{type:'anquan'}}">安全</router-link>
          </div>
        </div>
        <router-link to="/login" class="btn-style supply">发布供应</router-link>
        <!-- <router-link to="/login" class="btn-style m-l-10 purchase">发布求购</router-link> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: "supply", //搜索类型
      keywords: "", //搜索词

      pullShow: false,
      Access: false //搜索框左侧
    };
  },
  methods: {
    //移入
    AccessSeenter() {
      this.Access = true;
    },
    //移出
    AccessLeave() {
      this.Access = false;
    },
    // 选择搜索类型
    selected(value, type) {
      this.$refs.innerhtml.innerHTML = value;
      this.type = type;
    },
    // 修改主题色
    // change_color(type) {
    //   localStorage.setItem("color_type", type);
    //   document.getElementById("app").className = "theme" + type;
    // },
    // 搜索内容
    search() {
      let _this = this;
      if (this.type == "supply") {
        // console.log("供应");

        this.$router.push({
          path: "searchpage",
          query: { search_type: "supply", keywords: this.keywords }
        });
      }
      if (this.type == "purchase") {
        // console.log("求购");
        
        this.$router.push({
          path: "searchpage",
          query: { search_type: "purchase", keywords: this.keywords }
        });
      }
      if (this.type == "company") {
        // console.log("公司");

        this.$router.push({
          path: "searchpage",
          query: { search_type: "company", keywords: this.keywords }
        });
      }
      if (this.type == "news") {
        // console.log("资讯");

        this.$router.push({
          path: "searchpage",
          query: { search_type: "news", keywords: this.keywords }
        });
      }
    }
  }
};
</script>
<style scoped>
.headerbox1 {
  height: 37px;
  background-color: #e5e5e5;
}
.header1 {
  height: 37px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #6a6a6a;
  font-size: 12px;
}
.header1-left a {
  padding: 0 8px;
  color: #6a6a6a;
  font-size: 12px;
}
.header1-left .login {
  color: #fc6920;
  border-right: 1px solid #cccccc;
}
.register:hover {
  color: #fc6920;
}
.linkIndex {
  float: left;
}
.strLine {
  float: left;
  width: 1px;
  height: 15px;
  margin-top: 11px;
  background: #ccc;
}
.linkIndex li {
  float: left;
  height: 37px;
  list-style: none;
  margin: 0 10px;
  display: flex;
  align-items: center;
}
.linkIndex li a {
  padding: 0 5px;
  color: #6a6a6a;
  font-size: 12px;
  opacity: 1;
}
.linkIndex li a:hover {
  color: #fc6920;
}

.linkIndex li .vip {
  width: 17px;
  height: 15px;
  display: block;
  background-image: url(../../assets/images/ico-vip.png);
  background-repeat: no-repeat;
  background-position: center center;
}
.linkIndex li .help {
  width: 15px;
  height: 15px;
  display: block;
  background-image: url(../../assets/images/ico-help.png);
  background-repeat: no-repeat;
  background-position: center center;
}
.linkIndex li .adver {
  width: 15px;
  height: 15px;
  display: block;
  background-image: url(../../assets/images/ico-adver.png);
  background-repeat: no-repeat;
  background-position: center center;
}
.siteNav {
  float: left;
  margin-left: 12px;
  position: relative;
  width: 65px;
  height: 37px;
}
.webNav {
  width: 60px;
  height: 37px;
  font-size: 12px;
  color: #6a6a6a;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 0;
}
.active {
  color: #fc6920;
}
.webNav span {
  padding-right: 5px;
}
.down-ico {
  display: block;
  width: 7px;
  height: 5px;
  background-image: url(../../assets/images/ico-dire.png);
  background-repeat: no-repeat;
  background-position: center center;
}
.hoverNav {
  background: #fff;
  position: absolute;
  top: 37px;
  right: 0;
  padding: 0 10px;
  box-sizing: border-box;
  width: 165px;
  height: 40px;
  line-height: 40px;
  border: 1px solid #e9e9e9;
  z-index: 500;
}
.hoverNav a {
  color: #999;
  font-size: 12px;
}
.hoverNav a:hover {
  color: #fc6920;
}
.headerbox2 {
  width: 100%;
  height: 100px;
}
.header2 {
  display: flex;
  align-items: center;
  height: 100px;
}
.header2-left {
  display: block;
  opacity: 1;
  width: 206px;
  height: 46px;
}
.header2-left img {
  width: 100%;
  height: 100%;
}
.btn-style {
  display: block;
  width: 92px;
  height: 36px;
  text-align: center;
  line-height: 36px;
  color: #fc6920;
  font-size: 14px;
  font-weight: bold;
  background-color: rgba(252, 105, 32, 0.13);
}
.header2-ipt {
  margin: 16px 24px 0 140px;
}
.iptbox-t {
  width: 560px;
  height: 36px;
}
.float-left {
  float: left;
  width: 480px;
  height: 36px;
  border: 2px solid #fc6920;
}
.select-type {
  float: left;
  width: 58px;
  height: 32px;
  color: #6a6a6a;
  font-size: 12px;
  line-height: 22px;
  position: relative;
  cursor: pointer;
  border-right: 1px solid #ccc;
}
.default-type {
  width: 58px;
  height: 32px;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hover-show {
  width: 58px;
  position: absolute;
  left: -2px;
  top: 32px;
  background-color: #fff;
  z-index: 999;
  border-left: 2px solid #fc6920;
  border-right: 2px solid #fc6920;
  border-bottom: 2px solid #fc6920;
}
.hover-show div {
  margin: 5px 0;
  text-align: center;
  padding-right: 5px;
}
.hover-show div:hover {
  color: #fc6920;
}

.search-ipt {
  float: left;
  display: block;
  width: 415px;
  height: 32px;
  border: none;
  padding-left: 10px;
}

.float-right {
  float: left;
  width: 78px;
  height: 36px;
  outline: 0;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  line-height: 33px;
  padding-left: 24px;
  background-color: #fc6920;
  letter-spacing: 2px;
  background-image: url(../../assets/images/sou.png);
  background-repeat: no-repeat;
  background-position: 20% 50%;
}
.iptbox-d,
.iptbox-d a {
  color: #6a6a6a;
  font-size: 12px;
}
.iptbox-d .color-active {
  color: #fc6920;
}
</style>

