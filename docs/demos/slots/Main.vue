<template>
  <div class="main">
    <Operate
      :virtListRef="virtListRef"
      :length="list.length"
      :visible="visible"
      @toggleShow="visible = !visible"
    ></Operate>

    <div class="demo-slot" v-show="visible">
      <VirtList
        ref="virtListRef"
        :minSize="40"
        :list="list"
        itemKey="id"
        :buffer="2"
        stickyHeaderStyle="text-align: center; height: 40px; background: #42b983;"
        headerStyle="text-align: center; height: 80px; background: cyan"
        footerStyle="text-align: center; height: 80px; background: cyan"
        stickyFooterStyle="text-align: center; height: 40px; background: #42b983;"
      >
        <template #default="{ itemData, index }">
          <Item :itemData="itemData" :index="index" />
        </template>
        <template #stickyHeader>
          <div>悬浮header</div>
        </template>
        <template #header>
          <div>header</div>
        </template>
        <template #footer>
          <div>footer</div>
        </template>
        <template #stickyFooter>
          <div>悬浮footer</div>
        </template>
      </VirtList>
    </div>
  </div>
</template>

<script lang="ts">
import { VirtList } from 'vue-virt-list';
import { getList } from '../utils/common';
import Item from './Item.vue';
import Operate from '../components/OperateGroup.vue';

export default {
  name: 'DemoSlot',
  components: {
    VirtList,
    Operate,
    Item,
  },
  data() {
    return {
      visible: true,
      list: [] as any[],
      virtListRef: null as typeof VirtList | null,
    };
  },
  async mounted() {
    this.virtListRef = this.$refs.virtListRef as typeof VirtList;
    this.list = getList(1000);
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.demo-slot {
  width: 100%;
  height: 500px;
  background-color: var(--vp-sidebar-bg-color);
  overflow: hidden;
  border: 1px solid var(--vp-c-border);
}
</style>
