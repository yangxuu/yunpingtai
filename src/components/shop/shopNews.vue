<template>
  <div>
    <headerBox />
    <shopHeader :info="info" />
    <navbar :info="info" />
    <!-- 面包屑 -->
    <div class="bread-nav safe auto">
      <img class="shouye-ico" src="../../assets/images/yx9.png" alt />
      <router-link
        class="link"
        style="width:50px;"
        :to="{path:'/shopIndex',query:{shop_id:info.company_id}}"
      >
        首页
        <span class="arrow">></span>
      </router-link>
      <router-link class="link" :to="{path:'/shopNews',query:{shop_id:info.company_id}}">
        企业资讯
        <span class="arrow">></span>
      </router-link>
    </div>
    <!-- 新闻正文 -->
    <div class="news-box safe auto">
      <div class="news-left">
        <div class="left-head">企业资讯</div>
        <div class="left-info">
          <p>
            <span>联系人：</span>
           <span>{{info.base_info.link_manage}}</span>
          </p>
          <p>
            <span>QQ：</span>
            <!-- <span>{{obj.shop.qq}}</span> -->
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
          <div class="r-title m-l-10">企业资讯</div>
        </div>
        <div class="right-content">
          <!-- <router-link
            :to="{path:'/newsDetail',query:{id:item.id}}"
            class="info-item"
            v-for="(item,index) in info.list"
            :key="index"
          >
            <img class="news-img" :src="item.thumbnail" alt />
            <div class="news-desc">
              <div class="news-title">{{item.post_title}}</div>
              <div class="news-abstr">{{item.post_excerpt}}</div>
              <div class="news-time">{{item.create_time}}</div>
            </div>
          </router-link>-->
          <!-- 分页 -->
          <div class="bottom">
            <div class="page">
              <!-- <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="info.page"
                :total="info.total"
                :page-size="6"
                small
                background
                layout="prev, pager, next, jumper"
                prev-text="上一页"
                next-text="下一页"
              ></el-pagination>-->
            </div>
          </div>
        </div>
      </div>
    </div>

    <footBox />
  </div>
</template>
<script>
import Vue from "vue";
import _ from "underscore";
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
  },
  methods: {
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      let _this = this;
    }
  }
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
.info-item {
  display: block;
  opacity: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
}
.news-img {
  width: 150px;
  height: 100px;
}
.news-desc {
  width: 780px;
}
.news-title {
  font-size: 14px;
  color: rgba(25, 25, 25, 1);
  font-weight: bold;
}
.news-abstr {
  margin-top: 15px;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(89, 89, 89, 1);
}
.news-time {
  margin-top: 15px;
  font-size: 10px;
  color: rgba(89, 89, 89, 1);
}
/* 分页 */
.bottom {
  overflow: hidden;
  margin: 100px auto;
}
.page {
  width: 300px;
  margin: 0 auto;
}
</style>