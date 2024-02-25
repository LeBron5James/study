/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-11-18 15:37:39
 * @LastEditTime: 2023-11-29 17:32:01
 */
// 路由鉴权
import setting from './setting';

import router from '@/router';
import nprogress from 'nprogress';
// 引入进度条样式
import 'nprogress/nprogress.css';
nprogress.configure({ showSpinner: false }); //取消加载小圆圈

// 获取用户相关仓库的token数据，用于判断用户是否登录成功
import useUserStore from './store/modules/user';
import pinia from './store';
const userStore = useUserStore(pinia);

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    nprogress.start();

    // 获取token
    const token = userStore.token;
    const username = userStore.username;
    // 用户登录判断
    if (token) {
        // 登陆成功
        if (to.path === '/login') {
            next({ path: '/' });
        } else {
            // 判断是否有用户信息
            if (username) {
                next();
            } else {
                // 没有用户信息,请求用户信息
                try {
                    await userStore.userInfo();
                    next({...to,replace:true});
                } catch (error) {
                    // token过期：退出登录，用户相关数据清空，重新登录
                    await userStore.userLogout();
                    next({ path: '/login', query: { redirect: to.path } });
                }
            }
        }
    } else {
        // 登录失败
        if (to.path === '/login') {
            next();
        } else {
            next({ path: '/login', query: { redirect: to.path } });
        }
    }
});

// 全局后置守卫
router.afterEach((to, from) => {
    // 设置标题
    document.title = setting.title + '-' + to.meta.title;
    nprogress.done();
})