import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    loading: false,
    userStatus: ""
  },
  mutations: {
    loading_show(state) {
      state.loading = true
    },
    loading_hide(state) {
      state.loading = false
    },
    show_login(state) {
      let _this = this;
      var data = {
        action: "cailiaof.user.status",
        param: {
          domain: "http://www.baidu.com"
        }
      };
      _this.$axios
        .get("/api", {
          params: data
        })
        .then(res => {
          console.log(res)
        //   if (res.data.code == 0) {
        //     console.log(res)
        //   } else {
        //     alert("defeat");
        //   }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
})
