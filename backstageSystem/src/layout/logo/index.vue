<template>
    <div class="logo_container" v-if="setting.logoHidden">
        <img :src="setting.logo" >
        <p>{{ setting.title }}</p>
    </div>
</template>

<script setup lang="ts">
import setting from '@/setting';
</script>

<style scoped lang="scss">
.logo_container{
    width: 100%;
    height: $base-menu-logo-height;
    color: #fff;
    display: flex;
    align-items: center;
    padding: 10px;
    img{
        width: 40px;
        height: 40px;
    }
    p{
        font-size: $base-logo-title-font-size;
        margin-left: 10px;
    }
}
</style>