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
      <router-link class="link" :to="{path:'/shopForm',query:{shop_id:info.company_id}}">
        留言咨询
        <span class="arrow">></span>
      </router-link>
    </div>
    <!-- 新闻正文 -->
    <div class="news-box safe auto">
      <div class="news-left">
        <div class="left-head">普通会员</div>
        <div class="left-info">
          <!-- <p style="color:rgba(25,25,25,1);font-size:14px;font-weight:bold">{{obj.shop.name}}</p> -->
          <p>
            <span>联系人：</span>
            <span>{{info.base_info.link_manage}}</span>
          </p>
          <p>
            <span>电话：</span>
            <span>{{info.base_info.phone}}</span>
          </p>
          <p>
            <span>所在地区：</span>
            <span>{{info.base_info.business_address}}</span>
          </p>
          <p>
            <span>经营模式：</span>
            <!-- <span>{{obj.shop.company_type}}</span> -->
          </p>
          <p>
            <span>主营产品：</span>
            <span>{{info.base_info.product}}</span>
          </p>
        </div>
      </div>
      <div class="news-right">
        <div class="right-head">
          <div class="r-block"></div>
          <div class="r-title m-l-10">留言咨询</div>
        </div>
        <div class="right-content">
          <div class="content-row">
            <div class="row-left">
              <span class="star">*</span>
              <span class="key">联系人：</span>
            </div>
            <input
              v-model="name"
              type="text"
              :class="{activeStyle:nameFlag}"
              @focus="nameFocus"
              @blur="nameBlur"
              class="row-right"
              placeholder="姓名（必填）"
            />
          </div>
          <div class="content-row">
            <div class="row-left">
              <span class="star">*</span>
              <span class="key">联系电话：</span>
            </div>
            <input
              v-model="mobile"
              type="text"
              :class="{activeStyle:teleFlag}"
              @focus="teleFocus"
              @blur="teleBlur"
              class="row-right"
              placeholder="手机（必填）"
            />
          </div>
          <div class="content-row">
            <div class="row-left">
              <span class="key">Q&#x3000;Q：</span>
            </div>
            <input
              v-model="qq"
              type="text"
              :class="{activeStyle:qqFlag}"
              @focus="qqFocus"
              @blur="qqBlur"
              class="row-right"
              placeholder="QQ"
            />
          </div>
          <div class="content-row">
            <div class="row-left">
              <span class="star">*</span>
              <span class="key">详细内容：</span>
            </div>
            <input
              v-model="content"
              type="text"
              :class="{activeStyle:contentFlag}"
              @focus="contentFocus"
              @blur="contentBlur"
              class="row-right"
              placeholder="留言内容（必填）"
            />
          </div>
          <div class="content-row">
            <div class="row-left"></div>
            <div class="submit" @click="submit">提交</div>
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
      },
      //名字输入框聚焦
      nameFlag: false,
      teleFlag: false,
      qqFlag: false,
      contentFlag: false,
      // ipt绑定数据
      name: "",
      mobile: "",
      qq: "",
      content: ""
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
    nameFocus() {
      this.nameFlag = true;
    },
    nameBlur() {
      this.nameFlag = false;
    },
    teleFocus() {
      this.teleFlag = true;
    },
    teleBlur() {
      this.teleFlag = false;
    },
    qqFocus() {
      this.qqFlag = true;
    },
    qqBlur() {
      this.qqFlag = false;
    },
    contentFocus() {
      this.contentFlag = true;
    },
    contentBlur() {
      this.contentFlag = false;
    },
    submit() {
      let _this = this;
      var subdata = {
        action: "cailiaof.company.message",
        param: {
          company_id: this.$route.query.shop_id,
          link_manage: this.name,
          tel: this.mobile,
          content: this.content,
          domain: "http://www.baidu.com"
        }
      };
      _this.$axios
        .get("/api", { params: subdata })
        .then(res => {
          if (res.data.code == 0) {
            console.log(res.data);
          } else {
            alert("defeat");
          }
        })
        .catch(err => {
          console.log(err);
        });
        this.name="";
        this.mobile="";
        this.content="";
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
.right-content {
  padding-bottom: 50px;
}
.content-row {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.row-left {
  width: 150px;
  text-align: right;
  height: 50px;
  line-height: 50px;
}
.star {
  font-size: 14px;
  color: rgba(229, 4, 5, 1);
}
.key {
  letter-spacing: 10px;
  font-size: 14px;
  color: rgba(25, 25, 25, 1);
}
.row-right {
  display: block;
  width: 514px;
  height: 50px;
  padding-left: 15px;
  border: 1px solid rgba(208, 208, 208, 1);
}
.activeStyle {
  border: 1px solid #fc6920;
}
.submit {
  width: 514px;
  height: 50px;
  margin-top: 20px;
  text-align: center;
  line-height: 50px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  background: rgba(252, 105, 32, 1);
}
</style>
