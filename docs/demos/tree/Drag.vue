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
      children: Array.from({ length: 2 }).map((_, indexChildChild) => ({
        id:
          (i + 1) * 10000 +
          (index + 1) * 100 +
          (indexChild + 1) * 10 +
          indexChildChild,
        title: `Node-${i}-${index}-${indexChild}-${indexChildChild} (禁止拖入-disableDragIn)`,
        // 所有叶子节点禁用拖入
        disableDragIn: true,
      })),
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
        :indent="20"
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

        <template #content="{ node }">
          <div
            v-if="!node.isLeaf"
            style="width: 16px; height: 16px; margin-right: 4px"
          >
            <svg
              style="width: 100%; height: 100%"
              t="1735113670562"
              class="icon"
              viewBox="0 0 1208 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="11451"
              width="256"
              height="256"
            >
              <path
                d="M132.51584 120.4736h879.4368c33.26976 0 60.2368 26.96704 60.2368 60.23168v409.6c0 33.26976-26.96704 60.2368-60.2368 60.2368H132.51584c-33.26464 0-60.23168-26.96704-60.23168-60.2368v-409.6c0-33.26464 26.96704-60.2368 60.23168-60.2368z"
                fill="#F9B552"
                p-id="11452"
              ></path>

              <path
                d="M469.8368 0c73.18528 0 132.51584 59.33056 132.51584 132.51584v84.3264h469.8368c73.18528 0 132.51584 59.33568 132.51584 132.52096v542.12096c0 73.18528-59.33056 132.51584-132.51584 132.51584H132.51584A132.51584 132.51584 0 0 1 0 891.48416V349.3632c0-4.03456 0.1792-8.06912 0.54272-12.04736A134.25664 134.25664 0 0 1 0 325.2736V132.51584C0 59.33056 59.33056 0 132.51584 0h337.32096z"
                fill="#FFCF5C"
                p-id="11453"
              ></path>
            </svg>
          </div>

          <div>{{ node.title }}</div>
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
