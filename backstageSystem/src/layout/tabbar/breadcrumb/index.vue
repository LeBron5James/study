<!--
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-11-17 16:45:45
 * @LastEditTime: 2023-11-17 17:45:06
-->
<template>
    <el-icon style="margin-right:10px" @click="changeIcon">
        <component :is="flod?'Fold':'Expand'"></component>
    </el-icon>
    <!-- 面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="(item,index) in route.matched" v-show="item.meta.title" :to="item.path">
            <!-- 图标 -->
            <el-icon style="margin: 0px 2px;">
                <component :is="item.meta.icon"></component>
            </el-icon>
            <!-- 标题 -->
            <span>{{item.meta.title}} </span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import useLayoutSettingStore from '@/store/modules/setting';

// 获取路由
const route = useRoute();
// 获取store
const layoutSettingStore = useLayoutSettingStore();

let flod = ref(false);//控制显示图标
// 图标切换
const changeIcon = () => {
   layoutSettingStore.fold = !layoutSettingStore.fold;
}
</script>

<style scoped></style>