<template>
  <div>
    <div class="suport-goodsbox safe auto">
      <!-- 当前位置 -->
      <div class="breadList">
        <span class="breadOne">当前位置：</span>
        <router-link class="breadOne" to="/">中国材料网</router-link>
        <span>&gt;</span>
        <span class="breadOne">公司信息</span>
        <span>&gt;</span>
        <span class="breadOne">搜索</span>
      </div>
      <!-- 搜索内容 -->
      <div class="goodsbox-left">
        <div class="goodsbox-left-box clearfix">
          <div class="suport-goods" v-for="(item,index) in info.searchList.data" :key="index">
            <router-link target="_blank" :to="{path:'/shopIndex',query:{shop_id:item.id}}" class="suport-imgbox">
              <img :src="item.logo" alt />
              <div class="askfor">立即询价</div>
            </router-link>
            <div class="suport-para">
              <div class="suport-des">{{item.name}}</div>
              <div class="suport-shopname">
                <div class="name-left">{{item.enterprise_name}}</div>
                <div class="vip-flags">
                  <img class="flag1" src="../../assets/images/icon-1.png" alt />
                  <img class="flag2" src="../../assets/images/icon-2.png" alt />
                </div>
              </div>
            </div>
            <div class="suport-location">
              <div class="s-float">{{item.address_str}}</div>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <div class="page-container">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="20"
            background
            layout="prev, pager, next"
            :total="Number(info.searchList.total)"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  props: {
    info: {},
    currentPage: {}
  },
  created() {},
  watch: {},
  methods: {
    handleCurrentChange(currentPage) {
      let _this = this;
      var data = {
        action: "cailiaof.search.company",
        param: {
          keyword: this.$route.query.keywords,
          domain: "http://www.baidu.com"
        },
        page: currentPage
      };
      _this.$axios
        .get("/api", { params: data })
        .then(res => {
          if (res.data.code == 0) {
            Vue.set(this.info, "searchList", res.data.result.list);
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
.suport-goodsbox {
  background: #fff;
  overflow: hidden;
  position: relative;
}
.breadList {
  font-size: 12px;
  color: #999;
  padding: 18px 0;
}
.breadOne {
  color: #999;
  margin: 0 2px;
}
/* 搜索内容 */
.goodsbox-left {
  overflow: hidden;
}
.suport-goods {
  width: 225px;
  height: 270px;
  float: left;
  overflow: hidden;
  margin: 5px 7.5px;
  border: 1px solid #d8d7d7;
}
.suport-imgbox {
  display: block;
  opacity: 1;
  width: 225px;
  height: 195px;
  overflow: hidden;
  position: relative;
  background-image: url(../../assets/images/imgbg.png);
  background-size: 100% 100%;
  border-bottom: 1px solid #d8d7d7;
}

.suport-imgbox img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.askfor {
  display: block;
  width: 225px;
  height: 30px;
  color: #fff;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
  background: #ff8400;
  position: absolute;
  left: 0;
  bottom: -30px;
  transition: all 0.3s;
  z-index: 99999;
}

/* hover */
.suport-goods:hover .askfor {
  bottom: 0;
}

.suport-goods:hover {
  border: 1px solid #ff8400;
}

.suport-para {
  padding: 6px 8px;
}

.suport-des {
  font-size: 12px;
  color: #333333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.suport-shopname {
  font-size: 10px;
  color: #a4a4a4;
  margin-top: 6px;
  overflow: hidden;
}

.name-left {
  float: left;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.vip-flags {
  float: left;
}

.vip-flags .flag1 {
  width: 15px;
  height: 15px;
}

.vip-flags .flag2 {
  width: 15px;
  height: 16px;
}

.suport-location {
  height: 30px;
  line-height: 30px;
  overflow: hidden;
  font-size: 12px;
  color: #848383;
  padding: 0 8px;
  border-top: 1px solid #d8d7d7;
}
.s-float {
  float: left;
  padding-left: 27px;
  width: 75%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-image: url(../../assets/images/location.png);
  background-repeat: no-repeat;
  background-size: 19px 19px;
  background-position: 0 50%;
}

.r-float {
  float: right;
}
/* 分页 */
.page-container {
  width: 100%;
  display: flex;
  padding: 50px 0;
  justify-content: center;
}
</style>

