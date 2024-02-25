<!--
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-11-16 16:12:43
 * @LastEditTime: 2023-11-28 22:03:20
-->
<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider" :class="{fold:layoutSettingStore.fold?true:false}">
            <Logo></Logo>
            <!-- 滚动组件 -->
            <el-scrollbar class="scrollbar">
                <!-- 菜单组件 -->
                <el-menu :collapse="layoutSettingStore.fold?true:false" :default-active="route.path" background-color="#001529" text-color="white">
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar" :class="{fold:layoutSettingStore.fold?true:false}">
            <Tabbar></Tabbar>
        </div>
        <!-- 内容展示区域 -->
        <div class="layout_content" :class="{fold:layoutSettingStore.fold?true:false}">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue';
import Menu from './menu/index.vue';
import Main from './main/index.vue';
import Tabbar from './tabbar/index.vue';

import { useRoute } from 'vue-router';
const route = useRoute();

import useUserStore from '@/store/modules/user';
import useLayoutSettingStore from '@/store/modules/setting';
const userStore = useUserStore();
const layoutSettingStore = useLayoutSettingStore();

</script>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;

    .layout_slider {
        width: $base-menu-width;
        height: 100vh;
        background-color: $base-menu-bg;
        color: white;
        transition: all .3s;
        .scrollbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);

            .el-menu {
                border-right: none;
            }
        }

        &.fold{
            width: $base-menu-min-width;
        }
    }

    .layout_tabbar {
        position: absolute;
        width: calc(100% - $base-menu-width );
        height: $base-tabbar-height;
        top: 0;
        left: $base-menu-width;
        transition: all .3s;
        &.fold{
            width:calc(100vw - $base-menu-min-width );
            left: $base-menu-min-width;
        }
    }

    .layout_content {
        position: absolute;
        width: calc(100% - $base-menu-width );
        height: calc(100vh - $base-tabbar-height);
        left: $base-menu-width;
        top: $base-tabbar-height;
        padding: 20px;
        overflow: auto;
        transition: all .3s;
        &.fold{
            width:calc(100vw - $base-menu-min-width );
            left: $base-menu-min-width;
        }
    }
}
</style>