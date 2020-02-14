<template>
  <li @mouseenter="showCarHandle" @mouseleave="hideCarHandle">
  	<a href="javascript:;" class="ball-rect">购物车</a>
		<!--根据class改变颜色-->
		<span class="cart-empty-num" :class="{'cart-num':count>0}">
			<i>{{count}}</i>
		</span>
		<div class="nav-cart-wrapper" v-show="carShow">
			<div class="nav-cart-list">
				<div class="empty" v-if="count<=0">
					<h3>购物车为空</h3>
					<p>您还没有选购任何商品，现在前往商城选购吧!</p>
				</div>
				<div v-else class="full">
					<div class="nav-cart-items">
						<ul>
							<li class="clear" v-for="item,index in carGoodsData">
								<div class="cart-item js-cart-item cart-item-sell">
									<div class="cart-item-inner">
										<div class="item-thumb">
											<img :src="item.ali_image+'?x-oss-process=image/resize,w_80/quality,Q_100/format,webp'">
										</div>
										<div class="item-desc">
											<div class="cart-cell">
												<h4> 
													<a href="/item">{{item.title}}</a>
												</h4>
												<p class="attrs">
													<span>{{item.spec_json.show_name}}</span>
												</p>
												<h6>
													<span class="price-icon">¥</span><span class="price-num">{{item.price}}</span><span class="item-num">x {{item.count}}</span>
												</h6>
											</div>
										</div>
										<div @click="delCarPanelHandle(item.sku_id)" class="del-btn">删除</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
					<div class="nav-cart-total">
						<p>共 <strong class="ng-binding">{{count}}</strong> 件商品</p>
						<h5>合计：<span class="price-icon">¥</span><span class="price-num">{{totle}}</span></h5>
						<h6>
							<router-link to="/cart" class="nav-cart-btn">去购物车</router-link>
						</h6>
					</div>
				</div>
			</div>
		</div>
		<transition
		  name="ball"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      v-bind:css="true"
    >
	  <div class="addcart-mask" v-show="ball.show">
	  	<img class="mask-item"></img>
	  </div>
	  </transition>
  </li>
</template>
<script>
	export default {
	  data () {
	    return {
	      iTimer: null
	    }
	  },
	  watch: {
	    ["ball.show"] () {
	      if(this.ball.show){
	        
	      }
	    }
	  },
		computed: {
			carGoodsData () {
				return this.$store.state.carPanelData
			},
		  count () {
		    return this.$store.getters.totleCount
		  },
		  totle () {
		    return this.$store.getters.totlePrice
		  },
		  maxCount () {
		    return this.$store.state.maxOff
		  },
		  carShow () {
		    return this.$store.state.carShow
		  },
		  ball () {
		    return this.$store.state.ball
		  }
		},
		methods: {
		  delCarPanelHandle (id) {
        this.$store.commit('delCarPanelData',id)
		  },
		  showCarHandle () {
		    clearTimeout(this.iTimer)
		    this.$store.commit('showCar')
		  },
      hideCarHandle () {
        this.iTimer = setTimeout(()=>{
          this.$store.commit('hideCar')
        },500)
      },
      beforeEnter (el) {
        let rect = this.ball.el.getBoundingClientRect()
        let rectEl = document.getElementsByClassName('ball-rect')[0].getBoundingClientRect()
        let ball = document.getElementsByClassName('mask-item')[0]
        let x = (rectEl.left + 16) - (rect.left + rect.width/2)
        let y = rect.top + rect.height/2 - rectEl.top + 5 - 16
        console.log(rect.top + rect.height/2)
        el.style.transform = 'translate3d(0,'+y+'px,0)'
        
        ball.style.transform = 'translate3d(-'+x+'px,0,0)'
        ball.src = this.ball.img
        console.log(this.ball.img)
      },
      enter (el) {
        let rf = el.offsetHeight
        this.$nextTick(() => {
          el.style.transform = 'translate3d(0,0,0)'
          document.getElementsByClassName('mask-item')[0].style.transform = 'translate3d(0,0,0)'
        })
      },
      afterEnter (el) {
        this.ball.show = false
      }
		}
	}
</script>

<style type="text/css">
	.ball-enter-active{
    transition: .5s cubic-bezier(.15,.69,.6,1.29);
  }
  .ball-enter-active .mask-item{
    transition: .5s cubic-bezier(0,0,1,1);
  }
</style>
