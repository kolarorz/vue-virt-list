<script lang="ts" setup>
import { onMounted, ref, shallowRef, triggerRef } from 'vue';
import { VirtTree } from 'vue-virt-list';
import 'vue-virt-list/lib/assets/tree.css';

type Data = {
  id: string | number;
  title: string;
  disableSelect?: boolean;
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
      })),
    })),
  }));
});

const virtTreeRef = ref<typeof VirtTree>();

const focusedKeys = ref<(number | string)[]>(['0']);
const selectedKeys = ref<(number | string)[]>(['1']);

function onSelect(keys: number[]) {
  console.log('keys', keys);
}

function onChangeFocus(node: any) {
  focusedKeys.value = [node.data.id];
  // focusedKeys.value.splice(0, 1, node.key);
  console.log('onChangeFocus', focusedKeys.value);
  virtTreeRef.value?.forceUpdate();
}

// setTimeout(() => {
//   focusedKeys.value = [];
// }, 2000);
</script>

<template>
  <div class="demo-tree">
    <div>
      <span>选中keys：</span>
      <span>[{{ focusedKeys.join(', ') }}]</span>
    </div>

    <div class="virt-tree-wrapper">
      <VirtTree
        ref="virtTreeRef"
        selectable
        defaultExpandAll
        :list="list"
        :fieldNames="customFieldNames"
        :indent="20"
        :focusedKeys="focusedKeys"
        :selectedKeys="selectedKeys"
        @select="onSelect"
      >
        <template #content="{ node }">
          <div class="content">
            <div>
              <span>level: {{ node.level }}; </span>
              <span>title: {{ node.data.name }}</span>
            </div>
            <div class="more" @click.stop="onChangeFocus(node)">
              <svg
                t="1720683384262"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="5388"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="100%"
                height="100%"
              >
                <path
                  d="M288 456.864A63.264 63.264 0 0 0 256 448a64 64 0 1 0 0 128c11.712 0 22.56-3.392 32-8.896 19.04-11.072 32-31.488 32-55.104 0-23.648-12.96-44.064-32-55.136M544 456.864A63.264 63.264 0 0 0 512 448c-11.712 0-22.56 3.36-32 8.864-19.04 11.072-32 31.488-32 55.136 0 23.616 12.96 44.032 32 55.104 9.44 5.504 20.288 8.896 32 8.896s22.56-3.392 32-8.896c19.04-11.072 32-31.488 32-55.104 0-23.648-12.96-44.064-32-55.136M768 448c-11.712 0-22.56 3.392-32 8.864-19.04 11.104-32 31.52-32 55.136 0 23.616 12.96 44.032 32 55.136 9.44 5.472 20.288 8.864 32 8.864a64 64 0 1 0 0-128"
                  fill="#757575"
                  p-id="5389"
                ></path>
              </svg>
            </div>
          </div>
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

  .content {
    width: 100%;
    display: flex;
    justify-content: space-between;

    &:hover {
      .more {
        display: block;
      }
    }

    .more {
      display: none;
      width: 22px;
      height: 22px;
      border-radius: 4px;
      color: #757575;
      background-color: red;
    }
  }
}
</style>
<style lang="scss">
.demo-tree {
  .virt-tree-node.is-focused:not(.is-selected) {
    background-color: #4c88ff26;
  }
  .virt-tree-node.is-focused {
    .more {
      display: block;
    }
  }
}
</style>
