// 关于layout组件相关配置仓库
import { defineStore } from 'pinia';

const useLayoutSettingStore = defineStore('SettingStore', {
    state: () => {
        return {
            fold: false, //用于控制菜单状态(折叠)
            refsh:false, //用于控制刷新效果
        }
    }
});


export default useLayoutSettingStore;