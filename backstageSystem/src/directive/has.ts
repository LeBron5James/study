/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-11-29 19:47:00
 * @LastEditTime: 2023-11-29 19:50:41
 */

import pinia from "@/store"
import useUserStore from "@/store/modules/user"

const userStore = useUserStore(pinia);
/**
 * 全局自定义指令：实现按钮的权限
 * @param app 
 */
export const isHasButton = (app:any) => {
    app.directive('has',{
        mounted(el:any,options:any) {
            if(!userStore.buttons.includes(options.value)){
                // 移除节点
                el.parentNode.removeChild(el);
            }
        },
    })
}