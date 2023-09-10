/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-04-11 17:50:17
 * @LastEditTime: 2023-04-17 21:16:20
 */
//detail模块的小仓库

//引入
import { reqAddorUpdateShopCart, reqGetItemList } from "@/api";
//封装的游客身份模块
import {getUUID} from '@/utils/uuid_token'

const state = {
    goodInfo: {},
    //游客的临时身份
    uuid_token:getUUID(),
};

const actions = {
    //获取产品的信息
    async getGoodInfo({ commit }, skuid) {
        let res = await reqGetItemList(skuid)
        if (res.code == 200) {
            commit('GETGOODINFO', res.data)
        }
    },
    //将产品添加到购物车中
    async addOrUpdateShopCart({commit},{skuId,skuNum}) {
        let res = await reqAddorUpdateShopCart(skuId,skuNum)
        if(res.code == 200 ){
            return 'ok'
        }else{
            return Promise.reject(new Error(res.message))
        }
    }
};

const mutations = {
    GETGOODINFO(state, data) {
        state.goodInfo = data
    }
};

const getters = {
    //路径导航简化的数据
    categoryView(state) {
        //state.goodInfo的初始状态为空对象，categoryView为undefined
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        //由于接口问题，模拟的数据
        return [{
            baseSaleAttrId: 1,
            id: 1,
            saleAttrName: '颜色',
            spuId: 1,
            spuSaleAttrValueList: [{
                baseSaleAttrId: 1,
                id: 1,
                isChecked: '1',
                saleAttrName: '颜色',
                saleAttrValueName: '陶瓷黑',
                spuId: 1
            },
            {
                baseSaleAttrId: 1,
                id: 2,
                isChecked: '0',
                saleAttrName: '颜色',
                saleAttrValueName: '透明板',
                spuId: 1
            }]
        },
        {
            baseSaleAttrId: 2,
            id: 2,
            saleAttrName: '版本',
            spuId: 2,
            spuSaleAttrValueList: [{
                baseSaleAttrId: 2,
                id: 3,
                isChecked: '0',
                saleAttrName: '版本',
                saleAttrValueName: '8+125',
                spuId: 2
            },
            {
                baseSaleAttrId: 2,
                id: 4,
                isChecked: '1',
                saleAttrName: '版本',
                saleAttrValueName: '16+256',
                spuId: 2
            }]
        }]
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}