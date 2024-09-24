<script lang="ts" setup>
import { onMounted, ref, shallowRef } from 'vue';
import { VirtTree } from 'vue-virt-list';

type Data = {
  id: string | number;
  title: string;
  disableSelect?: boolean;
  children?: Data;
}[];

const customFieldNames = {
  key: 'id',
};

const list = shallowRef<Data>([]);
onMounted(() => {
  list.value = Array.from({ length: 40 }).map((_, i) => ({
    id: String(i),
    title: `Node-${i}`,
    children: Array.from({ length: 3 }).map((_, index) => ({
      id: `${i}-${index}`,
      title: `Node-${i}-${index}`,
      children: Array.from({ length: 2 }).map((_, indexChild) => ({
        id: `${i}-${index}-${indexChild}`,
        title: `Node-${i}-${index}-${indexChild}`,
      })),
    })),
  }));

  list.value[1].disableSelect = true;
});

const virtTreeRef = ref<typeof VirtTree>();

// 可传可不传
const selectedKeys = ref<(number | string)[]>(['0']);

function onSelect(keys: number[]) {
  console.log('keys', keys);
}

let selectAll = false;
function onToggleSelectAll() {
  selectAll = !selectAll;
  virtTreeRef.value?.selectAll(selectAll);
}

let selectKey1 = true;
function onToggleSelectNode() {
  selectKey1 = !selectKey1;
  virtTreeRef.value?.selectNode('0', selectKey1);
}

// setTimeout(() => {
//   selectedKeys.value = [];
// }, 2000);

// setTimeout(() => {
//   selectedKeys.value = [];
// }, 4000);
</script>

<template>
  <div class="demo-tree">
    <div style="height: 40px; display: flex">
      <div>选中keys：</div>
      <div style="flex: 1; overflow: auto">[{{ selectedKeys.join(', ') }}]</div>
    </div>

    <div style="margin-bottom: 4px">
      <span class="demo-btn" @click="onToggleSelectAll">ToggleSelectAll</span>
      <span class="demo-btn" @click="onToggleSelectNode"
        >ToggleSelectNode(key: 0)</span
      >
    </div>

    <div class="virt-tree-wrapper">
      <VirtTree
        ref="virtTreeRef"
        :list="list"
        :fieldNames="customFieldNames"
        :indent="20"
        defaultExpandAll
        v-model:selectedKeys="selectedKeys"
        selectable
        selectMultiple
        @select="onSelect"
      >
      </VirtTree>
    </div>
  </div>
</template>

<style scoped lang="scss">
.demo-tree {
  width: 100%;
  display: flex;
  flex-direction: column;

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
