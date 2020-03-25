<template>
	<div class="account-content">
		<div class="account-order">
			<div class="gray-box">
				<div class="title columns-title pre-title">
					<h2>我的上传</h2>
					<span class="gray-blue-btn js-add-address"><a class="add" @click="uploadGood">点击上传</a></span>
				</div>
				<div class="js-list-inner">
					<div class="box-inner order-cart order-list-cart clear">
						<div class="gray-sub-title cart-title">
							<span class="date">标题：</span>
							<input v-model="newGoodTitle1" placeholder="为商品起一个吸引人的标题">
						</div>
						<div class="gray-sub-title cart-title">
							<span class="date">商品简介：</span>
							<input v-model="newGoodSubTitle1" placeholder="使用场景、功能...">
						</div>
						<div class="gray-sub-title cart-title">
							<span class="date">主图上传：</span>
							<input  @change='add_img($event)' type="file">
						</div>
						<div class="form-group">
      						<label class="control-label">上传图片</label>
							<div class="control-form">
								<p class="help-block">(建议图片格式为：JPEG/BMP/PNG/GIF，大小不超过5M，最多可上传4张)</p>
								<ul class="upload-imgs">
								<li v-if="imgLen>=4 ? false : true">
									<input type="file" class="upload" @change="addImg" ref="inputer" multiple accept="image/png,image/jpeg,image/gif,image/jpg"/>
									<a class="add"><i class="iconfont icon-plus"></i><p>点击上传</p></a>
								</li>
								<li v-for="(value, key) in imgs">
									<p class="img"><img :src="getObjectURL(value)"><a class="close" @click="delImg(key)">×</a></p>
								</li>
								</ul>
							</div>
						</div>
						<div class="gray-sub-title cart-title">
							<span class="date">出售价格：</span>
							<input v-model="newGoodPrice1" placeholder="请输入整数价格 ">.00 ¥
						</div>
						<div class="gray-sub-title cart-title">
							<span class="date">邮费：</span>
							<input v-model="newGoodPostage1" placeholder="请输入整数价格 ">.00 ¥
						</div>
						<div class="gray-sub-title cart-title">
							<span class="date">商品类别：</span>
							<select class="gray-sub-title cart-title" id="goodtype">
								<option value="0">商品类别</option>
								<option value="1">电子数码</option>
								<option value="2">类别2</option>
								<option value="3">类别3</option>
                            </select>
						</div>
						<div class="gray-sub-title cart-title">
							<span class="date">新旧程度：</span>
							<select class="gray-sub-title cart-title" id="goodold" >
								<option value="0">新旧程度</option>
								<option value="1">全新</option>
								<option value="2">9成新</option>
								<option value="3">8成新</option>
                            </select>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { myPost, myGet } from '@/components/api'
	export default {
	  	data () {
    		return {
				newGoodTitle1:'',
				newGoodSubTitle1:'',
				newGoodPrice1:'',
				imgs: [],
				fil:[],
				img: '',
        		imgData: {
            		accept: 'image/gif, image/jpeg, image/png, image/jpg',
				},
				formData:new FormData(),
        		imgs: {},
        		imgLen:0,
    		}
  		},
	  	computed: {
	    	orderData () {
	      		return this.$store.state.orderData
	    	}
		},
		methods:{
			add_img(event){  
				let reader = new FileReader();
				this.img = event.target.files[0];
				console.log(this.img);
            	let img1=event.target.files[0];
            	let type=img1.type;//文件的类型，判断是否是图片
            	let size=img1.size;//文件的大小，判断图片的大小
            	if(this.imgData.accept.indexOf(type) == -1){
                	alert('请选择gif/jpeg/png/jpg的图片格式！');
                	return false;
            	}
            	// if(size>3145728){
                // 	alert('请选择3M以内的图片！');
                // 	return false;
            	// }
			},
			addImg(event){
				let inputDOM = this.$refs.inputer;
				// 通过DOM取文件数据
				this.fil = inputDOM.files;
				let oldLen=this.imgLen;
				let len=this.fil.length+oldLen;
				// console.log(len);
				if(len>4){
					alert('最多可上传4张，您还可以上传'+(4-oldLen)+'张');
					return false;
				}
				for (let i=0; i < this.fil.length; i++) {
					let size = Math.floor(this.fil[i].size / 1024);
					if (size > 10*1024*1024) {
						alert('请选择5M以内的图片！');
						return false
					}
					this.imgLen++;
					this.$set(this.imgs,this.fil[i].name+'?'+new Date().getTime()+i,this.fil[i]);
				}
			},
			getObjectURL(file) {
				var url = null ;
				if (window.createObjectURL!=undefined) { // basic
					url = window.createObjectURL(file) ;
				} else if (window.URL!=undefined) { // mozilla(firefox)
					url = window.URL.createObjectURL(file) ;
				} else if (window.webkitURL!=undefined) { // webkit or chrome
					url = window.webkitURL.createObjectURL(file) ;
				}
				return url ;
			},
			delImg(key){
				this.$delete(this.imgs,key);
				this.imgLen--;
			},
			submit(){
				for(let key in this.imgs){
					let name=key.split('?')[0];
					this.formData.append('multipartFiles',this.imgs[key],name);
				}
				this.$http.post('/opinion/feedback', this.formData,{
					headers: {'Content-Type': 'multipart/form-data'}
					}).then(res => {
					this.alertShow=true;
				});
			},
			uploadGood(){//上传新商品
				console.log('上传新商品');
				let data1 = new FormData();
				let u = localStorage.getItem('userId');
				data1.append('userId',u);
				data1.append('goodtitle',this.newGoodTitle1);
				data1.append('goodsubtitle',this.newGoodSubTitle1);
				data1.append('goodprice',parseInt(this.newGoodPrice1));
				data1.append('goodpostage',parseInt(this.newGoodPostage1));
				data1.append('goodtype',parseInt(document.getElementById('goodtype').value));
				data1.append('goodold',parseInt(document.getElementById('goodold').value));
				data1.append('aliImg1',this.img);//主图file类型
				
				for(let key in this.imgs){
					let name=key.split('?')[0];
					console.log(this.imgs[key]+'---'+name);
					data1.append('aliImg2',this.imgs[key])
				}
				myPost('api/upload/uploadNewGoods',data1).then(res=>{
					if(res.data.result != 0){
						console.log('上传商品成功');
						this.$router.push({name: 'Home'})

					}
				})
			}
		}  
	}
</script>

<style >
.upload-imgs{margin: 10px 0 30px 0;overflow: hidden;font-size: 0;}
.upload-imgs li{position: relative;width: 118px;height: 118px;font-size: 14px;display: inline-block;padding: 10px;margin-right: 25px;border: 2px dashed #ccc;text-align: center;vertical-align: middle;}
.upload-imgs li:hover{border-color: $them-color;}
.upload-imgs .add{display: block;background-color:#ccc;color: #ffffff;height: 94px;padding: 8px 0;}
.upload-imgs .add .iconfont{padding: 10px 0;font-size: 40px;}
.upload-imgs li:hover .add{background-color: $them-color;}
.upload-imgs li .upload{position: absolute;top: 0;bottom: 0;left: 0;right: 0;width: 118px;height: 118px;}
.upload-imgs .img{position: relative;width: 94px;height: 94px;line-height: 94px;}
.upload-imgs .img img{vertical-align: middle;}
.upload-imgs .img .close{display: none;}
.upload-imgs li:hover .img .close{display: block;position: absolute;right: -6px;top: -10px;line-height: 1;font-size: 22px;color: #aaa;}
.account-order .gray-box{
	margin-bottom: 20px;
}
.gray-box .columns-title h2{
	float: left;
}
.gray-btn-menu{
	display: inline-block;
    height: 36px;
    background: #F2F2F2;
    background: linear-gradient(#FFF,#F5F5F5);
    border: 1px solid #DBDDE2;
    border-radius: 4px;
    line-height: 36px;
    cursor: pointer;
    text-align: center;
    user-select: none;
}
.account-order .sort-status-menu{
	width: 112px;
}
.gray-box .title .gray-btn-menu, .gray-box .title span.gray-normal-btn{
	margin: 10px 0 0 10px;
}
.gray-box .title .gray-btn-menu{
	overflow: visible;
    float: right;
}
.gray-btn-menu .label{
	position: relative;
    z-index: 1;
    display: block;
    padding: 0 13px 0 16px;
    text-align: left;
    color: #666;
}
.gray-box .title .gray-btn-menu .label{
	overflow: visible;
    float: none;
    margin-top: 0;
}
.gray-btn-menu .label .arrow{
	float: right;
    width: 10px;
    height: 7px;
    margin: 16px 0 0 6px;
    background: url(../../assets/img/btn-icon-new.png) -15px -571px no-repeat;
}
.gray-btn-menu .menu-list{
	display: none;
    position: absolute;
    right: -1px;
    top: -1px;
    width: 100%;
    padding: 38px 0 6px;
    background: #FFF;
    border: 1px solid #dbdde2;
    border-radius: 4px;
    box-shadow: 0 1px 3px 0 #EEE;
}
.gray-btn-menu-on .menu-list, .white-btn-menu-on .menu-list{
	display: block;
}
.gray-btn-menu .menu-list li{
	height: 24px;
    line-height: 24px;
    padding: 0 3px 3px;
    text-align: left;
    font-size: 12px;
}
.gray-btn-menu .menu-list li a{
	display: block;
    padding: 0 15px;
    border-radius: 3px;
    color: #999;
}
.gray-btn-menu .menu-list li a:hover{
	background: #C7C7CA;
    color: #FFF;
}
.gray-btn-menu .menu-list li.selected a{
	background: #8F9096;
    color: #FFF;
    cursor: default;
}
.account-order .sort-time-menu{
	width: 118px;
}
.gray-btn-menu-on .label .arrow, .white-btn-menu-on .label .arrow{
	margin-top: 15px;
    background-position: -15px -521px;
}
.gray-btn-menu-on, .white-btn-menu-on{
	position: relative;
    z-index: 10;
    height: auto;
    background: #FFF;
}
.gray-btn-menu-on{
	border: 1px solid #DBDDE2;
}
.gray-box, .gray-btn-menu-on:hover{
	background: #FFF;
}
.gray-box .gray-sub-title{
	height: 38px;
    padding: 0 24px;
    background: #EEE;
    border-top: 1px solid #DBDBDB;
    border-bottom: 1px solid #DBDBDB;
    line-height: 38px;
    font-size: 12px;
    color: #666;
}
.account-order .gray-box .box-inner:first-child .gray-sub-title{
	border-top: none;
}
.order-list-cart .cart-title span{
	float: right;
    text-align: center;
}
.order-list-cart .cart-title .operation, .order-list-cart .cart-title .order-detail, .order-list-cart .cart-title .sub-total{
	float: right;
}
.order-list-cart .cart-title .date, .order-list-cart .cart-title .order-id{
	float: left;
    text-align: left;
}
.order-list-cart .cart-title .date{
	width: 108px;
    padding-left: 6px;
}
.order-list-cart .cart-title .order-detail{
	width: 82px;
    padding-left: 24px;
    text-align: center;
}
.order-list-cart .cart-title .sub-total{
	width: 102px;
    padding-right: 18px;
    border-left: 1px solid #DBDBDB;
    text-align: right;
}
.order-list-cart .cart-title .operation{
	width: 95px;
    height: 38px;
    padding-right: 23px;
}
.order-list-cart .cart-title .num{
	width: 70px;
}
.order-list-cart .cart-title .price{
	width: 85px;
    padding-right: 27px;
    text-align: right;
}
.gray-box .gray-sub-title a{
	color: #6989E0;
}
.order-list-cart .cart{
	float: left;
    width: 737px;
    padding: 0;
    border-right: 1px solid #EBEBEB;
}
.order-cart .cart-items{
	position: relative;
    padding: 18px 0 28px;
    border-top: 1px solid #EFEFEF;
}
.order-list-cart .cart-items{
	height: 110px;
    padding: 0;
}
.order-cart .cart-items:first-child{
	border-top: none;
}
.order-cart .prod-info{
	position: relative;
    margin-left: 138px;
}
.order-list-cart .prod-info{
	padding: 15px 0 15px 111px;
    margin-left: 0;
    position: relative;
}
.order-list-cart .items-thumb{
	position: absolute;
	left: 30px;
    top: 15px;
    width: 78px;
    height: 78px;
    border: 1px solid #EBEBEB;
    border-radius: 3px;
}
.order-list-cart .items-thumb img{
    width: 78px;
    height: 78px;
}
.order-list-cart .items-params{
	float: left;
    height: 50px;
    padding: 15px 0;
    margin-left: 29px;
    border-bottom: none;
    line-height: 25px;
}
.order-cart .items-params .name{
	overflow: hidden;
    float: left;
    color: #666;
    width: 435px;
    height: 44px;
    text-align: left;
}
.order-list-cart .prod-info .name{
	float: none;
    width: 220px;
    height: 25px;
    line-height: 25px;
}
.order-list-cart .prod-info .vh-center{
	height: auto;
    line-height: 50px;
}
.hide-row, .order-cart .items-params .name, .support-cart .items-detail .detail{
	text-overflow: ellipsis;
    white-space: nowrap;
}
.order-list-cart .prod-info .num, .order-list-cart .prod-info .operation, .order-list-cart .prod-info .price, .order-list-cart .prod-info .subtotal{
	float: right;
    line-height: 80px;
    text-align: center;
}
.order-list-cart .prod-info .operation{
	display: table;
    width: 95px;
    height: 80px;
    padding-right: 23px;
    line-height: 25px;
}
.order-list-cart .prod-info .num{
	width: 70px;
}
.order-list-cart .prod-info .price{
	width: 85px;
    padding-right: 27px;
    text-align: right;
}
.order-list-cart .prod-operation{
	float: right;
    display: table;
    height: 110px;
}
.order-list-cart .prod-operation .total{
	display: table-cell;
    padding-right: 18px;
    line-height: 14px;
    text-align: right;
    vertical-align: middle;
}
.order-list-cart .prod-operation .status{
	display: table-cell;
    width: 80px;
    padding: 0 24px;
    text-align: center;
    vertical-align: middle;
}
.blue-small-btn, .orange-small-btn, .white-gray-small-btn{
	display: inline-block;
    height: 30px;
    padding: 0 13px;
    border-radius: 4px;
    line-height: 30px;
    font-size: 12px;
    cursor: pointer;
}
.blue-small-btn{
	background: #6383C6;
    background: linear-gradient(#7EA3F5,#5A82F0);
    box-shadow: 0 1px 2px rgba(255,255,255,.1) inset, 0 0 0 1px rgba(0,0,0,.2) inset, 0 1px 3px rgba(0,0,0,.1);
    color: #FFF;
}
.blue-small-btn:hover{
	box-shadow: 0 1px 1px #7696DE inset, 0 0 2px #627DCA inset, 0 -2px 3px #5A77C7 inset, 0 0 100px rgba(48,77,147,.4) inset, 0 0 0 1px rgba(0,0,0,.3) inset, 0 1px 3px rgba(0,0,0,.1);
    color: #FFF;
}
</style>
