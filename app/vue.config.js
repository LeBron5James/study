/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-04-01 09:37:25
 * @LastEditTime: 2023-04-24 11:14:26
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap:false,
  transpileDependencies: true,
  //关闭eslint校验工具
  lintOnSave: false,

  //开启代理服务器
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        ws: false, //用于支持websocket
        changeOrigin: true  //用于控制请求头中的host值,默认为true
      }
    }
  }
})
