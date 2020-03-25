<template>
	<div id="register">
    <div class="dialog dialog-shadow" style="display: block; margin-top: -150px;">
      <div class="title">
          <h4>新用户注册</h4>
      </div>
      <div class="register_form">
        <input type="text"  class="login_email" @blur.prevent="emailStandard()" placeholder="邮箱" v-model="email">
        <input type="text"  class="login_name"  placeholder="用户名" v-model="name">
        <input type="password"  class="login_pwd1" @blur.prevent="pwdStandard()" placeholder="密码" v-model="pwd">
        <input type="password"  class="login_pwd2" @blur.prevent="changeCount()" placeholder="密码确认" v-model="ensureUserPwd">
        <el-button class="login_btn" @click.native="register" type="primary" round :loading="isBtnLoading">
          注册
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { myPost, myGet } from '@/components/api'
	export default {
    data() {
      return {
        email: '',
        name: '',
        pwd: '',
        ensureUserPwd: '',
        isBtnLoading: false
      }
    },
    computed: {
      btnText() {
        if (this.isBtnLoading) return '注册中...';
        return '注册';
      }
    },
    methods: {
      emailStandard(){
        //Email正则
        var ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (ePattern.test(this.userEmail) == false) {         
          console.log('开始邮箱格式判断');
          this.$message.error('请输入正确邮箱');
          return -1;
        }else{
          
        }
      },
      pwdStandard(){
        if (this.pwd.length < 6) {
          this.$message.error('密码必须大于6个字符');
          return -1;
        }else{
          return 0;
        }
      },
      changeCount:function(){
        if(this.pwd != this.ensureUserPwd){
          this.$message.error('前后密码必须一致');
          return -1;
        }else{
          return 0;
        }
      },
      register(next) {
        if(!this.email && this.pwd.length <= 6 && this.pwd != this.ensureUserPwd){
          this.$message.error('请检查邮箱格式，保证密码一致');
        }else{
          let data1 = new FormData();
          data1.append('email',this.email);
          data1.append('name',this.name);
          data1.append('credit',parseInt(100));
          data1.append('pwd',this.pwd);
          myPost('api/register',data1).then(res=>{
            if(res.data.result != 0){
              //注册成功即登录
              this.$store.dispatch("userLogin", true);
              
              //设置登录成功标志
              localStorage.setItem("Flag","isLogin");
              this.$store.commit("setUserName",res.data.result.name);  
              this.$store.commit("setUserEmail",res.data.result.email);
              this.$store.commit('setUserId',res.data.result.id);
              this.$store.commit('setUserCredit',parseInt(100));
              console.log('此用户id:'+ res.data.result.id);
              alert("欢迎注册，现在您可以尽情使用了");
              
              //跳转到个人中心
              this.$router.push("/information");
            }else{
              this.$message.error('注册失败，请重试');
            }
          })
        }
 
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
* {
  box-sizing: content-box;
}

.register {
  overflow-x: hidden;
  overflow-y: hidden;
  .input {
    height: 50px;
    display: flex;
    align-items: center;
    input {
      font-size: 16px;
      width: 100%;
      height: 100%;
      padding: 10px 15px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 6px;
    }
  }
}

.dialog-shadow,
.v2 .bbs .dialog-shadow,
.v2 .dialog-shadow {
  -webkit-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
  -moz-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
  box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
}

@media screen and (min-width: 737px),
  screen and (-webkit-max-device-pixel-ratio: 1.9) and (max-width: 736px) and (min-device-width: 737px) { 
  .dialog {
    background: url(/static/images/dialog-gray-bg.png) #fff bottom repeat-x;
    border-radius: 12px;
    display: none;
    margin: -163px 0 0 -218px;
    width: 436px;
    position: fixed;
    left: 50%;
    top: 50%;
  }
  .dialog .title h4 {
    border-bottom: #d1d1d1 solid 1px;
    box-shadow: 0 2px 6px #d1d1d1;
    color: #666;
    font-size: 20px;
    height: 61px;
    line-height: 61px;
    padding: 0 0 0 35px;
  }
  .dialog .login_form {
    border-bottom: #d1d1d1 solid 1px;
    box-shadow: 0 2px 6px #d1d1d1;
    color: #666;
    font-size: 20px;
    height: 61px;
    line-height: 61px;
    padding: 0 0 0 35px;
  }
}

.registered {
  h4 {
    padding: 0;
    text-align: center;
    color: #666;
    border-bottom: 1px solid #dcdcdc;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    font-weight: 700;
    font-size: 20px;
    height: 60px;
    line-height: 60px;
  }
}

#wait {
  text-align: left;
  color: #999;
  margin: 0;
}
</style>

