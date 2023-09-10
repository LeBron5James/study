/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-04-17 20:37:05
 * @LastEditTime: 2023-04-19 17:00:00
 */

import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api"

const state = {
    cartList: []
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    //获取购物车列表数据
    async getCartList({ commit }) {
        let res = await reqCartList()
        if (res.code == 200) {
            commit("GETCARTLIST", res.data)
        }
    },
    //删除购物车
    async deleteCart({ commit }, skuId) {
        let res = await reqDeleteCartById(skuId)
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error(res.message))
        }
    },
    //修改商品状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let res = await reqUpdateCheckedById(skuId, isChecked)
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error(res.message))
        }
    },
    //删除勾选的商品
    deleteAllCheckedCart({ dispatch, getters }) {
        //获取购物车中的全部商品
        let PromiseAll = []
        let cartInfoList = getters.cartList.cartInfoList
        cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCart', item.skuId) : ""
            //将每一次返回的Promise添加到数组中
            PromiseAll.push(promise)
        });
        //只要全部的promis都成功才返回成功
        return Promise.all(PromiseAll)
    },
    //修改全部商品的状态
    updateAllCartIsChecked({ dispatch, state }, isChecked) {
        let PromiseAll = []
        let cartInfoList = state.cartList[0].cartInfoList
        cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked })
            PromiseAll.push(promise)
        });
        return Promise.all(PromiseAll)
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || []
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}