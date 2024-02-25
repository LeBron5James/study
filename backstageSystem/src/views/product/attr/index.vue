<!--
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-11-17 10:25:58
 * @LastEditTime: 2023-11-22 15:48:52
-->
<template>
    <div>
        <!-- 分类 -->
        <Category :scene="scene" />
        <!-- 属性展示 -->
        <el-card style="margin: 10px 0;">
            <div v-show="scene == 0">
                <el-button type="primary" size="default" icon="Plus" :disabled="categoryStore.c3Id ? false : true"
                    @click="addAttr">添加属性</el-button>
                <el-table border style="margin: 10px 0;" :data="attrArr">
                    <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
                    <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
                    <el-table-column label="属性值名称">
                        <template #="{ row }">
                            <el-tag style="margin:5px" v-for="item in row.attrValueList" :key="item.id">{{ item.valueName
                            }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120px">
                        <template #="{ row }">
                            <el-button type="primary" size="small" icon="Edit" @click="updateAttr(row)"></el-button>
                            <el-popconfirm :title="`你确定要删除${row.attrName}?`" width="250px" icon="Delete" @confirm="deleteAttr(row.id)">
                                <template #reference>
                                    <el-button type="danger" size="small" icon="Delete"></el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-show="scene == 1">
                <el-form :inline="true">
                    <el-form-item label="属性名称">
                        <el-input placeholder="请输入属性名称" v-model="attrParams.attrName"></el-input>
                    </el-form-item>
                </el-form>
                <el-button :disabled="attrParams.attrName ? false : true" type="primary" size="default" icon="Plus"
                    @click="addAttrValue">
                    添加属性值
                </el-button>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>
                <el-table border style="margin: 10px 0px;" :data="attrParams.attrValueList">
                    <el-table-column width="80px" type="index" align="center" label="序号"></el-table-column>
                    <el-table-column label="属性值名称">
                        <template #="{ row, $index }">
                            <el-input :ref="(vc: any) => inputArr[$index] = vc" v-if="row.flag" placeholder="请输入属性值名称"
                                v-model="row.valueName" @blur="toLook(row, $index)" />
                            <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="属性值操作">
                        <template #="{ row, $index }">
                            <el-button type="primary" size="small" icon="Delete"
                                @click="$event => attrParams.attrValueList.splice($index, 1)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" size="default" @click="save"
                    :disabled="attrParams.attrValueList.length > 0 ? false : true">保存</el-button>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { watch, ref, reactive, nextTick,onBeforeUnmount } from 'vue';
import { reqAttr, reqAddOrUpdateAttr, reqDeleteAttr } from '@/api/product/attr/index';
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type';
import { ElMessage } from 'element-plus';
// 获取category仓库
import useCategoryStore from '@/store/modules/category';
const categoryStore = useCategoryStore();

// 存储已有的属性
const attrArr = ref<Attr[]>([]);
// 控制card组件内容切换
let scene = ref<number>(0);
// 收集新增属性的数据
let attrParams = reactive<Attr>({
    attrName: "",
    attrValueList: [
    ],
    categoryId: '',
    categoryLevel: 3, //代表三级分类
});
// 收集创建的input输入框
let inputArr = ref<any>([]);

/**
 * 添加属性
 */
const addAttr = () => {
    scene.value = 1;
    // 清空
    Object.assign(attrParams, {
        attrName: "",
        attrValueList: [
        ],
        categoryId: categoryStore.c3Id,
        categoryLevel: 3,
    });
}

/**
 * 更新属性
 */
const updateAttr = (row: Attr) => {
    scene.value = 1;
    // 对象合并
    Object.assign(attrParams, JSON.parse(JSON.stringify(row)));
}
/**
 * 取消按钮
 */
const cancel = () => {
    scene.value = 0;
}

/**
 * 添加属性值
 */
const addAttrValue = () => {
    attrParams.attrValueList.push({
        valueName: '',
        flag: true,  //控制每个属性值编辑模式与切换模式
    });
    // 获取最后el-input组件聚焦
    nextTick(() => {
        inputArr.value[attrParams.attrValueList.length - 1].focus();
    })
}

/**
 * 编辑模式变查看模式
 */
const toLook = (row: AttrValue, $index: number) => {
    if (row.valueName.trim() === '') {
        attrParams.attrValueList.splice($index, 1);
        return ElMessage.error('属性值不能为空');
    }
    // 属性值不能相同
    let repeat = attrParams.attrValueList.find((item) => {
        if (item != row) {
            return item.valueName === row.valueName;
        }
    });
    if (repeat) {
        attrParams.attrValueList.splice($index, 1);
        return ElMessage.error('属性值不能相同');
    }
    row.flag = false;
}

/**
 * 查看模式变编辑模式
 */
const toEdit = (row: AttrValue, $index: number) => {
    row.flag = true;
    nextTick(() => {
        inputArr.value[$index].focus();
    });
}

/**
 * 保存
 */
const save = async () => {
    const res: any = await reqAddOrUpdateAttr(attrParams);
    if (res.code === 200) {
        scene.value = 0;
        ElMessage({
            message: attrParams.id ? '修改成功' : '添加成功',
            type: 'success',
        });
        getAttr();
    } else {
        ElMessage({
            message: attrParams.id ? '修改失败' : '添加失败',
            type: 'error',
        })
    }
}

/**
 * 删除属性
 * @param attrId 
 */
const deleteAttr = async (attrId: number) => {
    const res: any = await reqDeleteAttr(attrId);
    if (res.code === 200) {
        ElMessage({
            message: '删除成功',
            type: 'success',
        });
        getAttr();
    } else {
        ElMessage({
            message: '删除失败',
            type: 'error',
        });
    }
}



/**
 * 获取已有属性与属性值分类
 */
const getAttr = async () => {
    // 获取分类ID
    const { c1Id, c2Id, c3Id } = categoryStore;
    const res: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id);
    if (res.code === 200) {
        attrArr.value = res.data;
    }
}

// 监听三级分类ID
watch(() => categoryStore.c3Id, () => {
    attrArr.value = [];
    if (!categoryStore.c3Id) return;
    getAttr();
});

// 路由组件销毁时，清空仓库中的数据
onBeforeUnmount(() => {
    // 清空仓库
    categoryStore.$reset();
})
</script>

<style scoped></style>