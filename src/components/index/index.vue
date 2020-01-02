<template>
  <div>
    <headerBox />
    <!-- 分类导航 -->
    <div class="safe auto list">
      <ul class="clearfix list-bar">
        <li id="nav-all">所有商品分类</li>
        <li id="nav-or">
          <router-link to="/supply">供应库</router-link>
          <!-- <router-link to="purchase">求购中心</router-link> -->
          <!-- <router-link to="/goods">产品中心</router-link> -->
          <router-link to="/yellowpage">黄页中心</router-link>
          <router-link to="/information">新闻资讯</router-link>
          <!-- <router-link to="/aicaigou">百度爱采购</router-link> -->
        </li>
      </ul>
    </div>
    <!-- 轮播 -->
    <div id="banner-box" @mouseenter="Stop" @mouseleave="Scroll">
      <div class="view">
        <a
          v-for="(item,indeximg) in info.imgUrl"
          :key="indeximg"
          v-show="indeximg==number"
          :href="item.web_link"
        >
          <img :src="'http://files.cailiao.com/'+item.thumbnail" alt />
        </a>
      </div>

      <ul class="pot">
        <li
          v-for="(x,index) in info.imgUrl"
          :key="index"
          @mouseenter="enterPot(index)"
          :class="{con:index==number}"
        ></li>
      </ul>

      <button v-on:click="pre" class="btn left">&lt;</button>
      <button v-on:click="next" class="btn right">&gt;</button>

      <!-- 全部分类 -->
      <div class="safe auto bigbox" @mouseleave="leaveKinds">
        <div id="list-l">
          <!-- 一级 -->
          <li
            class="firstLevel"
            @mouseenter="enterKinds(indexOne)"
            @mouseleave="getOut(indexOne)"
            v-for="(one,indexOne) in info.oneLevel"
            :key="indexOne"
          >
            <router-link class="firstLi" :to="{path:'/differ',query:{type:one.alias}}">
              <span
                ref="activeImg"
                :style="'background-position-y:'+(-(15+30*indexOne))+'px'"
                class="icon-small"
              ></span>
              <span>{{one.name}}</span>
            </router-link>

            <!-- 二级  v-if="kindsType==indexOne"-->
            <ul class="list-kindsbox" v-if="kindsType==indexOne">
              <li v-for="(two,indexTwo) in one.child" :key="indexTwo" class="kinds-row clearfix">
                <router-link
                  :to="{path:'/differ',query:{type:two.alias}}"
                  class="left-title"
                >{{two.name}}</router-link>
                <div class="left-links">
                  <router-link
                    :to="{path:'/differ',query:{type:third.alias}}"
                    v-for="(third,indexThree) in two.child"
                    :key="indexThree"
                    href
                  >{{third.name}}</router-link>
                </div>
              </li>
            </ul>
          </li>
        </div>

        <!-- 轮播右侧 -->
        <div class="mixbox">
          <div class="login-register clearfix">
            <router-link class="btn-a login" to="/login">登录</router-link>
            <router-link class="btn-a register" to="/register">注册</router-link>
          </div>
          <div class="tab-new">
            <div class="new-supply" :class="type==0?'bolders':''" @click="showType(0)">最新供应</div>
            <!-- <div class="new-purchase" :class="type==1?'bolders':''" @click="showType(1)">最新求购</div> -->
          </div>
          <div
            class="tab-content"
            @mouseenter="stopSupplyTimer"
            @mouseleave="startSupplyTimer"
            v-show="type==0?true:false"
          >
            <router-link
              :to="{path:'/supplydetail',query:{id:item.id}}"
              v-for="(item,index) in info.newSup"
              :key="index"
            >{{item.name}}</router-link>
          </div>

          <!-- <div class="tab-content" v-show="type==1?true:false">
            <router-link
              :to="{path:'/sellerdetail',query:{id:item.id}}"
              v-for="(item,index) in info.newPur"
              :key="index"
            >{{item.name}}</router-link>
          </div>-->
        </div>
      </div>
    </div>

    <!-- 四大分类 -->
    <div class="nav-block safe clearfix">
      <router-link :to="{path:'/differ',query:{type:'jiaotong'}}" class="block-item jiaotong">
        <p class="block-name">交通运输</p>
        <div class="block-more m-t-30">了解更多</div>
      </router-link>
      <router-link :to="{path:'/differ',query:{type:'jixie'}}" class="block-item jixie m-l-10">
        <p class="block-name">工程机械</p>
        <div class="block-more m-t-30">了解更多</div>
      </router-link>
      <router-link :to="{path:'/differ',query:{type:'huanbao'}}" class="block-item huanbao m-l-10">
        <p class="block-name">节能环保</p>
        <div class="block-more m-t-30">了解更多</div>
      </router-link>
      <router-link :to="{path:'/differ',query:{type:'huagong'}}" class="block-item huagong m-l-10">
        <p class="block-name">化学化工</p>
        <div class="block-more m-t-30">了解更多</div>
      </router-link>
    </div>
    <!-- 楼层标识 -->
    <div class="floor-des safe auto">
      <span class="bolder">热门品类</span>
      <span class="normal m-l-10">精选商品一键直达</span>
    </div>

    <!-- 主要分类商品 -->
    <!-- 楼层 -->
    <div class="products-father">
      <div class="products safe auto m-t-20" v-for="(one,index) in info.supply" :key="index">
        <div class="products-l clearfix">
          <a href class="kindsOf1-f1">
            <p class="title">{{one.title}}</p>
          </a>
          <a href class="kindsOf1-f2"></a>
        </div>
        <div class="products-r">
          <div class="layer-top clearfix">
            <a href class="items" v-for="(two,index) in one.goods" :key="index">
              <p class="title">{{two.name}}</p>
              <img class="img-goods" :src="two.image" alt />
            </a>
          </div>
          <div class="layer-bottom clearfix">
            <a href v-for="(three,index) in one.links" :key="index" class="keywords">{{three.name}}</a>
          </div>
        </div>
      </div>
    </div>

    <footBox />
  </div>
</template>
<script>
import Vue from "vue";
import _ from "underscore";
import "../../vendor/underscore.mixin";
import headerBox from "../common/header-box";
import footBox from "../common/foot-index-box";
export default {
  components: { headerBox, footBox },
  data() {
    return {
      info: {
        oneLevel: [], // 全部分类一级
        imgUrl: [], //首页轮播图type=1
        newSup: [], //最新供应
        newPur: [], //最新求购
        supply: [] //楼层
      },

      kindsType: -1, //控制一级分类下的二级分类
      number: 0, //控制轮播图上张下张
      timer: "", //轮播的自动播放
      type: 0, //切换最新供应和求购
      timer1: "", //右侧最新供应、求购的自动播放
      timer2: "" //右侧最新供应、求购的自动播放
    };
  },
  created() {
    let _this = this;
    // var logindata = {
    //   action: "cailiaof.user.status",
    //   param: {
    //     domain: "http://www.baidu.com"
    //   }
    // };
    // _this.$axios
    //   .get("/api", {
    //     params: logindata
    //   })
    //   .then(res => {
    //     console.log(res);
    //     //   if (res.data.code == 0) {
    //     //     console.log(res)
    //     //   } else {
    //     //     alert("defeat");
    //     //   }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // 头部内容
    var headdata = {
      action: "cailiaof.head.home",
      param: { domain: "http://www.baidu.com" }
    };
    _this.$axios
      .get('/api', { params: headdata })
      .then(res => {
        if (res.data.code == 0) {
          document.title = res.data.result.title;
        } else {
          alert("defeat");
        }
      })
      .catch(err => {
        console.log(err);
      });

    // 全部分类
    var data = {
      action: "cailiaof.navigation.all",
      param: { domain: "http://www.baidu.com" }
    };
    _this.$axios
      .get("/api", { params: data })
      .then(res => {
        if (res.data.code == 0) {
          Vue.set(this.info, "oneLevel", res.data.result);
          // console.log(this.info.oneLevel); //打印全部分类
        } else {
          alert("defeat");
        }
      })
      .catch(err => {
        console.log(err);
      });

    // 轮播
    var data1 = {
      action: "cailiaof.slide.list",
      param: { type: 1, domain: "http://www.baidu.com" }
    };
    _this.$axios
      .get("/api", { params: data1 })
      .then(res => {
        if (res.data.code == 0) {
          Vue.set(this.info, "imgUrl", res.data.result);
        } else {
          alert("defeat");
        }
      })
      .catch(err => {
        console.log(err);
      });

    // 最新供应
    var data2 = {
      action: "cailiaof.supply.supplay",
      param: { domain: "http://www.baidu.com" }
    };
    _this.$axios
      .get("/api", { params: data2 })
      .then(res => {
        if (res.data.code == 0) {
          Vue.set(this.info, "newSup", res.data.result);
        } else {
          alert("defeat");
        }
      })
      .catch(err => {
        console.log(err);
      });
    // 最新求购
    // var data2 = {
    //   action: "cailiaof.seller.seller",
    //   param: { domain: "http://www.baidu.com" }
    // };
    // _this.$axios
    //   .get("/api", { params: data2 })
    //   .then(res => {
    //     if (res.data.code == 0) {
    //       Vue.set(this.info, "newPur", res.data.result.data);
    //     } else {
    //       alert("defeat");
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    //首页楼层
    var data3 = {
      action: "cailiaof.floor.list",
      param: { type: 1, domain: "http://www.baidu.com" }
    };
    _this.$axios
      .get("/api", { params: data3 })
      .then(res => {
        if (res.data.code == 0) {
          Vue.set(this.info, "supply", res.data.result);
        } else {
          alert("defeat");
        }
      })
      .catch(err => {
        console.log(err);
      });

    //自动播放
    this.Scroll();
    this.scrollSup();
    // this.scrollPur();
  },
  mounted() {},
  methods: {
    // 最新供应和求购的自动播放
    scrollSup() {
      this.timer1 = setInterval(() => {
        let first = this.info.newSup.splice(0, 1);
        this.info.newSup.push(...first);
      }, 2000);
    },
    // 最新求购
    scrollPur() {
      this.timer2 = setInterval(() => {
        let second = this.info.newPur.splice(0, 1);
        this.info.newPur.push(...second);
      }, 2000);
    },
    // 轮播下一张
    next: function() {
      this.number++;
      if (this.number > this.info.imgUrl.length - 1) {
        this.number = 0;
      }
    },
    // 轮播上一张
    pre: function() {
      this.number--;
      if (this.number < 0) {
        this.number = this.info.imgUrl.length - 1;
      }
    },
    // 鼠标移入轮播下面标记点
    enterPot(index) {
      this.Stop();
      this.number = index;
      this.Stop();
    },
    // 鼠标移出整个轮播计时器开始
    Scroll() {
      this.timer = setInterval(() => {
        this.next();
      }, 2000);
    },
    // 鼠标移入整个轮播计时器停止
    Stop() {
      clearInterval(this.timer);
    },
    // 鼠标移入最新供应
    stopSupplyTimer() {
      clearInterval(this.timer1);
    },
    // 鼠标移出最新供应
    startSupplyTimer() {
      this.timer1 = setInterval(() => {
        let first = this.info.newSup.splice(0, 1);
        this.info.newSup.push(...first);
      }, 2000);
    },
    // 点击切换最新供应、求购
    showType(type) {
      this.type = type;
    },
    // 鼠标移入全部分类其中一个
    enterKinds(index) {
      this.kindsType = index;
      this.$refs.activeImg[index].style.backgroundPositionX = "-60px";
    },
    // 鼠标移出全部分类其中一个
    getOut(index) {
      this.$refs.activeImg[index].style.backgroundPositionX = "-15px";
    },
    // 鼠标移出分类（一级和二级）
    leaveKinds() {
      this.kindsType = -1;
    }
  }
};
</script>
<style scoped>
/* 分类导航 */
.list {
  height: 40px;
  margin-top: 20px;
}
.list-bar {
  height: 40px;
}
#nav-all {
  width: 186px;
  height: 40px;
  color: #fff;
  float: left;
  font-size: 16px;
  padding-left: 58px;
  line-height: 40px;
  background-color: #fc6920;
  background-image: url(../../assets/images/kinds-head.png);
  background-repeat: no-repeat;
  background-position: 20% 50%;
}
#nav-or {
  height: 40px;
  line-height: 40px;
  float: left;
  margin-left: 30px;
}
#nav-or a {
  opacity: 1;
  color: #373737;
  font-size: 16px;
  padding: 7px 0;
  margin: 0 30px;
}
#nav-or a:hover {
  color: #fc6920;
  border-bottom: 2px solid #fc6920;
}
/* 轮播 */
#banner-box {
  width: 100%;
  height: 500px;
  position: relative;
  overflow: hidden;
}

.view {
  width: 1920px;
  height: 500px;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 50%;
  background-color: #dedede;
  margin-left: -960px;
  opacity: 1;
}
.view a {
  display: block;
  width: 1920px;
  height: 500px;
  border: none;
  opacity: 1;
}
.view a img {
  width: 100%;
  height: 500px;
}

.btn {
  border: none;
  width: 55px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  background: rgba(255, 255, 255, 0.5);
  font-size: 30px;
  position: absolute;
  top: 50%;
  cursor: pointer;
  margin-top: -27.5px;
  outline: none;
  display: none;
}

.left {
  left: 5%;
}

.right {
  right: 5%;
}
li {
  list-style: none;
}
.pot li {
  width: 24px;
  height: 5px;
  background-color: #ffffff;
  margin: 0 5px;
  float: left;
  cursor: pointer;
}

.pot {
  width: 136px;
  overflow: hidden;
  position: absolute;
  bottom: 12px;
  left: 50%;
  margin-left: -68px;
  z-index: 500;
}

.pot .con {
  background: #fe8847;
}

/* 全部分类 */
.bigbox {
  position: relative;
}
#list-l {
  width: 187px;
  height: 500px;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: rgba(0, 0, 0, 0.77);
}

#list-l::-webkit-scrollbar {
  width: 2px;
}

#list-l .firstLevel {
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
}

.firstLevel .firstLi {
  font-size: 14px;
  color: #fff;
}

.firstLevel .firstLi .icon-small {
  display: inline-block;
  width: 30px;
  height: 30px;
  vertical-align: middle;
  background-image: url(../../assets/images/icon1.png);
  background-position-x: -15px;
  background-repeat: no-repeat;
}

.firstLevel:hover .firstLi {
  color: #fc6920;
}
/* 二级样式 */
.list-kindsbox {
  width: 880px;
  height: 500px;
  position: absolute;
  z-index: 900;
  left: 187px;
  top: 0;
  padding: 10px 25px 0;
  overflow-x: hidden;
  overflow-y: scroll;
  background: rgba(255, 255, 255, 0.9);
}

.kinds-row {
  width: 800px;
  margin: 0 auto;
  padding: 20px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d9d9d9;
}
.left-title {
  display: block;
  opacity: 1;
  width: 80px;
  color: #373737;
  font-size: 12px;
  font-weight: bold;
}
.left-links {
  width: 720px;
  overflow: hidden;
}
.left-links a {
  display: block;
  height: 16px;
  line-height: 16px;
  opacity: 1;
  float: left;
  color: #6a6a6a;
  font-size: 12px;
  padding: 0 15px;
  margin: 0 0 10px;
  border-right: 1px solid #6a6a6a;
}
.left-links a:hover {
  color: #fc6920;
}
/*轮播右侧 */
.mixbox {
  width: 334px;
  height: 464px;
  position: absolute;
  top: 80px;
  right: 0;
  z-index: 500;
  background-image: url(../../assets/images/mix.png);
  background-size: 100% 100%;
  background-position: 0 0;
}
.login-register {
  display: flex;
  justify-content: center;
  margin-top: 100px;
}
.btn-a {
  display: block;
  width: 88px;
  height: 30px;
  font-size: 16px;
  text-align: center;
  line-height: 30px;
  border-radius: 17px;
  opacity: 1;
}
.login {
  background: #aa60fd;
  color: #fff;
}
.register {
  line-height: 26px;
  margin-left: 20px;
  border: 2px solid #be65ec;
  color: #b563f3;
}
.register:hover {
  background: #aa60fd;
  color: #fff;
}
.tab-new {
  display: flex;
  justify-content: center;
  margin-top: 70px;
}
.new-supply {
  color: #373737;
  font-size: 16px;
  cursor: pointer;
  padding-bottom: 5px;
}
.new-purchase {
  cursor: pointer;
  margin-left: 30px;
  color: #373737;
  font-size: 16px;
  padding-bottom: 5px;
}
.bolders {
  font-weight: bold;
  border-bottom: 2px solid #fc6920;
}
.tab-content {
  width: 225px;
  height: 152px;
  overflow: hidden;
  margin: 15px auto 0;
}
.tab-content a {
  margin: 8px 0;
  color: #373737;
  font-size: 12px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tab-content a:hover {
  color: #fc6920;
}
/* 四大分类 */
.nav-block {
  height: 212px;
  margin: 25px auto;
}
.block-item {
  float: left;
  opacity: 1;
  display: block;
  width: 292.5px;
  height: 212px;
  padding-left: 25px;
  background-size: 100% 100%;
}
.jiaotong {
  background-image: url(../../assets/images/jiaotong.png);
}
.jixie {
  background-image: url(../../assets/images/jixie.png);
}
.huanbao {
  background-image: url(../../assets/images/huanbao.png);
}
.huagong {
  background-image: url(../../assets/images/huagong.png);
}
.block-name {
  color: #616161;
  font-size: 20px;
  margin-top: 20px;
}
.block-line {
  width: 39px;
  height: 3px;
}
.block-more {
  width: 67px;
  height: 21px;
  font-size: 10px;
  color: #fff;
  text-align: center;
  line-height: 21px;
  border-radius: 11px;
  background: rgba(0, 0, 0, 0.16);
}

/* 楼层标识 */
/* .floor-des {
  padding-bottom: 20px;
} */
.floor-des .bolder {
  font-weight: 600;
  font-size: 18px;
  color: #fc6920;
}
.floor-des .normal {
  font-size: 12px;
  color: #6a6a6a;
}

/* 主要分类商品 */
.products {
  overflow: hidden;
}
.products-l {
  width: 665px;
  height: 460px;
  float: left;
}
.kindsOf1-f1 {
  display: block;
  opacity: 1;
  float: left;
  width: 215px;
  padding-left: 23px;
  height: 460px;
  overflow: hidden;
  background-color: #f1f1f1;
}
.kindsOf1-f1 .title {
  color: #191919;
  font-size: 24px;
  margin-top: 55px;
}
.kindsOf1-f2 {
  display: block;
  opacity: 1;
  float: left;
  width: 450px;
  height: 460px;
  padding-left: 35px;
  background-color: #e1eefe;
}
/* 一楼 */
.products-father .products:nth-child(1) .products-l .kindsOf1-f1 {
  background-image: url(../../assets/images/build1.png);
}
.products-father .products:nth-child(1) .products-l .kindsOf1-f2 {
  background-image: url(../../assets/images/build2.png);
}
/* 二楼 */
.products-father .products:nth-child(2) .products-l .kindsOf1-f1 {
  background-image: url(../../assets/images/toolcar1.png);
}
.products-father .products:nth-child(2) .products-l .kindsOf1-f2 {
  background-image: url(../../assets/images/toolcar2.png);
}
/* 三楼 */
.products-father .products:nth-child(3) .products-l .kindsOf1-f1 {
  background-image: url(../../assets/images/yejin1.png);
}
.products-father .products:nth-child(3) .products-l .kindsOf1-f2 {
  background-image: url(../../assets/images/yejin2.jpg);
}
/* 四楼 */
.products-father .products:nth-child(4) .products-l .kindsOf1-f1 {
  background-image: url(../../assets/images/light1.png);
}
.products-father .products:nth-child(4) .products-l .kindsOf1-f2 {
  background-image: url(../../assets/images/light2.png);
}
/* 五楼 */
.products-father .products:nth-child(5) .products-l .kindsOf1-f1 {
  background-image: url(../../assets/images/dianzi1.png);
}
.products-father .products:nth-child(5) .products-l .kindsOf1-f2 {
  background-image: url(../../assets/images/dianzi2.jpg);
}
/* 六楼 */
.products-father .products:nth-child(6) .products-l .kindsOf1-f1 {
  background-image: url(../../assets/images/computer1.png);
}
.products-father .products:nth-child(6) .products-l .kindsOf1-f2 {
  background-image: url(../../assets/images/computer2.png);
}
/* 七楼 */
.products-father .products:nth-child(7) .products-l .kindsOf1-f1 {
  background-image: url(../../assets/images/diangong1.png);
}
.products-father .products:nth-child(7) .products-l .kindsOf1-f2 {
  background-image: url(../../assets/images/diangong2.jpg);
}
/* 八楼 */
.products-father .products:nth-child(8) .products-l .kindsOf1-f1 {
  background-image: url(../../assets/images/chuanmei1.png);
}
.products-father .products:nth-child(8) .products-l .kindsOf1-f2 {
  background-image: url(../../assets/images/chuanmei2.jpg);
}
/* 九楼 */
.products-father .products:nth-child(9) .products-l .kindsOf1-f1 {
  background-image: url(../../assets/images/wujin1.png);
}
.products-father .products:nth-child(9) .products-l .kindsOf1-f2 {
  background-image: url(../../assets/images/wujin2.jpg);
}
/* 十楼 */
.products-father .products:nth-child(10) .products-l .kindsOf1-f1 {
  background-image: url(../../assets/images/anquan1.png);
}
.products-father .products:nth-child(10) .products-l .kindsOf1-f2 {
  background-image: url(../../assets/images/anquan2.jpg);
}
/* 十一楼 */
.products-father .products:nth-child(11) .products-l .kindsOf1-f1 {
  background-image: url(../../assets/images/baozhuang1.png);
}
.products-father .products:nth-child(11) .products-l .kindsOf1-f2 {
  background-image: url(../../assets/images/baozhuang2.jpg);
}
/* 十二楼 */
.products-father .products:nth-child(12) .products-l .kindsOf1-f1 {
  background-image: url(../../assets/images/bangong1.png);
}
.products-father .products:nth-child(12) .products-l .kindsOf1-f2 {
  background-image: url(../../assets/images/bangong2.jpg);
}

/* 右侧 */
.products-r {
  width: 525px;
  float: right;
  height: 460px;
}
.layer-top {
  width: 525px;
  height: 346px;
  overflow: hidden;
  border-bottom: 1px solid #d9d9d9;
}
.layer-top .items {
  display: block;
  padding-top: 30px;
  float: left;
  width: 170px;
  height: 167px;
  margin: 0 2.5px 5px;
  background-color: #fbfafa;
}
.items .title {
  text-align: center;
  font-size: 16px;
  color: #191919;
}
.items .img-goods {
  display: block;
  width: 100px;
  height: 75px;
  margin: 15px auto 0;
}
.layer-bottom {
  height: 100px;
  overflow: hidden;
  padding: 10px 25px;
}
.layer-bottom .keywords {
  display: block;
  padding: 10px 5px;
  font-size: 14px;
  color: #191919;
  float: left;
}
</style>


