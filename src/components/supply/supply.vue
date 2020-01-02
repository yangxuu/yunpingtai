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

    <div class="fenlei-kinds safe auto m-t-20">
      <!-- 供应分类 -->
      <router-link
        :to="{path:'/differ',query:{type:item.alias}}"
        class="fenlei-spot"
        v-for="(item,index) in info.list"
        :key="index"
      >{{item.name}}</router-link>
    </div>

    <div class="fenlei-box safe auto m-t-20">
      <div class="fenlei-left">
        <!-- 供应楼层 -->
        <div class="fenlei-content">
          <div class="fenlei-c-part" v-for="(one,index) in info.floor" :key="index">
            <div class="part-title">
              <div class="p-title">{{one.title}}</div>
              <div class="p-line"></div>
            </div>

            <div class="hot-img m-t-10">
              <div v-for="(item,index) in one.goods" :key="index" class="h-imgbox">
                <img :src="item.image" alt />
              </div>
            </div>

            <div class="hot-floor m-t-10">热卖爆品</div>

            <div class="hot-content">
              <div class="con-part" v-for="(two,index) in one.links" :key="index">
                <p class="con-bold">{{two.name}}</p>
                <p class="con-links">
                  <router-link
                    v-for="(three,index) in two.cate_list"
                    :key="index"
                    :to="{path:'/differ',query:{type:three.alias}}"
                  >{{three.name}}</router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fenlei-right">
        <div class="right-head">热销榜</div>
        <router-link
          class="right-goods"
          :to="{path:'/supplydetail',query:{id:item.id}}"
          v-for="(item,index) in info.hot.data"
          :key="index"
        >
          <div class="imgBox">
            <img :src="item.image" alt />
          </div>
          <div class="right-para m-t-10">
           {{item.name}}
          </div>
          <div class="right-price m-t-10">￥{{item.price_description}}</div>
        </router-link>
      </div>
    </div>

    <footBox />
  </div>
</template>
<script>
import Vue from "vue";
import headerBox from "../common/header-box";
import footBox from "../common/foot-supply-box";
export default {
  components: { headerBox, footBox },
  data() {
    return {
      info: {
        list: [],//分类
        floor: "",//楼层
        hot:{}//热销榜（最新供应）
      }
    };
  },
  created() {
    let _this = this;

    // 头部内容
    var headdata = {
      action: "cailiaof.head.supply",
      param: { domain: "http://www.baidu.com" }
    };
    _this.$axios
      .get("/api", { params: headdata })
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
    // 分类
    var listdata = {
      action: "cailiaof.navigation.product",
      param: { domain: "http://www.baidu.com" }
    };
    _this.$axios
      .get("/api", { params: listdata })
      .then(res => {
        if (res.data.code == 0) {
          Vue.set(this.info, "list", res.data.result);
        } else {
          alert("defeat");
        }
      })
      .catch(err => {
        console.log(err);
      });
    // 供应楼层
    var floordata = {
      action: "cailiaof.floor.list",
      param: { type: 2, domain: "http://www.baidu.com" }
    };
    _this.$axios
      .get("/api", { params: floordata })
      .then(res => {
        if (res.data.code == 0) {
          Vue.set(this.info, "floor", res.data.result);
        } else {
          alert("defeat");
        }
      })
      .catch(err => {
        console.log(err);
      });

    // 热销榜放最新供应 cailiaof.supply.productsupplay
    var hotdata = {
      action: "cailiaof.supply.productsupplay",
      param: { domain: "http://www.baidu.com" }
    };
    _this.$axios
      .get("/api", { params: hotdata })
      .then(res => {
        if (res.data.code == 0) {
          Vue.set(this.info, "hot", res.data.result);
        } else {
          alert("defeat");
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  watch: {},
  methods: {}
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
  border-bottom: 1px solid #fc6920;
}
#nav-all {
  width: 186px;
  height: 40px;
  color: #fff;
  float: left;
  font-size: 16px;
  padding-left: 55px;
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
  overflow: hidden;
  margin-left: 30px;
}
#nav-or a {
  display: block;
  height: 40px;
  float: left;
  color: #373737;
  font-size: 16px;
  margin: 0 30px;
  opacity: 1;
}
#nav-or a:hover {
  color: #fc6920;
  border-bottom: 2px solid #fc6920;
}
#nav-or .router-link-exact-active {
  color: #fc6920;
  border-bottom: 2px solid #fc6920;
}
/* 供应分类 */
.fenlei-box {
  overflow: hidden;
}
.fenlei-left {
  width: 1006px;
  float: left;
}
.fenlei-right {
  width: 174px;
  float: right;
}
.fenlei-kinds {
  overflow: hidden;
}
.fenlei-spot {
  display: block;
  float: left;
  font-size: 14px;
  color: #191919;
  padding: 5px 10px;
  margin: 5px 10px;
  background-color: #f3f3f3;
}
.fenlei-spot:hover {
  color: #fff;
  background-color: #fc6920;
}
.fenlei-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.fenlei-c-part {
  width: 48%;
  overflow: hidden;
  margin: 20px 0;
}
.part-title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.p-title {
  width: 25%;
  padding-left: 20px;
  color: #191919;
  font-size: 16px;
  font-weight: bold;
}
.p-line {
  width: 75%;
  height: 1px;
  background: #d9d9d9;
}
.hot-img {
  width: 100%;
  height: 167px;
  overflow: hidden;
}
.h-imgbox {
  float: left;
  width: 160px;
  height: 167px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.h-imgbox:nth-child(1) {
  background: #f0f0f0;
}
.h-imgbox:nth-child(2) {
  background: #f9eddd;
}
.h-imgbox:nth-child(3) {
  background: #e1eefe;
}
.h-imgbox img {
  max-width: 120px;
  max-height: 120px;
  width: auto;
  height: auto;
}

.hot-floor {
  width: 100%;
  height: 33px;
  text-align: center;
  line-height: 33px;
  color: #191919;
  font-size: 14px;
  background-color: #f2f2f2;
}

.hot-content {
  width: 100%;
  padding: 0 20px 20px;
}
.con-part {
  margin-top: 18px;
}
.con-bold {
  font-size: 14px;
  color: #191919;
  font-weight: bold;
}
.con-links {
  width: 100%;
  overflow: hidden;
  margin-left: -7px;
}
.con-links a {
  display: block;
  float: left;
  font-size: 12px;
  color: #191919;
  padding: 3px 7px;
}
.con-links a:hover {
  color: #fc6920;
}
.right-head {
  width: 100%;
  color: #fff;
  font-size: 16px;
  padding-left: 15px;
  height: 30px;
  line-height: 30px;
  background-image: url(../../assets/images/hotSell.png);
  background-repeat: no-repeat;
  background-position: center center;
}
.right-goods {
  display: block;
  opacity: 1;
  width: 100%;
  padding: 15px 10px 5px;
}
.imgBox {
  width: 100%;
  height: 150px;
  overflow: hidden;
  border: 1px solid pink;
}
.right-goods img {
  width: 100%;
  height: 100%;
  transition: all 0.3s ease-in;
}
.right-para {
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 12px;
  color: #403c39;
}
.right-price {
  color: #fd7322;
  font-size: 17px;
}
.right-goods:hover img {
  transform: scale(1.2);
}
</style>


