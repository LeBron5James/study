/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-11-20 16:12:12
 * @LastEditTime: 2023-11-20 17:50:37
 */
// 商品分类全局组件的小仓库
import { defineStore } from "pinia";
import { reqC1,reqC2,reqC3 } from "@/api/product/attr/index"
import type {CategoryResponseData} from "@/api/product/attr/type"
import type { CategoryState } from "./types/type";

const useCategoryStore = defineStore('Category', {
    state: ():CategoryState => {
        return {
            // 存储一级分类
            c1Arr: [],
            // 存储一级分类id
            c1Id: '',
            // 存储二级分类
            c2Arr: [],
            // 存储二级分类id
            c2Id: '',
             // 存储三级分类
             c3Arr: [],
             // 存储三级分类id
             c3Id: '',
        }
    },
    actions:{
        /**
         * 获取一级分类
         */
        async getC1() {
            const res:CategoryResponseData = await reqC1();
            if(res.code === 200){
                this.c1Arr = res.data;
            }
        },
        /**
         * 获取二级分类
         */
        async getC2() {
            const res:CategoryResponseData = await reqC2(this.c1Id);
            if(res.code === 200){
                this.c2Arr = res.data;
            }
        },
        /**
         * 获取三级分类
         */
        async getC3() {
            const res:CategoryResponseData = await reqC3(this.c2Id);
            if(res.code === 200){
                this.c3Arr = res.data;
            }
        }
    }
});

export default useCategoryStore;