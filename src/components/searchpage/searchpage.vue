<template>
  <div>

    <!-- 公共头部 -->
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

    <!-- 搜索类型不同展现不同的组件 -->
    <Supply v-if="sFlag" :info="info" />
    <Purchase v-if="pFlag" :info="info" />
    <Company v-if="cFlag" :info="info" />
    <Newspaper v-if="nFlag" :info="info" />

    <!-- 底部及侧边栏组件 -->
    <footBox />
  </div>
</template>
<script>
import Vue from "vue";
import headerBox from "../common/header-box";
import footBox from "../common/foot-box";
import Supply from "../components/supply";
import Purchase from "../components/purchase";
import Company from "../components/company";
import Newspaper from "../components/newspaper";
export default {
  components: {
    headerBox,
    footBox,
    Supply,
    Purchase,
    Company,
    Newspaper
  },
  data() {
    return {
      sFlag: false, //供应
      pFlag: false, //求购
      cFlag: false, //公司
      nFlag: false, //资讯
      currentPage: 1, //当前页
      info: {
        breadList:[],//面包屑导航
        searchList: {}
      }
    };
  },
  created() {
    let _this = this;
    //   供应
    if (this.$route.query.search_type == "supply") {
      this.sFlag = true;
      this.pFlag = false;
      this.cFlag = false;
      this.nFlag = false;
      var data = {
        action: "cailiaof.search.supply",
        param: {
          keyword: this.$route.query.keywords,
          domain: "http://www.baidu.com"
        },
        page: 1
      };
      _this.$axios
        .get("/api", { params: data })
        .then(res => {
          if (res.data.code == 0) {
             Vue.set(this.info, "breadList", res.data.result.link_list);//数组形式
            Vue.set(this.info, "searchList", res.data.result.list);
          } else {
            console.log("defeat");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    //  求购
    if (this.$route.query.search_type == "purchase") {
      this.sFlag = false;
      this.pFlag = true;
      this.cFlag = false;
      this.nFlag = false;
      var data = {
        action: "cailiaof.search.purchase",
        param: {
          keyword: this.$route.query.keywords,
          domain: "http://www.baidu.com"
        },
        page: 1
      };
      _this.$axios
        .get("/api", { params: data })
        .then(res => {
          if (res.data.code == 0) {
            Vue.set(this.info, "searchList", res.data.result.list);
          } else {
            console.log("defeat");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    //   公司
    if (this.$route.query.search_type == "company") {
      this.sFlag = false;
      this.pFlag = false;
      this.cFlag = true;
      this.nFlag = false;
      var data = {
        action: "cailiaof.search.company",
        param: {
          keyword: this.$route.query.keywords,
          domain: "http://www.baidu.com"
        },
        page: 1
      };
      _this.$axios
        .get("/api", { params: data })
        .then(res => {
          if (res.data.code == 0) {
            Vue.set(this.info, "searchList", res.data.result.list);
          } else {
            console.log("defeat");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    //   资讯
    if (this.$route.query.search_type == "news") {
      this.sFlag = false;
      this.pFlag = false;
      this.cFlag = false;
      this.nFlag = true;

      var data = {
        action: "cailiaof.search.news",
        param: {
          keyword: this.$route.query.keywords,
          domain: "http://www.baidu.com"
        },
        page: 1
      };
      _this.$axios
        .get("/api", { params: data })
        .then(res => {
          if (res.data.code == 0) {
            Vue.set(this.info, "searchList", res.data.result.list);
          } else {
            console.log("defeat");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {
    $route(to, from) {
      let _this = this;
      //   供应
      if (this.$route.query.search_type == "supply") {
        this.sFlag = true;
        this.pFlag = false;
        this.cFlag = false;
        this.nFlag = false;
        var data = {
          action: "cailiaof.search.supply",
          param: {
            keyword: this.$route.query.keywords,
            domain: "http://www.baidu.com"
          },
          page: 1
        };
        _this.$axios
          .get("/api", { params: data })
          .then(res => {
            if (res.data.code == 0) {
              Vue.set(this.info, "searchList", res.data.result.list);
            } else {
              console.log("defeat");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      //  求购
      if (this.$route.query.search_type == "purchase") {
        this.sFlag = false;
        this.pFlag = true;
        this.cFlag = false;
        this.nFlag = false;
        var data = {
          action: "cailiaof.search.purchase",
          param: {
            keyword: this.$route.query.keywords,
            domain: "http://www.baidu.com"
          },
          page: 1
        };
        _this.$axios
          .get("/api", { params: data })
          .then(res => {
            if (res.data.code == 0) {
              Vue.set(this.info, "searchList", res.data.result.list);
            } else {
              console.log("defeat");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      //   公司
      if (this.$route.query.search_type == "company") {
        this.sFlag = false;
        this.pFlag = false;
        this.cFlag = true;
        this.nFlag = false;
        var data = {
          action: "cailiaof.search.company",
          param: {
            keyword: this.$route.query.keywords,
            domain: "http://www.baidu.com"
          },
          page: 1
        };
        _this.$axios
          .get("/api", { params: data })
          .then(res => {
            if (res.data.code == 0) {
              Vue.set(this.info, "searchList", res.data.result.list);
            } else {
              console.log("defeat");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      //   资讯
      if (this.$route.query.search_type == "news") {
        this.sFlag = false;
        this.pFlag = false;
        this.cFlag = false;
        this.nFlag = true;
        var data = {
          action: "cailiaof.search.news",
          param: {
            keyword: this.$route.query.keywords,
            domain: "http://www.baidu.com"
          },
          page: 1
        };
        _this.$axios
          .get("/api", { params: data })
          .then(res => {
            if (res.data.code == 0) {
              Vue.set(this.info, "searchList", res.data.result.list);
            } else {
              console.log("defeat");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
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
</style>