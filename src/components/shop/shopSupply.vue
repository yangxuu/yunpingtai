<template>
  <div>
    <headerBox />
    <shopHeader :info="info" />
    <navbar :info="info" />
    <!-- 面包屑 -->
    <div class="bread-nav safe auto">
      <img class="shouye-ico" src="../../assets/images/yx9.png" alt />
      <router-link class="link" style="width:50px;" :to="{path:'/shopIndex',query:{shop_id:info.company_id}}">
        首页
        <span class="arrow">></span>
      </router-link>
    </div>
    <!-- 正文 -->
    <div class="news-box safe auto">
      <div class="news-left">
        <div class="left-head">{{info.base_info.user_grade==1?"普通会员":info.base_info.user_grade==2?"标准会员":info.base_info.user_grade==3?"超级会员":info.base_info.user_grade==4?"至尊会员":""}}</div>
        <div class="left-info">
          <p>
            <span>联系人：</span>
            <span>{{info.base_info.link_manage}}</span>
          </p>
          <p>
            <span>QQ：</span>
            <!-- <span>{{info.base_info.qq}}</span> -->
          </p>
          <p>
            <span>电话：</span>
            <span>{{info.base_info.phone}}</span>
          </p>
          <p>
            <span>手机：</span>
            <span>{{info.base_info.mobile}}</span>
          </p>
          <p>
            <span>传真：</span>
            <span>{{info.base_info.facsimile}}</span>
          </p>
        </div>
      </div>
      <div class="news-right">
        <div class="right-head">
          <div class="r-block"></div>
          <div class="r-title m-l-10">最新供应</div>
        </div>

      
      </div>
    </div>

    <footBox />
  </div>
</template>
<script>
import Vue from "vue";
import shopHeader from "../common/shopHeader";
import navbar from "../common/navbar";
import headerBox from "../common/header-box";
import footBox from "../common/foot-box";
export default {
  components: { shopHeader, navbar, headerBox, footBox },
  data() {
    return {
      info: {
        base_info: {
          logo: ""
        }
      }
    };
  },
  created() {
    let _this = this;
    var data = {
      action: "cailiaof.company.detail",
      param: {
        id: this.$route.query.shop_id,
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

          // 产品供应
    var data = {
      action: "cailiaof.company.supply",
      param: {
        id: this.$route.query.shop_id,
        domain: "http://www.baidu.com"
      }
    };
    _this.$axios
      .get("/api", { params: data })
      .then(res => {
        if (res.data.code == 0) {
          console.log(res.data)
          // document.title = res.data.result.head.title;
          // this.info = res.data.result;
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


</style>