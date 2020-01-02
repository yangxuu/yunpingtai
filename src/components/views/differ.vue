<template>
  <div>
    <headerBox />
    <!-- <shopHeader /> -->
    <!-- <navbar /> -->
    <div class="suport-fenlei safe auto">
      <div class="suport-fenlei-bread">
        <span>当前位置：</span>
        <a href>中国材料网</a>
        <a href>&gt;机械及行业设备</a>
      </div>
      <div class="table-border">
        <!-- 行业分类： -->
        <div class="suport-row-fenlei" ref="fenlei">
          <div class="suport-row-left">行业分类：</div>
          <div class="suport-row-medium">
            <div class="m-all">全部</div>
            <span
              @click="changeTypeRouter(item)"
              class="medium-a"
              v-for="(item,index) in info.result.cate_list"
              :key="index"
            >{{item.name}}</span>
          </div>
          <button
            class="suport-row-right fenlei-click"
            ref="classVal"
            @click="changeVal('class')"
          >展开</button>
        </div>
        <!-- 城市： -->
        <div class="suport-row-city" ref="city">
          <div class="suport-row-left">城市：</div>
          <div class="suport-row-medium">
            <div class="m-all">全部</div>
            <span
              @click="changeCityRouter(item)"
              class="medium-a"
              v-for="(item,index) in info.city_list"
              :key="index"
            >{{item.name}}</span>
          </div>
          <button class="suport-row-right city-click" ref="cityVal" @click="changeVal('city')">展开</button>
        </div>
        <!-- 关键词： -->
        <div class="suport-row-key" ref="keywords">
          <div class="suport-row-left">关键词：</div>
          <div class="suport-row-medium">
            <div class="m-all">全部</div>
            <span
              @click="changeKeyRouter(item)"
              class="medium-a"
              v-for="(item,index) in info.result.keywords_list"
              :key="index"
            >{{item.title}}</span>
          </div>
          <button
            class="suport-row-right key-click"
            ref="keywordsVal"
            @click="changeVal('keywords')"
          >展开</button>
        </div>
      </div>

      <!-- 左侧商品样式默认一页显示24个商品 -->
      <div class="suport-goodsbox safe auto m-t-20">
        <div class="goodsbox-left">
          <div class="goodsbox-left-box clearfix">
            <div class="suport-goods" v-for="(item,index) in info.result.list.data" :key="index">
              <router-link :to="{path:'/supplydetail',query:{id:item.id}}" class="suport-imgbox">
                <img :src="item.image" alt />
                <div class="askfor">立即询价</div>
              </router-link>
              <div class="suport-para">
                <div class="suport-price">¥ {{item.price_description}}</div>
                <div class="suport-des">{{item.name}}</div>
                <div class="suport-shopname">
                  <div class="name-left">{{item.enterprise_name}}</div>
                  <div class="vip-flags">
                    <img class="flag1" src="../../assets/images/icon-1.png" alt />
                    <img class="flag2" src="../../assets/images/icon-2.png" alt />
                  </div>
                </div>
              </div>
              <div class="suport-location">
                <!-- item.address_str -->
                <div class="s-float">{{item.address_str}}</div>
                <div class="r-float">{{item.user_category}}</div>
              </div>
            </div>

            <!-- 右侧注册 -->
            <div class="right-box" v-if="info.result.list.data.length==0?false:true">
              <div class="head">选择中国材料网让生意更简单</div>
              <router-link to="/register" class="register">立即免费注册</router-link>
              <div class="para-col1">
                <span class="number">1.</span>百度全域流量精准覆盖
              </div>
              <div class="para-col1">
                <span class="number">2.</span>用户搜索直达，商机主动推送
              </div>
              <div class="para-col1">
                <span class="number">3.</span>全网询盘、采购订单轻松掌握
              </div>
            </div>
          </div>
          <!-- 分页 -->
          <div class="page-container" v-if="info.result.list.data.length==0?false:true">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="20"
              background
              layout="prev, pager, next"
              :total="Number(info.result.list.total)"
            ></el-pagination>
          </div>
        </div>
      </div>



      
    </div>

    <footBox />
  </div>
</template>
<script>
import Vue from "vue";
import shopHeader from "../common/shopHeader";
import navbar from "../common/navbar";
import headerBox from "../common/header-box";
import footBox from "../common/foot-box";
export default {
  components: { shopHeader, navbar, headerBox, footBox },
  data() {
    return {
      // 控制展开收起
      x: 0,
      y: 0,
      z: 0,
      // 请求的数据
      info: {
        result: {
          cate_list: [], //分类
          keywords_list: [], //关键词
          list: { data: [], total: "" } //商品
        },
        city_list: [] //热门城市
      },
      currentPage: 1 //当前页码
    };
  },
  created() {
    let _this = this;
    // 供应库
    if (this.$route.query.type || this.$route.query.city) {
      let _this = this;
      var data = {
        action: "cailiaof.supply.supplylist",
        param: {
          name: this.$route.query.type,
          name2: this.$route.query.city,
          domain: "http://www.baidu.com"
        }
      };
      _this.$axios
        .get("/api", { params: data })
        .then(res => {
          if (res.data.code == 0) {
            Vue.set(this.info, "result", res.data.result);
          } else {
            alert("defeat");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    if (this.$route.query.id) {
      let _this = this;
      var data = {
        action: "cailiaof.supply.supplylist",
        param: {
          id: this.$route.query.id,
          domain: "http://www.baidu.com"
        }
      };
      _this.$axios
        .get("/api", { params: data })
        .then(res => {
          if (res.data.code == 0) {
            Vue.set(this.info, "result", res.data.result);
          } else {
            alert("defeat");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }

    //热门城市
    var data1 = {
      action: "cailiaof.provincial_cities.hotcity",
      param: { domain: "http://www.baidu.com" }
    };
    _this.$axios
      .get("/api", { params: data1 })
      .then(res => {
        if (res.data.code == 0) {
          Vue.set(this.info, "city_list", res.data.result);
          // document.title = res.data.result.head.head_title;
        } else {
          alert("defeat");
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  watch: {
    //监听相同路由下参数变化异步刷新
    $route(to, from) {
      if (this.$route.query.type || this.$route.query.city) {
        let _this = this;
        var data = {
          action: "cailiaof.supply.supplylist",
          param: {
            name: this.$route.query.type,
            name2: this.$route.query.city,
            domain: "http://www.baidu.com"
          }
        };
        _this.$axios
          .get("/api", { params: data })
          .then(res => {
            if (res.data.code == 0) {
              Vue.set(this.info, "result", res.data.result);
            } else {
              alert("defeat");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      if (this.$route.query.id) {
        let _this = this;
        var data = {
          action: "cailiaof.supply.supplylist",
          param: {
            id: this.$route.query.id,
            domain: "http://www.baidu.com"
          }
        };
        _this.$axios
          .get("/api", { params: data })
          .then(res => {
            if (res.data.code == 0) {
              Vue.set(this.info, "result", res.data.result);
            } else {
              alert("defeat");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  methods: {
    // 分类路由
    changeTypeRouter(item) {
      this.$router.push({
        path: "differ",
        query: { type: item.alias, city: this.$route.query.city }
      });
    },
    // 城市路由
    changeCityRouter(item) {
      if (this.$route.query.type) {
        this.$router.push({
          path: "differ",
          query: { type: this.$route.query.type, city: item.alias }
        });
      }
    },
    // 关键词路由
    changeKeyRouter(item) {
      this.$router.push({
        path: "differ",
        query: { id: item.id }
      });
    },
    // 分页操作
    handleCurrentChange(currentPage) {
      if (this.$route.query.type || this.$route.query.city) {
        let _this = this;
        var data = {
          action: "cailiaof.supply.supplylist",
          param: {
            name: this.$route.query.type,
            name2: this.$route.query.city,
            domain: "http://www.baidu.com"
          },
          page: currentPage
        };
        _this.$axios
          .get("/api", { params: data })
          .then(res => {
            if (res.data.code == 0) {
              Vue.set(this.info, "result", res.data.result);
            } else {
              alert("defeat");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      if (this.$route.query.id) {
        let _this = this;
        var data = {
          action: "cailiaof.supply.supplylist",
          param: {
            id: this.$route.query.id,
            domain: "http://www.baidu.com"
          },
          page: currentPage
        };
        _this.$axios
          .get("/api", { params: data })
          .then(res => {
            if (res.data.code == 0) {
              Vue.set(this.info, "result", res.data.result);
            } else {
              alert("defeat");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    changeVal(type) {
      if (type == "class") {
        this.x++;
        if (this.x % 2) {
          this.$refs.classVal.innerHTML = "收起";
          this.$refs.fenlei.style.height = "auto";
        } else {
          this.$refs.classVal.innerHTML = "展开";
          this.$refs.fenlei.style.height = "61px";
        }
      }
      if (type == "city") {
        this.y++;
        if (this.y % 2) {
          this.$refs.cityVal.innerHTML = "收起";
          this.$refs.city.style.height = "auto";
        } else {
          this.$refs.cityVal.innerHTML = "展开";
          this.$refs.city.style.height = "61px";
        }
      }
      if (type == "keywords") {
        this.z++;
        if (this.z % 2) {
          this.$refs.keywordsVal.innerHTML = "收起";
          this.$refs.keywords.style.height = "auto";
        } else {
          this.$refs.keywordsVal.innerHTML = "展开";
          this.$refs.keywords.style.height = "61px";
        }
      }
    }
  }
};
</script>

<style scoped>
/* 顶部导航 */
.suportnavbar {
  border-top: 2px solid #47c2fb;
  height: 52px;
  line-height: 50px;
  background-color: #fff;
}

.suportbar .m-l-80 {
  margin-left: 80px;
}

.suportbar a {
  color: #333;
  padding-bottom: 14px;
  font-size: 16px;
  padding-bottom: 7px;
}

.suportbar .suporta {
  border-bottom: 3px solid #47c2fb;
}

.suportbar a:hover {
  color: #47c2fb;
}

/* 分类 */
.suport-fenlei {
  margin-top: 14px;
}

.suport-fenlei-bread {
  height: 38px;
  line-height: 38px;
  padding-left: 17px;
  font-size: 12px;
  color: #999999;
  background: #fff;
}

.suport-fenlei-bread a {
  font-size: 12px;
  color: #999999;
}
.table-border {
  width: 1201px;
  margin: 0 auto;
  border-left: 1px solid #d0d0d0;
  border-right: 1px solid #d0d0d0;
  border-top: 1px solid #d0d0d0;
}
.suport-row-fenlei {
  height: 61px;
  padding: 14px 0;
  overflow: hidden;
  background: #fff;
  transition: all 0.3s linear;
  border-bottom: 1px solid #d8d7d7;
}

.suport-row-city {
  height: 61px;
  padding: 14px 0;
  overflow: hidden;
  background: #fff;
  transition: all 0.3s linear;
  border-bottom: 1px solid #d8d7d7;
}

.suport-row-key {
  height: 61px;
  padding: 14px 0;
  overflow: hidden;
  background: #fff;
  transition: all 0.3s linear;
  border-bottom: 1px solid #d8d7d7;
}

.suport-row-left {
  width: 90px;
  text-align: right;
  float: left;
  color: #999999;
  font-size: 14px;
  margin-top: 4px;
}

.suport-row-medium {
  width: 925px;
  float: left;
  margin-left: 5px;
  overflow: hidden;
}

.suport-row-right {
  border: none;
  outline: 0;
  background: none;
  width: 179px;
  float: left;
  font-size: 16px;
  color: #fc6920;
  text-align: center;
  cursor: pointer;
  background-image: url(../../assets/images/open.png);
  background-repeat: no-repeat;
  background-position: 65% 50%;
}

.m-all {
  float: left;
  color: #fff;
  padding: 5px 10px;
  font-size: 14px;
  background: #fc6920;
}

.suport-row-medium a:hover {
  color: #fc6920;
}

.medium-a {
  float: left;
  cursor: pointer;
  display: block;
  padding: 5px 10px;
  margin: 3px 10px;
}

/* 注册 */
.right-box {
  width: 225px;
  height: 310px;
  border: 1px solid #d8d7d7;
  margin: 7.5px 0 0;
  background-image: url(../../assets/images/vip.png);
  background-size: 100% 100%;
  position: absolute;
  right: 8px;;
  top: -3px;
  z-index: 300;
}
.right-box .head {
  margin: 40px 15px;
  text-align: center;
  font-size: 26px;
  color: #fff;
}
.register {
  display: block;
  width: 180px;
  height: 44px;
  text-align: center;
  color: #fff;
  font-size: 16px;
  line-height: 44px;
  margin: 0 auto 20px;
  background: rgba(255, 132, 0, 1);
  border-radius: 3px;
}
.para-col1 {
  font-size: 12px;
  height: 24px;
  line-height: 24px;
  color: #4f4f4f;
  padding-left: 19px;
}
.para-col1 .number {
  font-size: 16px;
  color: #ff8400;
}

/* 分页 */
.page-container {
  width: 100%;
  display: flex;
  padding: 50px 0;
  justify-content: center;
}
/* 商品样式 */
.suport-goodsbox {
  background: #fff;
  overflow: hidden;
  position: relative;
}
.goodsbox-left {
  overflow: hidden;
}
.suport-goods {
  width: 225px;
  height: 310px;
  float: left;
  overflow: hidden;
  margin: 5px 7.5px;
  border: 1px solid #d8d7d7;
}
.suport-imgbox {
  display: block;
   opacity: 1;
  width: 225px;
  height: 195px;
  overflow: hidden;
  position: relative;
  background-image: url(../../assets/images/imgbg.png);
  background-size: 100% 100%;
  border-bottom: 1px solid #d8d7d7;
}

.suport-imgbox img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.askfor {
  display: block;
  width: 225px;
  height: 30px;
  color: #fff;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
  background: #ff8400;
  position: absolute;
  left: 0;
  bottom: -30px;
  transition: all 0.3s;
  z-index: 99999;
}

/* hover */
.suport-goods:hover .askfor {
  bottom: 0;
}

.suport-goods:hover {
  border: 1px solid #ff8400;
}

.suport-para {
  padding: 6px 8px;
}

.suport-price {
  font-size: 16px;
  color: #ff5456;
  font-weight: bold;
}

.suport-des {
  font-size: 12px;
  color: #333333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.suport-shopname {
  font-size: 10px;
  color: #a4a4a4;
  margin-top: 6px;
  overflow: hidden;
}

.name-left {
  float: left;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.vip-flags {
  float: left;
}

.vip-flags .flag1 {
  width: 15px;
  height: 15px;
}

.vip-flags .flag2 {
  width: 15px;
  height: 16px;
}

.suport-location {
  height: 30px;
  line-height: 30px;
  overflow: hidden;
  font-size: 12px;
  color: #848383;
  padding: 0 8px;
  border-top: 1px solid #d8d7d7;
}
.s-float {
  float: left;
  padding-left: 27px;
  width: 75%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-image: url(../../assets/images/location.png);
  background-repeat: no-repeat;
  background-size: 19px 19px;
  background-position: 0 50%;
}

.r-float {
  float: right;
}
</style>