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
      :fieldNames="treeProps"
      currentNodeKey="4"
      :defaultExpandedKeys="['4']"
      :indent="20"
      stickyHeaderStyle="text-align: center; height: 40px; background: #42b983;"
      headerStyle="text-align: center; height: 40px; background: cyan"
      footerStyle="text-align: center; height: 40px; background: cyan"
      stickyFooterStyle="text-align: center; height: 40px; background: #42b983;"
    >
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
      <template #empty>
        <div style="padding: 16px">暂无数据</div>
      </template>
      <template #icon="{ expanded, node }">
        <div
          v-if="!node.isLeaf"
          style="height: 20px; width: 20px"
          :style="{ transform: `rotate(${expanded ? 90 : 0}deg)` }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            data-v-6fbb019e=""
          >
            <path
              fill="currentColor"
              d="M128 192h768v128H128zm0 256h512v128H128zm0 256h768v128H128zm576-352 192 160-192 128z"
            ></path>
          </svg>
        </div>
      </template>
      <template #content="{ node }">
        <div style="color: aqua">{{ node.label }}</div>
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
  // overflow: hidden;

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
