/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-04-01 15:34:47
 * @LastEditTime: 2023-04-22 22:21:58
 */
//配置路由的地方
import Vue from "vue"
import VueRouter from "vue-router"

//使用插件
Vue.use(VueRouter)

//引入路由配置
import routes from "./routes";
import store from "@/store";


//先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;

//重写push|replace
//第一个参数：告诉原来push方法，你往哪里跳转(传递哪些参数)     ---replace一样 
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}

//配置路由
const router = new VueRouter({
    //配置路由
    routes,
    //滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})

//全局守卫:前置守卫(在路由跳转之前进行判断)
router.beforeEach(async (to, from, next) => {
    //to:获取到要跳的路由信息
    //from:从哪个路由到来
    //next:放行
    const token = store.state.user.token
    //用户信息
    const name = store.state.user.userInfo.name
    if (token) {
        //禁止登录的用户进入登录页面
        if (to.path == '/login') {
            next('/home')
        } else {
            //登录了，不去登录界面
            if (name) {
                //有用户信息
                next()
            } else {
                //没有用户信息，派发action存储用户信息
                try {
                    await store.dispatch('userInfo')
                    next()
                } catch (error) {
                    //token失效，重新登录
                    //清除token
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    } else {
        let toPath = to.path
        //用户未登录
        if (toPath.indexOf('/center') != -1 || toPath.indexOf('/trade') !=-1 || toPath.indexOf('/pay') != -1) {
            //把未登录的时候想去而没有去成的信息，存储于地址栏中【路由】
            next('/login?redirect='+toPath)
        } else {
            next()

        }
    }
    next()
})

export default router