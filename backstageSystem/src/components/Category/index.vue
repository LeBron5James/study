<!--
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-11-20 15:45:35
 * @LastEditTime: 2023-11-21 10:42:44
-->
<template>
    <div>
        <el-card>
            <el-form :inline="true">
                <el-form-item label="一级分类">
                    <el-select :disabled="scene==0?false:true" v-model="categoryStore.c1Id" @change="handler">
                        <el-option v-for="c1 in categoryStore.c1Arr" :key="c1.id" :label="c1.name"
                            :value="c1.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="二级分类">
                    <el-select :disabled="scene==0?false:true" v-model="categoryStore.c2Id" @change="handler1">
                        <el-option v-for="c2 in categoryStore.c2Arr" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="三级分类">
                        <el-select :disabled="scene==0?false:true" v-model="categoryStore.c3Id" >
                        <el-option v-for="c3 in categoryStore.c3Arr" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import useCategoryStore from '@/store/modules/category';

// 接受父组件传递的参数
defineProps(['scene']);

// 注册仓库
const categoryStore = useCategoryStore()

/**
 * 通知获取一级分类
 */
const getC1 = async () => {
    categoryStore.getC1();
}

/**
 * 通知获取二级分类
 */
const handler = () => {
    categoryStore.c2Id = '';
    categoryStore.c3Arr = [];
    categoryStore.c3Id = '';
    categoryStore.getC2();
}

/**
 * 通知获取三级分类
 */
 const handler1 = () => {
    categoryStore.c3Id = '';
    categoryStore.getC3();
}


onMounted(() => {
    getC1();
});
</script>

<style scoped></style>