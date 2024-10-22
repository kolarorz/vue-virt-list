<template>
  <div class="main">
    <!-- operate -->
    <div class="button-group">
      <button class="demo-btn" @click="manualAddList">Manual Add List</button>
      <span>(</span>
      <input class="demo-input" type="text" v-model="manualNumber" />
      <span>per)</span>
      <span>&nbsp;</span>
      <span>&nbsp;</span>
      <span>&nbsp;</span>
      <button class="demo-btn" @click="autoAddList">
        {{ autoFlag ? 'Stop Add List' : 'Auto Add List' }}
      </button>
      <span>(</span>
      <input class="demo-input" type="text" v-model="autoNumber" />
      <span>per)</span>
      <span>&nbsp;</span>
      <span>&nbsp;</span>
      <span>&nbsp;</span>
      <span v-show="loading">数据生成中，请稍等</span>
    </div>

    <!-- render stats -->
    <div style="padding: 10px 0">
      <span>Total: {{ list.length }} </span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span>RenderBegin: {{ reactiveData?.renderBegin }} </span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span>RenderEnd: {{ reactiveData?.renderEnd }} </span>
    </div>

    <!-- demo -->
    <!-- important: must set a height for Container or VirtList -->
    <!-- important: must set itemKey and keep id is unique -->
    <div class="demo-basic" style="width: 100%; height: 500px">
      <VirtList
        ref="virtListRef"
        :buffer="5"
        :list="list"
        itemKey="id"
        :minSize="40"
      >
        <template #default="{ itemData, index }">
          <Item :itemData="itemData" :index="index" @deleteItem="deleteItem" />
        </template>
      </VirtList>
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
import { VirtList } from 'vue-virt-list';
import { asyncGetList } from '../utils/common';
import Item from './Item.vue';

const manualNumber = ref(1000);
const autoNumber = ref(1000);
const autoFlag = ref(false);
const loading = ref(false);
const virtListRef: Ref<typeof VirtList | null> = ref(null);
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

// setTimeout(() => {
//   console.log(111);
//   list.value = [];
// }, 3000);
</script>

<style lang="scss" scoped>
.demo-basic {
  background-color: var(--vp-sidebar-bg-color);
  border: 1px solid var(--vp-c-border);
  overflow: hidden;

  .row-item {
    display: flex;
    border-bottom: 1px solid var(--vp-c-border);
  }
}
</style>
