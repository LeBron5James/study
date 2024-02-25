/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-11-15 17:39:46
 * @LastEditTime: 2023-11-29 19:42:31
 */
// 创建用户相关仓库
import { defineStore } from 'pinia';
// 引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user';
// 引入数据类型
import type { LoginParams, LoginResult, userInfoType } from '@/api/user/type';
import type { UserState } from './types/type';
// 引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token';

// 引入路由(常量路由)
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes';
import router from '@/router'

// 引入工具函数，过滤路由
import filterAsyncRoute from '@/utils/filters';

// 引入深拷贝方法
// @ts-ignore
import cloneDeep from 'lodash/cloneDeep';

// 创建仓库
let useUserStore = defineStore('User', {
    // 存储数据
    state: (): UserState => {
        return {
            token: GET_TOKEN(),  //用户唯一标识token
            menuRoutes: constantRoute, //仓库存储生成菜单需要数组(路由)
            username: '',
            avatar: '',
            buttons:[], //存储当前用户是否包含某一个按钮
        }
    },
    // 异步|逻辑
    actions: {
        // 用户登录
        async userLogin(data: LoginParams) {
            const res: LoginResult = await reqLogin(data);
            if (res.code === 200) {
                // pinia仓库存储一下token
                this.token = (res.data as string);
                // 持久化存储
                SET_TOKEN((res.data as string));
                // 能保证当前async函数返回一个成功的Promise
                return 'OK';
            } else {
                return Promise.reject(new Error(res.data));
            }
        },

        // 获取用户信息方法
        async userInfo() {
            const res: userInfoType = await reqUserInfo();
            console.log(res, "获取用户信息")
            if (res.code === 200) {
                this.username = res.data.name;
                this.avatar = res.data.avatar;
                this.buttons = res.data.buttons;
                // 计算当前用户需要展示的异步路由
                const userAsyncRoute = filterAsyncRoute(cloneDeep(asyncRoute), res.data.routes);
                this.menuRoutes = [...constantRoute, ...userAsyncRoute, ...anyRoute];
                // 动态追加路由
                [...userAsyncRoute, ...anyRoute].forEach((route: any) => {
                    router.addRoute(route);
                });
                return 'ok';
            } else {
                return Promise.reject(new Error(res.message));
            }
        },

        // 用户退出登录
        async userLogout() {
            const res: any = await reqLogout();
            if (res.code === 200) {
                this.token = '';
                this.username = '';
                this.avatar = '';
                REMOVE_TOKEN();
                return 'ok';
            } else {
                return Promise.reject(new Error(res.message));
            }
        }
    },
    getters: {

    }
});

export default useUserStore;