<template>
  <div>
    <headerBox />
    <shopHeader />
    <navbar />
    <!-- 新闻详情 -->
    <!-- 面包屑 -->
    <div class="bread-nav safe auto">
      <img class="shouye-ico" src="../../assets/images/yx9.png" alt />
      <router-link class="link" style="width:50px;" to="/shopIndex">
        首页
        <span class="arrow">></span>
      </router-link>
      <router-link class="link" to="/shopNews">
        企业资讯
        <span class="arrow">></span>
      </router-link>
    </div>
    <!-- 新闻正文 -->
    <div class="news-box safe auto">
      <div class="news-left">
        <div class="left-head">企业资讯</div>
        <div class="left-info">
          <p>
            <span>联系人：</span>
            <span>{{obj.shop.link_man}}</span>
          </p>
          <p>
            <span>QQ：</span>
            <span>{{obj.shop.qq}}</span>
          </p>
          <p>
            <span>电话：</span>
            <span>{{obj.shop.phone}}</span>
          </p>
          <p>
            <span>手机：</span>
            <span>{{obj.shop.tele}}</span>
          </p>
          <p>
            <span>传真：</span>
            <span>13245879076?</span>
          </p>
        </div>
      </div>
      <div class="news-right">
        <div class="right-head">
          <div class="r-block"></div>
          <div class="r-title m-l-10">企业资讯</div>
        </div>
        <div class="right-content">
          <div class="news-title">{{info.post_title}}</div>
          <div class="news-time">
            <span>发布时间</span>
            <span>{{info.create_time}}</span>
            <span>作者：</span>
            <span>{{info.hits}}</span>
          </div>
          <div class="line"></div>
          <div class="des-content" v-html="info.post_content"></div>
        </div>
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
export default {
  components: { shopHeader, navbar, headerBox, footBox },

  data() {
    return {
      info: {},
      re: {},
      // 店铺信息
      obj: {
        shop: {},
        banner: []
      }
    };
  },
  created() {
    let _this = this;
  
  },
  watch: {
    //监听相同路由下参数变化的时候，从而实现异步刷新
    $route(to, from) {
      
    }
  }
};
</script>
<style scoped>
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
/* 新闻正文 */
.news-box {
  display: flex;
  justify-content: space-between;
}
.news-left {
  width: 210px;
}
.left-head {
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #fff;
  font-size: 14px;
  text-align: center;
  background-color: #fc6920;
}
.left-info {
  width: 100%;
  line-height: 200%;
  font-size: 14px;
  color: #191919;
  padding: 0 25px 10px;
}
.left-info p {
  margin-top: 10px;
}
.news-right {
  width: 960px;
}
.right-head {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
}
.r-block {
  width: 7px;
  height: 21px;
  background-color: #fc6920;
}
.r-title {
  color: #fc6920;
  font-size: 16px;
}

.news-title {
  font-size: 16px;
  color: rgba(25, 25, 25, 1);
}
.news-time {
  margin-top: 15px;
  font-size: 12px;
  color: rgba(89, 89, 89, 1);
}
.line {
  width: 100%;
  height: 1px;
  margin: 20px 0;
  background: rgba(238, 238, 238, 1);
}
</style>
<style>
.des-content {
  color: rgba(25, 25, 25, 1);
  font-size: 12px;
}
.des-content p span {
  color: rgba(25, 25, 25, 1);
  font-size: 12px !important;
}
.des-content p img {
  display: block;
  width: 398px;
  height: 226px;
  margin: 10px auto;
}
</style>
