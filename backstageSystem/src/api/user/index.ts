/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-11-15 17:47:06
 * @LastEditTime: 2023-11-18 17:36:50
 */
import request from '@/utils/request'
import type { LoginParams,LoginResult,userInfoType } from './type';

//项目用户相关的请求地址
enum API {
    LOGIN_URL = '/admin/acl/index/login',
    USERINFO_URL = '/admin/acl/index/info',
    LOGOUT_URL = '/admin/acl/index/logout',
}


// 登录接口
export const reqLogin = (data: LoginParams) => request.post<any, LoginResult>(API.LOGIN_URL, data);
// 获取用户信息接口
export const reqUserInfo = () => request.get<any, userInfoType>(API.USERINFO_URL);
// 退出登录
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL);


