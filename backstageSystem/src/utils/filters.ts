/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-11-29 17:00:30
 * @LastEditTime: 2023-11-29 17:23:30
 */
/**
 * 用于过滤当前用户需要展示的异步路由
 * @param asyncRoute 所有异步路由
 * @param routes 当前用户能够访问的异步路由
 */
function filterAsyncRoute(asyncRoute: any, routes: any) {
    return asyncRoute.filter((item: any) => {
        if (routes.includes(item.name)) {
            if (item.children && item.children.length > 0) {
                item.children = filterAsyncRoute(item.children, routes);
            }
            return true;
        }
    });
}

export default filterAsyncRoute;