<template>
  <div
    class="demo-table"
    style="display: flex; flex-direction: column; align-items: center"
  >
    <div @click="goScrollIndex">点击滚动到指定下标</div>
    <input type="text" v-model="scrollToIndex" />
    <br />
    <div @click="goScrollOffset">点击滚动到指定高度</div>
    <input type="text" v-model="scrollToOffset" />
    <br />
    <div @click="goScrollIntoView">点击显示某一行</div>
    <input type="text" v-model="scrollIntoViewIndex" />
    <br />
    <br />
    <div>加载行数 {{ this.list.length }}</div>
    <br />
    <!-- <div class="loader"></div> -->

    <div class="demo">
      <!-- 提前请求 -->
      <VirtualList
        ref="virtualListRef"
        :itemComponent="itemComponent"
        :minSize="64"
        :list="list"
        @scrollForward="onScrollForward"
        @scrollBackward="onScrollBackward"
        :itemKey="rowKeyName"
        headerClass="header"
        :headerStyle="`width: ${1500}px;`"
        :listStyle="`width: ${1500}px;`"
      >
        <!-- <template #header>
          <div :style="`display: flex; align-items: center; justify-content: center;`" class="demo-cell"
            style="width: 80px;">序号</div>
          <div class="demo-cell" style="width: 600px;">原文</div>
          <div class="demo-cell" style="width: 600px;">译文</div>
          <div class="demo-cell" style="width: 100px; position: sticky; right: 0; background-color: #fff;">
            操作
          </div>
        </template> -->
        <!-- <template #footer>
          <div style="height: 40px; display: flex; align-items: center;">
            <template v-if="page + pageCached >= maxpage">
              没有更多了
            </template>
            <template v-else>
              <svg viewBox="25 25 50 50" class="circular">
                <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
              </svg>
            </template>
          </div>
        </template> -->
      </VirtualList>
    </div>
  </div>
</template>

<script>
import { VirtualList } from '../../../src';
import { getParagraphList, asyncGetRows } from '../../utils/common';
import Item from './Item.vue';

export default {
  name: 'Pagination',
  components: {
    VirtualList,
  },
  data() {
    return {
      itemComponent: Item,

      list: [],
      maxpage: 5,
      page: 1, // 1
      pageCached: 1, // 缓存1页
      pageSize: 40,
      count: 1,
      rowKeyName: 'id',

      scrollToIndex: 10,
      scrollToOffset: 200,
      scrollIntoViewIndex: 3,
    };
  },
  async mounted() {
    const pageList = await asyncGetRows(this.page, this.pageSize);
    // 多请求一页缓存
    const pageListCache = await asyncGetRows(
      this.page + this.pageCached,
      this.pageSize,
    );
    this.list = pageList.concat(pageListCache);
  },
  methods: {
    onBlur(e, row) {
      console.log(row);
      this.$refs.virtualListRef.deleteItemSize(itemData.id);
      this.list.find((item) => item.id === itemData.id);
      itemData.en = e.target.innerText;
    },
    goScrollIndex() {
      this.$refs.virtualListRef.scrollToIndex(this.scrollToIndex);
    },
    goScrollOffset() {
      this.$refs.virtualListRef.scrollToOffset(this.scrollToOffset);
    },
    goScrollIntoView() {
      this.$refs.virtualListRef.scrollIntoView(this.scrollIntoViewIndex);
    },
    async onScrollForward(start, views) {
      console.log(start, views);

      if (start <= this.pageSize) {
        if (this.isLoading) {
          return;
        }
        if (this.page <= 1) return;

        this.isLoading = true;
        setTimeout(async () => {
          this.page -= 1;
          const prevList = await asyncGetRows(this.page, this.pageSize);
          this.list = prevList.concat(this.list);
          // console.log('onToBottom', '新增', this.list)

          // 这里需要计算一下滚动到哪里去
          let size = 0;
          for (let i = 0; i <= prevList.length - 1; i += 1) {
            size += this.$refs.virtualListRef.getItemSize(
              prevList[i][this.rowKeyName],
            );
            this.$refs.virtualListRef.deleteItemSize(
              prevList[i][this.rowKeyName],
            );
          }

          // console.log('=====offset', size)

          this.$refs.virtualListRef.scrollToOffset(size);

          setTimeout(() => {
            this.$refs.virtualListRef.deleteBottomList(this.pageSize);
            // console.log('onToBottom', '删除', this.list)
            this.isLoading = false;
          }, 50);

          this.isLoading = false;
        }, 500);
      }
    },
    async onScrollBackward(start, views) {
      console.log(start, views);
      if (start + views >= 2 * this.pageSize - this.pageSize) {
        console.log(start, views, '==========');

        if (this.isLoading) {
          return;
        }
        // 超过最大页码 5
        if (this.page + this.pageCached >= this.maxpage) {
          console.warn('已到最大页码', this.page);
          return;
        }
        this.isLoading = true;
        setTimeout(async () => {
          this.page += 1;
          const nextRows = await asyncGetRows(
            this.page + this.pageCached,
            this.pageSize,
          );
          this.list = this.list.concat(nextRows);
          // console.log('onToBottom', '新增', this.list)

          setTimeout(() => {
            this.$refs.virtualListRef.deleteTopList(this.pageSize);
            // console.log('onToBottom', '删除', this.list)
            this.isLoading = false;
          }, 50);
        }, 50);
      }
    },
    async onToTop() {
      if (this.isLoading) {
        return;
      }
      if (this.page <= 1) return;

      this.isLoading = true;
      setTimeout(async () => {
        this.page -= 1;
        const prevList = await asyncGetRows(this.page, this.pageSize);
        this.list = prevList.concat(this.list);
        // console.log('onToBottom', '新增', this.list)

        // 这里需要计算一下滚动到哪里去
        let size = 0;
        for (let i = 0; i <= prevList.length - 1; i += 1) {
          size += this.$refs.virtualListRef.getItemSize(
            prevList[i][this.rowKeyName],
          );
          this.$refs.virtualListRef.deleteItemSize(
            prevList[i][this.rowKeyName],
          );
        }

        // console.log('=====offset', size)

        this.$refs.virtualListRef.scrollToOffset(size);

        setTimeout(() => {
          this.$refs.virtualListRef.deleteBottomList(this.pageSize);
          // console.log('onToBottom', '删除', this.list)
          this.isLoading = false;
        }, 50);

        this.isLoading = false;
      }, 500);
    },
    async onToBottom() {
      // console.log('onToBottom')
      if (this.isLoading) {
        return;
      }
      // 超过最大页码 5
      if (this.page + this.pageCached >= this.maxpage) {
        console.warn('已到最大页码', this.page);
        return;
      }
      this.isLoading = true;
      setTimeout(async () => {
        this.page += 1;
        const nextRows = await asyncGetRows(
          this.page + this.pageCached,
          this.pageSize,
        );
        this.list = this.list.concat(nextRows);
        // console.log('onToBottom', '新增', this.list)

        setTimeout(() => {
          this.$refs.virtualListRef.deleteTopList(this.pageSize);
          // console.log('onToBottom', '删除', this.list)
          this.isLoading = false;
        }, 50);
      }, 50);
    },
  },
};
</script>

<style lang="scss">
.demo-table {
  font-size: 14px;
  font-family: 'PingFang SC';

  .demo {
    width: 800px;
    height: 500px;
    background-color: #fff;
    overflow: hidden;
    border: 1px solid #000;

    .demo-row {
      display: flex;
      border-bottom: 1px solid #ccc;
      // box-sizing: border-box;
    }

    .demo-cell {
      box-sizing: border-box;
      // border-bottom: 1px solid #ccc;
      // border-left: 1px solid #ccc;
      padding: 4px;
    }
  }

  .header {
    display: flex;
    background-color: #fff;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  @keyframes loading-rotate {
    100% {
      transform: rotate(1turn);
    }
  }

  @keyframes loading-dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -40px;
    }

    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -120px;
    }
  }

  .circular {
    height: 30px;
    width: 30px;
    animation: loading-rotate 2s linear infinite;

    .path {
      animation: loading-dash 1.5s ease-in-out infinite;
      stroke-dasharray: 90, 150;
      stroke-dashoffset: 0;
      stroke-width: 2;
      stroke: #409eff;
      stroke-linecap: round;
    }
  }
}
</style>
