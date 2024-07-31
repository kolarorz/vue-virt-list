<template>
  <div class="main">
    <div class="btn-container">
      <div class="input-container" style="display: flex; gap: 8px">
        <div class="btn-item" @click="autoAddList">
          {{ autoFlag ? 'Stop Add List' : 'Auto Add List' }}
        </div>
        <span>(</span>
        <input class="demo-input" type="text" v-model="autoNumber" />
        <span>per)</span>
      </div>
      <div class="input-container">
        <input v-model="manualNumber" />
        <div class="btn-item" @click="manualAddList">Manual Add List</div>
      </div>
    </div>
    <div class="demo-basic">
      <VirtScrollbarList
        ref="virtListRef"
        :buffer="5"
        :list="list"
        itemKey="id"
        :minSize="40"
      >
        <template #default="{ itemData, index }">
          <Item :itemData="itemData" :index="index" @deleteItem="deleteItem" />
        </template>
      </VirtScrollbarList>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  onBeforeMount,
  onMounted,
  ref,
  nextTick,
  computed,
  shallowRef,
} from 'vue';
import type { Ref, ShallowRef } from 'vue';
import { VirtScrollbarList } from 'vue-virt-list';
import { asyncGetList } from '../utils/common';
import Item from './Item.vue';

const manualNumber = ref(1000);
const autoNumber = ref(1000);
const autoFlag = ref(false);
const loading = ref(false);
const virtListRef: Ref<InstanceType<typeof VirtScrollbarList> | null> =
  ref(null);
const list: ShallowRef<any[]> = shallowRef([]);

const reactiveData = computed(() => {
  return virtListRef.value?.reactiveData;
});

onBeforeMount(async () => {
  list.value = await asyncGetList(1);
});

onMounted(() => {
  virtListRef.value?.forceUpdate();
});

function generateList(length: number) {
  return new Promise((resolve) => {
    if (loading.value) return;
    loading.value = true;
    setTimeout(async () => {
      const newList = await asyncGetList(length, list.value.length);
      list.value = list.value.concat(newList);
      loading.value = false;

      nextTick(() => {
        virtListRef.value?.scrollToBottom();
        resolve(null);
      });
    }, 0);
  });
}
async function manualAddList() {
  autoFlag.value = false;
  return generateList(manualNumber.value);
}
async function autoGenerate() {
  if (autoFlag.value && list.value.length < 700002) {
    await generateList(autoNumber.value);
    autoGenerate();
  }
}
async function autoAddList() {
  autoFlag.value = !autoFlag.value;
  autoGenerate();
}
function deleteItem(id: number) {
  const targetIndex = list.value.findIndex((row) => row.id === id);
  list.value.splice(targetIndex, 1);
}
</script>

<style lang="scss" scoped>
.demo-basic {
  width: 100%;
  height: 500px;
  background-color: var(--vp-sidebar-bg-color);
  overflow: hidden;
  border: 1px solid var(--vp-c-border);

  .row-item {
    display: flex;
    border-bottom: 1px solid var(--vp-c-border);
  }
}
.btn-container {
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
    &:hover {
      background-color: #ececec;
    }
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
</style>
