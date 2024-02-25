/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-11-16 10:30:09
 * @LastEditTime: 2023-11-20 17:45:42
 */
// 引入路由对象类型
import type { RouteRecordRaw } from 'vue-router';
import { CategoryObj } from '@/api/product/attr/type';


// 定义user仓库数据state类型
export interface UserState {
    token: string | null,
    menuRoutes: RouteRecordRaw[],
    username: string,
    avatar: string,
    buttons:string[]
}

// 定义category仓库state类型
export interface CategoryState {
    c1Id: string | number,
    c1Arr: CategoryObj[],
    c2Id: string | number,
    c2Arr: CategoryObj[],
    c3Id: string | number,
    c3Arr: CategoryObj[],
}