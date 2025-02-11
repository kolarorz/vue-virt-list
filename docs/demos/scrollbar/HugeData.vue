<template>
  <div class="main">
    <Operate
      :virtListRef="virtListRef"
      :length="list.length"
      :visible.sync="visible"
    ></Operate>

    <div style="padding: 10px 0">
      <button class="demo-btn" @click="onLoadData" style="color: red">
        解压100w数据
      </button>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span>Total: {{ list.length }} </span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span>RenderBegin: {{ reactiveData?.renderBegin }} </span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span>RenderEnd: {{ reactiveData?.renderEnd }} </span>
    </div>

    <div class="demo-huge" style="width: 100%; height: 500px">
      <div class="empty" v-if="list.length === 0">
        {{ loading ? '数据解压中...' : 'empty' }}
      </div>

      <VirtScrollbarList
        ref="virtListRef"
        :minSize="40"
        :list="list"
        itemKey="id"
        :buffer="2"
        stickyHeaderStyle="text-align: center; height: 40px; background: #42b983;"
        headerStyle="text-align: center; height: 80px; background: cyan"
        footerStyle="text-align: center; height: 80px; background: cyan"
        stickyFooterStyle="text-align: center; height: 40px; background: #42b983;"
      >
        <template #default="{ itemData, index }">
          <Item :itemData="itemData" :index="index" />
        </template>
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
import JSZip from 'jszip';
import { VirtScrollbarList } from 'vue-virt-list';
import Item from './Item.vue';
import url from '../data/100w.zip?url';
import Operate from '../components/OperateGroup.vue';

const visible = ref(false);
const loading = ref(false);
const virtListRef: Ref<typeof VirtScrollbarList | null> = ref(null);

// 巨量数据请使用 `ShallowRef !!!`，`否则内存就爆了!!!` 如需响应式，请使用 `virtListRef.value?.forceUpdate();`。或者，自己新增一个`renderKey`来控制渲染
const list: ShallowRef<any[]> = shallowRef([]);

const reactiveData = computed(() => {
  return virtListRef.value?.reactiveData;
});

onMounted(() => {
  virtListRef.value?.forceUpdate();
});

async function onLoadData() {
  if (list.value.length !== 0) return;

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
.demo-huge {
  background-color: var(--vp-sidebar-bg-color);
  border: 1px solid var(--vp-c-border);
  overflow: hidden;

  .empty {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

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
