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
    <!-- 新闻内容 -->
    <div class="safe auto info-box">
      <div class="list-left m-t-20">
        <div class="list-head">
          <div class="block">{{info.categoryName}}</div>
        </div>

        <div class="item-container">
          <div class="item-news" v-for="(item,index) in info.list.data" :key="index">
            <router-link :to="{path:'/newsdetail',query:{id:item.id}}">
              <div class="post_title">{{item.post_title}}</div>
              <div class="post_expert m-t-10">{{item.post_excerpt}}</div>
            </router-link>
          </div>
          <div class="pagebox">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="10"
              background
              layout="prev, pager, next"
              :total="info.list.total"
            ></el-pagination>
          </div>
        </div>
      </div>
      <!-- 右侧热点新闻 -->
      <div class="list-right">
        <div class="todayNews" v-for="(item,index1) in hot" :key="index1">
          <div class="todayHead">
            <router-link :to="{path:'/infolist',query:{id:item.category_id}}">{{item.category_name}}</router-link>
          </div>
          <ul class="todayContent">
            <li class="todayLi" v-for="(child,index) in item.portalPostList.data" :key="index">
              <router-link target="_blank" :to="{path:'/newsdetail',query:{id:child.id}}">
                <span class="todayKey">{{index+1}}</span>
                <span class="todayVal">{{child.post_title}}</span>
              </router-link>
            </li>
          </ul>
        </div>
        <!-- 广告位 -->
        <div class="adver-banner">
          <el-carousel arrow="never" height="210px">
            <el-carousel-item
              v-for="(item,index) in adver.content"
              :key="index"
              class="adver-box"
            >
              <img :src="'http://files.cailiao.com/'+item.image" alt />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <!-- 底部及侧边栏组件 -->
    <footBox />
  </div>
</template>
<script>
import Vue from "vue";
import headerBox from "../common/header-box";
import footBox from "../common/foot-news-box";
export default {
  components: { headerBox, footBox },
  data() {
    return {
      currentPage: 1,
      info: {},
      hot: {},
      adver:[]
    };
  },
  created() {
    let _this = this;

    // 当前资讯列表
    let infodata = {
      action: "cailiaof.info.currentlist",
      param: {
        cate_id: this.$route.query.id,
        cache: 1,
        domain: "http://www.baidu.com"
      }
    };
    _this.$axios
      .get("/api", { params: infodata })
      .then(res => {
        if (res.data.code == 0) {
          document.title = res.data.result.head.title;
          this.info = res.data.result;
        } else {
          alert("defeat");
        }
      })
      .catch(err => {
        console.log(err);
      });
    //   右侧热点新闻
    let hotdata = {
      action: "cailiaof.info.categorylist",
      param: {
        domain: "http://www.baidu.com",
        limit: 14
      }
    };
    _this.$axios
      .get("/api", { params: hotdata })
      .then(res => {
        if (res.data.code == 0) {
          this.hot = res.data.result.datalist.slice(0, 4);
        } else {
          alert("defeat");
        }
      })
      .catch(err => {
        console.log(err);
      });
    //   广告位
    let adverdata = {
      action: "cailiaof.advertisement.advert",
      param: {
        type: 4,
        domain: "http://www.baidu.com"
      }
    };
    _this.$axios
      .get("/api", { params: adverdata })
      .then(res => {
        if (res.data.code == 0) {
          this.adver = res.data.result;
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
      let data = {
        action: "cailiaof.info.currentlist",
        param: {
          cate_id: this.$route.query.id,
          cache: 1,
          domain: "http://www.baidu.com"
        }
      };
      _this.$axios
        .get("/api", { params: data })
        .then(res => {
          if (res.data.code == 0) {
            document.title = res.data.result.head.title;
            this.info = res.data.result;
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
    handleCurrentChange(currentPage) {
      let _this = this;
      let data = {
        action: "cailiaof.info.currentlist",
        param: {
          cate_id: this.$route.query.id,
          cache: 1,
          domain: "http://www.baidu.com"
        },
        page: currentPage
      };
      _this.$axios
        .get("/api", { params: data })
        .then(res => {
          if (res.data.code == 0) {
            document.title = res.data.result.head.title;
            this.info = res.data.result;
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
/* 分类头部 */
.info-box {
  display: flex;
  justify-content: space-between;
}
.list-left {
  width: 854px;
  overflow: hidden;
  border: 1px solid #d0d0d0;
}
.list-head {
  width: 854px;
  height: 40px;
  background-color: #f5f5f5;
}
.list-head .block {
  width: 127px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #3a3a3a;
  font-size: 14px;
  border-right: 1px solid #d0d0d0;
}
.item-container {
  padding: 0 35px;
}
.item-news {
  margin: 45px 0;
}
.post_title {
  color: #191919;
  font-size: 14px;
  font-weight: bold;
}
.post_expert {
  font-size: 12px;
  color: #191919;
}
.pagebox {
  padding-bottom: 45px;
  display: flex;
  justify-content: center;
}
/* 右侧热点 */
.list-right {
  width: 320px;
}
.todayNews {
  height: 210px;
  margin: 20px 0;
}
.todayHead {
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  background-color: #fd7323;
}
.todayHead a {
  font-size: 14px;
  color: #fff;
}
.todayContent {
  height: 170px;
  overflow: hidden;
  padding: 0 20px;
  border: 1px solid #d0d0d0;
}
.todayLi {
  overflow: hidden;
  margin: 10px 0;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.todayKey {
  display: inline-block;
  width: 15px;
  height: 15px;
  background: #f2f2f2;
  border-radius: 2px;
  color: #b6b6b6;
  font-size: 12px;
  text-align: center;
  line-height: 15px;
}
.todayLi:nth-child(1) .todayKey {
  color: #fff;
  background: #f55347;
}
.todayLi:nth-child(2) .todayKey {
  color: #fff;
  background: #fd7323;
}
.todayLi:nth-child(3) .todayKey {
  color: #fff;
  background: #2facc2;
}
.todayVal {
  color: #3a3a3a;
  font-size: 12px;
}
/* 广告位 */
.adver-banner {
  width: 320px;
  height: 210px;
  margin-top: 20px;
  position: relative;
}
.adver-box {
  width: 320px;
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