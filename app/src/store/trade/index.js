/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-04-20 15:44:45
 * @LastEditTime: 2023-04-20 16:02:46
 */
import {reqAddressInfo,reqOrderInfo} from "@/api"

const state = {
    addressInfo:[],
    orderInfo:{}
}
const mutations = {
    GETUSERADDRESS(state,address) {
        state.addressInfo = address
    },
    GETORDERINFO(state,orderInfo) {
        state.orderInfo = orderInfo
    }
}
const actions = {
    //获取用户地址信息
    async getUserAddress({commit}) {
        const res = await reqAddressInfo()
        if(res.code == 200) {
            commit('GETUSERADDRESS',res.data)
        }
    },
    //获取商品清单
    async getOrderInfo({commit}) {
        const res = await reqOrderInfo()
        if(res.code == 200) {
            commit("GETORDERINFO",res.data)
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}