<!--
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-11-17 10:53:39
 * @LastEditTime: 2023-11-28 16:52:26
-->
<template>
    <div>
        <!-- 路由组件出口的位置 -->
        <router-view v-slot="{ Component }">
            <transition name="fade">
                <!-- 渲染二级路由 -->
                <component :is="Component" v-if="flag" />
            </transition>
        </router-view>
    </div>
</template>

<script setup lang="ts">
import { watch, ref, nextTick } from 'vue';
import useLayoutSettingStore from '@/store/modules/setting';
const layoutSettingStore = useLayoutSettingStore();

// 控制当前组件是否销毁重建
let flag = ref(true);

// 监听仓库数据变化，已达到路由更新
watch(() => layoutSettingStore.refsh, () => {
    // 点击刷新按钮时，路由组件销毁
    flag.value = false;
    nextTick(() => {
        flag.value = true;
    });
})
</script>

<style scoped>
.fade-enter-from {
    opacity: 0;
}

.fade-enter-active {
    transition: all 0.5s ease;
}

.fade-enter-to {
    opacity: 1;
}
</style>