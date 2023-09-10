/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-04-12 20:38:51
 * @LastEditTime: 2023-04-19 23:34:33
 */

//存token
export const setToken = (token) => {
    localStorage.setItem("TOKEN", token);
}

//取token
export const getToken = () => {
    return localStorage.getItem("TOKEN")
}

//清除token
export const removeToken = () => {
    localStorage.removeItem("TOKEN")
}