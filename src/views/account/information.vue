<template>
    <div class="account-content">
        <div class="account-information">
            <div class="gray-box clear">
                <div class="title pre-title">
                    <h2 class="fn-left">个人信息</h2>
                    <span class="gray-blue-btn js-add-address"><a class="add" @click="addReceive">确认修改</a></span>
                </div>
                <div class="box-inner clear">
                    <div v-if="receiveInfo.length">
                      <div class="address-list-item default-item" v-for="receive,index in receiveInfo">
                        <div class="name fn-left">
                            <div class="name-cell">{{receive.name}}</div>
                        </div>
                        <div class="detail fn-left">
                            <div class="detail-cell">{{receive.province}} {{receive.city}} {{receive.county}} {{receive.add}}</div>
                        </div>
                        <div class="operation fn-right">
                            <div class="operation-cell">
                                <a class="gray-edit-btn js-edit-address" @click="editReceive(receive,index)">修改</a>
                                <span class="red-del-btn js-del-address"> <a>删除</a><em>删除</em> </span>
                            </div>
                        </div>
                        <div class="default fn-right">
                          <span v-if="receive.default">（默认地址）</span>
                          <a v-else @click="checkDefaultHandle(receive)">设为默认</a>
                        </div>
                        <div class="telephone fn-right">{{receive.phone}}</div>
                      </div>
                    </div>
                    <div class="address-form clear" v-else>
                        <div class="module-form-row">
                            <div class="form-item-v3">
                                <i>收货人姓名</i>
                                <input type="text" class="js-verify">
                                <div class="verify-error"></div>
                            </div>
                        </div>
                        <div class="module-form-row">
                            <div class="form-item-v3">
                                <i>手机号</i>
                                <input type="text" class="js-verify">
                                <div class="verify-error"></div>
                            </div>
                        </div>
                        <div class="module-form-row clear">
                            <div class="form-item-v3 area-code-w fn-left form-valid-item">
                                <i>区号（可选）</i>
                                <input type="text" class="js-verify js-address-area-code">
                                <div class="verify-error"></div>
                            </div>
                            <div class="form-item-v3 telephone-w fn-right form-valid-item">
                                <i>固定电话（可选）</i>
                                <input type="text" class="js-verify js-address-telephone">
                                <div class="verify-error"></div>
                            </div>
                        </div>
                        <div class="module-form-row clear">
                            <div class="form-item-v3 select-item province-wrapper">
                                <select name="province_code" class="province select-province js-form-province js-verify">
                                    <option value="0">请选择省份</option>
                                    <option value="110000">北京市</option>
                                    <option value="440000">广东省</option>
                                    <option value="310000">上海市</option>
                                    <option value="320000">江苏省</option>
                                    <option value="330000">浙江省</option>
                                    <option value="370000">山东省</option>
                                    <option value="410000">河南省</option>
                                    <option value="510000">四川省</option>
                                    <option value="130000">河北省</option>
                                    <option value="420000">湖北省</option>
                                    <option value="340000">安徽省</option>
                                    <option value="350000">福建省</option>
                                </select>
                            </div>
                        </div>
                        <div class="module-form-row clear">
                            <div class="form-item-v3 select-item city-wrapper fn-left form-focus-item">
                                <select class="city select-city js-form-city js-verify">
                                    <option value="0">请选择城市</option>
                                </select>
                            </div>
                            <div class="form-item-v3 select-item district-wrapper fn-right form-focus-item">
                                <select class="city select-city js-form-city js-verify">
                                    <option value="0">请选择区县</option>
                                    <option value="0">请选择区县</option>
                                </select>
                            </div>
                        </div>
                        <div class="module-form-row">
                            <div class="form-item-v3">
                                <i>详细地址，如街道名称，楼层，门牌号码等</i>
                                <input type="text" class="js-verify">
                                <div class="verify-error"></div>
                            </div>
                        </div>
                        <div class="module-form-row fn-clear">
                            <input type="checkbox">
                            <span class="blue-checkbox"></span>设为默认
                        </div>
                        <div class="dialog-blue-btn big-main-btn disabled-btn js-verify-address">
                            <a>保存</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <address-pop v-if="popShow" :oldReceive="oldReceive" :receiveIndex="receiveIndex" @close="closePop"></address-pop>
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
