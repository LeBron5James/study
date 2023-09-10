//vue插件一定暴露一个对象
let myPlugins = {}

myPlugins.install = function(Vue,options) {
    /* 
        Vue.prototype.$bus:任何组件都可以使用
        Vue.directive
        Vue.component
        Vue.filter ...
    */
    console.log("调用了自定义插件")
    //全局指令
    Vue.directive(options.name,(element,params) => {
        element.innerHTML = params.value.toUpperCase()
    })
}

export default myPlugins