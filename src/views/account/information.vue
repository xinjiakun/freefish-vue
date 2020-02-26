<template>
    <div class="account-content">
        <div class="account-information">
            <div class="gray-box clear">
                <div class="title pre-title">
                    <h2 class="fn-left">个人信息</h2>
                    <span class="gray-blue-btn js-add-address"><a class="add" @click="addReceive">确认修改</a></span>
                </div>
                <div class="box-inner clear">
                    <div >    
                        <div class="name fn-left">
                            <div class="name-cell">
                            <input type="text"  class="login_email"  placeholder="邮箱" v-model="userEmail">
                            </div>
                        </div>
                        <div class="detail fn-left">
                            <div class="detail-cell">{{receive.province}} {{receive.city}} {{receive.county}} {{receive.add}}</div>
                        </div>
                        <input type="text"  class="login_email"  placeholder="邮箱" v-model="userEmail">
                        <input type="password"  class="login_pwd"  placeholder="密码" v-model="password">
                        <input type="text"  class="login_email"  placeholder="邮箱" v-model="userEmail">
                        <input type="password"  class="login_pwd"  placeholder="密码" v-model="password">
                    </div>
                </div>
            </div>
        </div>
        <address-pop v-if="popShow" :oldReceive="oldReceive" :receiveIndex="receiveIndex" @close="closePop"></address-pop>
    </div>
</template>

<script>
    import addressPop from '@/components/address-pop'
    export default {
    data () {
      return {
        popShow: false,
        receiveInfo: [],
        oldReceive: null,
        receiveIndex: null
      }
    },
    created () {
      this.$store.state.receiveInfo.forEach((receive,index) => {
        if(receive.default){
          receive.checked = true
          this.$store.state.receiveInfo.unshift(this.$store.state.receiveInfo.splice(index,1)[0])
        }else{
          receive.checked = false
        }
      })
      this.receiveInfo = this.$store.state.receiveInfo
    },
    components: {
      addressPop
    },
    methods: {
      checkDefaultHandle (data) {
        this.$store.commit('checkDefault',data)
      },
      addReceive () {
        this.oldReceive = null
        this.popShow = true
      },
      closePop () {
        this.popShow = false
      },
      editReceive (data,index) {
        this.oldReceive = data
        this.receiveIndex = index
        this.popShow = true
      }
    }
  }
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
