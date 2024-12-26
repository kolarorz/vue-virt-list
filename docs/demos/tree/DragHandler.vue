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
      title: `Node-${i}-${index}-${indexChild}`,
      // 所有叶子节点禁用拖入
      disableDragIn: true,
    })),
  })),
}));

const virtTreeRef = ref<typeof VirtTree>();
const filterMethod = (query: string, node: any) => {
  return node.name.includes(query);
};

function onDragstart() {
  console.log('onDragstart');
}

function onDragEnd(data: any) {
  if (data) {
    console.log('drag success', data);
  } else {
    console.warn('drag fail: Invalid');
  }
}

const draggable = ref(true);
const expandedKeys = ref<number[]>([1, 100, 102]);
const toggleExpand = (key: number) => {
  virtTreeRef.value?.expandNode(key, !expandedKeys.value.includes(key));
};
function onDragStart(e: MouseEvent | Event) {
  if (virtTreeRef.value?.onDragstart) virtTreeRef.value?.onDragstart(e);
}
</script>

<template>
  <div class="demo-tree">
    <div class="virt-tree-wrapper">
      <VirtTree
        ref="virtTreeRef"
        v-model:expandedKeys="expandedKeys"
        :list="list"
        :fieldNames="customFieldNames"
        :indent="16"
        :iconSize="14"
        :filter-method="filterMethod"
        :draggable="draggable"
        @dragstart="onDragstart"
        @dragend="onDragEnd"
        dragOnly
        dragGhostClass="drag-ghost-class"
        dragClass="drag-class"
        expandOnClickNode
        default-expand-all
      >
        <template #default="{ node }">
          <div
            :style="{
              display: 'flex',
              alignItems: 'center',
              height: '32px',
            }"
            @click="toggleExpand(node.data.id)"
          >
            <!-- drag handler -->
            <div style="cursor: move" draggable="true" @dragstart="onDragStart">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5 3C5 2.44772 5.44772 2 6 2C6.55228 2 7 2.44772 7 3C7 3.55228 6.55228 4 6 4C5.44772 4 5 3.55228 5 3ZM9 3C9 2.44772 9.44772 2 10 2C10.5523 2 11 2.44772 11 3C11 3.55228 10.5523 4 10 4C9.44772 4 9 3.55228 9 3ZM5 8C5 7.44772 5.44772 7 6 7C6.55228 7 7 7.44772 7 8C7 8.55228 6.55228 9 6 9C5.44772 9 5 8.55228 5 8ZM9 8C9 7.44772 9.44772 7 10 7C10.5523 7 11 7.44772 11 8C11 8.55228 10.5523 9 10 9C9.44772 9 9 8.55228 9 8ZM5 13C5 12.4477 5.44772 12 6 12C6.55228 12 7 12.4477 7 13C7 13.5523 6.55228 14 6 14C5.44772 14 5 13.5523 5 13ZM9 13C9 12.4477 9.44772 12 10 12C10.5523 12 11 12.4477 11 13C11 13.5523 10.5523 14 10 14C9.44772 14 9 13.5523 9 13Z"
                  fill="var(--virt-tree-color-icon)"
                />
              </svg>
            </div>
            <!-- indent -->
            <div
              :style="{
                width: `${(node.level - 1) * 16}px`,
              }"
            ></div>
            <!-- switcher icon -->
            <div
              v-if="node.data?.children?.length > 0"
              style="height: 16px; width: 16px; cursor: pointer"
              :style="{
                rotate: expandedKeys.includes(node.data.id) ? '0deg' : '-90deg',
              }"
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.5632 7.72544L10.539 13.2587C10.2728 13.6247 9.72696 13.6247 9.46073 13.2587L5.43658 7.72544C5.11611 7.28479 5.43088 6.66666 5.97573 6.66666L14.024 6.66666C14.5689 6.66666 14.8837 7.28479 14.5632 7.72544Z"
                  fill="var(--virt-tree-color-icon)"
                ></path>
              </svg>
            </div>
            <!-- content -->
            <div>
              {{ node.title }}
            </div>
          </div>
        </template>

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
