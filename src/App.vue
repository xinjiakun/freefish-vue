<template>
  <div id="app">
  	<header-nav></header-nav>	
  	<router-view></router-view>
  </div>
</template>

<script>

import headerNav from '@/components/header-nav'

export default {
  name: 'app',
  components: {
    headerNav
  }
}
</script>

<style>

</style>
