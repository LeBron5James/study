/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-04-02 10:05:44
 * @LastEditTime: 2023-04-06 10:22:47
 */
//对于axios进行二次封装
import axios from "axios";
//引入进度条    start:进度条开始  done:进度条结束
import nProgress from "nprogress";
//引入进度条样式
import 'nprogress/nprogress.css'

//1.利用axios对象的方法create，去创建一个axios实例
const mockReq = axios.create({
    //配置对象
    //基础路径，发请求时，路径当中会出现/api
    baseURL:"/mock" , 
    //代表请求超时的时间5s
    timeout:5000,
})

//请求拦截器
mockReq.interceptors.request.use((config) => {
    //config:配置对象，里面有一个很重要的属性，headers请求头
    //进度条开始动
    nProgress.start()
    return config
})

//响应拦截器
mockReq.interceptors.response.use((res) => {
    //进度条结束
    nProgress.done()
    return res.data
},(err)=>{
    //响应失败的回调函数
    return Promise.reject(new Error('faile'))
})


//对外暴露
export default mockReq;