/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-04-02 10:26:07
 * @LastEditTime: 2023-04-22 17:09:34
 */
//当前模块：API统一管理

import req from './request';
import mockReq from './mockAjax'

//三级联动接口
//  /api/product/getBaseCategoryList  --get --无参数
export const reqCategoryList = () => {
    //发送请求  : axios发请求返回结果是Promise对象
    return req({ url: '/product/getBaseCategoryList', method: 'get' })
}

//获取banner(首页轮播图)
export const reqGetBannerList = () => {
    return mockReq({ url: '/banner', method: 'get' })
}

//获取floor数据
export const reqGetFloorList = () => {
    return mockReq({ url: '/floor', method: 'get' })
}

//获取搜索模块数据 地址：api/list  --post  需要参数
//当前这个接口，给服务器传递参数params，至少是一个空对象
export const reqGetSearchInfo = (params) => {
    return req({ url: '/list', method: 'post', data: params })
}

//获取商品详情数据 地址：api/item/{skuid}  --get 需要参数
export const reqGetItemList = (skuid) => {
    return req({ url: `/item/${skuid}`, method: 'get' })
}

//将商品添加到购物车中(获取更新某一个产品的个数)
export const reqAddorUpdateShopCart = (skuId,skuNum) => {
    return req({url:`/cart/addToCart/${skuId}/${skuNum}`,method:"POST"})
}

//获取购物车列表
export const reqCartList = () => {
    return req({url:'/cart/cartList',method:'GET'})
}

//删除购物车
export const reqDeleteCartById = (skuId) => {
    return req({url:`/cart/deleteCart/${skuId}`,method:'DELETE'})
}

//切换商品状态
export const reqUpdateCheckedById = (skuId,isChecked) => {
    return req({url:`/cart/checkCart/${skuId}/${isChecked}`,method:"GET"})
}

//获取验证码
export const reqGetCode = (phone) => {
    return req({
        url: `/user/passport/sendCode/${phone}`,
        method: 'get'
    })
}

//用户注册
export const regist = (data) => {
    return req({
        url: '/user/passport/register',
        method: 'POST',
        data
    })
}

//用户登录
export const login = (data) => {
    return req({
        url: '/user/passport/login',
        method: 'POST',
        data
    })
}

//获取用户信息[需要带着token]
export const userInfo = () => {
    return req({
        url: '/user/passport/auth/getUserInfo',
        method: 'get',
    })
}

//用户退出登录
export const userLogout = () => {
    return req({
        url: '/user/passport/logout',
        method: 'get',
    })
}

//获取用户地址信息
export const reqAddressInfo = () => {
    return req({url:'/user/userAddress/auth/findUserAddressList',method:"get"})
}

//获取商品清单
export const reqOrderInfo = () => {
    return req({url:'/order/auth/trade',method:"GET"})
}

//提交订单-------------不适用vuex
export const reqSubmitOrder = (tradeNo,data) => {
    return req({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:"POST",data})
}

//获取订单支付信息
export const reqPayInfo = (orderId) => {
    return req({url:`/payment/weixin/createNative/${orderId}`,method:"GET"})
}

//获取订单状态
export const reqPayStatus = (orderId) => {
    return req({url:`/payment/weixin/queryPayStatus/${orderId}`,method:"GET"})
}

//获取我的订单
export const reqGetMyOrder = (page,limit) => {
    return req({url:`/order/auth/${page}/${limit}`,method:'get'})
}