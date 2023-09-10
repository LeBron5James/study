/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-04-02 16:13:01
 * @LastEditTime: 2023-04-07 22:08:33
 */
//home模块的小仓库

//引入
import {reqCategoryList, reqGetBannerList,reqGetFloorList} from '@/api'


//state:仓库存储数据的地方
const state = {
    //state中数据默认值要和服务器返回数据库类型一致
    categoryList:[],
    bannerList:[],
    floorList:[]
};
//actions：可以写自己的业务逻辑(不可以修改state)，可以处理异步
const actions = {
    //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({commit}) {
        let res = await reqCategoryList()
        if(res.code == 200) {
            commit('CATEGORYLIST',res.data)
        }
    },
    //获取首页轮播图的数据
    async getBannerList({commit}) {
        let res = await reqGetBannerList()
        //console.log(res)
        if(res.code == 200) {
            commit('BANNERLIST',res.data)
        }
    },
    //获取floor数据
    async getFloorList({commit}) {
        let res = await reqGetFloorList()
        if(res.code == 200) {
            commit('FLOORLISTT',res.data)
        }
    }
};
//mutations:修改state的唯一手段
const mutations = {
    CATEGORYLIST(state,categoryList) {
        state.categoryList = categoryList
    },
    BANNERLIST(state,bannerList) {
        state.bannerList = bannerList
    },
    FLOORLISTT(state,floorList) {
        state.floorList = floorList
    }
};
//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
const getters = {};

export default {
    state,
    actions,
    mutations,
    getters
}