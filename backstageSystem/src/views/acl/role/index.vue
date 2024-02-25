<!--
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-11-17 10:15:14
 * @LastEditTime: 2023-11-28 16:47:21
-->
<template>
    <el-card>
        <el-form :inline="true" class="form">
            <el-form-item label="职位搜索">
                <el-input placeholder="请你输入搜索职位关键字" v-model="keyword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default" :disabled="keyword ? false : true" @click="search">搜索</el-button>
                <el-button type="primary" size="default" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px 0px;">
        <el-button type="primary" size="default" icon="Plus" @click="addRole">添加职位</el-button>
        <el-table border style="margin: 10px 0px;" :data="allRole">
            <el-table-column type="index" align="center" label="#"></el-table-column>
            <el-table-column label="ID" align="center" prop="id"></el-table-column>
            <el-table-column label="职位名称" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建时间" align="center" show-overflow-tooltip prop="createTime"></el-table-column>
            <el-table-column label="更新时间" align="center" show-overflow-tooltip prop="updateTime"></el-table-column>
            <el-table-column label="操作" width="280px" align="center">
                <!-- row:已有的职位对象 -->
                <template #="{ row, $index }">
                    <el-button type="primary" size="small" icon="User" @click="setPermisstion(row)">分配权限</el-button>
                    <el-button type="primary" size="small" icon="Edit" @click="updateRole(row)">编辑</el-button>
                    <el-popconfirm :title="`你确定要删除${row.roleName}?`" width="260px" @confirm="removeRole(row.id)">
                        <template #reference>
                            <el-button type="primary" size="small" icon="Delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
            :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total" @current-change="getHasRole"
            @size-change="sizeChange" />
    </el-card>
    <!-- 添加职位与更新已有职位的结构:对话框 -->
    <el-dialog v-model="dialogVisite" :title="RoleParams.id ? '更新职位' : '添加职位'">
        <el-form :model="RoleParams" :rules="rules" ref="form">
            <el-form-item label="职位名称" prop="roleName">
                <el-input placeholder="请你输入职位名称" v-model="RoleParams.roleName"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="primary" size="default" @click="dialogVisite = false">取消</el-button>
            <el-button type="primary" size="default" @click="save">确定</el-button>
        </template>
    </el-dialog>
    <!-- 抽屉组件:分配职位的菜单权限与按钮的权限 -->
    <el-drawer v-model="drawer">
        <template #header>
            <h4>分配菜单与按钮的权限</h4>
        </template>
        <template #default>
            <!-- 树形控件 -->
            <el-tree ref="tree" :data="menuArr" show-checkbox node-key="id" default-expand-all
                :default-checked-keys="selectArr" :props="defaultProps" />
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="drawer = false">取消</el-button>
                <el-button type="primary" @click="handler">确定</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script setup lang="ts">
import useLayoutSettingStore from "@/store/modules/setting";
import { ref, onMounted, reactive,nextTick } from "vue";
import { reqAllRoleList, reqAllMenuList,reqSetPermisstion,reqAddOrUpdateRole,reqRemoveRole } from "@/api/acl/role/index";
import type { RoleResponseData, Records, RoleData, MenuResponseData, MenuList } from "@/api/acl/role/type";
import { ElMessage } from "element-plus";

//当前页码
const pageNo = ref<number>(1);
//一页展示几条数据
const pageSize = ref<number>(10);
//搜索职位关键字
const keyword = ref<string>('');
//存储全部已有的职位
let allRole = ref<Records>([]);
//职位总个数
let total = ref<number>(0);
//收集新增岗位数据
const RoleParams = reactive<RoleData>({
    roleName: ''
});
//定义数组存储用户权限的数据
const menuArr = ref<MenuList>([]);
//准备一个数组:数组用于存储勾选的节点的ID(四级的)
const selectArr = ref<number[]>([]);
//获取form组件实例
const form = ref<any>();
//获取tree组件实例
const tree = ref<any>();
// 控制抽屉显示与隐藏
const drawer = ref<boolean>(false);
//控制对话框的显示与隐藏
const dialogVisite = ref<boolean>(false);
// 引入仓库
const settingStore = useLayoutSettingStore();

/**
 * 搜索按钮
 */
const search = () => {
    getHasRole();
    keyword.value = '';
}

/**
 * 重置按钮
 */
const reset = () => {
    settingStore.refsh = !settingStore.refsh;
}

/**
 * 添加职位
 */
const addRole = () => {
    //对话框显示出来
    dialogVisite.value = true;
    //清空数据
    Object.assign(RoleParams, {
        roleName: '',
        id: 0
    });
    //清空上一次表单校验错误结果
    nextTick(() => {
        form.value.clearValidate('roleName');
    })

}


/**
 * 分配权限按钮
 * @param row 
 */
const setPermisstion = async (row: RoleData) => {
    //抽屉显示出来
    drawer.value = true;
    //收集当前要分类权限的职位的数据
    Object.assign(RoleParams, row);
    //根据职位获取权限的数据
    let result: MenuResponseData = await reqAllMenuList((RoleParams.id as number));
    if (result.code == 200) {
        menuArr.value = result.data;
        selectArr.value = filterSelectArr(menuArr.value, []);
    }
}
/**
 * 编辑按钮
 * @param row 
 */
const updateRole = (row: RoleData) => {
    //显示出对话框
    dialogVisite.value = true;
    //存储已有的职位----带有ID的
    Object.assign(RoleParams, row);
    //清空上一次表单校验错误结果
    nextTick(() => {
        form.value.clearValidate('roleName');
    })
}
/**
 * 删除按钮
 * @param id 
 */
const removeRole = async (id: number) => {
    let result: any = await reqRemoveRole(id);
    if (result.code == 200) {
        //提示信息
        ElMessage({ type: 'success', message: '删除成功' });
        getHasRole(allRole.value.length > 1 ? pageNo.value : pageNo.value - 1);
    }
}

/**
 * 分配权限确定按钮
 */
const handler = async () => {
    //职位的ID
    const roleId = (RoleParams.id as number);
    //选中节点的ID
    let arr = tree.value.getCheckedKeys();
    //半选的ID
    let arr1 = tree.value.getHalfCheckedKeys();
    let permissionId = arr.concat(arr1);
    //下发权限
    let result: any = await reqSetPermisstion(roleId, permissionId);
    if (result.code == 200) {
        //抽屉关闭
        drawer.value = false;
        //提示信息
        ElMessage({ type: 'success', message: '分配权限成功' });
        //页面刷新
        window.location.reload();
    }
}

/**
 * 添加与更新职位确定按钮
 */
const save = async () => {
    //表单校验结果,结果通过在发请求、结果没有通过不应该在发生请求
    await form.value.validate();
    //添加职位|更新职位的请求
    let result: any = await reqAddOrUpdateRole(RoleParams);
    if (result.code == 200) {
        //提示文字
        ElMessage({ type: 'success', message: RoleParams.id ? '更新成功' : '添加成功' });
        //对话框显示
        dialogVisite.value = false;
        //再次获取全部的已有的职位
        getHasRole(RoleParams.id ? pageNo.value : 1);
    }
}

/**
 * 获取全部用户信息的方法|分页器当前页码发生变化的回调
 * @param pager 
 */
const getHasRole = async (pager = 1) => {
    //修改当前页码
    pageNo.value = pager;
    let result: RoleResponseData = await reqAllRoleList(pageNo.value, pageSize.value, keyword.value);
    if (result.code == 200) {
        total.value = result.data.total;
        allRole.value = result.data.records;
    }
}
//下拉菜单的回调
const sizeChange = () => {
    getHasRole();
}
//组件挂载完毕
onMounted(() => {
    //获取职位请求
    getHasRole();
});

//树形控件的测试数据
const defaultProps = {
    children: 'children',
    label: 'name',
}
const filterSelectArr = (allData: any, initArr: any) => {
    // 遍历所有数据
    allData.forEach((item: any) => {
        // 如果当前数据被选中，且层级为4
        if (item.select && item.level == 4) {
            // 将当前数据的id添加到初始数组中
            initArr.push(item.id);
        }
        // 如果当前数据有子数据，且子数据长度大于0
        if (item.children && item.children.length > 0) {
            // 递归调用filterSelectArr函数，传入当前数据的子数据和初始数组
            filterSelectArr(item.children, initArr);
        }
    })
    // 返回初始数组
    return initArr;
}

//自定义校验规则的回调
const validatorRoleName = (rule: any, value: any, callBack: any) => {
    if (value.trim().length >= 2) {
        callBack();
    } else {
        callBack(new Error('职位名称至少两位'))
    }
}
//职位校验规则
const rules = {
    roleName: [
        { required: true, trigger: 'blur', validator: validatorRoleName }
    ]
}
</script>

<style scoped></style>