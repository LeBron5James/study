/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-04-02 16:13:01
 * @LastEditTime: 2023-04-14 17:18:49
 */
//search模块的小仓库
import { reqGetSearchInfo } from "@/api";


const state = {
    searchList:{}
};
const actions = {
    async getSearchList({commit},value={}) {
        //调用reqGetSearchInfo，至少穿第一个参数(空对象)
       let res = await reqGetSearchInfo(value)
       if(res.code == 200) {
        commit('SEARCHLIST',res.data)
       }
    }
};
const mutations = {
    SEARCHLIST(state,searchList) {
        state.searchList = searchList
    }
};

//计算属性，在项目中，为简化数据而生
const getters = {
    goodsList(state) {
        return state.searchList.goodsList
    },
    trademarkList(state) {
        return state.searchList.trademarkList
    },
    attrsList(state) {
        return state.searchList.attrsList 
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}