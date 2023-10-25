<template>
  <div
    class="demo-table"
    style="display: flex; flex-direction: column; align-items: center"
  >
    <br />
    <br />
    <div>加载行数 {{ list.length }}</div>
    <div class="demo">
      <!-- 触头触底 -->
      <VirtualList
        ref="virtualListRef"
        :itemComponent="itemComponent"
        :minSize="20"
        :list="list"
        @toTop="onToTop"
        @toBottom="onToBottom"
        :itemKey="rowKeyName"
        :listStyle="`width: ${1500}px;`"
        headerStyle="height: 40px; background: red;"
        footerStyle="height: 40px; background: red;"
      >
        <template #header v-if="page > 1">
          <div>loading</div>
        </template>
        <template #footer v-if="page < maxpage - 1">
          <div>loading</div>
        </template>
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
    async onToTop() {
      if (this.isLoading) {
        return;
      }
      if (this.page <= 1) return;
      this.isLoading = true;

      this.page -= 1;
      const prevList = await asyncGetRows(this.page, this.pageSize);
      // const deleteRows = this.list.slice(this.pageSize, this.list.length);
      const newRows = prevList.concat(this.list.slice(0, this.pageSize));
      this.list = newRows;

      this.$nextTick(() => {
        this.$refs.virtualListRef.increaseTopSize(prevList);
        this.isLoading = false;
      });
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

      this.page += 1;
      const nextRows = await asyncGetRows(
        this.page + this.pageCached,
        this.pageSize,
      );
      // 1. 先删除前面的
      const deleteRows = this.list.splice(0, this.pageSize);
      // 2. 加上新增的
      this.list = this.list.concat(nextRows);

      this.$nextTick(() => {
        this.$refs.virtualListRef.decreaseTopSize(deleteRows);
        this.isLoading = false;
      });
    },
    // async onToTop() {
    //   if (this.isLoading) {
    //     return
    //   }
    //   if (this.page <= 1) return;

    //   this.isLoading = true;
    //   setTimeout(async () => {
    //     this.page -= 1;
    //     const prevList = await asyncGetRows(this.page, this.pageSize)
    //     const deleteRows = this.list.slice(this.pageSize, this.pageSize * 2);
    //     const newRows = prevList.concat(this.list.slice(0, this.pageSize))

    //     this.list = newRows

    //     let size = 0;
    //     for (let i = 0; i <= deleteRows.length - 1; i += 1) {
    //       size += this.$refs.virtualListRef.getItemSize(deleteRows[i][this.rowKeyName]);
    //       this.$refs.virtualListRef.deleteItemSize(deleteRows[i][this.rowKeyName]);
    //     }
    //     this.$refs.virtualListRef.deleteBottomList(this.pageSize, size, this.list)

    //     this.isLoading = false
    //   }, 500);
    // },
    // async onToBottom() {
    //   if (this.isLoading) {
    //     return
    //   }
    //   // 超过最大页码 5
    //   if (this.page + this.pageCached >= this.maxpage) return;
    //   this.isLoading = true;
    //   setTimeout(async () => {
    //     this.page += 1;
    //     const nextRows = await asyncGetRows(this.page + this.pageCached, this.pageSize)
    //     const deleteRows = this.list.slice(0, this.pageSize);
    //     const newRows = this.list.slice(this.pageSize, this.pageSize * 2).concat(nextRows)
    //     console.log('deleteRows', deleteRows, 'nextRows', nextRows, 'newRows', newRows);
    //     this.list = newRows

    //     let size = 0;
    //     for (let i = 0; i <= deleteRows.length - 1; i += 1) {
    //       size += this.$refs.virtualListRef.getItemSize(deleteRows[i][this.rowKeyName]);
    //       // console.log('size', i, deleteRows[i][this.rowKeyName], this.$refs.virtualListRef.getItemSize(deleteRows[i][this.rowKeyName]));
    //       this.$refs.virtualListRef.deleteItemSize(deleteRows[i][this.rowKeyName]);
    //     }
    //     this.$refs.virtualListRef.deleteTopList(this.pageSize, size, this.list)

    //     this.isLoading = false
    //   }, 500);
    // },
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
