<!--
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-11-17 10:26:40
 * @LastEditTime: 2023-11-29 19:55:16
-->
<template>
    <div>
        <el-card class="box-card">
            <el-button type="primary" icon="Plus" @click="addTrademark" v-has="`btn.TradeMark.add`">添加品牌</el-button>
            <el-table style="margin: 10px 0px;" border :data="trademarkList">
                <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
                <!-- 默认展示数据是div，可以使用作用域更改 -->
                <el-table-column label="品牌名称" prop="tmName"></el-table-column>
                <el-table-column label="品牌LOGO">
                    <template #="{ row, $index }">
                        <img :src="row.logoUrl" style="width: 100px;height: 100px;" alt="图片加载失败">
                    </template>
                </el-table-column>
                <el-table-column label="品牌操作">
                    <template #="{ row }">
                        <el-button type="primary" size="small" icon="Edit" @click="updateTrademark(row)">编辑</el-button>
                        <el-popconfirm :title="`你确定要删除${row.tmName}?`" width="250px" icon="Delete"
                            @confirm="deleteTrademark(row.id)">
                            <template #reference>
                                <el-button type="danger" size="small" icon="Delete">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 
               v-model:current-page:设置分页器当前的页码
               v-model:page-size:设置每页显示多少条数据
               :page-sizes:设置每页显示多少条数据
               layout:设置分页器显示的内容以及布局
            -->
            <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]"
                :background="true" layout=" prev, pager, next, jumper, -> , total, sizes" :total="total"
                @current-change="changePageNo" @size-change="sizeChange" />
        </el-card>
        <!-- 对话框组件 -->
        <el-dialog v-model="dialogFormVisible" :title="trademarkForm.id ? '修改品牌' : '添加品牌'">
            <el-form style="width: 80%;" :model="trademarkForm" :rules="rules" ref="formRef">
                <el-form-item label="品牌名称" label-width="100px" prop="tmName">
                    <el-input placeholder="请输入品牌名称" v-model="trademarkForm.tmName" />
                </el-form-item>
                <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
                    <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="trademarkForm.logoUrl" :src="trademarkForm.logoUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <!-- 具名插槽 -->
            <template #footer>
                <el-button type="primary" @click="canael">取消</el-button>
                <el-button type="primary" @click="confirm">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ElMessage, type UploadProps } from 'element-plus'
import { ref, reactive, onMounted, nextTick } from 'vue';
import { reqHasTrademark, reqAddOrUpdateTrademark, reqDeleteTrademark } from '@/api/product/trademark/index';
import type { Records, TradeMarkResponseData, TradeMark } from '@/api/product/trademark/type';

// 当前页码
let pageNo = ref<number>(1);
// 每页展示多少条数据
let limit = ref<number>(3);
// 存储已有品牌总数
let total = ref<number>(0);
// 存储已有品牌数据
let trademarkList = ref<Records>([]);
// 控制对话框显示与隐藏
let dialogFormVisible = ref<boolean>(false);
// 收集对话框表单数据
const trademarkForm = reactive<TradeMark>({
    tmName: '',
    logoUrl: ''
});
// 获取对话框表单
const formRef = ref();

/**
 * 获取已有品牌的方法
 */
const getHasTrademark = async (pager = 1) => {
    pageNo.value = pager;
    const res: TradeMarkResponseData = await reqHasTrademark(pageNo.value, limit.value);
    if (res.code === 200) {
        total.value = res.data.total;
        trademarkList.value = res.data.records;
    }
}
/**
 * 监听分页器页码变化
 */
const changePageNo = () => {
    console.log(pageNo.value);
    // 当前页码发生变化时，在发请求
    getHasTrademark(pageNo.value);
}

/**
 * 监听每页展示多少条数据的变化
 */
const sizeChange = () => {
    // 每页展示多少条数据发生变化时，在发请求
    pageNo.value = 1;
    getHasTrademark();
}

/**
 * 添加品牌
 */
const addTrademark = () => {
    // 清空数据
    delete trademarkForm.id;
    trademarkForm.tmName = '';
    trademarkForm.logoUrl = '';
    dialogFormVisible.value = true;
    // 清空提示信息
    nextTick(() => {
        formRef.value.clearValidate(['tmName', 'logoUrl']);
    });
}

/**
 * 上传图片之前的钩子函数
 * 约束上传的文件类型，大小等
 */
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    //钩子是在图片上传成功之前触发,上传文件之前可以约束文件类型与大小
    //要求:上传文件格式png|jpg|gif 4M
    console.log(11)
    if (rawFile.type == 'image/png' || rawFile.type == 'image/jpeg' || rawFile.type == 'image/gif') {
        if (rawFile.size / 1024 / 1024 < 4) {
            console.log(22)
            return true;
        } else {
            ElMessage({
                type: 'error',
                message: '上传文件大小小于4M'
            })
            return false;
        }
    } else {
        ElMessage({
            type: 'error',
            message: "上传文件格式务必PNG|JPG|GIF"
        })
        console.log(33)
        return false;
    }
}

/**
 * 图片上传成功的钩子函数
 * @param response 当前上传图片的响应数据
 * @param uploadFile 
 */
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    // 收集上传成功的图片地址
    trademarkForm.logoUrl = response.data;
    // 清除校验字段提示信息
    formRef.value.clearValidate('logoUrl');
}

/**
 * 修改品牌
 */
const updateTrademark = (row: TradeMark) => {
    nextTick(() => {
        formRef.value.clearValidate(['tmName', 'logoUrl']);
    });
    dialogFormVisible.value = true;
    /*  trademarkForm.tmName = row.tmName;
     trademarkForm.logoUrl = row.logoUrl;
     trademarkForm.id = row.id; */
    Object.assign(trademarkForm, row);
}

/**
 * 对话框取消按钮
 */
const canael = () => {
    dialogFormVisible.value = false;
}

/**
 * 对话框确认按钮
 */
const confirm = async () => {
    // 对表单进行校验
    await formRef.value.validate();
    const res: any = await reqAddOrUpdateTrademark(trademarkForm);
    if (res.code == 200) {
        dialogFormVisible.value = false;
        ElMessage({
            message: trademarkForm.id ? '修改品牌成功' : '添加品牌成功',
            type: 'success'
        });
        getHasTrademark();
    } else {
        ElMessage({
            message: trademarkForm.id ? '修改品牌失败' : "添加品牌失败",
            type: 'error'
        });
        dialogFormVisible.value = false;
    }
}

/**
 * 删除已有品牌的id
 * @param id
 */
const deleteTrademark = async (id: number) => {
    const res = await reqDeleteTrademark(id);
    if (res.code == 200) {
        ElMessage({
            message: '删除品牌成功',
            type: 'success'
        });
        getHasTrademark(trademarkList.value.length > 1 ? pageNo.value : pageNo.value - 1);
    } else {
        ElMessage({
            message: '删除品牌失败',
            type: 'error'
        });
    }
}

/**
 * 校验品牌名称
 * @param rule 
 * @param value 
 * @param callBack 
 */
const validatorTmName = (rule: any, value: any, callBack: any) => {
    if (value.trim().length >= 2) {
        callBack();
    } else {
        callBack(new Error('品牌名称不能少于2位'));
    }
}

/**
 * 检验图片地址
 * @param rule 
 * @param value 
 * @param callBack 
 */
const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
    if (value) {
        callBack();
    } else {
        callBack(new Error('请上传品牌logo'));
    }
}

/**表单校验规则对象 */
const rules = {
    tmName: [
        { required: true, trigger: 'blur', validator: validatorTmName }
    ],
    logoUrl: [
        { required: true, validator: validatorLogoUrl }
    ]
}


onMounted(() => {
    getHasTrademark();
})
</script>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>