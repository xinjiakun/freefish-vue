<template>
	<div id="main">
		<div class="sku-box store-content">
			<div class="sort-option">
        <ul class="line clear">
				<li style="padding-left:42px;"><a  @click="sortSelected(Aname.value)" :class="{active: sortActive == Aname.value}" v-for="Aname in sort">{{Aname.name}}</a>
          <el-input  placeholder="最低价"  v-model="input0"  clearable @blur="lowerPrice"
          style="width:90px; height:20px;"></el-input> --
          <el-input  placeholder="最高价"  v-model="input1"  clearable @blur="highPrice"
          style="width:90px; height:20px;"></el-input>
        </li>
        <li><a  @click="newSelected(Aname.value)" :class="{active: newActive == Aname.value}" v-for="Aname in newOr">{{Aname.name}}</a></li>
        <li><a  @click="typeSelected(Aname.value)" :class="{active: typeActive == Aname.value}" v-for="Aname in type">{{Aname.name}}</a></li>
				</ul>
			</div>
			<div class="gray-box">
				<div class="item-box">
					<shop-item key="index" v-for="item,index in goodsList" :item="item"></shop-item>
				</div>
			</div>
		</div>
    <prompt v-if="maxCount"></prompt>
	</div>
</template>


<script>
import goodData from '@/lib/newGoodsData'
import shopItem from '@/components/shop-item'
import prompt from '@/components/prompt'
export default {
  data () {
    return {
      goodsList: goodData,
      sort: [{
        name: '综合排序',
        value: 0
        }, {
        name: '销量排序',
        value: 1
        }, {
        name: '价格低到高',
        value: 2
        }, {
        name: '价格高到低',
        value: 3
      }],
      newOr: [{
          name: '全部',
          value: 0
        }, {
        name: '全新',
        value: 1
        }, {
        name: '9成新',
        value: 2
        }, {
        name: '7成新',
        value: 3
        }, {
        name: '5成及以下',
        value: 4
      }],
      type: [{
          name: '全部',
          value: 0
        },{
        name: '手机数码',
        value: 1
        }, {
        name: '服饰球鞋',
        value: 2
        }, {
        name: '美妆',
        value: 3
        }, {
        name: '图书',
        value: 4
      }, {
        name: '生活用品',
        value: 5
      }, {
        name: '运动装备',
        value: 6
      }, {
        name: '其他',
        value: 7
      }],
      sortActive: 1,
      newActive: 0,
      typeActive: 0,
      input0: null,
      input1: null,
    }
  },
  methods:{
    sortSelected(value) {
    this.sortActive = value;
    },
    newSelected(value) {
    this.newActive = value;
    },
    typeSelected(value) {
    this.typeActive = value;
    },
    lowerPrice(){
      console.log(this.input0); 
    },
    highPrice(){
      console.log(this.input1); 
    }
  },
  mounted () {
      let data = new FormData();
      data.append('name',1); 
      
      myPost('/select',data).then(res=>{

      })
      let params={
        params:{
          name:2
        }
      }
      myGet('/select',params).then(res=>{

      })
    
  },
  components: {
    shopItem,
    prompt
  },
  computed: {
    maxCount () {
      return this.$store.state.maxOff
    }
  }
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

</style>
