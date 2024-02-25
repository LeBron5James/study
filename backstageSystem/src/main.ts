/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-11-14 15:58:01
 * @LastEditTime: 2023-11-18 15:42:36
 */
import { createApp } from "vue";
//@ts-ignore
import App from "@/App.vue";
// 引入全局样式
import "@/styles/index.scss";

//引入element-plus插件与样式
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css';
// 暗黑模式的配置
import 'element-plus/theme-chalk/dark/css-vars.css'
// 配置element-plus国际化
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

// 引入svg插件需要配置的代码
import 'virtual:svg-icons-register';


// 引用路由
import router from "@/router";
// 引入路由鉴权文件
import "./permission";
// 引入仓库
import pinia from "@/store";


const app = createApp(App);

// 安装element-plus插件
app.use(ElementPlus,{
    locale: zhCn,  //element-plus国际化配置
});


// 引入自定义插件对象：注册整个项目全局组件
import gloalComponent from "@/components";
// 安装自定义插件
app.use(gloalComponent);
// 引入自定义指令
import { isHasButton } from "@/directive/has";

isHasButton(app);


// 安装仓库
app.use(pinia);
// 注册路由
app.use(router);






app.mount("#app");


