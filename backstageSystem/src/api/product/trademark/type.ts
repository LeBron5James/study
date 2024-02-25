/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-11-19 15:07:17
 * @LastEditTime: 2023-11-19 15:14:07
 */
// 品牌请求返回的数据类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean,
}

// 已有品牌的数据类型
export interface TradeMark {
    id?: number,
    tmName: string,
    logoUrl: string
}

// 包含全部品牌数据的ts类型
export type Records = TradeMark[];

// 获取的已有全部品牌的数据ts类型
export interface TradeMarkResponseData extends ResponseData{
    data: {
        records: Records,
        current: number,
        size: number,
        total: number,
        searchCount:boolean,
        pages: number,
    }
}