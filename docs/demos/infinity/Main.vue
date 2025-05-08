<template>
  <div class="main">
    <!-- <Operate
      :virtListRef="$refs.virtListRef"
      :length="list.length"
      :visible.sync="visible"
    ></Operate> -->

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
      class="demo-infinity"
      style="width: 100%; height: 500px"
      v-show="visible"
    >
      <VirtList
        ref="virtListRef"
        :list="list"
        itemKey="id"
        :minSize="40"
        :buffer="2"
        @toBottom="toBottom"
      >
        <template #default="{ itemData, index }">
          <Item :itemData="itemData" :index="index" />
        </template>
        <template #footer>
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
// import Operate from '../components/OperateGroup.vue';

export default {
  name: 'DemoInfinity',
  components: {
    Item,
    VirtList,
    // Operate,
  },
  data() {
    return {
      visible: true,
      loading: false,
      list: [] as any[],
      reactiveData: {
        renderBegin: 0,
        renderEnd: 0,
      },
    };
  },
  async created() {
    this.list = await asyncGetList(200);
  },
  mounted() {
    this.reactiveData = (this.$refs.virtListRef as any).reactiveData;
  },
  methods: {
    async toBottom() {
      if (this.loading) return;
      console.log('toBottom');
      this.loading = true;
      const list = await asyncGetList(200, this.list.length, 1000);
      this.list = this.list.concat(list);
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.demo-infinity {
  background-color: var(--vp-sidebar-bg-color);
  border: 1px solid var(--vp-c-border);
  overflow: hidden;
}
</style>
