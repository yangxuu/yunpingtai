<template>
  <div>
    <div class="navbar-box">
      <div class="navbar safe auto">
        <router-link :to="{path:'/shopIndex',query:{shop_id:info.company_id}}">首页</router-link>
        <router-link :to="{path:'/shopSupply',query:{shop_id:info.company_id}}">供应信息</router-link>
        <router-link :to="{path:'/shopProduct',query:{shop_id:info.company_id}}">产品信息</router-link>
        <router-link :to="{path:'/shopNews',query:{shop_id:info.company_id}}">企业资讯</router-link>
        <router-link :to="{path:'/shopIntroduce',query:{shop_id:info.company_id}}">公司介绍</router-link>
        <router-link :to="{path:'/shopForm',query:{shop_id:info.company_id}}">留言咨询</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    info: {}
  }
};
</script>

<style scoped>
.navbar-box {
  width: 100%;
  height: 48px;
  background-color: #fc6920;
}
.navbar {
  overflow: hidden;
}
.navbar a {
  display: block;
  float: left;
  width: 120px;
  height: 100%;
  opacity: 1;
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 48px;
}
.navbar a:hover {
  background-color: rgba(0, 0, 0, 0.14);
}
.router-link-exact-active {
  background-color: rgba(0, 0, 0, 0.14);
}
</style>