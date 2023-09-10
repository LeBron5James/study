/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-04-02 10:05:44
 * @LastEditTime: 2023-04-17 21:28:43
 */
//对于axios进行二次封装
import store from "@/store";
import axios from "axios";
//引入进度条    start:进度条开始  done:进度条结束
import nProgress from "nprogress";
//引入进度条样式
import 'nprogress/nprogress.css'
//在当前模块中引入store
import stores from "@/store";

//1.利用axios对象的方法create，去创建一个axios实例
const req = axios.create({
    //配置对象
    //基础路径，发请求时，路径当中会出现/api
    baseURL:"/api" , 
    //代表请求超时的时间5s
    timeout:5000,
})

//请求拦截器
req.interceptors.request.use((config) => {
    //config:配置对象，里面有一个很重要的属性，headers请求头
    //进度条开始动
    nProgress.start()
    if(stores.state.detail.uuid_token) {
        //请求头添加一个字段
        config.headers.userTempId= stores.state.detail.uuid_token
    }
    //判断是否携带token给服务器
    if(store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    return config
})

//响应拦截器
req.interceptors.response.use((res) => {
    //进度条结束
    nProgress.done()
    return res.data
},(err)=>{
    //响应失败的回调函数
    return Promise.reject(new Error('faile'))
})


//对外暴露
export default req;