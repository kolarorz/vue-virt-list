<template>
  <div class="main">
    <!-- <Operate
      :virtListRef="virtListRef"
      :length="list.length"
      :visible="visible"
      @toggleShow="visible = !visible"
    ></Operate>

    <div style="padding: 10px 0">
      <span>Total: {{ list.length }} </span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span>RenderBegin: {{ reactiveData.renderBegin }} </span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span>RenderEnd: {{ reactiveData.renderEnd }} </span>
    </div> -->

    <button class="demo-btn">折叠所有</button>
    <button class="demo-btn">展开所有</button>

    <div class="demo-tree" v-show="visible">
      <VirtList ref="virtListRef" :list="list" itemKey="id" :minSize="40">
        <template #default="{ itemData, index }">
          <Item
            :fold="
              foldMap[itemData.id] !== undefined ? foldMap[itemData.id] : ''
            "
            :itemData="itemData"
            :index="index"
          />
        </template>
      </VirtList>
    </div>
  </div>
</template>

<script lang="ts">
import { VirtList } from 'vue-virt-list';
import { getTreeList } from '../utils/common';
import Item from './Item.vue';
import Operate from '../components/OperateGroup.vue';

export default {
  name: 'DemoTree',
  components: {
    Item,
    VirtList,
    Operate,
  },
  data() {
    return {
      visible: true,
      list: [] as any[],
      virtListRef: null as typeof VirtList | null,
      reactiveData: {
        renderBegin: 0,
        renderEnd: 0,
      },
      expandMap: {},
      foldMap: {},
    };
  },
  mounted() {
    this.virtListRef = this.$refs.virtListRef as typeof VirtList;
    this.reactiveData = (this.$refs.virtListRef as any).reactiveData;
    const list = getTreeList();
    // 记录一下原始数组
    this.originList = list;

    this.generateFlatList();

    // setTimeout(() => {
    //   const deletedList = this.list.splice(0, 200);
    //   this.virtListRef.deletedList2Top(deletedList);
    // }, 3000);
  },
  methods: {
    // flatList(list) {
    //   const res: any[] = [];
    //   for (let i = 0; i < list.length; i += 1) {
    //     res.push(list[i]);
    //     if (list[i]?.children?.length > 0) {
    //       return this.flatList(list[i].children);
    //     }
    //   }
    //   return res;
    // },
    generateFlatList() {
      const flattenList: any[] = [];

      const { foldMap, expandMap } = this;

      // const hasExpandCol = !!this.flattedColumns.find(
      //   (col) => col.type === ColumnType.Expand,
      // );

      // const defaultExpandAll = this.getUIProps('defaultExpandAll');
      const defaultExpandAll = true;

      this.gridRowMap = {};

      let level = 0;
      let groupLevel = 0;
      const flat = (list: any[], isGroup = false) => {
        list.forEach((item, index) => {
          if (isGroup) {
            groupLevel += 1;
          }

          const row = {
            ...item,
            level,
            groupLevel,
            isLastChild: index === list.length - 1,
          };
          flattenList.push(row);
          this.gridRowMap[row.id] = row;

          if (item?.children && item?.children?.length > 0) {
            level += 1;
            foldMap[item.id] = !defaultExpandAll;
            if (defaultExpandAll) {
              flat(item.children, item.type === 'group');
            }
            level -= 1;
          }

          // if (hasExpandCol) {
          //   expandMap[item.id] = defaultExpandAll;
          //   if (defaultExpandAll) {
          //     this.gridRowMap[`${item.id}-expand`] = {
          //       id: `${item.id}-expand`,
          //       type: 'expand',
          //     };
          //   }
          // }

          // if (expandMap[item.id]) {
          //   flattenList.push(this.gridRowMap[`${item.id}-expand`]);
          // }
          // if (isGroup) {
          //   groupLevel -= 1;
          // }
        });
      };
      flat(this.originList);

      this.setList(flattenList);

      return flattenList;
    },
    setList(list: any) {
      this.list = list;
    },
  },
};
</script>

<style lang="scss" scoped>
.demo-tree {
  width: 100%;
  height: 500px;
  background-color: var(--vp-sidebar-bg-color);
  overflow: hidden;
  border: 1px solid var(--vp-c-border);
}
</style>
