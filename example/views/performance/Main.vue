<template>
  <div
    class="demo-dynamic"
    style="display: flex; flex-direction: column; align-items: center"
  >
    <Operate
      :virtualListRef="$refs.virtualListRef"
      :length="list.length"
    ></Operate>

    <div class="demo">
      <VirtualList
        test="test"
        :itemComponent="itemComponent"
        :buffer="2"
        :minSize="50"
        :list="list"
        ref="virtualListRef"
        itemKey="id"
        stickyHeaderStyle="height: 40px; background: green;"
        headerStyle="height: 80px; background: red"
        footerStyle="height: 50px; background: green"
        @test="onTest"
      >
      </VirtualList>
    </div>
  </div>
</template>

<script>
import { VirtualList } from '../../../src';
import { getRows } from '../../utils/common';
import Item from './Item';
import Operate from '../../components/Operate.vue';

export default {
  name: 'Dynamic',
  components: {
    VirtualList,
    Operate,
  },
  data() {
    return {
      itemComponent: Item,
      list: getRows(1, 200000),
    };
  },
  async mounted() {
    // this.list = await getRows(1, 200000);
    // this.$refs.virtualListRef.scrollIntoView(199997);
  },
  methods: {
    onTest() {
      console.log('test');
    },
  },
};
</script>

<style lang="scss">
.demo-dynamic {
  .demo {
    width: 800px;
    height: 500px;
    background-color: #fff;
    overflow: hidden;
    border: 1px solid #000;

    .demo-row {
      display: flex;
    }

    .demo-cell {
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      border-left: 1px solid #ccc;
    }
  }
}
</style>
