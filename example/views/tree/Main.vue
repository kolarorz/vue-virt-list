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

    <div class="demo" v-show="visible">
      <VirtualList
        :minSize="40"
        :itemComponent="itemComponent"
        :list="list"
        ref="virtualListRef"
        itemKey="id"
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
import { faker } from '@faker-js/faker';

export default {
  name: 'Dynamic',
  components: {
    VirtualList,
    Operate,
  },
  data() {
    return {
      itemComponent: Item,
      visible: true,
      list: [
        {
          id: 0,
          text: faker.lorem.sentences(),
          children: [],
        },
        {
          id: 1,
          text: faker.lorem.sentences(),
          children: [
            {
              id: 11,
              text: faker.lorem.sentences(),
            },
            {
              id: 12,
              text: faker.lorem.sentences(),
            },
          ],
        },
        {
          id: 2,
          text: faker.lorem.sentences(),
          children: [
            {
              id: 21,
              text: faker.lorem.sentences(),
            },
          ],
        },
        {
          id: 3,
          text: faker.lorem.sentences(),
          children: [],
        },
        {
          id: 4,
          text: faker.lorem.sentences(),
          children: [
            {
              id: 41,
              text: faker.lorem.sentences(),
            },
            {
              id: 42,
              text: faker.lorem.sentences(),
            },
            {
              id: 43,
              text: faker.lorem.sentences(),
            },
          ],
        },
        {
          id: 5,
          text: faker.lorem.sentences(),
        },
        {
          id: 6,
          text: faker.lorem.sentences(),
          children: [
            {
              id: 61,
              text: faker.lorem.sentences(),
            },
          ],
        },
        {
          id: 7,
          text: faker.lorem.sentences(),
        },
        {
          id: 8,
          text: faker.lorem.sentences(),
        },
        {
          id: 9,
          text: faker.lorem.sentences(),
          children: [
            {
              id: 91,
              text: faker.lorem.sentences(),
            },
            {
              id: 92,
              text: faker.lorem.sentences(),
            },
            {
              id: 93,
              text: faker.lorem.sentences(),
            },
          ],
        },
        {
          id: 10,
          text: faker.lorem.sentences(),
          children: [
            {
              id: 101,
              text: faker.lorem.sentences(),
            },
            {
              id: 102,
              text: faker.lorem.sentences(),
            },
          ],
        },
        {
          id: 11,
          text: faker.lorem.sentences(),
        },
        {
          id: 12,
          text: faker.lorem.sentences(),
        },
        {
          id: 13,
          text: faker.lorem.sentences(),
          children: [
            {
              id: 131,
              text: faker.lorem.sentences(),
            },
            {
              id: 132,
              text: faker.lorem.sentences(),
            },
            {
              id: 133,
              text: faker.lorem.sentences(),
            },
          ],
        },
        {
          id: 14,
          text: faker.lorem.sentences(),
        },
        {
          id: 15,
          text: faker.lorem.sentences(),
        },
      ],
    };
  },
  methods: {
    addItems() {
      this.list = this.list.concat(addRows(this.list.length, 1000));
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
