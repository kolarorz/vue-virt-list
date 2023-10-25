<template>
  <div
    class="demo-table"
    style="display: flex; flex-direction: column; align-items: center"
  >
    <br />
    <br />
    <br />
    <br />
    <div>加载行数 {{ list.length }}</div>
    <div class="demo">
      <div style="flex: 1; overflow: hidden">
        <VirtualList
          v-show="list.length"
          :itemComponent="itemComponent"
          ref="virtualListRef"
          :list="list"
          @toTop="onToTop"
          :itemKey="rowKeyName"
          :minSize="40"
          headerStyle="display: flex; justify-content: center;"
        >
          <template #header>
            <div style="height: 40px">
              <svg viewBox="25 25 50 50" class="circular">
                <circle
                  cx="50"
                  cy="50"
                  r="20"
                  fill="none"
                  class="path"
                ></circle>
              </svg>
            </div>
          </template>
        </VirtualList>
      </div>
      <div class="input">
        <input type="text" placeholder="请输入发送内容" v-model="message" />
        <div class="send" @click="send">发送</div>
      </div>
    </div>
  </div>
</template>

<script>
import { VirtualList } from '../../../src';
import Item from './Item.vue';
import Operate from '../../components/Operate.vue';
// import { asyncGetRows } from '../../utils/common'

export default {
  name: 'Chat',
  components: {
    // Operate,
    VirtualList,
  },
  data() {
    return {
      itemComponent: Item,

      originList: [
        {
          id: 0,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 1,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 2,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 3,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 4,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 5,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 6,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 7,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 8,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 9,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 10,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 11,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 12,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 13,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 14,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 15,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 16,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 17,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 18,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 19,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 20,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 21,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 22,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 23,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 24,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 25,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 26,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 27,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 28,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 29,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 30,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 31,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 32,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 33,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 34,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 35,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 36,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 37,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 38,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 39,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 40,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 41,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 42,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 43,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 44,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 45,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 46,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 47,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 48,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 49,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 50,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 51,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 52,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 53,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 54,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 55,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 56,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 57,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 58,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 59,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 60,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 61,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 62,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 63,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 64,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 65,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 66,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 67,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 68,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 69,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 70,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 71,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 72,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 73,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 74,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 75,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 76,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 77,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 78,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 79,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 80,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 81,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 82,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 83,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 84,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 85,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 86,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 87,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 88,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 89,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 90,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 91,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 92,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 93,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 94,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 95,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 96,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 97,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 98,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 99,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 100,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 101,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 102,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 103,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 104,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 105,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 106,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 107,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 108,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 109,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 110,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 111,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 112,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 113,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 114,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 115,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 116,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 117,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 118,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 119,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 120,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 121,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 122,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 123,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 124,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 125,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 126,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 127,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 128,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 129,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 130,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 131,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 132,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 133,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 134,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 135,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 136,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 137,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 138,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 139,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 140,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 141,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 142,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 143,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 144,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 145,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 146,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 147,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 148,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 149,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 150,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 151,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 152,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 153,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 154,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 155,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 156,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 157,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 158,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 159,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 160,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 161,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 162,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 163,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 164,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 165,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 166,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 167,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 168,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 169,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 170,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 171,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 172,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 173,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 174,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 175,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 176,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 177,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 178,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 179,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 180,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 181,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 182,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 183,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 184,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 185,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 186,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 187,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 188,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 189,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 190,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 191,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 192,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 193,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 194,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 195,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 196,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 197,
          type: 'you',
          msg: '你好吗？',
        },
        {
          id: 198,
          type: 'me',
          msg: '你好吗？',
        },
        {
          id: 199,
          type: 'you',
          msg: '你好吗？',
        },
      ],

      list: [],
      maxpage: 10,
      page: 1, // 1
      pageSize: 20,

      rowKeyName: 'id',

      scrollToIndex: 10,
      scrollToOffset: 200,
      scrollIntoViewIndex: 3,

      message: '',

      fakeId: 1000,
      isFirst: true,
      // pageSize: 20,
      // page: 1,
      isLoading: false,
    };
  },
  async mounted() {
    this.list = await this.asyncGetRows();
    setTimeout(() => {
      this.$refs.virtualListRef.scrollToBottom();
    }, 500);
  },
  methods: {
    asyncGetRows() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            this.originList.slice(
              this.originList.length - this.page * this.pageSize,
              this.originList.length - (this.page - 1) * this.pageSize,
            ),
          );
        }, 200);
      });
    },
    send() {
      this.list.push({
        id: this.fakeId,
        type: 'me',
        msg: this.message,
      });
      this.$refs.virtualListRef.scrollToBottom();

      this.message = '';
      this.fakeId += 1;
    },
    onBlur(e, row) {
      console.log(row);
      this.$refs.virtualListRef.deleteItemSize(itemData.id);
      this.list.find((item) => item.id === itemData.id);
      itemData.en = e.target.innerText;
    },
    goScrollIndex() {
      this.$refs.virtualListRef.scrollToIndex(this.scrollToIndex);
    },
    goScrollOffset() {
      this.$refs.virtualListRef.scrollToOffset(this.scrollToOffset);
    },
    goScrollIntoView() {
      this.$refs.virtualListRef.scrollIntoView(this.scrollIntoViewIndex);
    },
    async onToTop() {
      if (this.isLoading) {
        return;
      }
      if (this.page >= 10) return;
      this.isLoading = true;
      this.page += 1;
      const prevList = await this.asyncGetRows();
      this.list = prevList.concat(this.list);
      // console.log('prevList', prevList);

      const offset = prevList.reduce(
        (res, cur) => (res += this.$refs.virtualListRef.getItemSize(cur.id)),
        0,
      );
      this.$refs.virtualListRef.increaseTopSize(prevList);
      // this.$refs.virtualListRef.scrollToOffset(
      //   this.$refs.virtualListRef.reactiveData.offset + offset,
      // );
      // this.$refs.virtualListRef.getItemSize();
      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss">
.demo-table {
  font-size: 14px;
  font-family: 'PingFang SC';

  .demo {
    width: 800px;
    height: 500px;
    background-color: #fff;
    overflow: hidden;
    border: 1px solid #000;
    display: flex;
    flex-direction: column;

    .input {
      width: 100%;
      height: 40px;
      background-color: cadetblue;
      display: flex;

      input {
        display: block;
        flex: 1;
        overflow: hidden;
        padding: 0 20px;
      }

      .send {
        width: 50px;
        height: 100%;
      }
    }
  }

  @keyframes loading-rotate {
    100% {
      transform: rotate(1turn);
    }
  }

  @keyframes loading-dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -40px;
    }

    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -120px;
    }
  }

  .circular {
    height: 30px;
    width: 30px;
    animation: loading-rotate 2s linear infinite;

    .path {
      animation: loading-dash 1.5s ease-in-out infinite;
      stroke-dasharray: 90, 150;
      stroke-dashoffset: 0;
      stroke-width: 2;
      stroke: #409eff;
      stroke-linecap: round;
    }
  }
}
</style>
