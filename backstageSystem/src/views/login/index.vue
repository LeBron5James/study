<!--
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-11-15 16:00:04
 * @LastEditTime: 2023-11-18 17:40:45
-->
<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
                    <h1>Hello</h1>
                    <h2>欢迎来到xxx</h2>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="loginForm.password"
                            show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" class="login_btn" type="primary" size="default"
                            @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElNotification } from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue';
import { useRouter,useRoute } from 'vue-router';
// 引入用户相关的pinia小仓库
import useUserStore from '@/store/modules/user';
let useStore = useUserStore();
// 引入获取当前时间函数
import { getTime } from '@/utils/time';

// 获取路由器
const router = useRouter();
const route = useRoute();

//收集账号密码
let loginForm = reactive({ username: "admin", password: "atguigu123" });
// 控制按钮加载效果
let loading = ref(false);
// 获取el-form组件
const loginForms = ref();

// 登录
const login = async () => {
    // 保证全部表单校验通过
    await loginForms.value.validate();

    loading.value = true;
    try {
        await useStore.userLogin(loginForm);
        // 编程式导航跳转到首页
        const redirect:any = route.query.redirect;
        router.push({path:redirect || '/'});
        // 登录成功信息
        ElNotification({
            message: '欢迎回来',
            type: 'success',
            title: `Hi, ${getTime()}`
        });
        loading.value = false;
    } catch (error) {
        loading.value = false;
        ElNotification({
            type: 'error',
            message: (error as Error).message
        });
    }
}

// 自定义校验规则
const validatorUserName = (rule:any,value:any,callback:any) => {
    // 判断用户名是否为空
    if (value.trim().length === 0) {
        callback(new Error('用户名不能为空'));
    } else {
        callback();
    }
}
const validatorPwd = (rule:any,value:any,callback:any) => {
    // 判断密码是否为空
    if (value.trim().length === 0) {
        callback(new Error('密码不能为空'));
    } else {
        callback();
    }
}
// 定义表单校验需要的配置对象
const rules = {
    username: [
        { validator: validatorUserName, trigger: 'change' }
    ],
    password: [
    { validator: validatorPwd, trigger: 'change' }
    ]
}

</script>

<style scoped lang="scss">
.login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;

    .login_form {
        position: relative;
        width: 75%;
        top: 30vh;
        background: url('@/assets/images/login_form.png') no-repeat;
        background-size: cover;
        padding: 40px;

        h1 {
            color: #fff;
            font-size: 40px;
        }

        h2 {
            color: #fff;
            font-size: 20px;
            margin: 20px 0px;
        }

        .login_btn {
            width: 100%;
        }
    }
}
</style>