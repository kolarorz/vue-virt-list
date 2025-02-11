<template>
  <div class="demo-advanced">
    <div
      ref="clientRefEl"
      data-id="client"
      style="position: relative; width: 100%; height: 100%"
    >
      <VirtualScrollbar
        direction="horizontal"
        :client-size="xClientSize"
        :list-size="xListSize"
        :scroll-from="scrollF"
        bg-color="red"
        @scroll="handleScrollX"
      />
      <VirtualScrollbar
        direction="vertical"
        :client-size="slotSize.clientSize"
        :scroll-from="
          reactiveData.offset /
          (reactiveData.listTotalSize +
            slotSize.headerSize +
            slotSize.footerSize -
            slotSize.clientSize)
        "
        :list-size="bodyRef?.offsetWidth || 0"
        bg-color="red"
        @scroll="onScrollBarScroll"
      />
      <table
        cellspacing="0"
        cellpadding="0"
        :style="`width: ${fullWidth}px; transform: translateX(${-xOffset}px)`"
      >
        <thead
          ref="stickyHeaderRefEl"
          data-id="stickyHeader"
          class="grid-header"
          style="position: sticky; top: 0; background-color: #fff"
        >
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              style="
                border-right: 1px solid #000;
                border-bottom: 1px solid #000;
                background-color: #ccc;
                height: 32px;
              "
            >
              {{ column.title }}
            </th>
          </tr>
        </thead>
        <colgroup>
          <col
            v-for="column in columns"
            :key="column.key"
            :width="column.width"
          />
        </colgroup>
        <tbody
          ref="bodyRef"
          :style="{
            transform: `translateY(${transformDistance}px)`,
          }"
        >
          <Item
            v-for="row in renderList"
            :resizeObserver="resizeObserver"
            :key="row.id"
            :row="row"
            :columns="columns"
            :data-id="`${row.id}`"
          ></Item>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  useVirtScrollbarList,
  VirtualScrollbar,
  useScroll,
} from 'vue-virt-list';
import { computed, ref } from 'vue';
import Item from './AdvancedItem.vue';
type Column = {
  key: string;
  title: string;
  width: number;
};
const columns: Column[] = [
  { key: 'id', title: 'ID', width: 100 },
  { key: 'name', title: 'Name', width: 100 },
  { key: 'age', title: 'Age', width: 100 },
  { key: 'address', title: 'Address', width: 200 },
  { key: 'description', title: 'Description', width: 200 },
  { key: 'description1', title: 'Description1', width: 200 },
  { key: 'description2', title: 'Description2', width: 200 },
  { key: 'description3', title: 'Description3', width: 200 },
  { key: 'description4', title: 'Description4', width: 200 },
];
type Row = {
  id: number;
  name: string;
  age: number;
  address: string;
  description: string;
  description1: string;
  description2: string;
  description3: string;
  description4: string;
};
const list: Row[] = [];
const generateList = () => {
  for (let ii = 0; ii < 3000; ii += 1) {
    list.push({
      id: ii,
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      description:
        'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
      description1:
        'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
      description2:
        'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
      description3:
        'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
      description4:
        'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    });
  }
};
generateList();
// 通过 渲染控制器(renderControl) 来完成合并单元格计算
function renderControl(begin: number, end: number) {
  if (begin === 0 || begin === 1) {
    return {
      begin: 0,
      end,
    };
  }
  return {
    begin,
    end,
  };
}
const fullWidth = columns.reduce(
  (total, column: Column) =>
    total + typeof column.width !== undefined ? column.width : 200,
  0,
);
const {
  resizeObserver,
  reactiveData,
  renderList,
  clientRefEl,
  slotSize,
  stickyHeaderRefEl,
  transformDistance,
  onScrollBarScroll,
} = useVirtScrollbarList({
  list: list,
  minSize: 100,
  itemKey: 'id',
  renderControl,
});
const bodyRef = ref<HTMLElement | null>(null);
const scrollF = ref(0);
const xClientSize = computed(() => clientRefEl.value?.offsetWidth || 0);
const xListSize = computed(() => bodyRef.value?.offsetWidth || 0);
const xOffset = ref(0);
const handleScrollX = (ratio: number) => {
  xOffset.value = ratio * (xListSize.value - xClientSize.value);
};
let of = 0;
const horizontal = ref(true);
useScroll(
  clientRefEl,
  (deltaX: number) => {
    of += deltaX;
    if (of < 0) of = 0;
    if (of > xListSize.value - xClientSize.value)
      of = xListSize.value - xClientSize.value;
    scrollF.value = of / (xListSize.value - xClientSize.value);
    handleScrollX(of / (xListSize.value - xClientSize.value));
  },
  horizontal.value,
);
</script>
<style lang="scss" scoped>
.demo-advanced {
  width: 100%;
  height: 500px;
  background-color: var(--vp-sidebar-bg-color);
  overflow: hidden;
  border: 1px solid var(--vp-c-border);
  table {
    .grid-header {
      z-index: 2;
    }
    display: table;
    margin: 0;
    table-layout: fixed;
    border-spacing: 0;
    outline: none;
    border-collapse: separate;
  }
}
</style>
