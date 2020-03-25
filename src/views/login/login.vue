<template>
	<div id="login">
    <div class="dialog dialog-shadow" style="display: block; margin-top: -150px;">
      <div class="title">
          <h4>使用 XMall 账号 登录商城</h4>
      </div>
      <div class="login_form">
        <input type="text" class="login_email"  placeholder="邮箱" v-model="userEmail">
        <input type="password" class="login_pwd"  placeholder="密码" v-model="userPwd">
        <el-button class="login_btn" @click.native="login" type="primary" round :loading="isBtnLoading">
          登录
        </el-button>
        <div style="margin-top: 10px">
          <router-link to="/register" style="float: right; color: #A9A9AB">新用户注册</router-link>
          <!-- <router-link to="/" style="color: #A9A9AB">忘记密码？</router-link>未实现 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { myPost, myGet } from '@/components/api'
	export default {
    data() {
      return {
        userEmail: '',
        userPwd: '',
        isBtnLoading: false
      }
    },
    methods:{
      login() {
        //Email正则
        var ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (ePattern.test(this.userEmail) == false) {         
          console.log('开始邮箱格式判断');
          this.$message.error('请输入正确邮箱');
          return -1;
        }
        if (!this.userPwd) {
          this.$message.error('请输入正确密码');
          return -1;
        }
        let data1 = new FormData();
        data1.append('userEmail',this.userEmail);
        data1.append('userPwd',this.userPwd);
        // console.log(data1);
        myPost('api/login',data1).then(res=>{
          if(res.data.result != null){
            
            this.$store.commit("setUserName",res.data.result.name);
            this.$store.commit("setUserNumber",res.data.result.number);
            this.$store.commit("setUserEmail",res.data.result.email);
            this.$store.commit("setUserGender",res.data.result.gender);
            this.$store.commit("setUserInformation",res.data.result.information);
            this.$store.commit("setUserCredit",res.data.result.credit);
            this.$store.commit("setUserHeadimg",res.data.result.headimg);
            this.$store.commit("setUserId",res.data.result.id);

            //设置Vuex登录标志为true，登录页面默认 userLogin为false，即不登录可访问
            this.$store.dispatch("userLogin", true);
            //Vuex在用户刷新的时候userLogin会回到默认值false，所以我们需要用到HTML5储存
            //localStorage是一种比cookie大的存贮空间,大约5m 用于长久保存整个网站的数据，保存的数据没有过期时间，直到手动去删除,属性是只读的
            //我们设置一个名为Flag，值为isLogin的字段，作用是如果Flag有值且为isLogin的时候，证明用户已经登录了。
            localStorage.setItem("Flag", "isLogin");

            console.log('此用户ID：'+ res.data.result.id);
            alert("登录成功，欢迎您");
            // this.$message.error('登录成功');//会有模板的UI效果，但是前面是红×
            //登录成功后跳转到指定页面
            this.$router.push("/");        
          } else{
            alert("登录失败，请重试");
          }
        })
      },
    },
    computed:{
      btnText() {
        if (this.isBtnLoading) return '登录中...';
        return '登录';
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
* {
  box-sizing: content-box;
}

.login {
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


#wait {
  text-align: left;
  color: #999;
  margin: 0;
}
</style>

