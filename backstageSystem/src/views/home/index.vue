<!--
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-11-15 16:00:04
 * @LastEditTime: 2023-11-28 21:53:31
-->
<template>
    <el-card>
        <div class="home-container">
            <img :src="userStore.avatar" class="avatar" />
            <div class="title-warp">
                <h3 class="title">{{ getTime() }}! {{ userStore.username }}</h3>
                <p class="subtitle">{{ setting.title }}</p>
            </div>
        </div>
    </el-card>
    <div class="icon-warp">
        <SvgIcon name="welcome" width="400px" height="400px"></SvgIcon>
    </div>
</template>

<script setup lang="ts">
import useUserStore from "@/store/modules/user";
import { getTime } from "@/utils/time";
import setting from '@/setting';


// 引入用户仓库
const userStore = useUserStore();
</script>

<style scoped lang="scss">
.home-container {
    display: flex;

    .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }

    .title-warp {
        margin-left: 20px;
        margin-top: 10px;

        .title {
            font-size: 30px;
            font-weight: 900;
            margin-bottom: 20px;
        }

        .subtitle {
            font-style: italic;
            color: skyblue;
        }
    }

}
.icon-warp {
    margin-top: 50px;
    display: flex;
    justify-content: center;
}
</style>