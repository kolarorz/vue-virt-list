<template>
  <div class="demo-tree-drag-area">
    <div class="virt-tree-wrapper">
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
        customGroup="group-aa"
        expandOnClickNode
        default-expand-all
        listClass="demo-disable-cross-level-drag"
        :showLine="true"
        :cross-level-draggable="false"
      >
        <template #empty>
          <div style="padding: 16px">暂无数据</div>
        </template>
        <template #content="{ node }">
          <div
            :style="{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }"
          >
            <div>{{ node.title }}</div>
          </div>
        </template>
      </VirtTree>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { VirtTree } from 'vue-virt-list';

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
list.value = [
  {
    id: 'role',
    title: '角色',
    children: [
      {
        id: 'role-1',
        title: '怪物',
      },
      {
        id: 'role-2',
        title: '小动物',
      },
      {
        id: 'role-3',
        title: '路人',
      },
      {
        id: 'role-4',
        title: '武器',
      },
    ],
  },
  {
    id: 'scene',
    title: '场景',
    children: [
      {
        id: 'scene-1',
        title: '场景地域',
      },
      {
        id: 'scene-2',
        title: '室内区域',
      },
      {
        id: 'scene-3',
        title: '室外区域',
      },
      {
        id: 'scene-4',
        title: '特色区域',
      },
    ],
  },
  {
    id: 'origin',
    title: '原始',
    children: [
      {
        id: 'origin-1',
        title: '原始',
      },
      {
        id: 'origin-2',
        title: '3D',
      },
      {
        id: 'origin-3',
        title: 'NPC',
      },
      {
        id: 'origin-4',
        title: '手枪',
      },
    ],
  },
  {
    id: 'drag-1',
    title: '角色环节',
    children: [],
  },
  {
    id: 'drag-2',
    title: '场景环节',
    children: [],
  },
  {
    id: 'drag-3',
    title: '测试',
    children: [],
  },
  {
    id: 'drag-4',
    title: '需求',
    children: [],
  },
  {
    id: 'drag-5',
    title: '工具',
    children: [],
  },
];

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
</script>

<style lang="scss">
.demo-tree-drag-area {
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .virt-tree-node {
    background-color: transparent !important;
  }
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
