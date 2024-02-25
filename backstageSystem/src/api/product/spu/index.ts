/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-11-22 16:23:28
 * @LastEditTime: 2023-11-26 16:41:44
 */
// SPU管理模块接口
import request from "@/utils/request";

import type {SkuInfoData,HasSpuResponseData,AllTradeMark,SpuHasImg,SaleAttrResponseData,HasSaleAttrResponseData,SpuData} from './type'


enum API{
    // 获取SPU的数据
    HASSPU_URL="/admin/product/",
    // 获取全部品牌数据
    ALLTRADEMARK_URL="/admin/product/baseTrademark/getTrademarkList",
    // 获取某个SPU的商品图片数据
    IMAGE_URL="/admin/product/spuImageList/",
    // 获取某个SPU全部的销售属性
    SPUHASSALEATTR_URL="/admin/product/spuSaleAttrList/",
    // 获取整个项目全部的销售属性
    ALLSALEATTR_URL="/admin/product/baseSaleAttrList",
    // 增加一个新的spu
    ADDSPU_URL="/admin/product/saveSpuInfo",
    // 更新已有的spu
    UPDATESPU_URL="/admin/product/updateSpuInfo",
    // 追加一个新增的sku地址
    ADDSKU_URL="/admin/product/saveSkuInfo",
    // 查看某个spu下的售卖商品
    SKUINFO_URL="/admin/product/findBySpuId/",
    // 删除已有的SPU
    REMOVESPU_URL="/admin/product/deleteSku/"
}

/**
 * 获取SPU数据
 * @param page 
 * @param limit 
 * @param category3Id 
 * @returns 
 */
export const reqHasSpu=(page:number,limit:number,category3Id:number|string)=>{
    return request.get<any,HasSpuResponseData>(API.HASSPU_URL+`${page}/${limit}?category3Id=${category3Id}`)
}

/**
 * 获取spu的全部品牌
 */
export const reqAllTrademark=()=>{
    return request.get<any,AllTradeMark>(API.ALLTRADEMARK_URL)
}

/**
 * 获取某个SPU下的商品图片
 */
export const reqSpuImageList=(spuId:number)=>{
    return request.get<any,SpuHasImg>(API.IMAGE_URL+`${spuId}`)
}

/**
 * 获取某个SPU的销售属性
 */
export const reqSpuHasSaleAttr=(spuId:number)=>{
    return request.get<any,SaleAttrResponseData>(API.SPUHASSALEATTR_URL+`${spuId}`)
}

/**
 * 获取全部销售属性
 */
export const reqAllSaleAttr=()=>{
    return request.get<any,HasSaleAttrResponseData>(API.ALLSALEATTR_URL)
}

/**
 * 添加或更新一个的spu
 * @param data 
 * @returns 
 */
export const reqAddSpu=(data:SpuData)=>{
    // 如果有id更新否则为新增
    if(data.id){
        return request.post<any,any>(API.UPDATESPU_URL,data);
    }else{
        return request.post<any,any>(API.ADDSPU_URL,data);
    }
}


/**
 * 添加sku
 * @param data 
 * @returns 
 */
export const reqAddSku = (data:any) => {
    return request.post<any,any>(API.ADDSKU_URL,data);
}

/**
 * 获取某个spu下的sku信息
 * @param spuId 
 * @returns 
 */
export const reqSkuList=(spuId:number | string)=>{
    return request.get<any,SkuInfoData>(API.SKUINFO_URL+spuId);
}

/**
 * 删除spu
 * @param spuId 
 * @returns 
 */
export const reqRemoveSpu = (spuId:number | string) => {
    return request.delete<any,any>(API.REMOVESPU_URL+spuId);
}
