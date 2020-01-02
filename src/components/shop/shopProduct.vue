<template>
  <div>
    <headerBox />
    <shopHeader :info="info" />
    <navbar :info="info" />
    <div class="container safe">
      <span>当前位置：</span>
      <router-link :to="{path:'/shopIndex',query:{shop_id:info.company_id}}">首页>></router-link>
      <router-link
        style="color:#FC6900"
        :to="{path:'/shopProduct',query:{shop_id:info.company_id}}"
      >供应产品</router-link>
    </div>
    <div class="content safe auto">
      <List />
      <div class="productBox"></div>
    </div>
    <footBox />
  </div>
</template>
<script>
import List from "../common/list";
import shopHeader from "../common/shopHeader";
import headerBox from "../common/header-box";
import footBox from "../common/foot-box";
import navbar from "../common/navbar";
export default {
  components: { List, shopHeader, navbar, headerBox, footBox },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 25) {
        return value.slice(0, 25) + "...";
      }
      return value;
    }
  },
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

    // 产品分类
    var data = {
      action: "cailiaof.company.products",
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
.container {
  margin: 20px auto;
  line-height: 34px;
  height: 34px;
  background-color: #f8f8f8;
  border: 1px solid #eee;
  color: #666666;
  font-size: 12px;
}
.content {
  display: flex;
  justify-content: space-between;
}
.productBox {
  width: 950px;
  height: 900px;
  border: 1px solid #fc6900;
}
</style>