<!--
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-11-17 16:47:07
 * @LastEditTime: 2023-11-28 22:02:26
-->
<template>
    <el-button size="small" icon="Refresh" circle @click="updateRefesh"></el-button>
    <el-button size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
    <el-button size="small" icon="Setting" circle @click="openColor"></el-button>
    <img :src="userStore.avatar" style="width:24px;height:24px;margin:0px 10px;border-radius: 50%;" />
    <!-- 下拉 -->
    <el-dropdown>
        <span class="el-dropdown-link">
            {{ userStore.username }}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
    <el-drawer v-model="drawer" title="主题设置" >
        <el-form>
            <el-form-item label="主题颜色">
                <el-color-picker @change="setColor" v-model="color" size="small" show-alpha :predefine="predefineColors" />
            </el-form-item>
            <el-form-item label="暗黑模式">
                <el-switch @change="changeDark" v-model="dark" size="small" inline-prompt active-icon="MoonNight"
                    inactive-icon="Sunny" />
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useUserStore from '@/store/modules/user';
import useLayoutSettingStore from '@/store/modules/setting';

import { useRouter } from 'vue-router';

const router = useRouter();
// 控制抽屉
const drawer = ref<boolean>(false);
// 暗黑模式切换
const dark = ref<boolean>(false);


const layoutSettingStore = useLayoutSettingStore();
const userStore = useUserStore();
/**
 * 打开颜色设置抽屉
 */
const openColor = () => {
    drawer.value = true;
}
/**
 * 暗黑模式切换
 */
const changeDark = () => {
    const html = document.documentElement;
    // 判断HTML是否有类名dark
    dark.value ? html.className = 'dark' : html.className = '';
}

/**
 * 主题颜色设置
 */
const setColor = () => {
    // 通知js修改根节点的样式对象的属性与属性值
    const html = document.documentElement;
    html.style.setProperty('--el-color-primary', color.value);
}


// 颜色选择
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
]);

/**
 * 刷新
 * 原理：将二级路由组件销毁重新创建。此方法在main组件下可以查看
 */
const updateRefesh = () => {
    layoutSettingStore.refsh = !layoutSettingStore.refsh;
}
// 全屏
const fullScreen = () => {
    // DOM对象的一个属性，用于判断当前是不是全屏模式
    let full = document.fullscreenElement;
    if (!full) {
        // 进入全屏
        document.documentElement.requestFullscreen();
    } else {
        // 退出全屏
        document.exitFullscreen();
    }
}
// 退出登录
const logout = async () => {
    await userStore.userLogout();
    router.push('/login');
}
</script>

<style scoped lang="scss"></style>