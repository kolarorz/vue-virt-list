import { defineComponent, shallowRef, watch, ref, type Ref } from 'vue-demi';
import { VirtList } from './VirtList';
import { _h, _h2Slot, getSlot } from './util';

const VirtGrid = defineComponent({
  name: 'VirtGrid',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    gridItems: {
      type: Number,
      default: 2,
    },
    itemStyle: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const virtListRef = ref<typeof VirtList | null>(null);

    const gridList: Ref<{ _id: number; children: any[] }[]> = shallowRef([]);

    function updateList() {
      // reset gridList
      const list = [];
      for (let i = 0; i < props.list.length; i += props.gridItems) {
        const children = [];
        for (let j = 0; j < props.gridItems; j += 1) {
          if (i + j >= props.list.length) break;
          children.push(props.list[i + j]);
        }
        // id 是组件生成的
        list.push({
          _id: i,
          children,
        });
      }
      gridList.value = list;

      const lastIndex = virtListRef?.value?.reactiveData.inViewBegin;
      scrollToIndex(lastIndex * props.gridItems);
      virtListRef?.value?.forceUpdate();
    }

    function scrollToIndex(index: number) {
      const targetRowIndex = Math.floor(index / props.gridItems);
      virtListRef?.value?.scrollToIndex(targetRowIndex);
    }

    function scrollIntoView(index: number) {
      const targetRowIndex = Math.floor(index / props.gridItems);
      virtListRef?.value?.scrollIntoView(targetRowIndex);
    }

    function scrollToTop() {
      virtListRef?.value?.scrollToTop();
    }

    function scrollToBottom() {
      virtListRef?.value?.scrollToBottom();
    }

    function scrollToOffset(offset: number) {
      virtListRef?.value?.scrollToOffset(offset);
    }

    function forceUpdate() {
      updateList();
    }

    watch(
      () => props.list.length,
      () => {
        updateList();
      },
      {
        immediate: true,
      },
    );

    watch(
      () => props.gridItems,
      () => {
        if (props.gridItems <= 0) return;
        gridList.value = [];
        updateList();
      },
      {
        immediate: true,
      },
    );

    return {
      virtListRef,
      gridList,

      // expose
      updateList,
      scrollToIndex,
      scrollIntoView,
      scrollToTop,
      scrollToBottom,
      scrollToOffset,
      forceUpdate,
    };
  },
  render() {
    const rowRender = (rowData: { itemData: any; index: number }): any[] => {
      const { itemData } = rowData;
      const rows = [];
      for (let i = 0; i < itemData.children.length; i += 1) {
        rows.push(
          getSlot(
            this,
            'default',
          )?.({
            itemData: itemData.children[i],
            index: rowData.index,
          }),
        );
      }
      return rows;
    };

    return _h2Slot(
      VirtList,
      {
        ref: 'virtListRef',
        attrs: {
          list: this.gridList,
          itemKey: '_id',
          itemStyle: `display: flex; min-width: min-content; ${this.itemStyle}`,
          ...this.$attrs,
        },
      },
      {
        default: rowRender,
        // transfer slots
        stickyHeader: getSlot(this, 'stickyHeader'),
        stickyFooter: getSlot(this, 'stickyFooter'),
        header: getSlot(this, 'header'),
        footer: getSlot(this, 'footer'),
        empty: getSlot(this, 'empty'),
      },
    );
  },
});

export { VirtGrid };
