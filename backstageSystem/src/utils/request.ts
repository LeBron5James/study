/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-11-15 15:16:53
 * @LastEditTime: 2023-11-18 10:27:27
 */
// 进行axios二次封装：使用请求与响应拦截器
import axios from 'axios';

import { ElMessage } from 'element-plus';

import useUserStore from '@/store/modules/user';

// 第一步：利用axios对象的create方法，去创建axios实例
let request = axios.create({
    // 基础路径
    baseURL: import.meta.env.VITE_APP_BASE_API,//基础路径上会携带 '/api'
    timeout: 5000,  //超时的时间设置
});

// 第二步：request实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
    // 获取登录成功后的token
    const userStore = useUserStore();
    if(userStore.token){
        // 携带token请求
        config.headers.token = userStore.token;
    }
    // 返回配置对象
    return config;
});

// 第三步：响应拦截器
request.interceptors.response.use((res) => {
    // 成功回调
    return res.data;
}, (err) => {
    // 失败回调，处理http网络错误
    // 定义一个变量：存储网络错误信息
    let message = '';
    let status = err.response.status;
    switch (status) {
        case 400:
            message = '请求错误';
            break;
        case 401:
            message = '未授权，请登录(TOKEN过期)';
            break;
        case 403:
            message = '拒绝访问';
            break;
        case 404:
            message = `请求地址出错: ${err.response.config.url}`;
            break;
        case 500:
            message = '服务器内部错误';
            break;
        default:
            message = `连接错误`;
    }
    // 提示错误信息
    ElMessage({
        type: 'error',
        message
    });

    // 如果发生错误，返回一个拒绝的promise，拒绝的原因是err
    return Promise.reject(err);
});

// 对外暴露
export default request;