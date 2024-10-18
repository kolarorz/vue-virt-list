import { defineComponent, ref, shallowRef, watch, nextTick } from "vue-demi";
import { VirtList } from "../virt-list/index.js";
import { _h2Slot, getSlot } from "../../utils/index.js";
const GridEmits = {
  scroll: (e) => e,
  toTop: (firstItem) => firstItem,
  toBottom: (lastItem) => lastItem,
  itemResize: (id, newSize) => true,
  rangeUpdate: (inViewBegin, inViewEnd) => true
};
const VirtGrid = /* @__PURE__ */ defineComponent({
  name: "VirtGrid",
  emits: GridEmits,
  props: {
    list: {
      type: Array,
      default: () => []
    },
    gridItems: {
      type: Number,
      default: 2
    },
    itemStyle: {
      type: String,
      default: ""
    }
  },
  setup(props, context) {
    const emits = context.emit;
    const virtListRef = ref(null);
    const gridList = shallowRef([]);
    function updateList() {
      var _a;
      if (props.gridItems <= 0)
        return;
      const list = [];
      for (let i = 0; i < props.list.length; i += props.gridItems) {
        const children = [];
        for (let j = 0; j < props.gridItems; j += 1) {
          if (i + j >= props.list.length)
            break;
          children.push(props.list[i + j]);
        }
        list.push({
          _id: i,
          children
        });
      }
      gridList.value = list;
      (_a = virtListRef == null ? void 0 : virtListRef.value) == null ? void 0 : _a.forceUpdate();
    }
    function scrollToLastIndex(newGridItems, oldGridItems) {
      var _a;
      const reactiveData = (_a = virtListRef == null ? void 0 : virtListRef.value) == null ? void 0 : _a.getReactiveData();
      if (reactiveData) {
        const targetRowIndex = Math.floor((reactiveData == null ? void 0 : reactiveData.inViewBegin) * oldGridItems / newGridItems);
        nextTick(() => {
          var _a2;
          (_a2 = virtListRef == null ? void 0 : virtListRef.value) == null ? void 0 : _a2.scrollToIndex(targetRowIndex);
        });
      }
    }
    function scrollToIndex(index) {
      var _a;
      const targetRowIndex = Math.floor(index / props.gridItems);
      (_a = virtListRef == null ? void 0 : virtListRef.value) == null ? void 0 : _a.scrollToIndex(targetRowIndex);
    }
    function scrollIntoView(index) {
      var _a;
      const targetRowIndex = Math.floor(index / props.gridItems);
      (_a = virtListRef == null ? void 0 : virtListRef.value) == null ? void 0 : _a.scrollIntoView(targetRowIndex);
    }
    function scrollToTop() {
      var _a;
      (_a = virtListRef == null ? void 0 : virtListRef.value) == null ? void 0 : _a.scrollToTop();
    }
    function scrollToBottom() {
      var _a;
      (_a = virtListRef == null ? void 0 : virtListRef.value) == null ? void 0 : _a.scrollToBottom();
    }
    function scrollToOffset(offset) {
      var _a;
      (_a = virtListRef == null ? void 0 : virtListRef.value) == null ? void 0 : _a.scrollToOffset(offset);
    }
    function onScroll(evt) {
      emits("scroll", evt);
    }
    function onToTop(firstItem) {
      emits("toTop", firstItem);
    }
    function onToBottom(lastItem) {
      emits("toBottom", lastItem);
    }
    function onItemResize(id, newSize) {
      emits("itemResize", id, newSize);
    }
    function onRangeUpdate(inViewBegin, inViewEnd) {
      emits("rangeUpdate", inViewBegin, inViewEnd);
    }
    function forceUpdate() {
      updateList();
    }
    watch(() => props.list.length, () => {
      updateList();
    }, {
      immediate: true
    });
    watch(() => props.gridItems, (nv, ov) => {
      if (props.gridItems <= 0)
        return;
      gridList.value = [];
      updateList();
      if (nv && ov) {
        scrollToLastIndex(nv, ov);
      }
    }, {
      immediate: true
    });
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
      onRangeUpdate
    };
  },
  render() {
    const {
      onScroll,
      onToTop,
      onToBottom,
      onItemResize,
      onRangeUpdate
    } = this;
    const rowRender = (rowData) => {
      var _a;
      const {
        itemData
      } = rowData;
      const rows = [];
      for (let i = 0; i < itemData.children.length; i += 1) {
        rows.push((_a = getSlot(this, "default")) == null ? void 0 : _a({
          itemData: itemData.children[i],
          index: rowData.index * this.gridItems + i,
          rowIndex: rowData.index
        }));
      }
      return rows;
    };
    return _h2Slot(VirtList, {
      ref: "virtListRef",
      attrs: {
        list: this.gridList,
        itemKey: "_id",
        itemStyle: `display: flex; min-width: min-content; ${this.itemStyle}`,
        ...this.$attrs
      },
      on: {
        scroll: onScroll,
        toTop: onToTop,
        toBottom: onToBottom,
        itemResize: onItemResize,
        rangeUpdate: onRangeUpdate
      }
    }, {
      default: rowRender,
      // transfer slots
      stickyHeader: getSlot(this, "stickyHeader"),
      stickyFooter: getSlot(this, "stickyFooter"),
      header: getSlot(this, "header"),
      footer: getSlot(this, "footer"),
      empty: getSlot(this, "empty")
    });
  }
});
export {
  VirtGrid
};
