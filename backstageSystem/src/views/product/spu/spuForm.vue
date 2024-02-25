<!--
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-11-22 22:16:31
 * @LastEditTime: 2023-11-24 16:49:29
-->
<template>
    <el-form label-width="100px">
        <el-form-item label="SPU名称">
            <el-input placeholder="请输入SPU名称" v-model="SpuParams.spuName" />
        </el-form-item>
        <el-form-item label="SPU品牌">
            <el-select v-model="SpuParams.tmId">
                <el-option v-for="item in allTradeMark" :key="item.id" :label="item.tmName" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
            <el-input type="textarea" placeholder="请输入SPU描述" v-model="SpuParams.description" />
        </el-form-item>
        <el-form-item label="SPU图片">
            <el-upload v-model:file-list="imgList" action="/api/admin/product/fileUpload" list-type="picture-card"
                :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>

            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%; height: 100%;" />
            </el-dialog>
        </el-form-item>
        <el-form-item label="SPU销售属性">
            <!-- 展示销售属性下拉菜单 -->
            <el-select v-model="saleAttrIdAndName"
                :placeholder="unSelectSaleAttr.length ? `还有${unSelectSaleAttr.length}个未选择` : '无'">
                <el-option v-for="item in unSelectSaleAttr" :label="item.name" :key="item.id"
                    :value="`${item.id}:${item.name}`"></el-option>
            </el-select>
            <el-button @click="addSaleAttr" :disabled="saleAttrIdAndName ? false : true" style="margin-left:10px ;"
                type="primary" size="default" icon="Plus">添加销售属性</el-button>
            <!-- table展示销售属性与属性值 -->
            <el-table border style="margin: 10px 0px;" :data="spuHasSaleAttr">
                <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
                <el-table-column label="销售属性名" width="120px" prop="saleAttrName"></el-table-column>
                <el-table-column label="属性值名称">
                    <template #="{ row }">
                        <el-tag style="margin: 0 5px;" @close="row.spuSaleAttrValueList.splice(index, 1)"
                            v-for="(tag, index) in row.spuSaleAttrValueList" :key="tag.id" class="mx-1" closable>
                            {{ tag.saleAttrValueName }}
                        </el-tag>
                        <el-input v-model="row.saleAttrValue" @blur="toLook(row)" v-if="row.flag == true"
                            placeholder="输入属性值" size="small" style="width:100px" />
                        <el-button v-else @click="toEdit(row)" type="primary" size="small" icon="Plus"></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120px">
                    <template #="{ row, $index }">
                        <el-button type="primary" size="small" icon="Delete"
                            @click="spuHasSaleAttr.splice($index, 1)"></el-button>
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
import { ref, computed } from 'vue';
import { reqAllTrademark, reqSpuImageList, reqSpuHasSaleAttr, reqAllSaleAttr, reqAddSpu } from '@/api/product/spu/index';
import type { SpuSaleAttrValue, Trademark, SpuImage, SpuData, HasSaleAttr, SaleAttr, AllTradeMark, SpuHasImg, SaleAttrResponseData, HasSaleAttrResponseData } from '@/api/product/spu/type';
import { ElMessage } from 'element-plus';

const $emit = defineEmits(['changeScene']);

// 控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false);
// 存储图片地址
let dialogImageUrl = ref<string>('');
// 存储已有的spu数据
let allTradeMark = ref<Trademark[]>([]);
// 存储照片数据
let imgList = ref<SpuImage[]>([]);
// spu销售属性
let spuHasSaleAttr = ref<SaleAttr[]>([]);
// 存储所有销售属性
let allSaleAttr = ref<HasSaleAttr[]>([]);
// 存储已有的spu对象
let SpuParams = ref<SpuData>({
    category3Id: '',  //三级分类id
    spuName: '', //spu名字
    description: '',  //spu描述
    tmId: '',  //品牌id
    spuImageList: [], //照片墙
    spuSaleAttrList: [],  //销售属性
});
// 收集选择的销售属性的id和name
let saleAttrIdAndName = ref<string>('');


/**
 * 属性值添加按钮
 */
const toEdit = (row: SaleAttr) => {
    row.flag = true;
    row.saleAttrValue = '';
}

/**
 * 添加属性值
 */
const toLook = (row: SaleAttr) => {
    // 整理收集到数据
    const { baseSaleAttrId, saleAttrValue } = row;
    let newSaleAttrValue: SpuSaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: (saleAttrValue as string)
    }
    if (saleAttrValue?.trim() == '') {
        ElMessage({
            message: '属性值不能空',
            type: 'error'
        })
        return;
    }
    if (row.spuSaleAttrValueList.find(item => item.saleAttrValueName == saleAttrValue)) {
        ElMessage({
            message: '属性值不能重复',
            type: 'error'
        });
        return;
    }
    // 追加新的属性值对象
    row.spuSaleAttrValueList.push(newSaleAttrValue);
    row.flag = false;
}



/**
 * 取消按钮，通知父组件切换场景
 */
const cancel = () => {
    $emit('changeScene',{flag:0,params:'update'});
}

/**
 * 获取所有品牌
 */
const getAllTrademark = async () => {
    const res: AllTradeMark = await reqAllTrademark();
    if (res.code === 200) {
        allTradeMark.value = res.data;
    }
}

/**
 * 获取spu的图片列表
 * @param id 
 */
const getImgList = async (id: number) => {
    const res: SpuHasImg = await reqSpuImageList(id);
    if (res.code === 200) {
        imgList.value = res.data.map(item => {
            return {
                name: item.imgName,
                url: item.imgUrl
            }
        });
    }
}

/**
 * 获取spu销售属性的数据
 * @param id 
 */
const getSpuSaleAttr = async (id: number) => {
    const res: SaleAttrResponseData = await reqSpuHasSaleAttr(id);
    if (res.code === 200) {
        spuHasSaleAttr.value = res.data;
    }
}

/**
 * 获取所有销售属性
 */
const getAllSaleAttr = async () => {
    const res: HasSaleAttrResponseData = await reqAllSaleAttr();
    if (res.code === 200) {
        allSaleAttr.value = res.data;
    }
}


/**
 * 照片墙预览钩子函数
 */
const handlePictureCardPreview = (file: any) => {
    // 存储图片地址
    dialogImageUrl.value = file.url;
    dialogVisible.value = true;
}

/**
 * 照片墙删除钩子函数
 */
const handleRemove = (file: any) => {

}

/**
 * 计算未选择的销售属性个数，并返回销售属性
 */
let unSelectSaleAttr = computed(() => {
    let unSelectArr = allSaleAttr.value.filter((item) => {
        return spuHasSaleAttr.value.every(item1 => {
            return item.name != item1.saleAttrName;
        });
    })
    return unSelectArr;
})

/**
 * 添加一个没选择的销售属性
 */
const addSaleAttr = () => {
    // 解构
    const [baseSaleAttrId, saleAttrName] = saleAttrIdAndName.value.split(":");
    const newSaleAttr: SaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
    }
    // 追加到数组中
    spuHasSaleAttr.value.push(newSaleAttr);
    saleAttrIdAndName.value = "";
}


/**
 * 保存
 */
 const save = async () => {
    // 收集照片墙
    SpuParams.value.spuImageList = imgList.value.map((item:any) => {
        return {
            imgName:item.name,
            imgUrl:(item.response&&item.response.data)||item.url
        }
    });
    // 整理销售属性
    SpuParams.value.spuSaleAttrList = spuHasSaleAttr.value;
    const res = await reqAddSpu(SpuParams.value)
    if(res.code === 200){
        ElMessage({
            type:'success',
            message:SpuParams.value.id?'更新成功':'添加成功'
        });
        // 通知切换场景
        $emit('changeScene',{flag:0,params:SpuParams.value.id?'update':'add'});
    }else{
        ElMessage({
            type:'error',
            message:SpuParams.value.id?'更新失败':'添加失败'
        });
    }
}


/**
 * 初始化已有的spu数据
 * @param spu 
 */
const initHasSpuData = (spu: SpuData) => {
    // 存储spu对象
    SpuParams.value = spu;
    getAllTrademark();
    getImgList((spu.id as number));
    getSpuSaleAttr((spu.id as number));
    getAllSaleAttr();
}

/**
 * 添加一个spu初始化数据
 */
const initAddSpu = (c3Id:number | string) => {
    // 清空数据
    Object.assign(SpuParams.value, {
        category3Id: "",//收集三级分类的ID
        spuName: "",//SPU的名字
        description: "",//SPU的描述
        tmId: '',//品牌的ID
        spuImageList: [],
        spuSaleAttrList: [],
    });
    //清空照片
    imgList.value = [];
    //清空销售属性
    spuHasSaleAttr.value = [];
    saleAttrIdAndName.value  = '';
    // 存储c3id
    SpuParams.value.category3Id = c3Id;
    getAllTrademark();
    getAllSaleAttr();
}

// 对外暴露
defineExpose({ initHasSpuData,initAddSpu })
</script>

<style scoped></style>