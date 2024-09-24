<script lang="ts" setup>
import { onMounted, ref, shallowRef } from 'vue';
import { VirtTree } from 'vue-virt-list';
import 'vue-virt-list/lib/assets/tree.css';

type ItemData = {
  id: string | number;
  title: string;
  children?: ItemData[];
  // 禁止拖入
  disableDragIn?: boolean;
  // 禁止托出
  disableDragOut?: boolean;
};

const customFieldNames = {
  key: 'id',
};

const list = ref<ItemData[]>([]);
// list.value = Array.from({ length: 40 }).map((_, i) => ({
//   id: i + 1,
//   title: `Node-${i}`,
//   children: Array.from({ length: 3 }).map((_, index) => ({
//     id: (i + 1) * 100 + index,
//     title: `Node-${i}-${index}`,
//     children: Array.from({ length: 2 }).map((_, indexChild) => ({
//       id: (i + 1) * 1000 + (index + 1) * 10 + indexChild,
//       title: `Node-${i}-${index}-${indexChild}`,
//     })),
//   })),
// }));

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

// setTimeout(() => {
//   console.log(list.value.length);
//   list.value.splice(0, 1);
//   console.log(list.value.length);
// }, 1000);

// TODO 模拟数据
list.value[1].disableDragIn = true;
const virtTreeRef = ref<typeof VirtTree>();
// const key = ref<number>(0);
const filterMethod = (query: string, node: any) => {
  return node.name.includes(query);
};

function onDragstart() {
  console.log('onDragstart');
}

function onDragEnd(data: any) {
  console.log('onDragend', data);
  if (data) {
    const { node, prevNode, parentNode } = data;
    console.log('node', node);
    console.log('prevNode', prevNode);
    console.log('parentNode', parentNode);
  }
}

const expandedKeys = ref<number[]>([1, 100]);
</script>

<template>
  <div class="demo-tree">
    <div class="virt-tree-wrapper" style="overflow-y: auto">
      <VirtTree
        ref="virtTreeRef"
        v-model:expandedKeys="expandedKeys"
        :list="list"
        :fieldNames="customFieldNames"
        :indent="20"
        :filter-method="filterMethod"
        :itemGap="4"
        draggable
        @dragstart="onDragstart"
        @dragend="onDragEnd"
        style="height: auto; overflow: visible"
        dragOnly
      >
        <template #empty>
          <div style="padding: 16px">暂无数据</div>
        </template>
      </VirtTree>
    </div>
  </div>
</template>

<style scoped lang="scss">
.demo-tree {
  width: 100%;
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
