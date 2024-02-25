/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-11-14 22:56:50
 * @LastEditTime: 2023-11-16 22:13:01
 */
import SvgIcon from './SvgIcon/index.vue';
import Pagination from './Pagination/index.vue';
import Category from './Category/index.vue';
// 引入element-plus提供全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 全局对象
const allGloablComponent = { SvgIcon, Pagination,Category };
// 对外暴露插件对象
export default {
    install(app) {
        Object.keys(allGloablComponent).forEach(key => {
            // 注册全局组件
            app.component(key, allGloablComponent[key]);
        });
        // 将element-plus注册为全局组件
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
          }
    }
}