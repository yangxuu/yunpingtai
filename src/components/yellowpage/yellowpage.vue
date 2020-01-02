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
    <!-- 内容 -->
    <div class="safe auto yellowPage" v-for="(one,index1) in info" :key="index1">
      <div class="item-page" v-for="(two,index) in one.company" :key="index">
        <div class="page-left">
          <div class="shopname">
            <span>{{two.enterprise_name}}</span>
            <img class="m-l-10" src="../../assets/images/yx13.png" alt />
            <img class="m-l-10" src="../../assets/images/yx12.png" alt />
          </div>
          <div class="shopproduct m-t-20">
            <span style="color:#999999">主营产品：</span>
            <span>{{two.product}}</span>
          </div>
          <div class="shopaddress m-t-20">
            <span style="color:#999999">企业地址：</span>
            <span>{{two.address_str}}</span>
          </div>
          <div class="link-box m-t-20">
            <div class="shopindex">
              <router-link :to="{path:'/shopIndex',query:{shop_id:two.id}}">进入企业店铺</router-link>
            </div>
            <div class="shopintroduce">
              <router-link :to="{path:'/shopIntroduce',query:{shop_id:two.id}}">查看联系方式</router-link>
            </div>
          </div>
        </div>
        <div class="page-right">
          <img :src="two.logo" alt />
          <img :src="two.image" alt />
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
import footBox from "../common/foot-yellow-box";
export default {
  components: { headerBox, footBox },
  data() {
    return {
      info: []
    };
  },
  created() {
    let _this = this;
    // 黄页头部
    let yheaddata = {
      action: "cailiaof.head.yellowpages",
      param: {
        domain: "http://www.baidu.com"
      }
    };
    _this.$axios
      .get("/api", { params: yheaddata })
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
    // 黄页内容
    let cdata = {
      action: "cailiaof.company.newlist",
      param: {
        domain: "http://www.baidu.com"
      }
    };
    _this.$axios
      .get("/api", { params: cdata })
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
/* 主体内容 */
.yellowPage {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.item-page {
  width: 592px;
  height: 190px;
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #d0d0d0;
}
.page-left {
  width: 312px;
  padding: 15px;
  overflow: hidden;
}
.page-right {
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.page-left .shopname {
  color: #3a3a3a;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.page-left .shopproduct,
.page-left .shopaddress {
  font-size: 12px;
  color: #6a6a6a;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.link-box{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.page-left .shopindex {
  width: 135px;
  height: 30px;
  line-height: 30px;
  border-radius: 3px;
  text-align: center;
  background-color: #fc6920;
}
.shopindex a {
  font-size: 12px;
  color: #fff;
}
.page-left .shopintroduce {
  width: 135px;
  height: 30px;
  line-height: 30px;
  border-radius: 3px;
  text-align: center;
  border: 1px solid #fc6920;
}
.shopintroduce a {
  font-size: 12px;
  color: #fc6920;
}
.page-right img {
  max-width: 105px;
  max-height: 110px;
}
</style>