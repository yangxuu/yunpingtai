<template>
  <div id="app">
    <!-- <keep-alive> -->
    <router-view />
    <!-- </keep-alive> -->
    <Loading />
  </div>
</template>

<script>
import _ from "underscore";
import "./vendor/underscore.mixin";
import Loading from "@/components/common/Loading";
export default {
  name: "App",
  components: { Loading },
  data() {
    return {
      type: ""
    };
  },
  created() {
    // let _this = this;
    // _this.$axios.get("/api?action=cailiaof.navigation.all&param={}").then(res => {
    //   console.log(res.data);

    // });


    // _this.api(
    //   "/api?action=cailiaof.navigation.all&param={}",
    //   {},
    //   res => {
    //     console.log(res);
    //   }
    // );







    this.type = localStorage.getItem("color_type");
  },
  mounted() {
    document.getElementById("app").className = "theme" + this.type;
  }
};
</script>
<style lang="less">
@import "../src/assets/changeColor.less";
.theme();

.themea {
  .theme(@backcolor:red);
}

.themeb {
  .theme(@backcolor:yellow);
}

.themec {
  .theme(@backcolor:blue);
}
</style>

