import Vue from 'vue'
import Vuex from 'Vuex'
import { myPost, myGet } from '@/components/api'

Vue.use(Vuex)

export const store = new Vuex.Store({
  //定义状态
  state: {
    isLogin: false,
    userId: localStorage.getItem('userId'),
    userName: localStorage.getItem('userName'),
    userNumber: localStorage.getItem('userNumber'),
    userEmail: localStorage.getItem('userEmail'),
    userGender: localStorage.getItem('userGender'),
    userCredit: localStorage.getItem('userCredit'),
    userInformation: localStorage.getItem('userInformation'),
    userHeadimg: localStorage.getItem('userHeadimg'),
    
    addressInfo:JSON.parse(localStorage.getItem('addressInfo')),

    carPanelData: [],
    receiveInfo: [{
      'name': '王某某',
      'phone': '13811111111',
      'areaCode': '010',
      'landLine': '64627856',
      'provinceId': 110000,
      'province': '北京市',
      'cityId': 110100,
      'city': '市辖区',
      'countyId': 110106,
      'county': '海淀区',
      'add': '上地十街辉煌国际西6号楼319室',
      'default': 1,
      'checked': 1
    },{
      'name': '李某某',
      'phone': '13811111111',
      'areaCode': '010',
      'landLine': '64627856',
      'provinceId': 110000,
      'province': '北京市',
      'cityId': 110100,
      'city': '市辖区',
      'countyId': 110106,
      'county': '海淀区',
      'add': '上地十街辉煌国际东6号楼350室',
      'default': 0,
      'checked': 0
    }],
    provisionalOrder: [],
    orderData: [],
    maxOff: false,
    carShow: false,
    ball: {
      show: false,
      el: null,
      img: ''
    }
  },

  //获取属性状态
  getters: {
    //获取登录状态
    isLogin: state => state.isLogin,

    userId: (state)=>state.userId,
    userNumber: (state)=> state.userNumber,
    userEmail: (state)=> state.userEmail,
    userGender: (state)=> state.userGender,
    userName: (state)=> state.userName,
    userCredit: (state)=> state.userCredit,
    userInformation: (state)=> state.userInformation,
    userHeadimg: (state)=> state.userHeadimg,

    addressInfo: (state) =>state.addressInfo ,

    totleCount (state) {
      let count = 0
      state.carPanelData.forEach((goods) => {
        count += goods.count;
      })
  	  return count
  	},
  	totlePrice (state) {
  	  let total = 0
  	  state.carPanelData.forEach((goods) => {
  	    total += goods.price * goods.count
  	  })
      return total
    },
    checkedCount (state) {
      let count = 0
      state.carPanelData.forEach((goods) => {
        if(goods.checked)
        count += goods.count;
      })
      return count
    },
    checkedPrice (state) {
      let total = 0
      state.carPanelData.forEach((goods) => {
        if(goods.checked)
        total += goods.price * goods.count
      })
      return total
    },
    checkedCarPanelData (state) {
      let checkedCarPanelData = []
      state.carPanelData.forEach((goods) => {
        if(goods.checked)
        checkedCarPanelData.push(goods);
      })
      return checkedCarPanelData
    },
    allChecked (state) {
      let allChecked = true
      state.carPanelData.forEach((goods) => {
        if(!goods.checked){
          allChecked = false
          return
        }
      })
      return allChecked
    },
    maxCount (state) {
      let maxOff = false
      state.carPanelData.forEach((goods) => {
        if(goods.count>goods.limit_num){
          goods.count--
        }
      })
      return maxOff
    }
  },

  //更改属性状态
  mutations: {
    //保存登录状态
    userState(state, flag){
      state.isLogin = flag
    },
    setUserId:(state,userId) => {
      state.userId=userId
      localStorage.setItem('userId',userId)
    },
    setUserName:(state,userName) => {
      state.userName=userName
      localStorage.setItem('userName',userName)
    },
    setUserNumber:(state,userNumber) => {
      state.userNumber=userNumber
      localStorage.setItem('userNumber',userNumber)
    },
    setUserEmail:(state,userEmail) => {
      state.userEmail=userEmail
      localStorage.setItem('userEmail',userEmail)
    },
    setUserGender:(state,userGender) => {
      state.userGender=userGender
      localStorage.setItem('userGender',userGender)
    },
    setUserInformation:(state,userInformation) => {
      state.userInformation=userInformation
      localStorage.setItem('userInformation',userInformation)
    },
    setUserCredit:(state,userCredit) => {
      state.userCredit=userCredit
      localStorage.setItem('userCredit',userCredit)
    },
    setUserHeadimg:(state,userHeadimg) => {
      state.userHeadimg=userHeadimg
      localStorage.setItem('userHeadimg',userHeadimg)
    },

    setAddressInfo:(state,addressInfo) => {
      state.addressInfo = addressInfo
      localStorage.setItem('addressInfo',JSON.stringify(addressInfo))
    },

  	addCarPanelData (state,data) {
  	  let bOff = true
  	  state.carPanelData.forEach((goods) => {
  	    if(goods.sku_id === data[0].sku_id){
  	      goods.count += data[1]
  	      if(goods.count>goods.limit_num){
  	        goods.count -= data[1]
  	        state.maxOff = true
  	        bOff = false
  	        return
  	      }
          state.ball.el = event.path[0]
          state.ball.show = true
          state.ball.img = data[0].ali_image
  	      bOff = false
  	      state.carShow = true
  	    }
  	  })
  	  if(bOff){
  	    let goodsData = data[0]
  	    Vue.set(goodsData,'count',data[1])
  	    Vue.set(goodsData,'checked',true)
  	    state.carPanelData.push(goodsData)
  	    state.carShow = true
        state.ball.el = event.path[0]
        state.ball.show = true
        state.ball.img = data[0].ali_image
  	  }
  	},
    plusCarPanelData (state,id) {
      state.carPanelData.forEach((goods,index) => {
        if(goods.sku_id === id){
          if(goods.count === goods.limit_num) return
          goods.count ++
          return
        }
      })
    },
  	subCarPanelData (state,id) {
  	  state.carPanelData.forEach((goods,index) => {
        if(goods.sku_id === id){
          if(goods.count === 1) return
          goods.count --
          return
        }
      })
  	},
  	delCarPanelData (state,id) {
  	  state.carPanelData.forEach((goods,index) => {
        if(goods.sku_id === id){
          state.carPanelData.splice(index,1)
          return
        }
      })
  	},
    checkGoods (state,id) {
      state.carPanelData.forEach((goods,index) => {
        if(goods.sku_id === id){
          goods.checked = !goods.checked
        }
      })
    },
    allGoodsCheck (state,checked) {
      if(checked){
        state.carPanelData.forEach((goods,index) => {
          goods.checked = false
        })
      }else{
        state.carPanelData.forEach((goods,index) => {
          goods.checked = true
        })
      }
    },
    delCheckGoods (state) {
      let i = state.carPanelData.length
      while(i--){
        if(state.carPanelData[i].checked){
          state.carPanelData.splice(i,1)
        }
      }
    },
    payNow (state,id) {
      state.orderData.forEach((order,index) => {
        if(order.orderId === id){
          order.isPay = true
          return
        }
      })
    },
    alertPrompt (state) {
      state.maxOff = true
    },
    closePrompt (state) {
      state.maxOff = false
    },
    showCar (state) {
      state.carShow = true
    },
    hideCar (state) {
      state.carShow = false
    },
    checkDefault (state,data) { //更改默认地址
      state.addressInfo.forEach((receive,index) => { //等于是一个循环，检查一下地址数组中的每一条
        let data1 = new FormData();
        console.log(receive+
                  '  '+receive.id+'  '+typeof(receive.id)+
                  '  '+receive.defaultAddress+'  '+typeof(receive.defaultAddress));
        data1.append('adrsid',receive.id);
        // data1.append('defaultA',receive.defaultAddress);
        if (receive==data) {//如果是当前的这个地址，那么把他设置为默认
          data1.append('receiveYes',1); //此标记为，你是被选中将要设为默认的地址
          myPost('api/address/default',data1).then(res=>{//进行后台数据库更改，返回结果
            if(res.data.result!=null){
              let resDefaultAddress = JSON.stringify(1);
              localStorage.setItem(receive.defaultAddress,resDefaultAddress);
              receive.defaultAddress = 1//前端效果更改
              // state.addressInfo.unshift(state.addressInfo.splice(index,1)[0])//让默认地址置顶
            }
          })          
        } else {//如果不是这个地址那就无脑的取消默认标记
          data1.append('receiveYes',0);
          myPost('api/address/default',data1).then(res=>{
            if(res.data.result!=null){
              let resDefaultAddress = JSON.stringify(0);
              localStorage.setItem(receive.defaultAddress,resDefaultAddress);
              receive.defaultAddress = 0//前端效果更改
            }
          })
        }
      })
    },
    
    submitReceive (state,data) {
      if(data[1]==null){//提交的是新地址
        console.log('新地址提交');
        data[0].defaultAddress=data[0].defaultAddress*1;//布尔转为number
        data[0].checked=data[0].checked*1;
        // for(var item in data[0]){
        //   console.log(data[0][item]+'  '+typeof(data[0][item])+'  '+ item);
        // };
        let data1 = new FormData();
        let u = localStorage.getItem('userId');
        data1.append('newAddressReceive',JSON.stringify(data[0]));
        data1.append('userId',u);
        // console.log(formData.get("newAddressReceive")+'  '+formData.get("userId"));
        myPost('api/address/newAddress',data1).then(res=>{
          if(res.data.result != null){
            console.log('新地址插入成功');
            location. reload();//刷新页面
          }
        })
      }else{//提交的不是新地址
        console.log('旧地址更新');
        data[0].defaultAddress=data[0].defaultAddress*1;//布尔转为number
        data[0].checked=data[0].checked*1;
        let data1 = new FormData();
        let u = localStorage.getItem('userId');
        data1.append('oldAddressReceive',JSON.stringify(data[0]));
        data1.append('userId',u);
        data1.append('id',data[0].id)
        myPost('api/address/changeOldAddress',data1).then(res=>{
          if(res.data.result != null){
            console.log('原地址更新成功');
            location. reload();//刷新页面
          }
        })
      }
    }
  },

  // 应用mutations，提交一个mutation
  actions: {
    //获取登录状态
    userLogin({commit}, flag) {
      commit("userStatus", flag)
    },
  }
})

export default store
