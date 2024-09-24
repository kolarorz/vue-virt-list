import { defineComponent, ref, shallowRef, watch } from "vue-demi";
import { VirtList } from "./VirtList.js";
import { _h2Slot, getSlot } from "./util.js";
const VirtGrid = /* @__PURE__ */ defineComponent({
  name: "VirtGrid",
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
  setup(props) {
    const virtListRef = ref(null);
    const gridList = shallowRef([]);
    function updateList() {
      var _a, _b;
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
      const lastIndex = (_a = virtListRef == null ? void 0 : virtListRef.value) == null ? void 0 : _a.reactiveData.inViewBegin;
      scrollToIndex(lastIndex * props.gridItems);
      (_b = virtListRef == null ? void 0 : virtListRef.value) == null ? void 0 : _b.forceUpdate();
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
    function forceUpdate() {
      updateList();
    }
    watch(() => props.list.length, () => {
      updateList();
    }, {
      immediate: true
    });
    watch(() => props.gridItems, () => {
      if (props.gridItems <= 0)
        return;
      gridList.value = [];
      updateList();
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
      forceUpdate
    };
  },
  render() {
    const rowRender = (rowData) => {
      var _a;
      const {
        itemData
      } = rowData;
      const rows = [];
      for (let i = 0; i < itemData.children.length; i += 1) {
        rows.push((_a = getSlot(this, "default")) == null ? void 0 : _a({
          itemData: itemData.children[i],
          index: rowData.index
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
