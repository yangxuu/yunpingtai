import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/login/login'
import register from '@/components/register/register'

import index from '@/components/index/index'
import supply from '@/components/supply/supply'
// import purchase from '@/components/purchase/purchase'
// import goods from '@/components/goods/goods'
import yellowpage from '@/components/yellowpage/yellowpage'
import information from '@/components/information/information'
import infolist from '@/components/information/infolist'
import aicaigou from '@/components/aicaigou/baidu'

import searchpage from '@/components/searchpage/searchpage'

import differ from '@/components/views/differ'


import shopIndex from '@/components/shop/shopIndex'
import shopSupply from '@/components/shop/shopSupply'
import shopProduct from '@/components/shop/shopProduct'
import shopNews from '@/components/shop/shopNews'
import shopIntroduce from '@/components/shop/shopIntroduce'
import shopForm from '@/components/shop/shopForm'

import detail from '@/components/detail/detail'
import supplydetail from '@/components/detail/supplydetail'
// import sellerdetail from '@/components/detail/sellerdetail'
import newsDetail from '@/components/detail/newsDetail'
import shopNewsDetail from '@/components/detail/shopNewsDetail'


import ErrPage from '@/components/common/ErrPage'

Vue.use(Router)
const router = new Router({
  mode: "history",
  routes: [{
      path: '/login',
      name: 'Login',
      meta: {
        title: "登录"
      },
      component: login
    },
    {
      path: '/register',
      name: 'Register',
      meta: {
        title: "注册"
      },
      component: register
    },
    {
      path: '/',
      name: 'Index',
      meta: {
        title: "首页"
      },
      component: index
    },
    {
      path: '/searchpage',
      name: 'Searchpage',
      meta: {
        title: "搜索页面"
      },
      component: searchpage
    },
    {
      path: '/supply',
      name: 'Supply',
      meta: {
        title: "供应库首页"
      },
      component: supply
    },
    // {
    //   path: '/purchase',
    //   name: 'Purchase',
    //   meta: {
    //     title: "求购中心"
    //   },
    //   component: purchase
    // },
    // {
    //   path: '/goods',
    //   name: 'Goods',
    //   meta: {
    //     title: "产品中心"
    //   },
    //   component: goods
    // },
    {
      path: '/yellowpage',
      name: 'Yellowpage',
      meta: {
        title: "黄页中心"
      },
      component: yellowpage
    },
    {
      path: '/information',
      name: 'Information',
      meta: {
        title: "新闻资讯"
      },
      component: information
    },
    {
      path: '/infolist',
      name: 'Infolist',
      meta: {
        title: "新闻资讯列表"
      },
      component: infolist
    },
    {
      path: '/aicaigou',
      name: 'aicaigou',
      meta: {
        title: "百度爱采购"
      },
      component: aicaigou
    },
    {
      path: '/supplydetail',
      name: 'Supplydetail',
      meta: {
        title: "供应库详情"
      },
      component: supplydetail
    },
    // {
    //   path: '/sellerdetail',
    //   name: 'Sellerdetail',
    //   meta: {
    //     title: "求购详情"
    //   },
    //   component: sellerdetail
    // },
    {
      path: '/differ',
      name: 'Differ',
      meta: {
        title: "分类详情"
      },
      component: differ
    },

    {
      path: '/detail',
      name: 'Detail',
      meta: {
        title: "商品详情"
      },
      component: detail
    },
    {
      path: '/newsDetail',
      name: 'NewsDetail',
      meta: {
        title: "资讯详情"
      },
      component: newsDetail
    },
    {
      path: '/shopNewsDetail',
      name: 'ShopNewsDetail',
      meta: {
        title: "店铺资讯详情"
      },
      component: shopNewsDetail
    },
    {
      path: '/shopIndex',
      name: 'ShopIndex',
      meta: {
        title: "店铺首页"
      },
      component: shopIndex
    },
    {
      path: '/shopSupply',
      name: 'ShopSupply',
      meta: {
        title: "店铺供应"
      },
      component: shopSupply
    },
    {
      path: '/shopProduct',
      name: 'shopProduct',
      meta: {
        title: "店铺产品"
      },
      component: shopProduct
    },
    {
      path: '/shopNews',
      name: 'ShopNews',
      meta: {
        title: "店铺资讯"
      },
      component: shopNews
    },
    {
      path: '/shopIntroduce',
      name: 'ShopIntroduce',
      meta: {
        title: "店铺介绍"
      },
      component: shopIntroduce
    },
    {
      path: '/shopForm',
      name: 'ShopForm',
      meta: {
        title: "店铺留言"
      },
      component: shopForm
    },
    {
      path: '*',
      component: ErrPage
    }

  ]
})

export default router;
// router.beforeEach((to, from, next) => {
//   document.title = to.meta.title;
//   next()
// });
