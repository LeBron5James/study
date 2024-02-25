<!--
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-11-16 20:08:51
 * @LastEditTime: 2023-11-17 11:10:29
-->
<template>
    <template v-for="item in menuList" :key="item.path">
        <!-- 没有子路由 -->
        <template v-if="!item.children">
            <el-menu-item :index="item.path" v-if="!item.meta.hidden" @click="goRoute">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <template #title>
                    <span> {{ item.meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <!-- 有一个子路由 -->
        <template v-if="item.children && item.children.length == 1">
            <el-menu-item :index="item.children[0].path" v-if="!item.children[0].meta.hidden" @click="goRoute">
                <el-icon>
                    <component :is="item.children[0].meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <!-- 有多个子路由 -->
        <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <!-- 递归组件 -->
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
    </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
// 获取父组件传递过来的全部路由组件
defineProps(['menuList']);

// 获取路由对象
const router = useRouter();


// 路由跳转
const goRoute = (vc: any) => {
    router.push(vc.index);
}
</script>
<!-- vue2写法，为了实现组件的递归 -->
<script lang="ts">
export default {
    name: 'Menu',
}
</script>

<style scoped lang="scss"></style>