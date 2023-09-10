/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-04-02 15:53:26
 * @LastEditTime: 2023-04-20 15:45:53
 */
/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-04-02 15:53:26
 * @LastEditTime: 2023-04-12 17:49:01
 */
/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-04-02 15:53:26
 * @LastEditTime: 2023-04-12 00:10:04
 */
import Vue from "vue";
import Vuex from 'vuex'

//使用vuex插件
Vue.use(Vuex)

//引入小仓库
import home from "./home";
import search from "./search";
import detail from "./detail";
import user from './user';
import shopCart from "./shopCart";
import trade from "./trade";



//对外暴露Store类的一个实例
export default new Vuex.Store({
    //实现vuex仓库模块化式开发存储数据
    modules:{
        home,
        search,
        detail,
        user,
        shopCart,
        trade
    }
});