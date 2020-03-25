<template>
	<div id="header">
		<div class="nav-global">
			<div class="container">
				<h1 class="nav-logo">
					<router-link to="/"><a href="javascript:;"></a></router-link>
				</h1>
				<ul class="nav-aside">
					<li class="nav-user">
					  <router-link to="/login">个人中心</router-link>
						<!--active-->
						<div class="nav-user-wrapper">
							
							<div class="nav-user-list">
								<dl class="nav-user-avatar">
									<dd><span class="ng-scope">
										<img :src="$store.getters.userHeadimg+'?x-oss-process=image/resize,w_80/quality,Q_100/format,webp'" width="45px" height="45px">
										</span>
									</dd>
									<dt class="ng-binding">{{$store.getters.userName}}</dt>
								</dl>
								<ul>
									<li class="order"><router-link to="/account" exact>我的订单</router-link></li>
									<li class="order"><router-link to="/information" exact>个人信息</router-link></li>
									<li class="address"><router-link to="/address">收货地址</router-link></li>
									<li class="information"><router-link to="/upload">商品发布</router-link></li>
								    <li class="logout">
										<a href="/" @click="loginOut()">
											退出
										</a>
									</li>
								</ul>
							</div>
						</div>
					</li>
					<!--购物车-->
					<li class="nav-cart"></li>
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
		
	},

	loginOut(next){
		//获取用户登录成功后储存的登录标志
		let getFlag = localStorage.getItem("Flag");
		//如果登录标志存在且为isLogin，即用户已登录
  		if(getFlag === "isLogin"){
			let ensure;
			ensure = confirm("确认退出账号？");
			if(ensure == true){
				localStorage.removeItem("Flag");//去掉登录标记
				//去掉整个state中的用户信息
				localStorage.removeItem("userId");
				localStorage.removeItem("userName");
				localStorage.removeItem("userEmail");
				localStorage.removeItem("userNumber");
				localStorage.removeItem("userCredit");
				localStorage.removeItem("userInformation");
				localStorage.removeItem("userGender");
				localStorage.removeItem("userHeadimg");
				localStorage.removeItem("addressInfo")
			}else{    //不退出登录，返回首页
				next({
        			path: '/',
      			})
			}	
		}else{//用户还没有登录成功，无反应，跳转到首页
			next({
				path: '/',
			})
		}
	}
  }
}
</script>
