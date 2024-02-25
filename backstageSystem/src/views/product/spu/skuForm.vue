<!--
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-11-22 22:17:18
 * @LastEditTime: 2023-11-26 16:29:29
-->
<template>
    <el-form label-width="100px">
        <el-form-item label="SKU名称">
            <el-input placeholder="SKU名称" v-model="skuParams.skuName"></el-input>
        </el-form-item>
        <el-form-item label="价格(元)">
            <el-input placeholder="价格(元)" type="number" v-model="skuParams.price"></el-input>
        </el-form-item>
        <el-form-item label="重量(g)">
            <el-input placeholder="重量(g)" type="number" v-model="skuParams.weight"></el-input>
        </el-form-item>
        <el-form-item label="SKU描述">
            <el-input placeholder="SKU描述" type="textarea" v-model="skuParams.skuDesc"></el-input>
        </el-form-item>
        <el-form-item label="平台属性">
            <el-form :inline="true">
                <el-form-item v-for="item in attrArr" :key="item.id" :label="item.attrName">
                    <el-select v-model="item.attrIdAndValueId">
                        <!-- 将值收集到平台属性上 -->
                        <el-option :value="`${item.id}:${attrValue.id}`" v-for="attrValue in item.attrValueList"
                            :key="attrValue.id" :label="attrValue.valueName"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="销售属性">
            <el-form :inline="true">
                <el-form-item v-for="item in saleArr" :key="item.id" :label="item.saleAttrName">
                    <el-select v-model="item.saleIdAndValueId">
                        <el-option :value="`${item.id}:${saleAttrValue.id}`"
                            v-for="saleAttrValue in item.spuSaleAttrValueList" :key="saleAttrValue.id"
                            :label="saleAttrValue.saleAttrValueName"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="图片名称">
            <el-table border ref="table" :data="imgArr">
                <el-table-column type="selection" width="80px" align="center"></el-table-column>
                <el-table-column label="图片">
                    <template #="{ row, $index }">
                        <img :src="row.imgUrl" alt="" style="width:100px;height: 100px;">
                    </template>
                </el-table-column>
                <el-table-column label="名称" prop="imgName"></el-table-column>
                <el-table-column label="操作">
                    <template #="{ row, $index }">
                        <el-button type="primary" size="small" @click="handler(row)">设置默认</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default" @click="save">保存</el-button>
            <el-button type="primary" size="default" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { reqAttr } from '@/api/product/attr';
import { reqSpuImageList, reqSpuHasSaleAttr,reqAddSku } from '@/api/product/spu';
import { ref, reactive } from 'vue';
import type { SkuData } from '@/api/product/spu/type';
import { ElMessage } from 'element-plus';


// 平台属性
const attrArr = ref<any[]>([]);
// 销售属性
const saleArr = ref<any[]>([]);
// 图片列表
const imgArr = ref<any[]>([]);
// 收集的数据
const skuParams = reactive<SkuData>({
    //父组件传递过来的数据
    "category3Id": "",//三级分类的ID
    "spuId": "",//已有的SPU的ID
    "tmId": "",//SPU品牌的ID
    //v-model收集
    "skuName": "",//sku名字
    "price": "",//sku价格
    "weight": "",//sku重量
    "skuDesc": "",//sku的描述

    "skuAttrValueList": [//平台属性的收集
    ],
    "skuSaleAttrValueList": [//销售属性
    ],
    "skuDefaultImg": "",//sku图片地址
});

// 获取table组件
const table = ref<any>();






const $emit = defineEmits(['changeScene']);

/**
 * 取消按钮
 */
const cancel = () => {
    $emit('changeScene', { flag: 0, params: '' });
}

/**
 * 保存按钮
 */
const save = async () => {
    // 整理平台数据
    skuParams.skuAttrValueList = attrArr.value.reduce((pre: any, next: any) => {
        if (next.attrIdAndValueId) {
            const [attrId, valueId] = next.attrIdAndValueId.split(':');
            pre.push({
                attrId,
                valueId
            });
        }
        return pre;
    }, []);
    // 整理销售数据
    skuParams.skuSaleAttrValueList = saleArr.value.reduce((pre: any, next: any) => {
        if (next.saleAttrIdAndValueId) {
            const [saleAttrId, saleAttrValueId] = next.saleAttrIdAndValueId.split(':');
            pre.push({
                saleAttrId,
                saleAttrValueId
            });
        }
        return pre;
    }, []);
    const res = await reqAddSku(skuParams);
    if(res.code === 200){
        ElMessage({
            type:"success",
            message:"添加成功"
        });
        $emit('changeScene', { flag: 0, params: '' });
    }else{
        ElMessage({
            type:"error",
            message:"添加失败"
        });
    }
}

/**
 * 获取平台属性
 */
const getAttr = async (c1Id: number | string, c2Id: number | string, spu: any) => {
    const res = await reqAttr(c1Id, c2Id, spu.category3Id);
    if (res.code === 200) {
        attrArr.value = res.data;
    }
}

/**
 * 获取对应的销售属性
 */
const getSaleAttr = async (id: number) => {
    const res = await reqSpuHasSaleAttr(id);
    if (res.code === 200) {
        saleArr.value = res.data;
    }
}

/**
 * 获取照片墙属性
 */
const getImgList = async (spuId: number) => {
    const res = await reqSpuImageList(spuId);
    if (res.code === 200) {
        imgArr.value = res.data;
    }
}

/**
 * 设置图片默认样式
 * @param row 
 */
const handler = (row: any) => {
    imgArr.value.forEach((item: any) => {
        table.value.toggleRowSelection(item, false);
    });
    // 复选框选中
    table.value.toggleRowSelection(row, true);
    // 收集图片地址
    skuParams.skuDefaultImg = row.imgUrl;
}




/**
 * 初始化sku已有的数据
 */
const initSkuData = (c1Id: number | string, c2Id: number | string, spu: any) => {
    // 收集数据
    skuParams.category3Id = spu.category3Id;
    skuParams.spuId = spu.id;
    skuParams.tmId = spu.tmId;
    getAttr(c1Id, c2Id, spu);
    getSaleAttr(spu.id);
    getImgList(spu.id);
}

// 对外暴露
defineExpose({ initSkuData })
</script>

<style scoped></style>