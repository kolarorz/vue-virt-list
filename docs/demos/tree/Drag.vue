<script lang="ts" setup>
import { onMounted, ref, shallowRef } from 'vue';
import { VirtTree, type TreeNode } from 'vue-virt-list';

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
list.value = Array.from({ length: 40 }).map((_, i) => ({
  id: i + 1,
  title: `Node-${i}`,
  children: Array.from({ length: 3 }).map((_, index) => ({
    id: (i + 1) * 100 + index,
    title: `Node-${i}-${index}`,
    children: Array.from({ length: 2 }).map((_, indexChild) => ({
      id: (i + 1) * 1000 + (index + 1) * 10 + indexChild,
      title: `Node-${i}-${index}-${indexChild} (禁止拖入-disableDragIn)`,
      // 所有叶子节点禁用拖入
      disableDragIn: true,
    })),
  })),
}));

// setTimeout(() => {
//   console.log(list.value.length);
//   list.value.splice(0, 1);
//   console.log(list.value.length);
// }, 1000);

// TODO 模拟数据
// list.value[0].title =
//   '所有叶子节点禁用拖入所有叶子节点禁用拖入所有叶子节点禁用拖入所有叶子节点禁用拖入所有叶子节点禁用拖入所有叶子节点禁用拖入所有叶子节点禁用拖入所有叶子节点禁用拖入所有叶子节点禁用拖入';
list.value[1].disableDragOut = true;
list.value[1].title = `${list.value[1].title} (禁止拖出-disableDragOut)`;
const virtTreeRef = ref<typeof VirtTree>();
// const key = ref<number>(0);
const filterMethod = (query: string, node: any) => {
  return node.title.includes(query);
};

function onDragstart() {
  console.log('onDragstart');
}

function onDragEnd(data: any) {
  if (data) {
    console.log('drag success', data);
    // const { node, prevNode, parentNode } = data;
    // console.log('drag node', node);
    // console.log('target prevNode', prevNode);
    // console.log('target parentNode', parentNode);
  } else {
    console.warn('drag fail: Invalid');
  }
}

const draggable = ref(true);

// setTimeout(() => {
//   draggable.value = true;
// }, 1000);

// setTimeout(() => {
//   draggable.value = false;
// }, 6000);
const expandedKeys = ref<number[]>([1, 100, 102]);
</script>

<template>
  <div class="demo-tree">
    <div class="virt-tree-wrapper">
      <!-- 
        :dragLineWidth="28"
        :dragLineLeading="14"
        dragSourceClass="drag-class"
        dragGhostClass="drag-ghost-class" -->
      <VirtTree
        ref="virtTreeRef"
        v-model:expandedKeys="expandedKeys"
        :list="list"
        :fieldNames="customFieldNames"
        :indent="16"
        :iconSize="14"
        :filter-method="filterMethod"
        :itemGap="4"
        :draggable="draggable"
        @dragstart="onDragstart"
        @dragend="onDragEnd"
        dragOnly
        dragGhostClass="drag-ghost-class"
        dragClass="drag-class"
        expandOnClickNode
        default-expand-all
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
