<template>
  <div class="main">
    <!-- <div>高性能、动态高度、增删</div> -->

    <button class="demo-btn" @click="onLoadData">解压30w数据</button>
    <span>&nbsp;</span>
    <span>&nbsp;</span>
    <span v-show="loading">解压中...</span>

    <div style="padding: 10px 0">
      <span>Total: {{ list.length }} </span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span>RenderBegin: {{ reactiveData?.renderBegin }} </span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span>RenderEnd: {{ reactiveData?.renderEnd }} </span>
    </div>

    <div class="demo-dynamic">
      <VirtList
        ref="virtListRef"
        :buffer="5"
        :list="list"
        itemKey="id"
        :minSize="40"
      >
        <template #default="{ itemData, index }">
          <Item :itemData="itemData" :index="index" />
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
import JSZip from 'jszip';
import { VirtList } from 'vue-virt-list';
import Item from './Item.vue';
import url from '../data/30w.zip?url';

const loading = ref(false);
const virtListRef: Ref<InstanceType<typeof VirtList> | null> = ref(null);
const list: ShallowRef<any[]> = shallowRef([]);

const reactiveData = computed(() => {
  return virtListRef.value?.reactiveData;
});

onMounted(() => {
  virtListRef.value?.forceUpdate();
});

async function onLoadData() {
  loading.value = true;
  fetch(url)
    .then((res) => {
      if (res.status === 200 || res.status === 0) {
        // statusText.value = '数据解压中...'
        return Promise.resolve(res.blob());
      } else {
        return Promise.reject(new Error(res.statusText));
      }
    })
    .then(JSZip.loadAsync)
    .then(async (zip) => {
      const data = await zip.file(`data.json`)?.async('string');
      // console.log('data', data);
      if (data) {
        list.value = JSON.parse(data);
        loading.value = false;
      }
    });
}
</script>

<style lang="scss" scoped>
.demo-dynamic {
  width: 100%;
  height: 500px;
  background-color: var(--vp-sidebar-bg-color);
  overflow: hidden;
  border: 1px solid var(--vp-c-border);

  .row-item {
    display: flex;
  }

  .demo-cell {
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    border-left: 1px solid #ccc;
    padding: 4px;
  }
}
</style>
