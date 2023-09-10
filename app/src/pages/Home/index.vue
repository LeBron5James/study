<!--
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-04-01 15:31:21
 * @LastEditTime: 2023-04-20 10:36:35
-->
<template>
  <div>
    <!-- 三级联动全局组件 -->
    <TypeNav></TypeNav>
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="floor in floorList" :key="floor.id" :floor='floor'/>
    <Brand />
  </div>
</template>

<script>
import { mapState } from "vuex";
//引入其余组件
import ListContainer from "./ListContainer";
import Recommend from "./Recommend";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";
export default {
  name: "index",
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
  mounted() {
    //派发action：通知Vuex发起ajax请求，将数据存储在仓库中
    this.$store.dispatch("getFloorList");
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style>
</style>