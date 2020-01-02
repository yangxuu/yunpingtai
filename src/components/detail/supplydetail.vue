<template>
  <div>
    <headerBox />

    <!-- 店铺头 -->
    <div>
      <div class="shopHeader1box">
        <div class="shopHeader1 safe auto">
          <div class="h1-left">
            <div class="logo">
              <a :href="obj.result.logo.url">
                <img :src="obj.result.logo.image" alt />
              </a>
            </div>
            <div class="shopinfo m-l-10">
              <p class="info-name">{{obj.result.detail.enterprise_name}}</p>
              <p class="info-sign m-t-10">
                <img class="img-vip" src="../../assets/images/icon-1.png" alt />
                <span
                  class="info-vip"
                >{{obj.result.detail.user_grade==1?"普通会员":obj.result.detail.user_grade==2?"标准会员":obj.result.detail.user_grade==3?"超级会员":obj.result.detail.user_grade==4?"至尊会员":""}}</span>
                <img class="img-comp" src="../../assets/images/icon-2.png" alt />
                <span class="info-comp">企业会员</span>
                <img class="img-move" src="../../assets/images/icon-2.png" alt />
                <span class="info-move">移动商铺</span>
              </p>
            </div>
          </div>
          <div class="h1-right">
            <div class="tel-box">
              <img src="../../assets/images/ai-tel.png" alt />
            </div>
            <div class="telphonenumber m-l-10">{{obj.result.detail.contact_mobile}}</div>
            <div class="r-img1 m-l-35"></div>
            <div class="r-img2 m-l-25"></div>
            <div class="r-img3 m-l-25"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 导航 -->
    <navbar :info="info" />
    <div class="bread-nav safe auto">
      <img class="shouye-ico" src="../../assets/images/yx9.png" alt />
      <span>当前位置：</span>
      <span v-for="(item,index) in obj.result.nav" :key="index">{{item.name}}></span>
      <span>{{obj.result.detail.name}}</span>
    </div>

    <!-- 新增 -->
    <div class="col-top-box safe auto clearfix">
      <div class="col-left" id="big">
        <div class="banner-box" id="pic" @mousemove="move($event)" @mouseout="out">
          <img
            v-for="(item,index) in obj.result.detail.thumb"
            v-show="index==num"
            :key="index"
            :src="item.image"
            alt
          />
        </div>
        <div class="banner-view" id="view" v-show="flag1">
          <img
            v-for="(item,index) in obj.result.detail.thumb"
            v-show="index==num"
            :key="index"
            :style="{left:l+'px',top:t+'px'}"
            :src="item.image"
            alt
          />
        </div>
        <div class="banner-li" id="ul-box">
          <button id="btn-left" @click="prev"></button>
          <button id="btn-right" @click="next"></button>
          <div class="small-imgs">
            <ul id="ul">
              <li
                class="li-border"
                :class="{on:index==num}"
                @mouseenter="num=index"
                v-for="(item,index) in obj.result.detail.thumb"
                :key="index"
              >
                <img :src="item.image" alt />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-medium">
        <div class="goodsname">{{obj.result.detail.name}}</div>
        <div class="col-m-row1">
          <div class="row1-content">现货</div>
        </div>
        <div class="col-m-row2">
          <div class="clearfix" style="height: 75px;">
            <div class="row2-left">
              <span class="row2-key">价格</span>
              <span class="row2-val">
                ￥
                <i>{{obj.result.detail.price_description}}</i>
              </span>
            </div>
            <div class="stright"></div>
            <div class="row2-left">
              <span class="row2-key">产品数量</span>
              <span class="row2-val">
                <i>{{obj.result.detail.amount}}</i>
                {{obj.result.detail.unit}}
              </span>
            </div>
          </div>

          <div class="de-table">
            <div class="table-left">订购信息</div>
            <div class="table-right">
              <div class="table-r-col1">
                <div class="col1-head">起订量</div>
                <div class="col1-head">>=5</div>
                <div class="col1-head">>=5</div>
                <div class="col1-head">>=5</div>
                <div class="col1-head">>=5</div>
                <div class="col1-head">>=5</div>
              </div>
              <div class="table-r-col1">
                <div class="col1-head">价&#x3000;格</div>
                <div class="col1-head">￥238.00</div>
                <div class="col1-head">￥238.00</div>
                <div class="col1-head">￥238.00</div>
                <div class="col1-head">￥238.00</div>
                <div class="col1-head">￥238.00</div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-m-row3">优质产品，欢迎选购！</div>
        <div class="col-m-row4 clearfix">
          <div class="row4-key">企业</div>
          <div class="row4-val">{{obj.result.detail.enterprise_name}}</div>
        </div>
        <div class="col-m-row4 clearfix">
          <div class="row4-key">联系信息</div>
          <div class="row4-val">
            <span
              class="row4-phonenumber"
            >{{obj.result.detail.contact_mobile}} / {{obj.result.detail.phone}}</span>
            <span class="row4-linkman">&#x3000;{{obj.result.detail.link_manage}}</span>
          </div>
        </div>
        <div class="col-m-row4 clearfix addborder">
          <div class="row4-key">所在区域</div>
          <div class="row4-val">{{obj.result.detail.business_address}}</div>
        </div>
        <div class="col-m-row6 clearfix">
          <div class="row6-btn1 btn-block" @click="showAlert">立即询价</div>
          <router-link
            :to="{path:'/shopIndex',query:{shop_id:info.company_id}}"
            class="row6-btn2 btn-block"
          >进入商铺</router-link>
          <div class="row6-btn3 btn-block">
            手机查看
            <div class="skan-box">
              <img src="../../assets/images/3.png" alt />
            </div>
          </div>
          <router-link
            :to="{path:'/shopIndex',query:{shop_id:obj.result.detail.company_id}}"
            class="row6-btn4 btn-block"
          >进入官网</router-link>
        </div>
      </div>

      <div class="col-right">
        <div class="col-r-row1">
          <span class="r-line"></span>
          <span class="r-title">最新商品</span>
          <span class="r-line"></span>
        </div>
        <div class="col-r-row2">
          <router-link
            class="row2-item"
            :to="{path:'/supplydetail',query:{id:item.id}}"
            v-for="(item,index) in obj.result.newest_supply.data"
            :key="index"
          >
            <div class="img-box">
              <img :src="item.image" alt />
            </div>
            <div class="price">￥{{item.price_description}}</div>
          </router-link>
        </div>
      </div>
    </div>
    <!--最新推荐  -->
    <div class="safe auto">
      <div class="boss-title">最新推荐</div>
      <div class="boss-goods-box">
        <button id="boss-left" @click="leftBtn"></button>
        <button id="boss-right" @click="rightBtn"></button>
        <div class="products-box">
          <div class="boss-goods" ref="margin">
            <router-link
              class="boss-item"
              :to="{path:'/supplydetail',query:{id:item.id}}"
              v-for="(item,index) in obj.result.newest_supply.data"
              :key="index"
            >
              <div class="img-box">
                <img :src="item.image" alt />
              </div>
              <div class="boss-name">{{item.name | ellipsis}}</div>
              <div class="boss-price">￥{{item.price_description}}</div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- 详细信息 -->
    <div class="col-detail safe auto clearfix">
      <div class="detail-left">
        <!-- user_grade -->
        <div
          class="shop-level"
        >{{obj.result.detail.user_grade==1?"普通会员":obj.result.detail.user_grade==2?"标准会员":obj.result.detail.user_grade==3?"超级会员":obj.result.detail.user_grade==4?"至尊会员":""}}</div>
        <div class="shop-name">{{obj.result.detail.enterprise_name}}</div>
        <div class="shop-object">
          <div class="object-top">
            <span class="shop-key">企业服务：</span>
            <span class="shop-val"></span>
          </div>
          <div class="object-row">
            <span class="object-key">联系人：</span>
            <span class="object-val">{{obj.result.detail.link_manage}}</span>
          </div>
          <div class="object-row m-t-15">
            <span class="object-key">手机号码：</span>
            <span class="object-val">{{obj.result.detail.contact_mobile}}</span>
          </div>
          <div class="object-row m-t-15">
            <span class="object-key">电话号码：</span>
            <span class="object-val">{{obj.result.detail.phone}}</span>
          </div>
          <div class="object-row m-t-15">
            <span class="object-key">传真：</span>
            <span class="object-val">{{obj.result.detail.facsimile||'暂无数据'}}</span>
          </div>
          <div class="object-row m-t-15">
            <span class="object-key">主营产品：</span>
            <span class="object-val">{{obj.result.detail.product}}</span>
          </div>
        </div>
        <router-link
          class="toshop"
          :to="{path:'/shopIndex',query:{shop_id:obj.result.detail.company_id}}"
        >进入店铺</router-link>

        <!------------------------分类----------------------->
        <div class="kinds">产品分类</div>
        <div class="kinds-box">
          <!-- 若没有分类展示全部产品-->
          <div class="kinds-li">
            <!-- <span class="li-add">+</span> -->
            <span class="li-des">全部产品</span>
          </div>
          <!--有二级或三级目录的部分 -->
          <div class="kinds-list" v-if="obj.result.cate_status">
            <ul id="menu">
              <li class="firstLevel" v-for="(one,index) in obj.result.cate" :key="index">
                <span @click="twoMenu(one)">{{one.name}}</span>
                <ul v-if="one.parent_id" id="two">
                  <li class="secondLevel" v-for="(two,index) in one.sc_cate" :key="index">
                    <a @click="threeMenu(two)" href="javascript:;">{{two.name}}</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="detail-right">
        <div class="right-nav">
          <div class="nav-content">详细信息</div>
        </div>
        <!-- <div class="detail-content clearfix">
          <div class="table-row" v-for="(item,index) in info.shop_item_attr_list" :key="index">
            <span class="table-key">{{item.name}}</span>
            <span class="table-val">{{item.val}}</span>
          </div>
        </div>-->
        <!-- 详情 -->
        <!-- <div class="table2">
          <div class="table2-head">商品详情</div>
          <div class="table2-content" v-html="info.shop_item_info.content"></div>
        </div>-->
        <!-- 老板推荐 -->
        <div class="hot-name">老板推荐</div>
        <div class="col-hot clearfix">
          <router-link
            :to="{path:'/supplydetail',query:{id:item.id}}"
            v-for="(item,index) in obj.result.lb_supply"
            :key="index"
            class="hot-item"
          >
            <div class="img-box">
              <img :src="item.image" alt />
            </div>
            <div class="hot-title">{{item.name | ellipsis}}</div>
            <div class="hot-price">￥{{item.price_description}}</div>
          </router-link>
        </div>
      </div>
    </div>
    <!-- 询价遮罩层 -->
    <div class="mark" :style="flag==1?'':'display:none'">
      <div class="content">
        <div class="title">发送询价单</div>
        <div class="line"></div>
        <form method="post">
          <div class="f-row">
            <span class="forward">您的姓名：</span>
            <span class="input">
              <input v-model="uname" :placeholder="uname_placeholder" type="text" />
            </span>
          </div>
          <div class="f-row">
            <span class="forward">联系电话：</span>
            <span class="input">
              <input v-model="tel" :placeholder="tel_placeholder" type="text" />
            </span>
          </div>
          <div class="f-row">
            <span class="forward">采购留言：</span>
            <span class="input">
              <textarea
                v-model="content"
                type="text"
                :placeholder="content_placeholder"
                cols="20"
                rows="5"
              ></textarea>
            </span>
          </div>
          <div class="submit" @click="submit">立即询价</div>
          <div class="shut" @click="shut">
            <img src="http://files.cailiao.com/vue/lianlv/pc_2/images/yx8.png" alt />
          </div>
        </form>
      </div>
    </div>

    <footBox />
  </div>
</template>
<script>
import Vue from "vue";
import _ from "underscore";
import shopHeader from "../common/shopHeader";
import headerBox from "../common/header-box";
import footBox from "../common/foot-box";
import navbar from "../common/navbar";
import List from "../common/list";
export default {
  components: { List, shopHeader, navbar, headerBox, footBox },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 25) {
        return value.slice(0, 25) + "...";
      }
      return value;
    }
  },
  data() {
    return {
      num: 0, //轮播
      l: 0,
      t: 0,
      type1: 1, //参数切换
      type2: 0, //参数切换
      flag: 0, //遮罩层
      flag1: false, //鼠标移入移出
      uname: "",
      uname_placeholder: "请输入您的姓名",
      tel: "",
      tel_placeholder: "请输入您的电话",
      content: "",
      content_placeholder: "请输入留言内容",
      // 店铺导航跳转id
      info: {},
      // 商品详情数据
      obj: {
        result: {
          detail: {
            thumb: [],
            company_id: ""
          },
          newest_supply: { data: [] }, //最新推荐
          lb_supply: {}, //老板推荐
          cate: [], //橱窗
          cate_status: "", //是否开启橱窗
          logo: { image: "" }, //头部logo
          nav: [] //导航
        }
      },

      count: 0 //推荐商品左右移动
    };
  },
  created() {
    let _this = this;
    // 供应库详情
    var data = {
      action: "cailiaof.supply.supplydetail",
      param: {
        id: this.$route.query.id,
        cache: 1,
        domain: "http://www.baidu.com"
      }
    };
    _this.$axios
      .get("/api", { params: data })
      .then(res => {
        if (res.data.code == 0) {
          Vue.set(this.obj, "result", res.data.result);
          document.title = res.data.result.head.head_title;
          // 店铺导航跳转id
          var shopdata = {
            action: "cailiaof.company.detail",
            param: {
              id: this.obj.result.detail.company_id,
              cache: 1,
              domain: "http://www.baidu.com"
            }
          };
          _this.$axios
            .get("/api", { params: shopdata })
            .then(res => {
              if (res.data.code == 0) {
                this.info = res.data.result;
              } else {
                alert("defeat");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          alert("defeat");
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {
    window.addEventListener("scroll", () => {
      var st = document.body.scrollTop || document.documentElement.scrollTop;
    });
  },
  watch: {
    //监听相同路由下参数变化的时候，从而实现异步刷新
    $route(to, from) {
      let _this = this;
      var data = {
        action: "cailiaof.supply.supplydetail",
        param: {
          id: this.$route.query.id,
          cache: 0,
          domain: "http://www.baidu.com"
        }
      };
      _this.$axios
        .get("/api", { params: data })
        .then(res => {
          if (res.data.code == 0) {
            Vue.set(this.obj, "result", res.data.result);
            document.title = res.data.result.head.head_title;
          } else {
            alert("defeat");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  methods: {
    // 参数切换
    showType1() {
      this.type1 = 1;
      this.type2 = 0;
      window.scrollTo(0, 950);
    },
    showType2() {
      this.type1 = 0;
      this.type2 = 1;
      window.scrollTo(0, 1300);
    },
    // 显示遮罩层
    showAlert() {
      this.flag = 1;
    },
    // 关闭遮罩层
    shut() {
      this.flag = 0;
    },
    // 遮罩层内提交
    submit() {
      let _this = this;
      if (_.empty(_this.uname)) {
        return alert(_this.uname_placeholder);
      }
      if (_.empty(_this.tel)) {
        return alert(_this.tel_placeholder);
      }
      if (_.empty(_this.content)) {
        return alert(_this.content_placeholder);
      }
      var subdata = {
        action: "cailiaof.company.message",
        param: {
          company_id: this.info.company_id,
          link_manage: this.uname,
          tel: this.tel,
          content: this.content,
          domain: "http://www.baidu.com"
        }
      };
      _this.$axios
        .get("/api", { params: subdata })
        .then(res => {
          if (res.data.code == 0) {
            this.flag = 0;
          } else {
            alert("defeat");
          }
        })
        .catch(err => {
          console.log(err);
        });
      // 提交后清空input
      this.uname = "";
      this.tel = "";
      this.content = "";
    },
    // 轮播下一张
    next() {
      this.num++;
      if (this.num == this.obj.result.detail.thumb.length) {
        this.num = 0;
      }
    },
    // 轮播上一张
    prev() {
      if (this.num <= 0) {
        this.num = this.obj.result.detail.thumb.length;
      }
      this.num--;
    },
    // 放大镜移入
    move(e) {
      this.flag1 = true;
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      var scrollLeft =
        document.documentElement.scrollLeft || document.body.scrollLeft;
      var big = document.getElementById("big");
      var box = document.getElementById("pic");
      var left = e.clientX - big.offsetLeft + scrollLeft;
      var top = e.clientY - big.offsetTop + scrollTop;
      if (left < 50) {
        left = 50;
      }
      if (left > 350) {
        left = 350;
      }
      if (top < 50) {
        top = 50;
      }
      if (top > 350) {
        top = 350;
      }
      this.l = -left * 2 + 100;
      this.t = -top * 2 + 100;
    },
    // 放大镜移出
    out() {
      this.flag1 = false;
    },
    // 推荐商品左右滑动
    leftBtn() {
      this.count -= 144;
      if (this.count < 0) {
        this.count = 0;
      }
      this.$refs.margin.style.marginLeft = -this.count + "px";
    },
    rightBtn() {
      this.count += 144;
      if (this.count > 432) {
        this.count = 0;
      }
      this.$refs.margin.style.marginLeft = -this.count + "px";
    },
    // 二级分类
    twoMenu(model) {
      model.parent_id = !model.parent_id;
    },
    threeMenu(model) {
      model.parent_id = !model.parent_id;
    }
  }
};
</script>
<style scoped>
/* 店铺头部 */
.shopHeader1box {
  border-top: 1px solid #c9c8c8;
}
.shopHeader1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 115px;
}
.h1-left {
  display: flex;
  align-items: center;
}
.logo {
  max-width: 250px;
  height: 78px;
}
.logo img {
  width: auto;
  max-width: 250px;
  height: 100%;
}
.info-name {
  color: #333;
  font-size: 20px;
}
.info-sign {
  color: #333;
  font-size: 11px;
}
.img-vip {
  width: 17px;
  height: 15px;
}
.img-comp {
  width: 13px;
  height: 16px;
}
.img-move {
  width: 15px;
  height: 13px;
}
.h1-right {
  display: flex;
  align-items: center;
}
.tel-box {
  width: 37px;
  height: 30px;
}
.telphonenumber {
  font-size: 29px;
  color: #fc6920;
}
.r-img1,
.r-img2,
.r-img3 {
  width: 110px;
  height: 81px;
  color: #fff;
  font-size: 23px;
  text-align: center;
  padding: 10px 25px;
  background-repeat: no-repeat;
  background-position: center center;
}
.r-img1 {
  background-image: url(../../assets/images/shopico1.png);
}
.r-img2 {
  background-image: url(../../assets/images/shopico2.png);
}
.r-img3 {
  background-image: url(../../assets/images/shopico3.png);
}
/* 面包屑 */
.shouye-ico {
  width: 14px;
  height: 14px;
}
.bread-nav {
  padding: 20px 0;
}
.link {
  display: inline-block;
  text-align: center;
  color: #9e9e9e;
  font-size: 14px;
  width: 80px;
  vertical-align: middle;
}
.arrow {
  color: #939393;
  font-size: 14px;
}
.post_title {
  color: #939393;
  font-size: 14px;
  display: inline-block;
  vertical-align: middle;
}
/* 放大镜 */
.col-left {
  float: left;
  width: 402px;
  position: relative;
}

.banner-box {
  width: 402px;
  height: 402px;
  cursor: pointer;
  overflow: hidden;
  border: 1px solid #dedede;
}

.banner-box img {
  width: 402px;
  height: 402px;
  position: absolute;
  left: 0;
  top: 0;
  border: 1px solid #1071bd;
}

.banner-view {
  width: 200px;
  height: 200px;
  border-radius: 10px;
  position: absolute;
  overflow: hidden;
  left: 420px;
  top: 2px;
  z-index: 999;
  border: 1px solid #e5e5e5;
}

.banner-view img {
  width: 804px;
  height: 804px;
  position: absolute;
  top: 0;
  left: 0;
}

.banner-li {
  width: 402px;
  height: 62px;
  margin-top: 7px;
  overflow: hidden;
  position: relative;
}

.small-imgs {
  width: 375px;
  height: 62px;
  position: absolute;
  left: 15px;
  top: 0;
  overflow: hidden;
}

#ul {
  overflow: hidden;
  height: 62px;
}

#btn-left {
  width: 13px;
  height: 62px;
  outline: none;
  border: none;
  background-image: url(../../assets/images/yx14.png);
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.1);
}

#btn-right {
  width: 13px;
  height: 62px;
  outline: none;
  border: none;
  background-image: url(../../assets/images/yx15.png);
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 999;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.1);
}

.li-border {
  width: 62px;
  height: 62px;
  float: left;
  padding: 5px;
  cursor: pointer;
  border: 1px solid #e5e5e5;
}

.on {
  display: block;
  border: 1px solid #e56d25;
}

.li-border img {
  width: 100%;
  height: 100%;
}

/* 中间 */
.col-medium {
  float: left;
  width: 621px;
  margin-left: 17px;
}

.goodsname {
  font-size: 16px;
  color: #3a3a3a;
  font-weight: bold;
}

.col-m-row1 {
  width: 100%;
  height: 31px;
  background-color: #f8f8f8;
  border: 1px solid #e5e5e5;
  margin-top: 13px;
}

.row1-content {
  width: 98px;
  height: 31px;
  text-align: center;
  line-height: 31px;
  color: #fd7322;
  font-size: 14px;
  background: #fff;
  border-top: 2px solid #fd7322;
}

.col-m-row2 {
  width: 100%;
  background: #fff5ed;
  margin-top: 14px;
  overflow: hidden;
}

.stright {
  width: 1px;
  height: 36px;
  float: left;
  margin-top: 20px;
  background: rgba(163, 145, 132, 0.39);
}

.row2-left {
  float: left;
  width: 40%;
  height: 75px;
  padding-left: 20px;
  line-height: 75px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.row2-key {
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  color: #a39184;
}

.row2-val {
  margin-left: 45px;
  display: inline-block;
  vertical-align: middle;
  font-size: 30px;
  color: #a39184;
  font-size: 18px;
}
.row2-val i {
  font-style: normal;
  color: #fd7322;
  font-size: 30px;
}
.de-table {
  height: 85px;
  overflow: hidden;
}
.table-left {
  width: 100px;
  float: left;
  padding-left: 20px;
  color: #a39184;
  font-size: 14px;
}
.table-right {
  float: left;
  width: 493px;
  height: 67px;
  background: rgba(255, 255, 255, 1);
  border-left: 1px solid #e8dcd2;
  border-top: 1px solid #e8dcd2;
}
.table-r-col1 {
  overflow: hidden;
  border-bottom: 1px solid #e8dcd2;
}
.col1-head {
  float: left;
  width: 82px;
  height: 33px;
  text-align: center;
  line-height: 33px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-right: 1px solid #e8dcd2;
}
.col-m-row3 {
  width: 100%;
  height: 38px;
  color: #885733;
  font-size: 14px;
  padding-left: 175px;
  line-height: 38px;
  margin-top: 13px;
  background-image: url(../../assets/images/yx16.png);
  background-size: 100% 100%;
}

.col-m-row4 {
  width: 100%;
  margin-top: 20px;
}

.row4-key {
  float: left;
  width: 123px;
  padding-left: 27px;
  font-size: 14px;
  color: #a39184;
}

.row4-val {
  float: left;
  width: 435px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  color: #3a3a3a;
}
.row4-phonenumber {
  font-size: 18px;
  color: #fc6920;
}
.row4-linkman {
  color: #3a3a3a;
  font-size: 14px;
}
.linkman {
  margin-top: 20px;
}

.linktele {
  margin-top: 6px;
}

.addborder {
  padding-bottom: 18px;
  border-bottom: 1px solid #e5e5e5;
}

.col-m-row6 {
  width: 726px;
  margin-top: 12px;
}

.btn-block {
  display: block;
  width: 139px;
  height: 44px;
  float: left;
  line-height: 44px;
  padding-left: 49px;
  color: #fd7322;
  font-size: 16px;
  margin: 0 8.125px;
  background-color: #fff5ed;
  border: 1px solid #f1e0d4;
  background-repeat: no-repeat;
  background-position: 20% 50%;
}

.row6-btn1 {
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  background-color: #fd7322;
  background-image: url(../../assets/images/yx4.png);
  background-size: 24px 23px;
}

.row6-btn2 {
  opacity: 1;
  background-image: url(../../assets/images/yx5.png);
  background-size: 22px 23px;
}

.row6-btn3 {
  cursor: pointer;
  background-image: url(../../assets/images/yx6.png);
  background-size: 15px 24px;
  position: relative;
}

.row6-btn3:hover .skan-box {
  opacity: 1;
  display: block;
}

.skan-box {
  position: absolute;
  left: 0;
  top: 44px;
  width: 139px;
  height: 150px;
  padding: 15px;
  background-color: #fff5ed;
  opacity: 0;
  display: none;
  z-index: 999;
  transition: all 0.3s ease-in;
}

.skan-box img {
  width: 100%;
  height: 100%;
}

.row6-btn4 {
  opacity: 1;
  background-image: url(../../assets/images/yx9.png);
  background-size: 24px 21px;
}

/* 右边 */
.col-right {
  float: right;
  width: 142px;
  height: 476px;
  background: rgba(248, 248, 248, 1);
}

.col-r-row1 {
  height: 38px;
  line-height: 38px;
  color: #74716f;
  font-size: 12px;
  text-align: center;
}

.col-r-row1 span {
  display: inline-block;
  vertical-align: middle;
}

.r-line {
  width: 21px;
  height: 1px;
  background: rgba(116, 113, 111, 1);
  opacity: 0.47;
}

.col-r-row2 {
  width: 100%;
  height: 421px;
  overflow: hidden;
}

.row2-item {
  float: left;
  display: block;
  width: 103px;
  opacity: 1;
  margin-left: 18px;
}

.row2-item .img-box {
  width: 103px;
  height: 103px;
  padding: 6px;
  overflow: hidden;
  background: rgba(255, 255, 255, 1);
  border: 1px solid #1071bd;
}

.img-box:hover {
  border: 1px solid red;
}

.img-box img {
  width: 100%;
  height: 100%;
  transition: all 0.3s;
}

.row2-item .price {
  font-size: 13px;
  padding: 10px 0 10px;
  text-align: center;
  color: #403c39;
}
.row2-item:hover img {
  transform: scale(1.2);
}
/* 商家推荐 */
.boss-title {
  width: 100%;
  font-size: 18px;
  color: #403c39;
  height: 66px;
  line-height: 66px;
}

.boss-goods-box {
  width: 100%;
  height: 180px;
  overflow: hidden;
  position: relative;
}

#boss-left {
  position: absolute;
  width: 20px;
  height: 126px;
  background: rgba(0, 0, 0, 0.1);
  left: 0;
  top: 0;
  border: none;
  outline: none;
  cursor: pointer;
  background-image: url(../../assets/images/yx14.png);
  background-repeat: no-repeat;
  background-position: center;
}

#boss-right {
  position: absolute;
  width: 20px;
  height: 126px;
  background: rgba(0, 0, 0, 0.1);
  right: 0;
  top: 0;
  border: none;
  outline: none;
  cursor: pointer;
  background-image: url(../../assets/images/yx15.png);
  background-repeat: no-repeat;
  background-position: center;
}

.products-box {
  width: 1150px;
  position: absolute;
  left: 26px;
  top: 0;
  overflow: hidden;
}

.boss-goods {
  width: 1440px;
  overflow: hidden;
  transition: all 0.3s ease-in;
}

.boss-item {
  display: block;
  width: 128px;
  float: left;
  margin: 0 8px;
  opacity: 1;
}

.boss-item .img-box {
  width: 100%;
  height: 126px;
  padding: 6px;
  overflow: hidden;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(16, 113, 189, 1);
}

.boss-name {
  font-size: 12px;
  color: #403c39;
  padding: 10px 0 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.boss-price {
  color: #403c39;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.boss-item:hover img {
  transform: scale(1.2);
}
/* 详细信息 */
.col-detail {
  margin-top: 50px;
  overflow: hidden;
}

/* ---------------------------------------新增----------------------------------------------- */

.detail-left {
  float: left;
  width: 211px;
  border: 1px solid #e5e5e5;
  background-color: #fff;
  background-image: url(../../assets/images/yx11.jpg);
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: 211px 93px;
  overflow: hidden;
}

/* ---------------------------------------新增----------------------------------------------- */

.shop-level {
  width: 100%;
  height: 30px;
  margin-top: 40px;
  line-height: 30px;
  padding-left: 14px;
  font-size: 16px;
  color: #1071bd;
  font-weight: 600;
  background-image: url(../../assets/images/yx13.png);
  background-repeat: no-repeat;
  background-position: 45% 50%;
  background-size: 18px 16px;
}

.shop-name {
  padding-left: 14px;
  color: #403c39;
  font-size: 12px;
  margin-top: 10px;
  font-weight: 600;
  padding-bottom: 33px;
  border-bottom: 1px solid #e5e5e5;
}

.shop-object {
  padding: 0 10px 26px 17px;
  border-bottom: 1px dashed #e5e5e5;
}

.object-top {
  height: 50px;
}

.object-top .shop-key {
  display: inline-block;
  vertical-align: middle;
  height: 50px;
  font-size: 12px;
  color: #403c39;
  line-height: 50px;
}

.object-top .shop-val {
  display: inline-block;
  vertical-align: middle;
  width: 100px;
  height: 50px;
  background-image: url(../../assets/images/yx12.png);
  background-repeat: no-repeat;
  background-position: 10% 50%;
  background-size: 17px 20px;
}

.m-t-15 {
  margin-top: 15px;
}

.object-key {
  color: #403c39;
  font-size: 12px;
}

.object-val {
  color: #000;
  font-size: 12px;
}

/* ---------------------------------------新增----------------------------------------------- */

.toshop {
  margin-top: 13px;
  display: block;
  width: 100%;
  height: 50px;
  background-color: #fc6920;
  line-height: 50px;
  color: #fff;
  font-size: 14px;
  padding-left: 92px;
  background-image: url(../../assets/images/yx10.png);
  background-repeat: no-repeat;
  background-size: 23px 18px;
  background-position: 35% 50%;
  opacity: 1;
}

.detail-right {
  width: 953px;
  float: right;
}

.right-nav {
  width: 100%;
  height: 40px;
  background: rgba(248, 248, 248, 1);
  border: 1px solid rgba(229, 229, 229, 1);
}

.nav-content {
  width: 131px;
  height: 40px;
  background: #fff;
  line-height: 40px;
  text-align: center;
  border-top: 2px solid #fd7322;
  color: #fd7322;
  font-size: 14px;
}

.detail-content {
  width: 100%;
  padding-top: 26px;
  padding-bottom: 30px;
  overflow: hidden;
  border-bottom: 1px solid #e5e5e5;
}

.table-row {
  width: 390px;
  float: left;
  overflow: hidden;
}

.table-key {
  display: block;
  float: left;
  width: 130px;
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
  font-size: 14px;
  color: #9f9f9f;
}

.table-val {
  display: block;
  float: left;
  width: 250px;
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
  font-size: 14px;
  color: #403c39;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 热门推荐 */
.hot-name {
  color: #fc6920;
  font-size: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #e5e5e5;
}
.col-hot {
  height: 203px;
  /* overflow: hidden; */
}
.hot-item {
  display: block;
  width: 127px;
  float: left;
  margin: 26px 5px;
  opacity: 1;
}

.hot-item .img-box {
  width: 127px;
  height: 127px;
  padding: 6px;
  overflow: hidden;
  border: 1px solid #e5e5e5;
}
.hot-item:hover img {
  transform: translateX(7px);
}
.hot-title {
  margin-top: 12px;
  height: 40px;
  overflow: hidden;
  font-size: 14px;
  color: #403c39;
}

.hot-price {
  font-size: 17px;
  color: #fd7322;
}

/* copyright */
.word {
  height: 30px;
  line-height: 30px;
  background-color: #505050;
  text-align: center;
  font-size: 12px;
  margin-top: 130px;
}

.word a {
  color: #fff;
  margin-left: 10px;
}

.word .head {
  color: #b3b3b3;
}

.footer {
  width: 100%;
  height: 218px;
  background-color: #3a3a3a;
  font-size: 12px;
  color: #fff;
  overflow: hidden;
  margin-top: 25px;
}

.row1,
.row2,
.row3,
.row4,
.row5 {
  text-align: center;
  margin-top: 20px;
}

.row1 a {
  display: inline-block;
  height: 15px;
  margin: 5px 0;
  padding: 0 5px;
  font-size: 12px;
  color: #b3b3b3;
  vertical-align: middle;
  border-right: 1px solid #b3b3b3;
}

.row5 {
  color: #b3b3b3;
}

.cai {
  color: #fff;
}

/* ------------------------分类--------------------- */
.kinds {
  width: 211px;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  color: #fff;
  padding-left: 88px;
  margin-top: 14px;
  background-image: url(../../assets/images/qx-fenlei.png);
  background-repeat: no-repeat;
  background-size: 15px 15px;
  background-position: 33% 50%;
  background-color: #fc6920;
  border: 1px solid #fc6920;
}

.kinds-box {
  width: 211px;
  padding: 9px 13px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(229, 229, 229, 1);
}

.kinds-li {
  font-size: 12px;
  color: #403c39;
  cursor: pointer;
  padding: 12px 0 12px 10px;
  background: rgba(250, 250, 250, 1);
  border: 1px solid rgba(229, 229, 229, 1);
}
.firstLevel {
  font-size: 12px;
  color: #403c39;
  position: relative;
  margin-top: 8px;
  cursor: pointer;
  padding: 12px 0 12px 10px;
  background: rgba(250, 250, 250, 1);
  border: 1px solid rgba(229, 229, 229, 1);
}
.secondLevel {
  margin-top: 10px;
}

.secondLevel a {
  font-size: 12px;
  color: #403c39;
}
.secondLevel a:hover {
  color: #fc6920;
}
/* 询价遮罩层 */
.mark {
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  color: #151515;
}
.mark > .content {
  width: 460px;
  height: 400px;
  background: #ffffff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 25px 50px;
  border-radius: 10px;
}
.mark > .content > .title {
  font-weight: bolder;
  margin: 0 auto;
  font-size: 18px;
  width: 100px;
  height: 20px;
  text-align: center;
  line-height: 20px;
}
.mark > .content > .line {
  font-weight: bolder;
  margin: 10px auto;
  width: 70px;
  height: 2px;
  background: #232323;
}
.forward {
  font-size: 16px;
  font-weight: bolder;
  display: inline-block;
  width: 80px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  border-bottom: 1px solid #dcdcdc;
}
.f-row {
  margin-top: 30px;
}
.input input {
  width: 200px;
  height: 30px;
  margin-left: 5px;
  border: none;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  padding-left: 10px;
}
.input textarea {
  width: 200px;
  height: 50px;
  margin-left: 5px;
  border: none;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  padding-left: 10px;
}
.submit {
  width: 102px;
  margin: 45px auto 0;
  height: 27px;
  color: #ffffff;
  background: #181818;
  font-size: 14px;
  line-height: 27px;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
}
.spot {
  border: 1px solid #f19149;
}
.shut {
  width: 25px;
  height: 25px;
  position: absolute;
  top: 20px;
  right: 20px;
  text-align: center;
  cursor: pointer;
}
.shut img {
  width: 100%;
  height: 100%;
}
/* 详情 */
.table2 {
  margin-top: 20px;
  overflow: hidden;
  padding: 0 60px 20px;
  line-height: 180%;
}

.table2-head {
  text-align: center;
  font-size: 14px;
  color: #656565;
  padding-bottom: 20px;
}
</style>


