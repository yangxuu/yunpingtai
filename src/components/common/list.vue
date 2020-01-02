<template>
  <div>
    <div class="kinds">产品分类</div>
    <div class="kinds-box">
      <!-- 若没有分类展示全部产品-->
      <div class="kinds-li">
        <!-- <span class="li-add">+</span> -->
        <span class="li-des">全部产品</span>
      </div>
      <!--有二级或三级目录的部分 -->
      <div class="kinds-list">
        <ul id="menu">
          <li class="firstLevel" v-for="(one,index) in product" :key="index">
            <span @click="twoMenu(one)">{{one.value}}</span>
            <ul v-if="one.isSubShow" id="two">
              <li class="secondLevel" v-for="(two,index) in one.childrens" :key="index">
                <a @click="threeMenu(two)" href="javascript:;">{{two.value}}</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      product: [
        {
          label: "食品纸",
          value: "食品纸",
          isSubShow: false,
          childrens: [
            {
              label: "食品纸2",
              value: "食品纸2",
              isSubShow: false,
              childrens: [
                {
                  label: "食品纸3",
                  value: "食品纸3"
                }
              ]
            },
            {
              label: "食品纸2",
              value: "食品纸2",
              isSubShow: false,
              childrens: [
                {
                  label: "食品纸3",
                  value: "食品纸3"
                }
              ]
            },
            {
              label: "食品纸2",
              value: "食品纸2",
              isSubShow: false,
              childrens: [
                {
                  label: "食品纸3",
                  value: "食品纸3"
                }
              ]
            }
          ]
        },
        {
          label: "牛皮纸",
          value: "牛皮纸",
          isSubShow: false,
          childrens: [
            {
              label: "牛皮纸2",
              value: "牛皮纸2",
              isSubShow: false,
              childrens: [
                {
                  label: "牛皮纸3",
                  value: "牛皮纸3"
                }
              ]
            }
          ]
        },
        {
          label: "牛卡纸",
          value: "牛卡纸",
          isSubShow: false,
          childrens: [
            {
              label: "牛卡纸2",
              value: "牛卡纸2",
              isSubShow: false,
              childrens: [
                {
                  label: "牛卡纸3",
                  value: "牛卡纸3"
                }
              ]
            }
          ]
        },
        {
          label: "纸袋纸",
          value: "纸袋纸",
          isSubShow: false,
          childrens: [
            {
              label: "纸袋纸2",
              value: "纸袋纸2",
              isSubShow: false,
              childrens: [
                {
                  label: "纸袋纸3",
                  value: "纸袋纸3"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  created(){
    
  },

  methods: {
    // 二级分类
    twoMenu(model) {
      model.isSubShow = !model.isSubShow;
    },
    threeMenu(model) {
      model.isSubShow = !model.isSubShow;
    }
  }
};
</script>


<style scoped>
.kinds {
  width: 211px;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  color: #fff;
  padding-left: 88px;
  background-image: url(../../assets/images/qx-fenlei.png);
  background-repeat: no-repeat;
  background-size: 15px 15px;
  background-position: 33% 50%;
  background-color: #fc6920;
  border: 1px solid #fc6920;
}

.kinds-box {
  width: 211px;
  padding: 9px 13px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(229, 229, 229, 1);
}

.kinds-li {
  font-size: 14px;
  color: #403c39;
  cursor: pointer;
  padding: 12px 0 12px 10px;
  background: rgba(250, 250, 250, 1);
  border: 1px solid rgba(229, 229, 229, 1);
}
.firstLevel {
  font-size: 14px;
  color: #403c39;
  position: relative;
  margin-top: 8px;
  cursor: pointer;
  padding: 12px 0 12px 10px;
  background: rgba(250, 250, 250, 1);
  border: 1px solid rgba(229, 229, 229, 1);
}
.secondLevel {
  margin-top: 10px;
}

.secondLevel a {
  font-size: 12px;
  color: #403c39;
}
.secondLevel a:hover {
  color: #fc6920;
}
</style>