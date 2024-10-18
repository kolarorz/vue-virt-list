<script lang="ts" setup>
import { onMounted, ref, shallowRef } from 'vue';
import { VirtTree } from 'vue-virt-list';
import 'vue-virt-list/lib/assets/tree.css';

type Data = {
  id: string | number;
  title: string;
  children?: Data;
}[];

const customFieldNames = {
  key: 'id',
};

const list = shallowRef<Data>([]);
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

// list.value[0].children[0].title =
//   '所有叶子节点禁用拖入所有叶子节点禁用拖入所有叶子节点禁用拖入所有叶子节点禁用拖入所有叶子节点禁用拖入所有叶子节点禁用拖入所有叶子节点禁用拖入所有叶子节点禁用拖入所有叶子节点禁用拖入';
// list.value[0].children[0].title =
//   '1Sm4srxpVaGczlsAPRv-F - Synagoga quae eligendi est arx alveus pauper ager. Canonicus verbera auditor utrum vociferor taceo. Paens volo peior.';
list.value[0].children[0].title =
  'abvfgzgagagacabvfgzgagagacabvfgzgagagacabvfgzgagagacabvfgzgagagacabvfgzgagagacabvfgzgagagacabvfgzgagagacabvfgzgagagacabvfgzgagagacabvfgzgagagacabvfgzgagagacabvfgzgagagac';

const virtTreeRef = ref<typeof VirtTree>();
const key = ref<number>(0);

const filterMethod = (query: string, node: any) => {
  return node.title.includes(query);
};
const showLine = ref(true);
const changeLine = () => {
  showLine.value = !showLine.value;
};
</script>

<template>
  <div class="demo-tree">
    <div class="tree-btn-container">
      <div class="btn-item" @click="changeLine">
        {{ showLine ? '隐藏' : '显示' }}连接线
      </div>
    </div>

    <div class="virt-tree-wrapper">
      <VirtTree
        ref="virtTreeRef"
        :list="list"
        :fieldNames="customFieldNames"
        :indent="28"
        :iconSize="14"
        :filter-method="filterMethod"
        :showLine="showLine"
        defaultExpandAll
        :itemGap="4"
        fixed
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
