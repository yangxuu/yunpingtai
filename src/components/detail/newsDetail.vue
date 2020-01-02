<template>
  <div>
    <headerBox />
    <!-- 分类导航 -->
    <div class="safe auto list">
      <ul class="clearfix list-bar">
        <li id="nav-all">所有商品分类</li>
        <li id="nav-or">
          <router-link to="/supply">供应库</router-link>
          <router-link to="/yellowpage">黄页中心</router-link>
          <router-link to="/information">新闻资讯</router-link>
          <!-- <router-link to="/aicaigou">百度爱采购</router-link> -->
        </li>
      </ul>
    </div>
    <!-- 面包屑 -->
    <div class="bread-nav safe auto">
      <span>当前位置：</span>
      <router-link to="/information">资讯&gt;</router-link>
      <span>正文&gt;</span>
      <span>{{info.data.post_title}}</span>
    </div>
    <!-- 新闻正文 -->
    <div class="news-box safe auto">
      <!-- 左侧详情 -->
      <div class="nb-left">
        <div class="post_title">{{info.data.post_title}}</div>

        <div class="somemessage">
          <span>发布时间：</span>
          <span>{{info.data.create_time}}</span>
          <div class="rBorder m-l-10"></div>
          <span class="m-l-10">作者：</span>
          <span>{{info.data.author||'-'}}</span>
          <div class="rBorder m-l-10"></div>
          <img class="m-l-10" src="../../assets/images/hits.png" alt />
          <span class="m-l-5">{{info.data.post_hits}}</span>
        </div>

        <div class="post_content" v-html="info.data.post_content"></div>
      </div>
      <!-- 右侧热门 -->
      <div class="nb-right">
        <div class="hot-head">热门资讯</div>
        <div class="hot-content">
          <router-link
            :to="{path:'/newsdetail',query:{id:item.id}}"
            class="hot-p"
            v-for="(item,index) in info.hot.data"
            :key="index"
          >
            <div class="hot-flex">
              <div class="topNumber">{{index+1}}</div>
              <div class="topContent">{{item.post_title}}</div>
            </div>
          </router-link>
        </div>
        <div class="adver-banner">
          <el-carousel arrow="never" height="210px">
            <el-carousel-item v-for="(item,index) in info.advertisement.content" :key="index" class="adver-box">
             <img :src="'http://files.cailiao.com/'+item.image" alt />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>

    <footBox />
  </div>
</template>
<script>
import Vue from "vue";
import _ from "underscore";
import headerBox from "../common/header-box";
import footBox from "../common/foot-box";
export default {
  components: { headerBox, footBox },

  data() {
    return {
      info: {
        data: {}
      }
    };
  },
  created() {
    let _this = this;
    var data = {
      action: "cailiaof.info.detail",
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
          document.title = res.data.result.head.title;
          _this.info = res.data.result;
        } else {
          alert("defeat");
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  watch: {
    //监听相同路由下参数变化的时候，从而实现异步刷新
    $route(to, from) {
      let _this = this;
      var data = {
        action: "cailiaof.info.detail",
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
            document.title = res.data.result.head.title;
            _this.info = res.data.result;
          } else {
            alert("defeat");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style>
.post_content p {
  font-size: 16px;
  color: #666;
  margin-top: 10px;
  line-height: 200% !important;
}
</style>
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
/* 面包屑 */
.shouye-ico {
  width: 14px;
  height: 14px;
}
.bread-nav {
  font-size: 12px;
  color: #3a3a3a;
  padding: 20px 0;
}
.bread-nav a {
  font-size: 12px;
  color: #3a3a3a;
}
/* 新闻正文 */
.news-box {
  display: flex;
  justify-content: space-between;
}
.nb-left {
  width: 900px;
}
.post_title {
  color: #191919;
  font-size: 16px;
  padding-bottom: 15px;
}
.somemessage {
  display: flex;
  align-items: center;
  color: #595959;
  font-size: 12px;
  padding-bottom: 20px;
}
.rBorder {
  width: 1px;
  height: 12px;
  border-right: 1px solid rgb(163, 163, 163);
}
/* 右侧热门 */
.nb-right {
  width: 250px;
}
.hot-head {
  height: 40px;
  background: #fc6920;
  line-height: 40px;
  padding-left: 20px;
  color: #fff;
  font-size: 14px;
}
.hot-content {
  padding: 0 20px;
  border: 1px solid #d0d0d0;
}
.hot-p {
  opacity: 1;
}
.hot-flex {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.topNumber {
  width: 15px;
  height: 15px;
  text-align: center;
  line-height: 15px;
  color: #b6b6b6;
  font-size: 12px;
  background-color: #f2f2f2;
  border-radius: 2px;
}
.topContent {
  width: 185px;
  height: 30px;
  line-height: 30px;
  color: #3a3a3a;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hot-flex:hover .topContent {
  color: #fc6920;
}
.hot-content .hot-p:nth-child(1) .topNumber {
  color: #fff;
  background-color: #f55347;
}
.hot-content .hot-p:nth-child(2) .topNumber {
  color: #fff;
  background-color: #fd7323;
}
.hot-content .hot-p:nth-child(3) .topNumber {
  color: #fff;
  background-color: #2facc2;
}
/* 广告位 */
.adver-banner {
  width: 250px;
  height: 210px;
  margin-top: 20px;
  position: relative;
}
.adver-box {
  width: 250px;
  height: 210px;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
}
.adver-box img{
  width: 100%;
  height: 100%;
}
</style>
