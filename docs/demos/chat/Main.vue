<template>
  <div class="main">
    <Operate
      :virtListRef="virtListRef"
      :length="list.length"
      :visible.sync="visible"
    ></Operate>

    <div style="padding: 10px 0">
      <span>Total: {{ list.length }} </span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span>RenderBegin: {{ reactiveData.renderBegin }} </span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span>RenderEnd: {{ reactiveData.renderEnd }} </span>
    </div>

    <!-- demo -->
    <!-- important: must set a height for Container or VirtList -->
    <!-- important: must set itemKey and keep id is unique -->
    <div class="demo-chat" style="width: 100%; height: 500px" v-show="visible">
      <VirtList
        ref="virtListRef"
        :list="list"
        itemKey="index"
        :minSize="60"
        @toTop="toTop"
        @itemResize="itemResize"
      >
        <template #default="{ itemData, index }">
          <Item :itemData="itemData" :index="index" />
        </template>
        <template #header v-if="page > 1">
          <div
            style="
              width: 100%;
              height: 20px;
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: chocolate;
            "
          >
            loading...
          </div>
        </template>
      </VirtList>
    </div>
  </div>
</template>

<script lang="ts">
import { VirtList } from 'vue-virt-list';
import { asyncGetList } from '../utils/common';
import Item from './Item.vue';
import Operate from '../components/OperateGroup.vue';

export default {
  name: 'DemoChat',
  components: {
    Item,
    VirtList,
    Operate,
  },
  data() {
    return {
      visible: true,
      list: [] as any[],
      reactiveData: {
        renderBegin: 0,
        renderEnd: 0,
      },
      isFirstRender: true,

      pageMax: 5,
      page: 5,
      pageSize: 40,

      loading: false,
      virtListRef: null as typeof VirtList | null,
    };
  },
  async created() {
    this.list = await asyncGetList(
      this.pageSize,
      (this.page - 1) * this.pageSize,
    );
  },
  mounted() {
    this.virtListRef = this.$refs.virtListRef as typeof VirtList;
    this.reactiveData = this.virtListRef.reactiveData;
  },
  methods: {
    async toTop() {
      console.log('toTop');
      if (this.loading || this.page <= 1) return;

      this.loading = true;

      const list = await asyncGetList(
        this.pageSize,
        (this.page - 2) * this.pageSize,
        1000,
      );
      // console.log(list);
      this.list = list.concat(this.list);

      // 滚动到正确位置
      this.$nextTick(() => {
        this.virtListRef?.addedList2Top(list);
        // 数据更新后再更新page，这样上面的loading消失时机才能正确
        this.page -= 1;
        this.loading = false;
      });
    },
    itemResize() {
      if (this.isFirstRender) {
        this.isFirstRender = false;
        this.virtListRef?.scrollToBottom();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.demo-chat {
  background-color: var(--vp-sidebar-bg-color);
  border: 1px solid var(--vp-c-border);
  overflow: hidden;
}
</style>
