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
      <router-link class="link" :to="{path:'/shopIntroduce',query:{shop_id:info.company_id}}">
        关于我们
        <span class="arrow">></span>
      </router-link>
    </div>
    <!-- 新闻正文 -->
    <div class="news-box safe auto">
      <div class="news-left">
        <div class="left-head">关于我们</div>
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
          <div class="r-title m-l-10">关于我们</div>
        </div>
        <!-- <div class="right-content" v-html="obj.shop.basic_info"></div> -->
        <div class="right-detail">
          <div class="detail-row1">
            <div class="de-left">详细内容</div>
            <div class="de-right"></div>
          </div>
          <div class="detail-row2 m-t-20">
            <div class="table-h">
              <div class="table-left">主营产品或服务</div>
              <div class="table-right">{{info.company.product||'-'}}</div>
            </div>
            <div class="table-h">
              <div class="table-left">公司成立时间</div>
              <div class="table-right">{{info.company.time||'-'}}</div>
            </div>
            <div class="table-h">
              <div class="table-left">企业类型</div>
              <div class="table-right">{{info.company.enterprise_type||'-'}}</div>
            </div>
            <div class="table-h">
              <div class="table-left">经营模式</div>
              <div class="table-right">{{info.company.business_scope||'-'}}</div>
            </div>
            <div class="table-h">
              <div class="table-left">注册地址</div>
              <div class="table-right">{{info.company.register_address||'-'}}</div>
            </div>
            <div class="table-h">
              <div class="table-left">经营地址</div>
              <div class="table-right">{{info.company.business_address||'-'}}</div>
            </div>
            <div class="table-h">
              <div class="table-left">员工人数</div>
              <div class="table-right">{{info.company.staff_num||'-'}}</div>
            </div>
            <div class="table-h">
              <div class="table-left">年营业额</div>
              <div class="table-right">{{info.company.year_turnover||'-'}}</div>
            </div>
            <div class="table-h">
              <div class="table-left">注册资本</div>
              <div class="table-right">{{info.company.register_capital||'-'}}</div>
            </div>
            <div class="table-h">
              <div class="table-left">年进口额</div>
              <div class="table-right">{{info.company.year_import||'-'}}</div>
            </div>
            <div class="table-h">
              <div class="table-left">年出口额</div>
              <div class="table-right">{{info.company.year_export||'-'}}</div>
            </div>
            <div class="table-h">
              <div class="table-left">开户行</div>
              <div class="table-right">{{info.company.bank_name||'-'}}</div>
            </div>
            <div class="table-h">
              <div class="table-left">银行账户</div>
              <div class="table-right">{{info.company.bank_account||'-'}}</div>
            </div>
            <div class="table-h">
              <div class="table-left">厂房面积</div>
              <div class="table-right">{{info.company.space||'-'}}</div>
            </div>
            <div class="table-h">
              <div class="table-left">质量控制</div>
              <div class="table-right">{{info.company.quality_control||'-'}}</div>
            </div>
            <div class="table-h">
              <div class="table-left">研发人数</div>
              <div class="table-right">{{info.company.technology_num||'-'}}</div>
            </div>
            <div class="table-h">
              <div class="table-left">质量认证体系</div>
              <div class="table-right">{{info.company.quality_system||'-'}}</div>
            </div>
            <div class="table-h">
              <div class="table-left">公司网址</div>
              <div class="table-right">{{info.company.enterprise_url||'-'}}</div>
            </div>
            <!-- <div class="table-h" v-for="(item,index) in 18" :key="index">
              <div class="table-left">key:{{index}}</div>
              <div class="table-right">val:{{item}}</div>
            </div>-->
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
        },
        company: {}
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
.right-content {
  line-height: 200%;
  padding-bottom: 50px;
}
.detail-row1 {
  width: 100%;
  overflow: hidden;
}
.de-left {
  float: left;
  width: 130px;
  text-align: center;
  line-height: 40px;
  color: #fc6920;
  font-size: 14px;
  height: 40px;
  border-top: 1px solid #fc6920;
}
.de-right {
  float: left;
  width: 830px;
  height: 40px;
  background: rgba(248, 248, 248, 1);
  border: 1px solid rgba(229, 229, 229, 1);
}
.detail-row2 {
  width: 100%;
  overflow: hidden;
}
.table-h {
  width: 480px;
  float: left;
  overflow: hidden;
}
.table-left {
  width: 150px;
  height: 85px;
  float: left;
  text-align: center;
  line-height: 85px;
  background: #f8f8f8;
}
.table-right {
  width: 330px;
  height: 85px;
  /* text-align: center; */
  display: flex;
  align-items: center;
  justify-content: center;
  /* line-height: 85px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; */
  float: left;
  background: #fdf6f6;
}
</style>
<style>
.right-content span {
  font-size: 14px !important;
  color: rgba(25, 25, 25, 1) !important;
}
</style>