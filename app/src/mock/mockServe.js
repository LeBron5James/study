/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-04-05 10:51:14
 * @LastEditTime: 2023-04-05 11:08:50
 */
//引入mockjs模块
import Mock from "mockjs";
//引入JSON数据 (JSON数据格式默认对外暴露)
import banner from './banner.json'
import floor from './floor.json'

//mock数据:参数一：请求地址，参数二：请求数据
Mock.mock("/mock/banner",{code:200,data:banner}) //模拟首页的轮播图
Mock.mock("/mock/floor",{code:200,data:floor})