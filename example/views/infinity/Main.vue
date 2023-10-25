<template>
  <div
    class="demo-table"
    style="display: flex; flex-direction: column; align-items: center"
  >
    <div>加载行数 {{ list.length }}</div>
    <div class="demo">
      <VirtualList
        ref="virtualListRef"
        :buffer="2"
        :minSize="40"
        :list="list"
        @toBottom="onToBottom"
        :itemKey="rowKeyName"
        :itemComponent="itemComponent"
        innerFooterStyle="width: 200px; height: 40px; display: flex; align-items: center;"
      >
        <template #footer v-if="page < maxpage">
          <div>loading</div>
        </template>
      </VirtualList>

      <!-- DAJDAO  -->
    </div>
  </div>
</template>

<script>
import { VirtualList } from '../../../src';
import { getParagraphList, asyncGetRows } from '../../utils/common';
import Item from './Item.vue';

export default {
  name: 'Infinity',
  components: {
    VirtualList,
  },
  data() {
    return {
      itemComponent: Item,
      isLoading: false,

      list: [],
      maxpage: 4,
      page: 1, // 1
      pageSize: 80,
      rowKeyName: 'id',
    };
  },
  async created() {
    const pageList = await asyncGetRows(this.page, this.pageSize);
    this.page = 1;
    this.list = pageList;
  },
  methods: {
    async onToBottom() {
      if (this.isLoading) {
        return;
      }

      this.isLoading = true;

      // 超过最大页码 5
      if (this.page >= this.maxpage && this.isLoading) return;

      const nextRows = await asyncGetRows(this.page + 1, this.pageSize);
      const newRows = this.list.concat(nextRows);

      this.page += 1;
      this.list = newRows;
      this.isLoading = false;
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
