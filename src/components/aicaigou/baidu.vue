<template>
  <div>
    <headerBox />
    <!-- 分类导航 -->
    <div class="safe auto list">
      <ul class="clearfix list-bar">
        <li id="nav-all">所有商品分类</li>
        <li id="nav-or">
          <router-link to="/supply">供应库</router-link>
          <router-link to="purchase">求购中心</router-link>
          <router-link to="/goods">产品中心</router-link>
          <router-link to="/yellowpage">黄页中心</router-link>
          <router-link to="/information">新闻资讯</router-link>
          <router-link to="/aicaigou">百度爱采购</router-link>
        </li>
      </ul>
    </div>
    <!-- 内容 -->
    <h1>百度爱采购</h1>
    <!-- 底部及侧边栏组件 -->
    <footBox />
    <AsideBar />
  </div>
</template>
<script>
import Vue from "vue";
import headerBox from "../common/header-box";
import footBox from "../common/foot-box";
import AsideBar from "../common/AsideBar";
export default {
  components: { headerBox, footBox, AsideBar },
  data() {
    return {};
  },
  created() {},
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