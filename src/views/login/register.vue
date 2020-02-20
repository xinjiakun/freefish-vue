<template>
  <div class="login v2">
    <div class="wrapper">
      <div class="dialog dialog-shadow" style="display: block; margin-top: -362px;">
        <div class="registered">
          <h4>注册 XMall 账号</h4>
          <div class="content" style="margin-top: 20px;">
            <ul class="common-form">
              <li class="username border-1p">
                <div style="margin-top: 40px;" class="input">
                  <input type="text"
                         v-model="registered.userName" placeholder="账号"
                         @keyup="registered.userName=registered.userName.replace(/[^\w\.\/]/ig,'')">
                </div>
              </li>
              <li>
                <div class="input">
                  <input type="password"
                         v-model="registered.userPwd"
                         placeholder="密码">
                </div>
              </li>
              <li>
                <div class="input">
                  <input type="password"
                         v-model="registered.userPwd2"
                         placeholder="重复密码">
                </div>
              </li>
              <li>
                <div id="captcha">
                  <p id="wait">正在加载验证码...</p>
                </div>
              </li>
            </ul>
            <el-checkbox class="agree" v-model="agreement">
              我已阅读并同意遵守 
              <a @click="open('法律声明','此仅为个人练习开源模仿项目，仅供学习参考，承担不起任何法律问题')">法律声明</a> 和 
              <a @click="open('隐私条款','本网站将不会严格遵守有关法律法规和本隐私政策所载明的内容收集、使用您的信息')">隐私条款</a>
            </el-checkbox>
            <div style="margin-bottom: 30px;">
              <y-button
                :classStyle="registered.userPwd&&registered.userPwd2&&registered.userName&&registxt==='注册'?'main-btn':'disabled-btn'"
                :text="registxt"
                style="margin: 0;width: 100%;height: 48px;font-size: 18px;line-height: 48px"
                @btnClick="regist"
              >
              </y-button>
            </div>
            <div class="border" style="margin-bottom: 10px;"></div>
            <ul class="common-form pr">
              <!-- <li class="pa" style="left: 0;top: 0;margin: 0;color: #d44d44">{{registered.errMsg}}</li> -->
              <li style="text-align: center;line-height: 48px;margin-bottom: 0;font-size: 12px;color: #999;">
                <span>如果您已拥有 XMall 账号，则可在此</span>
                <a href="javascript:;"
                   style="margin: 0 5px"
                   @click="toLogin">登陆</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	export default {}
</script>

<style>
.content{
	clear: both;
    width: 1220px;
    min-height: 600px;
    padding: 0 0 25px;
    margin: 0 auto;
}
.account-wrapper{
	position: relative;
    min-height: 550px;
    margin-top: 10px;
}
.account-sidebar{
	position: absolute;
    left: 0;
    top: 0;
    width: 210px;
}
.gray-box, .gray-btn-menu-on:hover{
	background: #FFF;
}
.gray-box{
	overflow: hidden;
    border: 1px solid #D1D1D1;
    border-color: rgba(0,0,0,.14);
    border-radius: 8px;
    box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
}
.account-sidebar .avatar{
	padding-top: 20px;
    margin: 0 0 20px;
    border-radius: 10px;
    text-align: center;
}
.account-sidebar .avatar img{
	width: 168px;
    height: 168px;
    display: inline-block;
}
.account-sidebar .account-nav{
	padding-top: 15px;
}
.account-sidebar .account-nav li{
	position: relative;
    height: 48px;
    border-top: 1px solid #EBEBEB;
    line-height: 48px;
}
.account-sidebar .account-nav .current{
	border: none;
}
.account-sidebar .account-nav a{
	display: block;
    height: 48px;
    padding: 0 30px;
    color: #666;
    -moz-transition: none;
    -webkit-transition: none;
    transition: none;
}
.account-sidebar .account-nav .current a, .account-sidebar .account-nav a:hover{
	position: relative;
    top: -1px;
    z-index: 1;
    height: 50px;
    background-color: #98AFEE;
    line-height: 50px;
    color: #FFF;
}
.account-content{
	margin-left: 230px;
}
.gray-box .title{
	height: 60px;
    padding: 0 10px 0 28px;
    background: #F5F5F5;
    background: linear-gradient(#FFF,#F5F5F5);
    border-bottom: 1px solid #DCDCDC;
    border-radius: 10px 10px 0 0;
    box-shadow: 0 1px 7px rgba(0,0,0,.06);
    line-height: 60px;
    color: #646464;
}
.gray-box .pre-title{
	position: relative;
    z-index: 2;
}
.gray-box .title h2{
	font-size: 18px;
    font-weight: 400;
    color: #626262;
}
</style>