/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-04-17 20:55:54
 * @LastEditTime: 2023-04-17 21:11:43
 */
import {v4 as uuidv4} from 'uuid'

//随机生成一个字符串，且每次执行不能发生变化，游客身份持久化存储
export const getUUID = () => {
    //判断本地存储是否存在，如果有取出本地存储，没有随机生成
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    if(!uuid_token) {
        //单例模式
        uuid_token = uuidv4();
        localStorage.setItem('UUIDTOKEN',uuid_token);
    }
    return uuid_token
}