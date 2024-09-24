<script lang="ts" setup>
import { onMounted, ref, shallowRef } from 'vue';
import { VirtTree } from 'vue-virt-list';

type Data = {
  id: string | number;
  title: string;
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
        disableCheckbox: indexChild % 2 === 0,
        children:
          indexChild % 2 !== 0
            ? []
            : Array.from({ length: 2 }).map((_, indexChild) => ({
                id: `${i}-${index}-${indexChild}-${indexChild}`,
                title: `Node-${i}-${index}-${indexChild}-${indexChild}`,
              })),
      })),
    })),
  }));
});

const virtTreeRef = ref<typeof VirtTree>();
const key = ref<string>('0');

const onExpandAll = () => {
  virtTreeRef.value?.expandAll(true);
};
const onCollapseAll = () => {
  virtTreeRef.value?.expandAll(false);
};

const expandNode = () => {
  virtTreeRef.value?.expandNode(key.value, true);
};
const collapseNode = () => {
  virtTreeRef.value?.expandNode(key.value, false);
};

const checkedKeys = ref<(number | string)[]>(['0']);

const onCheck = (data: Data, checkedInfo: any) => {
  console.warn('data', data, checkedInfo);
};

const clearCheck = (check: boolean) => {
  virtTreeRef.value?.checkAll(check);
};
</script>

<template>
  <div class="demo-tree">
    <div class="tree-btn-container">
      <div style="display: flex; gap: 8px">
        <div class="btn-item" @click="onCollapseAll">折叠所有</div>
        <div class="btn-item" @click="onExpandAll">展开所有</div>
        <div class="btn-item" @click="clearCheck(false)">清空 check</div>
        <div class="btn-item" @click="clearCheck(true)">check所有</div>
      </div>
      <div class="input-container">
        <div class="input-label">操作指定节点：</div>
        <input v-model="key" />
        <div class="btn-item" @click="expandNode">展开</div>
        <div class="btn-item" @click="collapseNode">折叠</div>
      </div>
    </div>
    <div>{{ checkedKeys }}</div>

    <div class="virt-tree-wrapper">
      <VirtTree
        ref="virtTreeRef"
        :list="list"
        :fieldNames="customFieldNames"
        :indent="20"
        checkable
        checkOnClickNode
        v-model:checkedKeys="checkedKeys"
        @check="onCheck"
        defaultExpandAll
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
