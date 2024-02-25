/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-11-15 15:44:59
 * @LastEditTime: 2023-11-18 17:56:08
 */
// 登录接口需要携带参数ts类型
export interface LoginParams {
    username: string,
    password: string
}


// 定义全部接口返回数据都拥有的ts类型
export interface ResponseData{
    code: number,
    message: string,
    ok:boolean
}

// 登录接口返回数据类型
export interface LoginResult extends ResponseData {
    data: string
}


// 定义服务器返回用户信息相关的数据类型
export interface userInfoType extends ResponseData{
    data:{
        routes:string[],
        buttons:string[],
        roles:string[],
        name:string,
        avatar:string
    }
}
