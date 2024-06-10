<script lang="ts" setup>
import { onMounted, ref, shallowRef } from 'vue';
import { VirtTree } from 'vue-virt-list';

type Data = {
  id: string | number;
  name: string;
  children?: Data;
}[];

const treeProps = {
  value: 'id',
  label: 'name',
};

const data = shallowRef<Data>([]);
onMounted(() => {
  data.value = Array.from({ length: 40 }).map((_, i) => ({
    id: String(i),
    name: `Node-${i}`,
    children: Array.from({ length: 3 }).map((_, index) => ({
      id: `${i}-${index}`,
      name: `Node-${i}-${index}`,
      children: Array.from({ length: 2 }).map((_, indexChild) => ({
        id: `${i}-${index}-${indexChild}`,
        name: `Node-${i}-${index}-${indexChild}`,
      })),
    })),
  }));
});

const virtTreeRef = ref<typeof VirtTree>();
const key = ref<number>(0);
const onCollapseAll = () => {
  virtTreeRef.value.collapseAllNods([]);
};

const onExpandAll = () => {
  virtTreeRef.value.expandAllNodes();
};

const expandNode = () => {
  virtTreeRef.value.expandNodeByKey(key.value);
};
const collapseNode = () => {
  virtTreeRef.value.collapseNodeByKey(key.value);
};
</script>

<template>
  <div class="demo-tree">
    <div class="tree-btn-container">
      <div style="display: flex; gap: 8px">
        <div class="btn-item" @click="onCollapseAll">折叠所有</div>
        <div class="btn-item" @click="onExpandAll">展开所有</div>
      </div>
      <div class="input-container">
        <div class="input-label">操作指定节点：</div>
        <input v-model="key" />
        <div class="btn-item" @click="expandNode">展开</div>
        <div class="btn-item" @click="collapseNode">折叠</div>
      </div>
    </div>
    <VirtTree
      ref="virtTreeRef"
      :data="data"
      :props="treeProps"
      currentNodeKey="4"
      :defaultExpandedKeys="['4']"
      :indent="20"
      showCheckbox
    >
      <template #empty>
        <div style="padding: 16px">暂无数据</div>
      </template>
    </VirtTree>
  </div>
</template>

<style scoped lang="scss">
.demo-tree {
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .tree-btn-container {
    display: flex;
    flex: 1;
    flex-direction: row-reverse;
    justify-content: space-between;
    padding: 12px 8px;
    gap: 8px;
    .input-label {
      font-size: 14px;
    }
    .btn-item {
      padding: 4px 12px;
      cursor: pointer;
      border: 1px solid #ececec;
      border-radius: 4px;
      font-size: 14px;
    }
    .input-container {
      display: flex;
      gap: 8px;
      align-items: center;
      input {
        height: 100%;
        border: 1px solid #ececec;
        border-radius: 4px;
        padding: 0 8px;
      }
    }
  }
}
</style>
