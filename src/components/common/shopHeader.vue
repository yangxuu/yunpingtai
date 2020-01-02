<template>
  <div>
    <div class="shopHeader1box">
      <div class="shopHeader1 safe auto">
        <div class="h1-left">
          <div class="logo">
            <img :src="info.base_info.logo" alt />
          </div>
          <div class="shopinfo m-l-10">
            <p class="info-name">{{info.base_info.enterprise_name}}</p>
            <p class="info-sign m-t-10">
              <img class="img-vip" src="../../assets/images/icon-1.png" alt />
              <span class="info-vip">{{info.base_info.user_grade==1?"普通会员":info.base_info.user_grade==2?"标准会员":info.base_info.user_grade==3?"超级会员":info.base_info.user_grade==4?"至尊会员":""}}</span>
              <img class="img-comp" src="../../assets/images/icon-2.png" alt />
              <span class="info-comp">企业会员</span>
              <img class="img-move" src="../../assets/images/icon-2.png" alt />
              <span class="info-move">移动商铺</span>
            </p>
          </div>
        </div>
        <div class="h1-right">
          <div class="tel-box">
            <img src="../../assets/images/ai-tel.png" alt />
          </div>
          <div class="telphonenumber m-l-10">{{info.base_info.mobile}}</div>
          <div class="r-img1 m-l-35"></div>
          <div class="r-img2 m-l-25"></div>
          <div class="r-img3 m-l-25"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    info: {
      
    }
  },
  
};
</script>

<style scoped>
.shopHeader1box {
  border-top: 1px solid #c9c8c8;
}
.shopHeader1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 115px;
}
.h1-left {
  display: flex;
  align-items: center;
}
.logo {
  max-width: 250px;
  height: 78px;
}
.logo img {
  width: auto;
  max-width: 250px;
  height: 100%;
}
.info-name {
  color: #333;
  font-size: 20px;
}
.info-sign {
  color: #333;
  font-size: 11px;
}
.img-vip {
  width: 17px;
  height: 15px;
}
.img-comp {
  width: 13px;
  height: 16px;
}
.img-move {
  width: 15px;
  height: 13px;
}
.h1-right {
  display: flex;
  align-items: center;
}
.tel-box {
  width: 37px;
  height: 30px;
}
.telphonenumber {
  font-size: 29px;
  color: #fc6920;
}
.r-img1,
.r-img2,
.r-img3 {
  width: 110px;
  height: 81px;
  color: #fff;
  font-size: 23px;
  text-align: center;
  padding: 10px 25px;
  background-repeat: no-repeat;
  background-position: center center;
}
.r-img1 {
  background-image: url(../../assets/images/shopico1.png);
}
.r-img2 {
  background-image: url(../../assets/images/shopico2.png);
}
.r-img3 {
  background-image: url(../../assets/images/shopico3.png);
}
</style>