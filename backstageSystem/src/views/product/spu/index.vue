<!--
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-11-17 10:26:25
 * @LastEditTime: 2023-11-26 17:07:19
-->
<template>
    <div>
        <Category :scene="scene" />
        <el-card style="margin: 10px 0;">
            <div v-show="scene == 0">
                <el-button type="primary" size="default" icon="Plus" :disabled="categoryStore.c3Id ? false : true"
                    @click="addSpu">添加SPU</el-button>

                <el-table style="margin: 10px 0;" border :data="records">
                    <el-table-column type="index" label="序号" width="80" align="center" />
                    <el-table-column label="SPU名称" prop="spuName" />
                    <el-table-column label="SPU描述" prop="description" show-overflow-tooltip />
                    <el-table-column label="操作">
                        <template #="{ row }">
                            <el-button type="primary" size="small" icon="Plus" title="添加SKU"
                                @click="addSku(row)"></el-button>
                            <el-button type="primary" size="small" icon="Edit" title="修改SPU"
                                @click="updateSpu(row)"></el-button>
                            <el-button type="primary" size="small" icon="View" title="查看SKU"
                                @click="findSku(row)"></el-button>
                            <el-popconfirm :title="`确定删除${row.spuName}吗？`" @confirm="removeSpu(row)" width="200px">
                                <template #reference>
                                    <el-button type="primary" size="small" icon="Delete" title="删除SKU"></el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页器 -->
                <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
                    :background="true" layout="prev, pager, next, jumper, ->, sizes,total" :total="total"
                    @current-change="getHasSpu" @size-change="changeSize" />
            </div>
            <!-- 添加spu表单 -->
            <SpuForm ref="spu" v-show="scene == 1" @changeScene="changeScene" />
            <!-- 添加SPU表单 -->
            <SkuForm ref="sku" v-show="scene == 2" @changeScene="changeScene" />
            <!-- 展示sku信息 -->
            <el-dialog title="SKU列表" v-model="skuShow">
                <el-table border :data="skuArr">
                    <el-table-column label="sku名字" prop="skuName"></el-table-column>
                    <el-table-column label="sku价格" prop="price"></el-table-column>
                    <el-table-column label="sku重量" prop="weight"></el-table-column>
                    <el-table-column label="sku图片">
                        <template #default="{ row }">
                            <img :src="row.skuDefaultImg" style="width: 100px;height: 100px;">
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import SpuForm from './spuForm.vue';
import SkuForm from './skuForm.vue';

import { ref, watch,onBeforeMount } from 'vue';
import { ElMessage } from 'element-plus';

import { reqHasSpu, reqSkuList, reqRemoveSpu } from '@/api/product/spu/index';
import { HasSpuResponseData, Records, SpuData, SkuInfoData, SkuData } from '@/api/product/spu/type';

import useCategoryStore from '@/store/modules/category';
const categoryStore = useCategoryStore();

// 场景数据  0:显示spu 1：添加或修改spu 2：添加sku
let scene = ref<number>(0);
// 分页器默认页码
let pageNo = ref<number>(1);
// 每页展示几条数据
let pageSize = ref<number>(3);
// 存储当前spu的总条数
let total = ref<number>(0);
// 接收spu
let records = ref<Records>([]);
// 获取spu子组件实例
const spu = ref<any>(null);
// 获取sku子组件实例
const sku = ref<any>(null);
// 存储sku列表
const skuArr = ref<SkuData[]>([]);
// 控制sku展示的变量
const skuShow = ref<boolean>(false);



/**
 * 添加spu按钮
 */
const addSpu = () => {
    scene.value = 1;
    spu.value.initAddSpu(categoryStore.c3Id);
}
/**
 * 修改SPU按钮回调
 */
const updateSpu = (row: SpuData) => {
    scene.value = 1;
    spu.value.initHasSpuData(row);
}
/**
 * 查看sku
 * @param row 
 */
const findSku = async (row: SpuData) => {
    const res: SkuInfoData = await reqSkuList((row.id as number));
    if (res.code === 200) {
        skuArr.value = res.data;
        skuShow.value = true;
    }
}

/**
 * 删除spu
 * @param row 
 */
const removeSpu = async (row: SpuData) => {
    const res = await reqRemoveSpu((row.id as number));
    if (res.code === 200) {
        ElMessage({
            message: '删除成功',
            type: 'success'
        });
        getHasSpu(records.value.length > 1 ? pageNo.value : pageNo.value - 1);
    } else {
        ElMessage({
            message: '删除失败',
            type: 'error'
        });
    }
}
/**
 * 子组件通知父组件修改场景
 */
const changeScene = (obj: any) => {
    scene.value = obj.flag;
    if (obj.params === 'update') {
        getHasSpu(pageNo.value);
    } else {
        getHasSpu();
    }
}

/**
 * 跳转sku
 */
const addSku = (row: SpuData) => {
    scene.value = 2;
    sku.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row);

}

// 监听三级分类ID变化
watch(() => categoryStore.c3Id, () => {
    if (!categoryStore.c3Id) return
    getHasSpu();
});

/**
 * 获取三级分类下的spu
 */
const getHasSpu = async (pager = 1) => {
    pageNo.value = pager;
    const res: HasSpuResponseData = await reqHasSpu(pageNo.value, pageSize.value, categoryStore.c3Id);
    if (res.code === 200) {
        records.value = res.data.records;
        total.value = res.data.total;
    }
}

/**
 * 分页器展示条数改变改变
 */
const changeSize = () => {
    getHasSpu();
}

// 路由组件销毁前，清空仓库中的数据
onBeforeMount(() => {
    categoryStore.$reset();
});
</script>

<style scoped></style>