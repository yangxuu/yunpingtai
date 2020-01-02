<template>
  <div>
    <div class="suport-goodsbox safe auto">
      <!-- 当前位置 -->
      <div class="breadList">
        <span class="breadOne">当前位置：</span>
        <router-link class="breadOne" to="/">中国材料网</router-link>
        <span>&gt;</span>
        <span class="breadOne">资讯信息</span>
        <span>&gt;</span>
        <span class="breadOne">搜索</span>
      </div>
      <!-- 搜索内容 -->
      <div class="goodsbox-left">
        <div class="goodsbox-left-box clearfix">
          <div class="suport-news" v-for="(item,index) in info.searchList.data" :key="index">
            <router-link target="_blank" :to="{path:'/newsdetail',query:{id:item.id}}">
              <div class="header">{{item.post_title}}</div>
              <div class="content">{{item.post_excerpt}}</div>
            </router-link>
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
        action: "cailiaof.search.news",
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
.suport-news {
  margin: 20px auto;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}
.suport-news a {
  color: #333;
}
.suport-news:hover a {
  color: #fc6920;
}
.suport-news .header {
  font-size: 16px;
  padding-bottom: 10px;
}
.suport-news .content {
  font-size: 14px;
  padding-bottom: 10px;
}
/* 分页 */
.page-container {
  width: 100%;
  display: flex;
  padding: 50px 0;
  justify-content: center;
}
</style>

