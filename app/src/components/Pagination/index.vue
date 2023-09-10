<!--
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-04-10 21:39:40
 * @LastEditTime: 2023-04-11 11:15:54
-->
<template>
  <div class="pagination">
    <button :disabled='pageNo==1' @click="pageUp">上一页</button>
    <button v-show="startNumAndEndNum.start >=2" @click="$emit('getPageNo',1)" :class="{active:pageNo == 1}">1</button>
    <button v-show="startNumAndEndNum.start >2">···</button>

    <!-- 中间结构  为什么要遍历end ： 看v-for遍历数字的文档 -->
    <button v-for="(page,index) in startNumAndEndNum.end" :key="index" v-if="page>=startNumAndEndNum.start" @click="$emit('getPageNo',page)" :class="{active:pageNo == page}">{{page}}</button>

    <button v-show="startNumAndEndNum.end < totalPage-1 ">···</button>
    <button v-show="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo == totalPage}">{{ totalPage }}</button>
    <button :disabled="pageNo==totalPage" @click="pageDown">下一页</button>

    <button style="margin-left: 30px">共{{total}}条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  // 当前第几页，一页几条数据，总共多少条数据，连续的页码个数
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    //计算总共多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize); //向上取整
    },
    //计算出连续的页码的起始数字与结束数字
    startNumAndEndNum() {
      //为了减少this的使用，解构
      let { continues, totalPage, pageNo } = this;
      let start = 0,
        end = 0;
      //判断数据不够页码数
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        if (start <= 1) {
          start = 1;
          end = continues;
        }
        if (end >= totalPage) {
          start = totalPage - continues + 1;
          end = totalPage;
        }
      }

      return { start, end };
    },
  },
  methods: {
    pageUp() {
      this.$emit('getPageNo',this.pageNo - 1)
    },
    pageDown() {
      this.$emit('getPageNo',this.pageNo + 1)
    }
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active{
  background-color: skyblue;
}
</style>