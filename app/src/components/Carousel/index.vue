<!--
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-04-07 17:23:11
 * @LastEditTime: 2023-04-07 18:11:51
-->
<template>
  <!--轮播图-->
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    //监听bannerList数据的变化
    list: {
      //立即监听
      immediate: true,
      handler() {
        //通过watch监听bannerList属性的属性值的变化
        this.$nextTick( () => {
          //当执行这个回调时，保证服务器数据回来了，节点创建完毕
          var mySwiper = new Swiper(this.$refs.mySwiper, {
            loop: true,
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true, //分页器可以点击
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>