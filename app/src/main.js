/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-04-01 09:37:25
 * @LastEditTime: 2023-04-23 10:09:26
 */
import Vue from 'vue'
import App from './App.vue'

//三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
Vue.component('TypeNav', TypeNav)
//轮播图组件--全局组件
import Carousel from '@/components/Carousel'
Vue.component('Carousel', Carousel)
//分页器
import Pagination from '@/components/Pagination'
Vue.component('Pagination', Pagination)
//引入仓库(Vuex)
import store from './store'
//引入路由
import router from '@/router'
//引入mockServe.js----mock数据
import '@/mock/mockServe'
//引入swiper样式
import 'swiper/css/swiper.css'
//按需引入element-ui
import { Button, MessageBox } from 'element-ui'
//懒加载
import VueLazyload from 'vue-lazyload'
import wolf from '@/assets/1.gif'
//引入自定义插件
import myPlugins from '@/plugins/myPlugins'
//引入表单验证插件
import "@/plugins/validate"


//统一接收api文件夹里面全部请求函数(统一引入)
import * as API from '@/api'

Vue.config.productionTip = false

//注册组件
Vue.use(Button)
//挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.use(VueLazyload, {
  //懒加载默认图片
  loading: wolf
})
Vue.use(myPlugins,{
  name:'upper'
})

new Vue({
  render: h => h(App),
  //注册路由
  router,
  //注册仓库,组件实例的身上会多一个$store属性
  store,
  //全局事件总线配置
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线
    Vue.prototype.$API = API
  }
}).$mount('#app')
