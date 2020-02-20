<template>
	<div id="login">
    <div class="wrapper">
      <div class="dialog dialog-shadow" style="display: block; margin-top: -362px;">
        <div class="title">
          <h4>使用 XMall 账号 登录官网</h4>
        </div>
        <div v-if="loginPage" class="content">
          <ul class="common-form">
            <li class="username border-1p">
              <div class="input">
                <input type="text" v-model="ruleForm.userName" placeholder="账号">
              </div>
            </li>
            <li>
              <div class="input">
                <input type="password" v-model="ruleForm.userPwd" @keyup.enter="login" placeholder="密码">
              </div>
            </li>
            <li>
              <div id="captcha">
                <p id="wait">正在加载验证码...</p>
              </div>
            </li>
            <li style="text-align: right" class="pr">
              <el-checkbox class="auto-login" v-model="autoLogin">记住密码</el-checkbox>
              <!-- <span class="pa" style="top: 0;left: 0;color: #d44d44">{{ruleForm.errMsg}}</span> -->
              <a href="javascript:;" class="register" @click="toRegister">注册 XMall 账号</a>
              <a style="padding: 1px 0 0 10px" @click="open('找回密码','请联系作者邮箱找回密码或使用测试账号登录：test | test')">忘记密码 ?</a>
            </li>
          </ul>
          <!--登陆-->
          <div style="margin-top: 25px">
            <y-button :text="logintxt"
                      :classStyle="ruleForm.userPwd&& ruleForm.userName&& logintxt === '登录'?'main-btn':'disabled-btn'"
                      @btnClick="login"
                      style="margin: 0;width: 100%;height: 48px;font-size: 18px;line-height: 48px"></y-button>
          </div>
          <!--返回-->
          <div>
            <y-button text="返回" @btnClick="login_back"
              style="marginTop: 10px;marginBottom: 15px;width: 100%;height: 48px;font-size: 18px;line-height: 48px">
            </y-button>
          </div>
          <div class="border"></div>
          <div class="footer">
            <div class="other">其它账号登录：</div>
            <a><img @click="open('待开发','此功能开发中...')" style="height: 15px; margin-top: 22px;" src="/static/images/other-login.png"></a>
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

</style>
