<template>
    <div class="account-content">
        <div class="account-address">
            <div class="gray-box clear">
                <div class="title pre-title">
                    <h2 class="fn-left">个人信息</h2>
                    <h4 class="fn-left">信用级:{{$store.getters.userCredit}}</h4>
                    <span class="gray-blue-btn js-edit-address">
                      <a class="add" href="#changepwd">修改密码</a>
                    </span>
                </div>
                <div class="box-inner clear">
                    <div>
                      <div class="address-list-item default-item">
                        <div class="name fn-left">
                            <div class="name-cell">名称 ：{{$store.getters.userName}}<input v-model="userName1" placeholder="edit me"></div>
                        </div>
                        <div class="operation fn-right"><!--清空键-->
                            <div class="operation-cell">
                              <a class="gray-edit-btn js-edit-address" @click="changeInfoName">修改</a>
                            </div>
                        </div>    
                        <div class="telephone fn-right">右边灰色框点击修改</div>  <!--提示信息-->                  
                      </div>                     
                    </div>
                    <div>
                      <div class="address-list-item default-item">
                        <div class="name fn-left">
                            <div class="name-cell">头像 ：<input v-model="userHeadImg1" placeholder="在此粘贴网络图片地址"></div>
                        </div>
                        <div class="operation fn-right"><!--清空键-->
                            <div class="operation-cell">
                              <a class="gray-edit-btn js-edit-address" @click="changeInfoHimg">修改</a>
                            </div>
                        </div>    
                        <div class="telephone fn-right">复制图片地址</div>  <!--提示信息-->                  
                      </div>                     
                    </div>
                    <div>
                      <div class="address-list-item default-item">
                        <div class="name fn-left">
                            <div class="name-cell">手机号 ：{{$store.getters.userNumber}}<input v-model="userNumber1" placeholder="edit me"></div>
                        </div>
                        <div class="operation fn-right"><!--清空键-->
                            <div class="operation-cell">
                              <a class="gray-edit-btn js-edit-address" @click="changeInfoNumber">修改</a>
                            </div>
                        </div>    
                        <div class="telephone fn-right">手机号会帮助密码找回</div>  <!--提示信息-->                  
                      </div>                     
                    </div>
                    <div>
                      <div class="address-list-item default-item">
                        <div class="name fn-left">
                            <div class="name-cell">E-mail ：{{$store.getters.userEmail}}<input v-model="userEmail1" placeholder="edit me"></div>
                        </div>
                        <div class="operation fn-right"><!--清空键-->
                            <div class="operation-cell">
                              <a class="gray-edit-btn js-edit-address" @click="changeInfoEmail">修改</a>
                            </div>
                        </div>    
                        <div class="telephone fn-right">请输入正确邮箱格式</div>  <!--提示信息-->                  
                      </div>                     
                    </div>
                    <div>
                      <div class="address-list-item default-item">
                        <div class="name fn-left">
                            <div class="name-cell">个人信息 ：{{$store.getters.userInformation}}<input v-model="userInformation1" placeholder="edit me"></div>
                        </div>
                        <div class="operation fn-right"><!--清空键-->
                            <div class="operation-cell">
                              <a class="gray-edit-btn js-edit-address" @click="changeInformation">修改</a>
                            </div>
                        </div>    
                        <div class="telephone fn-right">编辑你的个性签名</div>  <!--提示信息-->                  
                      </div>                     
                    </div>
                    <div>
                      <div class="address-list-item default-item">
                        <div class="name fn-left">  
                          <div class="name-cell">性别：
                            <label v-if="$store.getters.userGender==1">男</label>
                            <label v-if="$store.getters.userGender==0">女</label>
                            <select class="fn-right" id="userGender1">
                              <option value=""></option>
                              <option value="1">男</option>
                              <option value="0">女</option>
                            </select>
                          </div>
                        </div>
                        <div class="operation fn-right"><!--清空键-->
                            <div class="operation-cell">
                              <a class="gray-edit-btn js-edit-address" @click="changeInfoGender">修改</a>
                            </div>
                        </div>    
                        <div class="telephone fn-right">性别信息</div>  <!--提示信息-->                  
                      </div>                     
                    </div>
                    <div>
                      <div class="address-list-item default-item">
                        <div class="name fn-left">  
                          <div class="name-cell" id="changepwd">密码修改
                            <input type="password"  class="login_pwd1" @blur.prevent="pwdStandard()" placeholder="新密码" v-model="pwd">
                            <input type="password"  class="login_pwd2" @blur.prevent="changeCount()" placeholder="新密码确认" v-model="ensureUserPwd">
                          </div>
                        </div>
                        <div class="operation fn-right"><!--清空键-->
                            <div class="operation-cell">
                              <a class="gray-edit-btn js-edit-address" @click="changeInfoPwd">修改</a>
                            </div>
                        </div>    
                        <div class="telephone fn-right">新密码修改需要重新登录</div>  <!--提示信息-->                  
                      </div>                     
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import addressPop from '@/components/address-pop'
import { myPost, myGet } from '@/components/api'
  export default {
    data () {
      return {
        email: '',
        name: '',
        pwd: '',
        ensureUserPwd: '',
        gender: '0',
      }
    },   
    components: {
      
    },
    methods: {
      changeInfoName(){
        let n = localStorage.getItem('userName');
        if (!this.userName1 || this.userName1===n) {         
          console.log('点击名称修改执行，但新名称为空或与原名相同--无响应');
        }else{
          let data1 = new FormData();
          let u = localStorage.getItem('userId');
          let u1 = parseInt(u);
          // console.log(u+', '+typeof(u)  +typeof(u1)     +', '+        this.userName1+','+typeof(this.userName1));
          data1.append('id',u1);
          data1.append('userName',this.userName1);
          console.log(data1);
          myPost('api/information/name',data1).then(res=>{
            if(res.data.result != null){
              console.log("新名字：" + res.data.result);
              this.$store.commit("setUserName",res.data.result);//更新vuex userName
              this.$router.go(0);//刷新页面
            }
          })
        }
      },
      changeInfoHimg(){
        let data1 = new FormData();
        let u = localStorage.getItem('userId');
        let u1 = parseInt(u);
        data1.append('id',u1);
        data1.append('userHeadImg',this.userHeadImg1);
        console.log(data1);
        myPost('api/information/userHeadImg',data1).then(res=>{
          if(res.data.result != null){
            console.log("新头像：" + res.data.result);
            this.$store.commit("setUserHeadimg",res.data.result);//更新vuex userName
            this.$router.go(0);//刷新页面
          }
        })
      },
      changeInformation(){
        let n = localStorage.getItem('userInformation');
        if (!this.userInformation1 || this.userInformation1===n) {         
          console.log('点击个人签名修改执行，但新XX为空或与原XX相同--无响应');
        }else{
          let data1 = new FormData();
          let u = localStorage.getItem('userId');
          let u1 = parseInt(u);
          data1.append('id',u1);
          data1.append('userInformation',this.userInformation1);
          console.log(data1);
          myPost('api/information/information',data1).then(res=>{
            if(res.data.result != null){
              console.log("新个人签名：" + res.data.result);
              this.$store.commit("setUserInformation",res.data.result);//更新vuex 
              this.$router.go(0);//刷新页面
            }
          })
        }
      },
      changeInfoEmail(){
        
          let data1 = new FormData();
          let u = localStorage.getItem('userId');
          let u1 = parseInt(u);
          data1.append('id',u1);
          data1.append('userInformation',this.userInformation1);
          console.log(data1);
          myPost('api/information/email',data1).then(res=>{
            if(res.data.result != null){
              // console.log("新个人签名：" + res.data.result);
              // this.$store.commit("setUserInformation",res.data.result);//更新vuex 
              // this.$router.go(0);//刷新页面
            }
          })
        
      },
      changeInfoGender(){
        let n = localStorage.getItem('userGender');
        if (document.getElementById('userGender1').value===n) {         
          console.log('点击个人性别修改执行，但新性别为空或与原性别相同--无响应');
        }else{
          let data1 = new FormData();
          let u = localStorage.getItem('userId');
          let u1 = parseInt(u);
          data1.append('id',u1);
          data1.append('userGender',parseInt(document.getElementById('userGender1').value));
          console.log(data1);
          myPost('api/information/gender',data1).then(res=>{
            if(res.data.result != 0){
              console.log("新性别：" + res.data.result);
              this.$store.commit("setUserGender",res.data.result);//更新vuex 
              this.$router.go(0);//刷新页面
            }
          })
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
      changeInfoPwd(){
        if(!this.email && this.pwd.length <= 6 && this.pwd != this.ensureUserPwd){
          this.$message.error('请检查邮箱格式，保证密码一致');
        }else{
          let data1 = new FormData();
          let u = localStorage.getItem('userId');
          let u1 = parseInt(u);
          data1.append('id',u1);
          data1.append('pwd',this.pwd);
          myPost('api/information/changepwd',data1).then(res=>{
            if(res.data.result != 0){//密码修改成功-需要重新登录
              alert("密码修改成功，请重新登录");
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
            }else{//密码修改失败
              this.$message.error('密码修改失败');
            }
          })
        }
      }
    }
  }
</script>

<style>
.blue-btn, .gray-blue-btn, .gray-btn, .gray-icon-btn, .light-blue-btn, .light-gray-btn{
    display: inline-block;
    height: 38px;
    padding: 0 20px;
    border-radius: 8px;
    line-height: 38px;
    font-size: 14px;
    cursor: pointer;
}
.gray-blue-btn{
    padding: 0;
    background: #A2A2A2;
}
.gray-box .title span{
    overflow: hidden;
    float: right;
    margin-top: 11px;
}
.blue-btn a, .gray-blue-btn a, .gray-btn a, .gray-icon-btn a, .light-blue-btn a, .light-gray-btn a{
    display: block;
}
.gray-blue-btn a{
    height: 38px;
    line-height: 38px;
    color: #FFF;
}
.gray-blue-btn a.add{
    padding: 0 13px 0 38px;
    background: url(../../assets/img/btn-icon-new.png) 0 -6px no-repeat;
    transition: none;
}
.gray-blue-btn:hover{
    background: #7595e4;
    box-shadow: none;
}
.address-form{
    width: 370px;
    margin: 0 auto;
}
.account-address .address-form{
    padding: 30px;
    margin: 0;
}
.module-form-row{
    position: relative;
    padding-bottom: 10px;
    margin: 0 auto;
}
.address-form .module-form-row{
    padding-bottom: 15px;
}
.module-form-row .form-item-v3{
    position: relative;
    height: 46px;
    background: #FFF;
    border: 1px solid #CCC;
    border-radius: 6px;
    box-shadow: 0 3px 5px -4px rgba(0,0,0,.4) inset, -1px 0 3px -2px rgba(0,0,0,.1) inset;
    line-height: 46px;
    font-size: 18px;
    opacity: .618;
    transition: opacity .3s ease;
}
.module-form-row .form-item-v3 i{
    position: absolute;
    left: 15px;
    top: 0;
    font-size: 16px;
    color: #BEBEBE;
}
.module-form-row .form-item-v3 input{
    padding: 0 15px;
    background-color: transparent;
    border: none;
    font-size: 16px;
}
.address-form .form-item-v3 input{
    width: 330px;
}
.address-form .area-code-w{
    width: 118px;
}
.address-form .telephone-w{
    width: 238px;
}
.module-form-row div.select-item{
    width: auto;
    height: auto;
    margin: 0;
    background: 0 0;
    border: none;
    box-shadow: none;
    opacity: 1;
}
.module-form-row .form-item-v3 select{
    margin: 0 0 0 15px;
    background-color: transparent;
    border: none;
    font-size: 16px;
    color: #333;
}
.address-form .select-province{
    width: 370px;
}
.form-focus-item{
    z-index: 1;
    opacity: 1;
    border: 1px solid #6B93F2;
}
.module-form-row div.select-item{
    width: auto;
    height: auto;
    margin: 0;
    background: 0 0;
    border: none;
    box-shadow: none;
    opacity: 1;
}
.module-form-row .form-item-v3 select{
    height: 48px;
    padding: 0 15px;
    margin: 0;
    background: -webkit-linear-gradient(top,#FAFAFA,#F5F5F5);
    background: linear-gradient(#FAFAFA,#F5F5F5);
    border: 1px solid #CCC;
    border-radius: 6px;
    box-shadow: 2px 0 0 rgba(255,255,255,.4) inset, 1px 0 0 rgba(255,255,255,.3);
    line-height: 48px;
    text-indent: 0;
    outline: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    cursor: pointer;
}
.address-form .select-city, .address-form .select-district{
    width: 180px;
}
.blue-checkbox, .blue-checkbox-disable, .blue-checkbox-on{
    display: inline-block;
    position: relative;
    width: 20px;
    height: 20px;
    background: url(../../assets/img/checkbox-bg.png) no-repeat;
    cursor: pointer;
}
.address-form .blue-checkbox{
    top: 0;
    float: left;
    margin-right: 5px;
}
.dialog-blue-btn{
    padding: 1px;
    background: #6383C6;
    background: linear-gradient(#6383C6,#4262AF);
    border-radius: 6px;
    text-align: center;
    color: #FFF;
}
.disabled-btn{
    opacity: .4;
}
.disabled-btn, .disabled-btn a{
    cursor: not-allowed;
    -webkit-transition: none;
    transition: none;
    pointer-events: none;
}
.dialog-blue-btn a{
    display: block;
    padding: 2px 0;
    background: #5F7ED7;
    background: linear-gradient(#6F97E5,#527ED9);
    border-radius: 5px;
    box-shadow: inset 0 1px 2px #7EA1E8;
    text-shadow: 0 -1px 0 #4F70B3;
    color: #FFF;
}
.big-main-btn a{
    height: 42px;
    line-height: 42px;
    font-size: 18px;
}
.account-address .address-list-item{
  height: 75px;
  padding: 20px 0;
  border-bottom: 1px solid #CFCFCF;
  line-height: 24px;
}
.account-address .address-list-item:last-child{
  border-bottom: none;
  border-radius: 0 0 7px 7px;
}
.account-address .address-list-item .name{
  display: table;
  width: 106px;
  height: 100%;
  padding: 0 20px 0 24px;
}
.account-address .address-list-item .name-cell{
  display: table-cell;
  vertical-align: middle;
}
.account-address .address-list-item .detail{
  display: table;
  width: 440px;
  height: 100%;
  text-align: left;
}
.account-address .address-list-item .detail-cell{
  display: table-cell;
  vertical-align: middle;
}
.account-address .address-list-item .operation{
  display: -webkit-box;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  width: 135px;
  padding: 24px 0;
}
.account-address .address-list-item .operation-cell{
  display: flex;
  text-align: center;
}
.gray-edit-btn, .red-del-btn{
  width: 26px;
  height: 26px;
  border-radius: 5px;
  overflow: hidden;
}
.gray-edit-btn, .red-del-btn:hover a {
  opacity: 1;
}
.gray-edit-btn{
  display: inline-block;
  background: url(../../assets/img/btn-icon-new.png) -9px -112px no-repeat #A2A2A2;
  text-indent: -9999em;
}
.account-address .address-list-item .operation .gray-edit-btn{
  margin-right: 6px;
}
.gray-edit-btn, .red-del-btn{
  width: 26px;
  height: 26px;
  border-radius: 5px;
  overflow: hidden;
}
.red-del-btn{
  position: relative;
  display: inline-block;
  background: #d84747;
  background: linear-gradient(#f97474,#e05b5b);
  line-height: 26px;
  opacity: .62;
  cursor: pointer;
  transition: none;
}
.red-del-btn a{
  display: block;
  width: 26px;
  height: 26px;
  background: url(../../assets/img/btn-icon-new.png) -9px -262px no-repeat;
  text-indent: -9999em;
  color: #FFF;
  transition: none;
}
.red-del-btn em{
  position: absolute;
  left: 0;
  top: 0;
  display: none;
  height: 26px;
  text-indent: 0;
  font-size: 12px;
  color: #FFF;
}
.account-address .address-list-item .default{
  width: 80px;
  line-height: 75px;
  text-align: center;
  font-size: 12px;
}
.account-address .address-list-item .default a{
  color: #5079d9;
  visibility: hidden;
}
.account-address .address-list-item:hover .default a{
  visibility: visible;
}
.account-address .address-list-item .telephone{
  width: 160px;
  height: 100%;
  line-height: 75px;
  text-align: center;
}
</style>