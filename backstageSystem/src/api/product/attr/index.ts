/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-11-20 15:49:54
 * @LastEditTime: 2023-11-22 16:06:07
 */
// 属性相关的API文件
import request from "@/utils/request";
import type {CategoryResponseData,AttrResponseData,Attr} from './type'

enum API {
    // 一级分类
    C1_URL = "/admin/product/getCategory1",
    // 二级分类
    C2_URL = "/admin/product/getCategory2/",
    // 三级分类
    C3_URL = "/admin/product/getCategory3/",
    // 获取选中分类的属性与属性值
    ATTR_URL="/admin/product/attrInfoList/",
    // 添加或修改已有属性
    ADDORUPDATE_URL='/admin/product/saveAttrInfo',
    // 删除属性
    DELETEATTR_URL='/admin/product/deleteAttr/',
}

/**
 * 一级分类请求接口
 */
export const reqC1 = () => {
    return request.get<any, CategoryResponseData>(API.C1_URL)
}

/**
 * 二级分类请求接口
 * @param category1Id 
 * @returns 
 */
export const reqC2 = (category1Id: number | string) => {
    return request.get<any, CategoryResponseData>(API.C2_URL + category1Id)
}


/**
 * 三级分类请求接口
 * @param category2Id 
 * @returns 
 */
export const reqC3 = (category2Id: number|string) => {
    return request.get<any, CategoryResponseData>(API.C3_URL + category2Id)
}

/**
 * 获取选中分类的属性与属性值
 * @param category1Id 
 * @param category2Id 
 * @param category3Id 
 * @returns 
 */
export const reqAttr = (category1Id: number | string,category2Id: number | string,category3Id: number | string) => {
    return request.get<any, AttrResponseData>(API.ATTR_URL+`${category1Id}/${category2Id}/${category3Id}`);
}

/**
 * 新增或者修改已有的属性接口
 * @param data 
 * @returns 
 */
export const reqAddOrUpdateAttr = (data: Attr) => {
    return request.post<any, any>(API.ADDORUPDATE_URL,data)
}

/**
 * 删除已有的属性
 * @param attrId 
 * @returns 
 */
export const reqDeleteAttr = (attrId: number) => {
    return request.delete<any, any>(API.DELETEATTR_URL+attrId)
}