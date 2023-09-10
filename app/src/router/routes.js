/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-04-11 17:22:44
 * @LastEditTime: 2023-04-24 10:54:47
 */
//路由配置信息

//引入路由组件
import ShopCart from '@/pages/ShopCart'
import Pay from "@/pages/Pay"
import PaySuccess from "@/pages/PaySuccess"
import Center from "@/pages/Center"
import Myorder from "@/pages/Center/MyOrder"
import GroupOrder from "@/pages/Center/GroupOrder"

export default [
    {
        path: '/detail/:skuid',
        component: () => import('@/pages/Detail'),  //路由懒加载   --高效
        meta: { show: true }
    },
    {
        path: '/home',
        component: () => import('@/pages/Home'),
        meta: { show: true },  //元信息
    },
    {
        path: "/addcartsuccess",
        name: 'addcartsuccess',
        component: () => import('@/pages/AddCartSuccess'),
        meta: { show: false }
    },
    {
        path: "/shopcart",
        name: 'shopcart',
        component: ShopCart,
        meta: { show: false }
    },
    {
        path: "/login",
        component: () => import('@/pages/Login'),
        meta: { show: false }
    },
    {
        name: "search",  //命名空间
        path: "/search/:keyword?",
        component: () => import('@/pages/Search'),
        meta: { show: true }
    },
    {
        path: "/register",
        component: () => import('@/pages/Register'),
        meta: { show: false }
    },
    {
        path: "/trade",
        component: () => import('@/pages/Trade'),
        meta: { show: false },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next()
            } else {
                //从哪里来，回来哪里去
                next(false)
            }
        }
    },
    {
        path: "/pay",
        component: Pay,
        meta: { show: false },
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                //从哪里来，回来哪里去
                next(false)
            }
        }
    },
    {
        path: "/paysuccess",
        component: PaySuccess,
        meta: { show: false }
    },
    {
        path: "/center",
        component: Center,
        meta: { show: false },
        //二级路由
        children: [
            {
                path: 'myorder',
                component: Myorder
            },
            {
                path: 'grouporder',
                component: GroupOrder
            },
            //重定向---访问center默认打开一个页面
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },

    //重定向，当项目跑起来的时候，访问/，立马定向到首页
    {
        path: '*',
        redirect: '/home'
    }
]