<template>
  <div>
    <div class="footerbox1 m-t-40">
      <div class="footer1 safe auto">
        <div class="foot-col foot1">
          <div class="col-title">品类齐全，轻松采购</div>
          <div class="col-des m-t-10">千万余精选商品供选择</div>
        </div>
        <div class="foot-col foot2">
          <div class="col-title">专业团队，行业平台</div>
          <div class="col-des m-t-10">1000位专业人员为您服务</div>
        </div>
        <div class="foot-col foot3">
          <div class="col-title">节支降本，赢在效益</div>
          <div class="col-des m-t-10">省钱就是赚钱，效益就是利益</div>
        </div>
        <div class="foot-col foot4">
          <div class="col-title">正品行货，精致服务</div>
          <div class="col-des m-t-10">为您提供售后无忧保障</div>
        </div>
      </div>
    </div>
    <div class="footerbox2">
      <div class="footer2 safe auto">
        <p class="friend-link">友情链接：</p>
        <div class="links">
          <a target="_blank" v-for="(item,index) in info" :key="index" :href="item.url">{{item.name}}</a>
        </div>
        <div class="line"></div>
        <div class="footer-more">
          <p class="row1">
            <a href>公司简介</a>
            <a href>服务条款</a>
            <a href>隐私声明</a>
            <a href>汇款账号</a>
            <a href>产品服务</a>
            <a href>瓯达招聘</a>
            <a href>帮助中心</a>
            <a href>联系我们</a>
          </p>
          <p class="row2">
            <a class="cai" href>英文网址： www.ouda.com 版权所有</a>
            <a class="cai" href>瓯达网络</a>
          </p>
          <p class="row3">Copyright 2009-2019 杭州瓯达网络科技有限公司 All Rights Reserved</p>
          <p class="row4">浙ICP备13034685号 增值电信业务经营许可证：浙B2-20190210</p>
          <p class="row5">浙公网安备 33010602000211号</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: []
    };
  },
  created() {
    let _this = this;

    // 首页友情链接
    var footdata = {
      action: "cailiaof.link.list",
      param: {type:2, domain: "http://www.baidu.com" }
    };
    _this.$axios
      .get("/api", { params: footdata })
      .then(res => {
        if (res.data.code == 0) {
          this.info=res.data.result
        } else {
          alert("defeat");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped>
.footerbox1 {
  width: 100%;
  height: 150px;
  background-color: #f6f8f9;
}
.footer1 {
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.foot-col {
  padding-left: 60px;
  width: 270px;
  background-repeat: no-repeat;
}
.foot1 {
  background-image: url(../../assets/images/foot1.png);
}
.foot2 {
  background-image: url(../../assets/images/foot2.png);
}
.foot3 {
  background-image: url(../../assets/images/foot3.png);
}
.foot4 {
  background-image: url(../../assets/images/foot4.png);
}
.col-title {
  color: #393939;
  font-size: 20px;
  font-weight: bold;
}
.col-des {
  color: #777777;
  font-size: 14px;
}
.footerbox2 {
  width: 100%;
  background-color: #3b3b3b;
}
.footer2 {
  padding: 27px 0;
}
.friend-link {
  font-size: 14px;
  color: #fff;
}
.links {
  width: 1100px;
  margin: 10px 0;
  overflow: hidden;
}
.links a {
  display: block;
  float: left;
  padding: 8px 5px;
  font-size: 12px;
  color: #abaaaa;
}
.line {
  height: 2px;
  background: rgba(220, 230, 242, 1);
  opacity: 0.13;
}
.footer-more {
  width: 100%;
  background-color: #3a3a3a;
  font-size: 12px;
  color: #abaaaa;
  overflow: hidden;
  margin-top: 25px;
}
.row1,
.row2,
.row3,
.row4,
.row5 {
  font-size: 12px;
  color: #abaaaa;
  text-align: center;
  margin-top: 10px;
}
.row1 a {
  display: inline-block;
  height: 15px;
  line-height: 15px;
  margin: 5px 0;
  padding: 0 5px;
  font-size: 12px;
  color: #abaaaa;
  vertical-align: middle;
  border-right: 1px solid #abaaaa;
}
.row5 {
  font-size: 12px;
  color: #abaaaa;
}
.cai {
  font-size: 12px;
  color: #abaaaa;
}
</style>


