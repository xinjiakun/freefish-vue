<template>
  <div class="home sku-box store-content">
    <div style="width:96%; margin: 0 auto; padding-top:20px;">
      <img src="https://aecpm.alicdn.com/simba/img/TB1W4nPJFXXXXbSXpXXSutbFXXX.jpg" > </img>
    </div>
    <div class="gray-box">
        <div class="title">
          <h2>热门商品</h2>
          <div>
            <slot name="right"></slot>
          </div>
        </div>
				<div class="item-box">
					<shop-item key="index" v-for="item,index in goodsList[0]" :item="item"></shop-item>
				</div>
			</div>
      <div class="gray-box">
        <div class="title">
          <h2>最新上架</h2>
          <div>
            <slot name="right"></slot>
          </div>
        </div>
				<div class="item-box">
					<shop-item key="index" v-for="item,index in goodsList[1]" :item="item"></shop-item>
				</div>
			</div>
      <div class="gray-box">
        <div class="title">
          <h2>数码电子</h2>
          <div>
            <slot name="right"></slot>
          </div>
        </div>
				<div class="item-box">
					<shop-item key="index" v-for="item,index in goodsList[2]" :item="item"></shop-item>
				</div>
			</div>
  </div>
</template>

<script>
import shopItem from '@/components/shop-item'
import goodData from '@/lib/newGoodsData'
import { myPost, myGet } from '@/components/api'

export default {
  data(){
    return{
      goodsList:[]
    }
  },
  mounted () {
      myPost('api/home').then(res=>{
        this.goodsList=res.data.result;
      })
  },
  components: {
    shopItem,
  },
}
</script>

<style>
.sku-box{
    position: relative;
}
.sort-option{
    border-top: 1px solid #D8D8D8;
    color: #999;
}
.sort-option ul{
    /* height: 60px; */
    line-height: 35px;
}
.sort-option li{
    position: relative;
    /* float: right; */
    padding-left: 42px;
}
.sort-option li:first-child{
	padding-left: 9px;
}
.sort-option li:before{
	content: ' ';
    display: block;
    position: absolute;
    left: 20px;
    top: 50%;
    width: 2px;
    height: 2px;
    margin-top: -1px;
    background: #C7C7C7;
}
.sort-option li:first-child:before{
	display: none;
}
.sort-option a{
	/* display: block; */
    font-size: 12px;
    color: #999;
    margin: 5px 15px;
}
.sort-option a.active, .sort-option a:hover{
    color: #5683EA;
}
.gray-box{
  overflow: hidden;
  margin-top: 10px;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #dcdcdc;
    border-color: rgba(0,0,0,.14);
    box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
}
.sku-box .item-box{
	clear: both;
    overflow: hidden;
    margin: 0 -1px -1px -1px;
}
.gray-box .title {
      padding-left: 30px;
      position: relative;
      z-index: 10;
      height: 60px;
      padding: 0 10px 0 24px;
      border-bottom: 1px solid #d4d4d4;
      border-radius: 8px 8px 0 0;
      box-shadow: rgba(0, 0, 0, .06) 0 1px 7px;
      background: #f3f3f3;
      background: -webkit-linear-gradient(#fbfbfb, #ececec);
      background: linear-gradient(#fbfbfb, #ececec);
      line-height: 60px;
      font-size: 18px;
      color: #333;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h2 {
        font-size: 18px;
        font-weight: 400;
        color: #626262;
        display: inline-block;
      }
    }

</style>
