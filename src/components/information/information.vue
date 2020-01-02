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
      <div class="info-left">
        <!-- 1 -->
        <div class="item-info">
          <div class="info-head">
            <div
              class="head-left"
              :class="type1==0?'activeTop1':type1==1?'activeTop2':''"
              @mouseenter="hoverTab1(index)"
              v-for="(item,index) in arr1"
              :key="index"
            >
              <router-link
                target="_blank"
                :to="{path:'/infolist',query:{id:item.category_id}}"
              >{{item.category_name}}</router-link>
            </div>
          </div>
          <ul class="info-body" v-show="type1==0">
            <li class="info-para" v-for="(child,index) in arr1[0].portalPostList.data" :key="index">
              <router-link
                target="_blank"
                :to="{path:'/newsdetail',query:{id:child.id}}"
              >{{child.post_title}}</router-link>
            </li>
          </ul>
          <ul class="info-body" v-show="type1==1">
            <li class="info-para" v-for="(child,index) in arr1[1].portalPostList.data" :key="index">
              <router-link
                target="_blank"
                :to="{path:'/newsdetail',query:{id:child.id}}"
              >{{child.post_title}}</router-link>
            </li>
          </ul>
        </div>
        <!-- 2 -->
        <div class="item-info">
          <div class="info-head">
            <div
              class="head-left"
              :class="type2==0?'activeTop1':type2==1?'activeTop2':''"
              @mouseenter="hoverTab2(index)"
              v-for="(item,index) in arr2"
              :key="index"
            >
              <router-link
                target="_blank"
                :to="{path:'/infolist',query:{id:item.category_id}}"
              >{{item.category_name}}</router-link>
            </div>
          </div>
          <ul class="info-body" v-show="type2==0">
            <li class="info-para" v-for="(child,index) in arr2[0].portalPostList.data" :key="index">
              <router-link
                target="_blank"
                :to="{path:'/newsdetail',query:{id:child.id}}"
              >{{child.post_title}}</router-link>
            </li>
          </ul>
          <ul class="info-body" v-show="type2==1">
            <li class="info-para" v-for="(child,index) in arr2[1].portalPostList.data" :key="index">
              <router-link
                target="_blank"
                :to="{path:'/newsdetail',query:{id:child.id}}"
              >{{child.post_title}}</router-link>
            </li>
          </ul>
        </div>
        <!-- 3 -->
        <div class="item-info">
          <div class="info-head">
            <div
              class="head-left"
              :class="type3==0?'activeTop1':type3==1?'activeTop2':''"
              @mouseenter="hoverTab3(index)"
              v-for="(item,index) in arr3"
              :key="index"
            >
              <router-link
                target="_blank"
                :to="{path:'/infolist',query:{id:item.category_id}}"
              >{{item.category_name}}</router-link>
            </div>
          </div>
          <ul class="info-body" v-show="type3==0">
            <li class="info-para" v-for="(child,index) in arr3[0].portalPostList.data" :key="index">
              <router-link
                target="_blank"
                :to="{path:'/newsdetail',query:{id:child.id}}"
              >{{child.post_title}}</router-link>
            </li>
          </ul>
          <ul class="info-body" v-show="type3==1">
            <li class="info-para" v-for="(child,index) in arr3[1].portalPostList.data" :key="index">
              <router-link
                target="_blank"
                :to="{path:'/newsdetail',query:{id:child.id}}"
              >{{child.post_title}}</router-link>
            </li>
          </ul>
        </div>
        <!-- 4 -->
        <div class="item-info">
          <div class="info-head">
            <div
              class="head-left"
              :class="type4==0?'activeTop1':type4==1?'activeTop2':''"
              @mouseenter="hoverTab4(index)"
              v-for="(item,index) in arr4"
              :key="index"
            >
              <router-link
                target="_blank"
                :to="{path:'/infolist',query:{id:item.category_id}}"
              >{{item.category_name}}</router-link>
            </div>
          </div>
          <ul class="info-body" v-show="type4==0">
            <li class="info-para" v-for="(child,index) in arr4[0].portalPostList.data" :key="index">
              <router-link
                target="_blank"
                :to="{path:'/newsdetail',query:{id:child.id}}"
              >{{child.post_title}}</router-link>
            </li>
          </ul>
          <ul class="info-body" v-show="type4==1">
            <li class="info-para" v-for="(child,index) in arr4[1].portalPostList.data" :key="index">
              <router-link
                target="_blank"
                :to="{path:'/newsdetail',query:{id:child.id}}"
              >{{child.post_title}}</router-link>
            </li>
          </ul>
        </div>
        <!-- 5 -->
        <div class="item-info">
          <div class="info-head">
            <div
              class="head-left"
              :class="type5==0?'activeTop1':type5==1?'activeTop2':''"
              @mouseenter="hoverTab5(index)"
              v-for="(item,index) in arr1"
              :key="index"
            >
              <router-link
                target="_blank"
                :to="{path:'/infolist',query:{id:item.category_id}}"
              >{{item.category_name}}</router-link>
            </div>
          </div>
          <ul class="info-body" v-show="type5==0">
            <li class="info-para" v-for="(child,index) in arr5[0].portalPostList.data" :key="index">
              <router-link
                target="_blank"
                :to="{path:'/newsdetail',query:{id:child.id}}"
              >{{child.post_title}}</router-link>
            </li>
          </ul>
          <ul class="info-body" v-show="type5==1">
            <li class="info-para" v-for="(child,index) in arr5[1].portalPostList.data" :key="index">
              <router-link
                target="_blank"
                :to="{path:'/newsdetail',query:{id:child.id}}"
              >{{child.post_title}}</router-link>
            </li>
          </ul>
        </div>
        <!-- 6 -->
        <div class="item-info">
          <div class="info-head">
            <div
              class="head-left"
              :class="type6==0?'activeTop1':type6==1?'activeTop2':''"
              @mouseenter="hoverTab6(index)"
              v-for="(item,index) in arr6"
              :key="index"
            >
              <router-link
                target="_blank"
                :to="{path:'/infolist',query:{id:item.category_id}}"
              >{{item.category_name}}</router-link>
            </div>
          </div>
          <ul class="info-body" v-show="type6==0">
            <li class="info-para" v-for="(child,index) in arr6[0].portalPostList.data" :key="index">
              <router-link
                target="_blank"
                :to="{path:'/newsdetail',query:{id:child.id}}"
              >{{child.post_title}}</router-link>
            </li>
          </ul>
          <ul class="info-body" v-show="type6==1">
            <li class="info-para" v-for="(child,index) in arr6[1].portalPostList.data" :key="index">
              <router-link
                target="_blank"
                :to="{path:'/newsdetail',query:{id:child.id}}"
              >{{child.post_title}}</router-link>
            </li>
          </ul>
        </div>
        <!-- 7 -->
        <div class="item-info">
          <div class="info-head">
            <div class="head-left activeTop1" v-for="(item,index) in arr7" :key="index">
              <router-link
                target="_blank"
                :to="{path:'/infolist',query:{id:item.category_id}}"
              >{{item.category_name}}</router-link>
            </div>
          </div>
          <ul class="info-body">
            <li class="info-para" v-for="(child,index) in arr7[0].portalPostList.data" :key="index">
              <router-link
                target="_blank"
                :to="{path:'/newsdetail',query:{id:child.id}}"
              >{{child.post_title}}</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="info-right">
        <!-- 热点新闻 -->
        <div class="hotNews">
          <div class="newsHead">热点新闻</div>
          <ul class="newsBody">
            <li v-for="(child,key) in hotarr[0].news_list" :key="key">
              <span class="rowKey">{{key+1}}</span>
              <router-link :to="{path:'/newsdetail',query:{id:child.id}}">{{child.post_title}}</router-link>
            </li>
          </ul>
        </div>
        <!-- 科技成果 -->
        <div class="scienceNews">
          <div class="newsHead blue">科技成果</div>
          <ul class="newsBody">
            <li v-for="(child,key) in techarr[0].news_list" :key="key">
              <span class="rowKey">{{key+1}}</span>
              <router-link :to="{path:'/newsdetail',query:{id:child.id}}">{{child.post_title}}</router-link>
            </li>
          </ul>
        </div>
        <!-- 广告位 -->
        <div class="adver-banner">
          <el-carousel arrow="never" height="210px">
            <el-carousel-item v-for="(item,index) in adver.content" :key="index" class="adver-box">
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
      type1: "",
      type2: "",
      type3: "",
      type4: "",
      type5: "",
      type6: "",
      arr1: [{ portalPostList: {} }, { portalPostList: {} }],
      arr2: [{ portalPostList: {} }, { portalPostList: {} }],
      arr3: [{ portalPostList: {} }, { portalPostList: {} }],
      arr4: [{ portalPostList: {} }, { portalPostList: {} }],
      arr5: [{ portalPostList: {} }, { portalPostList: {} }],
      arr6: [{ portalPostList: {} }, { portalPostList: {} }],
      arr7: [{ portalPostList: {} }, { portalPostList: {} }],
      adver: [{ portalPostList: {} }, { portalPostList: {} }],
      // 右侧热点新闻
      hotarr: [{ name: "", news_list: [] }], //今日焦点
      techarr: [{ name: "", news_list: [] }] //行业资讯
    };
  },
  created() {
    let _this = this;
    // 头部
    var headdata = {
      action: "cailiaof.head.info",
      param: {
        domain: "http://www.baidu.com"
      }
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
    // 分类及相关资讯cailiaof.info.categorylist
    var infodata = {
      action: "cailiaof.info.categorylist",
      param: {
        domain: "http://www.baidu.com",
        limit: 14
      }
    };
    _this.$axios
      .get("/api", { params: infodata })
      .then(res => {
        if (res.data.code == 0) {
          this.arr1 = res.data.result.datalist.slice(0, 2);
          this.arr2 = res.data.result.datalist.slice(2, 4);
          this.arr3 = res.data.result.datalist.slice(4, 6);
          this.arr4 = res.data.result.datalist.slice(6, 8);
          this.arr5 = res.data.result.datalist.slice(8, 10);
          this.arr6 = res.data.result.datalist.slice(10, 12);
          this.arr7 = res.data.result.datalist.slice(12, 13);
        } else {
          alert("defeat");
        }
      })
      .catch(err => {
        console.log(err);
      });
    // 最新资讯
    let newestdata = {
      action: "cailiaof.information.newlist",
      param: {
        domain: "http://www.baidu.com"
      }
    };
    _this.$axios
      .get("/api", { params: newestdata })
      .then(res => {
        if (res.data.code == 0) {
          this.hotarr = res.data.result.slice(0, 1); //今日焦点
          this.techarr = res.data.result.slice(2, 3); //行业资讯
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
  methods: {
    hoverTab1(index) {
      this.type1 = index;
    },
    hoverTab2(index) {
      this.type2 = index;
    },
    hoverTab3(index) {
      this.type3 = index;
    },
    hoverTab4(index) {
      this.type4 = index;
    },
    hoverTab5(index) {
      this.type5 = index;
    },
    hoverTab6(index) {
      this.type6 = index;
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
/* 新闻内容 */
.info-box {
  display: flex;
  justify-content: space-between;
}
.info-left {
  width: 855px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.item-info {
  width: 418px;
  height: 255px;
  margin-top: 20px;
  border: 1px solid #d0d0d0;
}
.info-head {
  color: #3a3a3a;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  display: flex;
  cursor: pointer;
  background: #f5f5f5;
}
.head-left {
  width: 130px;
  border-right: 1px solid #d0d0d0;
}
.head-left:nth-child(2) {
  border-right: none;
}
.activeTop1:nth-child(1) {
  border-top: 2px solid #fd7323;
}
.activeTop2:nth-child(2) {
  border-top: 2px solid #fd7323;
  border-right: 1px solid #d0d0d0;
}

.info-body {
  padding: 0 20px;
}
.info-para {
  color: #3a3a3a;
  font-size: 12px;
  height: 42px;
  line-height: 42px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-bottom: 1px solid #d8d7d7;
}
.info-para:nth-child(5) {
  border-bottom: none;
}
/* 右侧 */
.info-right {
  width: 320px;
  padding-top: 20px;
}
/* 热点新闻 */
/* .hotNews{
} */
.newsHead {
  height: 40px;
  color: #fff;
  padding-left: 20px;
  line-height: 40px;
  font-size: 14px;
  background: #fd7323;
}
.blue {
  background: #2facc2;
}
.newsBody {
  padding: 0 20px;
  border: 1px solid #d0d0d0;
}
.newsBody li {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 10px 0;
}
.rowKey {
  display: inline-block;
  width: 15px;
  height: 15px;
  font-size: 12px;
  text-align: center;
  line-height: 15px;
  color: #b6b6b6;
  border-radius: 2px;
  background: #f2f2f2;
}
.newsBody li:nth-child(1) .rowKey {
  color: #fff;
  background: #f55347;
}
.newsBody li:nth-child(2) .rowKey {
  color: #fff;
  background: #fd7323;
}
.newsBody li:nth-child(3) .rowKey {
  color: #fff;
  background: #2facc2;
}
.scienceNews {
  margin-top: 20px;
}

/* 科技成果 */
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
.adver-box img {
  width: 100%;
  height: 100%;
}
</style>