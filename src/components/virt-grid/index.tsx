import {
  defineComponent,
  shallowRef,
  watch,
  ref,
  nextTick,
  type Ref,
  type SetupContext,
} from 'vue-demi';
import { VirtList } from '../virt-list';
import { _h, _h2Slot, getSlot } from '../../utils';

const GridEmits = {
  scroll: (e: Event) => e,
  toTop: (firstItem: any) => firstItem,
  toBottom: (lastItem: any) => lastItem,
  itemResize: (id: string, newSize: number) => true,
  rangeUpdate: (inViewBegin: number, inViewEnd: number) => true,
};

const VirtGrid = defineComponent({
  name: 'VirtGrid',
  emits: GridEmits,
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
  setup(props, context: SetupContext) {
    const emits = context.emit as SetupContext<typeof GridEmits>['emit'];

    const virtListRef = ref<typeof VirtList | null>(null);

    const gridList: Ref<{ _id: number; children: any[] }[]> = shallowRef([]);

    function updateList() {
      if (props.gridItems <= 0) return;
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
      virtListRef?.value?.forceUpdate();
    }

    // 滚动到上次的index位置
    function scrollToLastIndex(newGridItems: number, oldGridItems: number) {
      const reactiveData = virtListRef?.value?.getReactiveData();
      if (reactiveData) {
        const targetRowIndex = Math.floor(
          (reactiveData?.inViewBegin * oldGridItems) / newGridItems,
        );
        nextTick(() => {
          virtListRef?.value?.scrollToIndex(targetRowIndex);
        });
      }
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

    function onScroll(evt: Event) {
      emits('scroll', evt);
    }

    function onToTop(firstItem: any) {
      emits('toTop', firstItem);
    }

    function onToBottom(lastItem: any) {
      emits('toBottom', lastItem);
    }

    function onItemResize(id: string, newSize: number) {
      emits('itemResize', id, newSize);
    }

    function onRangeUpdate(inViewBegin: number, inViewEnd: number) {
      emits('rangeUpdate', inViewBegin, inViewEnd);
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
      (nv, ov) => {
        if (props.gridItems <= 0) return;
        gridList.value = [];
        updateList();

        if (nv && ov) {
          scrollToLastIndex(nv, ov);
        }
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

      // 透传event
      onScroll,
      onToTop,
      onToBottom,
      onItemResize,
      onRangeUpdate,
    };
  },
  render() {
    const { onScroll, onToTop, onToBottom, onItemResize, onRangeUpdate } = this;
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
            index: rowData.index * this.gridItems + i,
            rowIndex: rowData.index,
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
        on: {
          scroll: onScroll,
          toTop: onToTop,
          toBottom: onToBottom,
          itemResize: onItemResize,
          rangeUpdate: onRangeUpdate,
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
