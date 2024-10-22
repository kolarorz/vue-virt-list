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
    <div
      class="demo-horizontal"
      style="width: 100%; height: 120px"
      v-show="visible"
    >
      <VirtList
        :list="list"
        ref="virtListRef"
        :minSize="60"
        horizontal
        itemKey="id"
        :buffer="2"
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
import Operate from '../components/OperateGroup.vue';
import { getHorizontalList } from '../utils/common';
import Item from './Item.vue';

export default {
  name: 'DemoHorizontal',
  components: {
    VirtList,
    Item,
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

      virtListRef: null as typeof VirtList | null,
    };
  },
  mounted() {
    this.virtListRef = this.$refs.virtListRef as typeof VirtList;
    this.reactiveData = this.virtListRef.reactiveData;
    this.list = getHorizontalList(1000);
  },
};
</script>

<style lang="scss" scoped>
.demo-horizontal {
  background-color: var(--vp-sidebar-bg-color);
  border: 1px solid var(--vp-c-border);
  overflow: hidden;

  .demo-col {
    height: 100%;
    border-bottom: 1px solid #000;
    border-left: 1px solid #000;
    padding: 4px;
    box-sizing: border-box;
  }
}
</style>
