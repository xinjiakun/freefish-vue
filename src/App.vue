<template>
  <div id="app">
  	<header-nav @getGoods="getGoodsList"></header-nav>	
  	<router-view :goodsList="goodsList"></router-view>
  </div>
</template>

<script>

import headerNav from '@/components/header-nav'

export default {
  name: 'app',
  data(){
    return{
      goodsList:[]
    }
  },
  components: {
    headerNav
  },
  methods:{
    getGoodsList(list){
      this.goodsList=list.result
      console.log(list);
      
    }
  }
}
</script>

<style>

</style>
