import Vue from 'vue'
import Router from 'vue-router'
import '@/assets/css/reset.css'
import '@/assets/css/header.css'

Vue.use(Router)

import Home from '@/views/home'
import Login from '@/views/login/login'
import Register from '@/views/login/register'
import Shop from '@/views/shop'
import Item from '@/views/item'
import Cart from '@/views/cart'
import Checkout from '@/views/checkout'
import Payment from '@/views/payment'
import Account from '@/views/account'
import Order from '@/views/account/order'
import Information from '@/views/account/information'
import Address from '@/views/account/address'
import Upload from '@/views/account/Upload'

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savePosition) {
    if (savePosition) {
      return savePosition
    } else {
      return {x: 0, y: 0}
    }
  },
  routes: [
    {
      //首页
      path: '/',
      name: 'Home',
      meta: {
        isLogin: false
      },
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        isLogin: false
      },
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      meta: {
        isLogin: false
      },
      component: Register
    },    
    {
      path: '/shop',
      name: 'Shop',
      meta: {
        isLogin: false
      },
      component: Shop
    },
    {
      path: '/item',
      name: 'Item',
      meta: {
        isLogin: true
      },
      component: Item
    },
    {
      path: '/cart',
      name: 'Cart',
      meta: {
        isLogin: true
      },
      component: Cart
    },
    {
      path: '/checkout',
      name: 'Checkout',
      meta: {
        isLogin: true
      },
      component: Checkout
    },
    {
      path: '/payment',
      name: 'Payment',
      meta: {
        isLogin: true
      },
      component: Payment
    },
    {
      path: '/account',
      component: Account,
      children: [
        {
          path: '',
          name: 'Account',
          meta: {
            isLogin: true
          },
          component: Order
        },
        {
          path: '/address',
          name: 'Address',
          meta: {
            isLogin: true
          },
          component: Address
        },
        {
          path: '/information',
          name: 'Information',
          meta: {
            isLogin: true
          },
          component: Information
        },
        {
          path: '/upload',
          name: 'Upload',
          meta: {
            isLogin: true
          },
          component: Upload
        }
      ]
    }
  ]
})

