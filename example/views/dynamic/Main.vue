<template>
  <div
    class="demo-dynamic"
    style="display: flex; flex-direction: column; align-items: center"
  >
    <Operate
      :virtualListRef="$refs.virtualListRef"
      :length="list.length"
      :visible.sync="visible"
    >
      <div class="operate-item">
        <button class="operate-btn" @click="addItems">增加1000条</button>
      </div>
    </Operate>

    <div class="demo" style="resize: auto" v-show="visible">
      <VirtualList
        ref="virtualListRef"
        :itemComponent="itemComponent"
        :list="list"
        :buffer="5"
        itemKey="id"
        :minSize="20"
        @itemClick="itemClick"
      >
      </VirtualList>
    </div>
  </div>
</template>

<script>
import { VirtualList } from '../../../src';
import { addRows } from '../../utils/common';
import Item from './Item.vue';
import Operate from '../../components/Operate.vue';

const mixin = {
  data: function () {
    return {
      message: 'hello',
      foo: 'abc',
    };
  },
  created() {
    console.log(555);
  },
};

export default {
  name: 'Dynamic',
  components: {
    VirtualList,
    Operate,
  },
  mixins: [mixin],
  data() {
    return {
      itemComponent: Item,
      visible: true,
      list: addRows(0, 2000),
    };
  },
  methods: {
    addItems() {
      this.list = this.list.concat(addRows(this.list.length, 1000));
    },
    test() {
      console.log(333);
    },
    itemClick() {
      console.log(122);
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
