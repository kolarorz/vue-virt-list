<template>
  <div class="main">
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
    <div class="demo-fixed" style="width: 100%; height: 500px">
      <VirtList
        :buffer="2"
        :list="list"
        ref="virtListRef"
        itemKey="id"
        :minSize="40"
        fixed
        @rangeUpdate="rangeUpdate"
      >
        <template #default="{ itemData, index }">
          <Item :itemData="itemData" :index="index" />
        </template>
      </VirtList>
    </div>
  </div>
</template>

<script lang="ts">
import { VirtList } from 'vue-virt-list';
import { getList } from '../utils/common';
import Item from './Item.vue';

export default {
  name: 'DemoFixed',
  components: {
    Item,
    VirtList,
  },
  data() {
    return {
      list: [] as any[],

      reactiveData: {
        renderBegin: 0,
        renderEnd: 0,
      },
    };
  },
  mounted() {
    this.reactiveData = (this.$refs.virtListRef as any).reactiveData;
    this.list = getList(1000);
  },
  methods: {
    rangeUpdate(inViewBegin: number, inViewEnd: number) {
      // console.log('inViewBegin', inViewBegin, 'inViewEnd', inViewEnd);
    },
  },
};
</script>

<style lang="scss" scoped>
.demo-fixed {
  background-color: var(--vp-sidebar-bg-color);
  border: 1px solid var(--vp-c-border);
  overflow: hidden;
}
</style>
