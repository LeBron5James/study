/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-11-22 16:23:34
 * @LastEditTime: 2023-11-24 21:31:27
 */
// 全部接口返回相同数据
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean,
}

// spu数据的类型
export interface SpuData {
    id?: number,
    spuName: string,
    description: string,
    tmId: number | string,
    category3Id: number | string,
    spuSaleAttrList: null | SaleAttr[],
    spuImageList: null | SpuImage[],
}

export type Records = SpuData[];

// 定义获取已有的spu接口返回的数据类型
export interface HasSpuResponseData extends ResponseData {
    data: {
        records: Records,
        total: number,
        size: number,
        current: number,
        searchCount: boolean,
        pages: number,
    }
}

// 所有品牌数据类型
export interface Trademark {
    id: number,
    tmName: string,
    logoUrl: string,
}

// 品牌接口返回数据类型
export interface AllTradeMark extends ResponseData {
    data: Trademark[]
}

// 商品图片类型
export interface SpuImage {
    id?: number,
    spuId?: number,
    imgName?: string,
    imgUrl?: string,
    createTime?: string,
    updateTime?: string,
    name?: string,
    url?: string,
}

// 已有的spu的照片墙数据类型
export interface SpuHasImg extends ResponseData {
    data: SpuImage[]
}

// 已有SPU销售属性值
export interface SpuSaleAttrValue {
    id?: number,
    spuId?: number,
    baseSaleAttrId: number | string,
    createTime?: null,
    updateTime?: null,
    saleAttrName?: string,
    saleAttrValueName: string,
    isChecked?: null,
}

// 存储销售属性值的数组
export type SpuSaleAttrList = SpuSaleAttrValue[];

// 销售属性对象类型
export interface SaleAttr {
    id?: number,
    spuId?: number,
    baseSaleAttrId: number | string,
    saleAttrName: string,
    createTime?: null,
    updateTime?: null,
    spuSaleAttrValueList: SpuSaleAttrList,
    flag?: boolean,
    saleAttrValue?: string
}

// SPU销售属性接口返回类型
export interface SaleAttrResponseData extends ResponseData {
    data: SaleAttr[]
}

// 全部SPU返回数据
export interface HasSaleAttr {
    id: number,
    name: string
}

export interface HasSaleAttrResponseData extends ResponseData {
    data: HasSaleAttr[]
}

// 添加sku携带的参数类型
export interface SkuData {
    category3Id: string | number //三级分类的ID
    spuId: string | number //已有的SPU的ID
    tmId: string | number //SPU品牌的ID
    skuName: string //sku名字
    price: string | number //sku价格
    weight: string | number //sku重量
    skuDesc: string //sku的描述
    skuAttrValueList?: Attr[]
    skuSaleAttrValueList?: saleArr[]
    skuDefaultImg: string //sku图片地址
}

export interface Attr {
    attrId: number | string //平台属性的ID
    valueId: number | string //属性值的ID
}

export interface saleArr {
    saleAttrId: number | string //属性ID
    saleAttrValueId: number | string //属性值的ID
}

//获取SKU数据接口的ts类型
export interface SkuInfoData extends ResponseData {
    data: SkuData[]
}

// 获取sku接口数据
export interface SkuInfoData extends ResponseData {
    data: SkuData[];
}