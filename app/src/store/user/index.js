/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-04-12 17:45:17
 * @LastEditTime: 2023-04-20 10:27:47
 */
//登录与注册的模块

import { login, regist, reqGetCode, userInfo, userLogout } from "@/api"
import { setToken,getToken,removeToken} from "@/utils/token"

const state = {
    code: "",
    token: getToken(),
    userInfo: {}
}
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        //后台把验证码返回给手机，不应该直接返回
        let res = await reqGetCode(phone)
        if (res.code == 200) {
            commit("GETCODE", res.data)
        }
    },
    //用户注册
    async userRegist({ commit }, user) {
        let res = await regist(user)
        if (res.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //用户登录[token业务]
    async userLogin({ commit }, data) {
        console.log(data)
        let res = await login(data)
        //服务器下发的token，用户唯一标识
        if (res.code == 200) {
            commit("USERLOGIN", res.data.token)
            //持久化存储token
            setToken(res.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //用户信息
    async userInfo({ commit }) {
        let res = await userInfo()
        if (res.code == 200) {
            commit("USERINFO", res.data)
            return 'ok'
        }else{
            return Promise.reject(new Error(res.message))
        } 
    },
    //用户退出登录
    async userLogout({commit}) {
        //只是向服务器发起请求，通知服务器清除token
        let res = await userLogout();
        //action不能操作state
        if(res.code == 200) {
            commit("CLEAR")
            return 'ok'
        }else {
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    USERINFO(state, data) {
        state.userInfo = data
    },
    CLEAR(state) {
        state.token = ""
        state.userInfo = {}
        removeToken()
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}