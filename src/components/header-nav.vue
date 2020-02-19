<template>
	<div id="header">
		<div class="nav-global">
			<div class="container">
				<h1 class="nav-logo">
					<router-link to="/"><a href="javascript:;"></a></router-link>
				</h1>
				<ul class="nav-aside">
					<li class="nav-user">
					  <router-link to="/account">个人中心</router-link>
						<!--active-->
						<div class="nav-user-wrapper">
							<div class="nav-user-list">
								<dl class="nav-user-avatar">
									<dd><span class="ng-scope"></span></dd>
									<dt class="ng-binding">+86 138****9453</dt>
								</dl>
								<ul>
									<li class="order"><router-link to="/account" exact>我的订单</router-link></li>
									<!--<li class="support"><a href="javascript:;">售后服务</a></li>
									<li class="coupon"><a href="javascript:;">我的优惠</a></li>-->
									<li class="address"><router-link to="/address">收货地址</router-link></li>
									<li class="information"><router-link to="/upload">商品发布</router-link></li>
									
								<!--	<li class="logout"><a href="javascript:;">退出</a></li>-->
								</ul>
							</div>
						</div>
					</li>
					<!--active-->
					<car-panel class="nav-cart"></car-panel>
				</ul>
				<el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="state1"
					clearable style="margin-left: 70px; width:200px; float: right; margin: 30px 50px 0 0"
					@blur="handleSelect()"
				></el-input>
				<ul class="nav-list">
					<router-link to="/" exact tag="li" activeClass="active"><a>首页商城</a></router-link>
					<router-link to="/shop" exact tag="li" activeClass="active"><a>全部商品</a></router-link>
					<router-link to="/upload" exact tag="li" activeClass="active"><a>商品发布</a></router-link>
								<!-- <el-autocomplete       
					class="inline-input"          
					v-model="state1"         
					placeholder="请输入内容"     
					:fetch-suggestions="querySearch"       
					:trigger-on-focus="false"               
					@select="handleSelect"
					style="margin-left: 70px"
					clearable
					>   
				</el-autocomplete> -->
				</ul>



			</div>
		</div>
		<!-- <div class="nav-sub">
			<div class="nav-sub-wrapper">
				<div class="container">
					<ul class="nav-list">
						<li><a href="javascript:;">首页</a></li>
						<li><a href="javascript:;">手机</a></li>
						<li><a href="javascript:;">“足迹系列”手感膜</a></li>
						<router-link to="/" exact tag="li" activeClass="active">
						    <a>官方配件</a>
						</router-link>
						<li><a href="javascript:;">周边产品</a></li>
						<li><a href="javascript:;">第三方配件</a></li>
						<li><a href="javascript:;">全部商品</a></li>
						<li><a href="javascript:;">服务</a></li>
					</ul>
				</div>
			</div>
		</div> -->
	</div>
</template>
<script>
import CarPanel from '@/components/car-panel'
import { myPost, myGet } from '@/components/api'
export default {
	data(){
		return{
			selectall: [

			],
			state1: '',
			
		}
	},
  components: {
    CarPanel
  },
  methods: {
	  querySearch(queryString, cb) {   
        this.$http({
            url: "http://localhost:8067/api/nowSelect",
            method: "post",
            params: {
                    select:queryString 
             }
        }).then(({ data }) => {
			// for(var i=0;i<data.result.length;i++){
			// 	console.log(data.result[i]);
			// 		this.selectall[i].value = data.result[i];   
			// 		console.log(data.result[i].value);
			// }
			if(data.result==null){
				cb([{'value':'暂无相关内容'}]);
			}else{
				cb(data.result);
			}
      });
	},
	handleSelect(item){
		let data = new FormData();
		data.append('select',this.state1); 
		
		myPost('api/select',data).then(res=>{
			this.$emit('getGoods',res.data);
		})
		
	}
  }
}
</script>
