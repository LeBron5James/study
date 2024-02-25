/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-11-18 21:07:19
 * @LastEditTime: 2023-11-19 16:04:36
 */
//品牌管理模块接口
import request from "@/utils/request";

import type { TradeMarkResponseData, TradeMark } from './type'

// 品牌管理模块接口地址
enum API {
    // 获取品牌
    TRADEMARK_URL = "/admin/product/baseTrademark/",
    // 添加品牌
    ADDTRADEMARK_URL = "/admin/product/baseTrademark/save",
    // 修改品牌
    UPDATETRADEMARK_URL = "/admin/product/baseTrademark/update",
    // 删除品牌
    DELETETRADEMARK_URL = "/admin/product/baseTrademark/remove/"
}

/**
 * 获取已有品牌的接口方法
 * @param page 表示第几页
 * @param limit 获取几个已有品牌数据
 */
export const reqHasTrademark = (page: number, limit: number) => {
    return request.get<any, TradeMarkResponseData>(API.TRADEMARK_URL + `${page}/${limit}`)
}

/**
 * 添加与修改已有品牌的接口方法
 * @param data 
 * @returns 
 */
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
    if (data.id) {
        // 修改
        return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
    } else {
        // 添加
        return request.post<any, any>(API.ADDTRADEMARK_URL, data)
    }
}

/**
 * 删除已有品牌接口
 * @param id 
 * @returns 
 */
export const reqDeleteTrademark = (id: number) => {
    return request.delete<any, any>(API.DELETETRADEMARK_URL + id)
}