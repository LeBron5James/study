<!--
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-11-17 16:18:56
 * @LastEditTime: 2023-11-28 22:00:05
-->

<template>
    <div class="tabbar_container">
        <div class="tabbar_left">
            
            <Breadcrumb></Breadcrumb>
        </div>
        <div class="tabbar_right">
            <Setting></Setting>
        </div>
    </div>
</template>
<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue';
import Setting from './setting/index.vue';
</script>

<style lang="scss" scoped>
.tabbar_container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    // background-image: linear-gradient(to right, #409eff, #67c23a);

    .tabbar_left {
        margin-left: 10px;
        display: flex;
        align-items: center;
    }

    .tabbar_right {
        display: flex;
        align-items: center;
    }
}
</style>