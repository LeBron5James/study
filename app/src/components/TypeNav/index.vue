<!--
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-04-01 21:50:03
 * @LastEditTime: 2023-04-13 15:36:17
-->
<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委托  --交给父元素 -->
      <div @mouseleave="leaveIndex" @mouseenter="enterIndex">
        <h2 class="all">全部商品分类</h2>
        <!-- 过度动画 -->
        <transition name="sort">
          <!-- 三级联动 -->
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//引入方式：是把lodash全部功能函数引入
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      //存储用户鼠标移上第几个一级分类
      currentIndex: -1,
      //判断是否隐藏三级联动
      show: true,
    };
  },
  //组件挂载完毕：可以向服务器发请求
  mounted() {
    //如果不是home页面，隐藏三级联动
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      //value是一个函数，当时用这个计算函数时，函数会立即执行
      //注入一个参数state，其实即为大仓库中的数据
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
    
  },
  methods: {
    //鼠标进入修改响应式数据currentIndex值
    //节流  --throttle回调函数别用箭头函数，this指向出问题
    changeIndex: throttle(function (index) {
      /* 
      正常情况(用户慢慢的操作)：鼠标进入，每一个一级分类，都会触发鼠标进入事件
      非正常情况(用户操作很快):本身全部的一级分类都应该触发鼠标进入事件，但经过测试，只有部分h3触发了
      由于用户行为过快，导致浏览器反应不过来，如果当前回调函数中有一些大量业务，有可能出现卡顿现象
    */
      this.currentIndex = index;
    }, 100),
    //一级分类，鼠标移出
    leaveIndex() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    enterIndex() {
      this.show = true;
    },
    //进行路由的跳转
    goSearch(event) {
      //最好的解决方案：编程式+事件委派
      //如何确定是a标签：把子节点当中的a标签，加上自定义属性data-categoryName。
      let element = event.target;
      //获取节点的自定义属性
      let { categoryname, category1id, category2id, category3id } = element.dataset;
      if (categoryname) {
        //整理路由跳转参数
        let location = { name: "search" };
        //传入的query参数的categoryName
        let query = { categoryName: categoryname };
        if (category1id) {
          //添加一个传入的query参数的categoryid1
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }

        //整理完参数
        //如果路由跳转，带有
        if (this.$route.params) {
          location.params = this.$route.params;
          location.query = query;
          this.$router.push(location);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 28px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          /*  &:hover {
            .item-list {
              display: block;
            }
          } */
        }
        .cur {
          background: skyblue;
        }
      }
    }
    //过渡动画的样式
    .sort-enter {
      height: 0px;
    }
    .sort-enter-to {
      height: 461px;
    }
    //定义动画时间，速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>>
