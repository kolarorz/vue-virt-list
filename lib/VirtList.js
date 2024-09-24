import { ref, shallowReactive, onBeforeMount, onMounted, onBeforeUnmount, shallowRef, watch, defineComponent, isVue2 } from "vue-demi";
import { ObserverItem } from "./ObserverItem.js";
import { _h, getSlot, _hChild } from "./util.js";
const defaultProps = {
  fixed: false,
  buffer: 0,
  bufferTop: 0,
  bufferBottom: 0,
  scrollDistance: 0,
  horizontal: false,
  fixSelection: false,
  start: 0,
  offset: 0,
  listStyle: "",
  listClass: "",
  itemStyle: "",
  itemClass: "",
  headerClass: "",
  headerStyle: "",
  footerClass: "",
  footerStyle: "",
  stickyHeaderClass: "",
  stickyHeaderStyle: "",
  stickyFooterClass: "",
  stickyFooterStyle: ""
};
function useVirtList(userProps, emitFunction) {
  const props = new Proxy(userProps, {
    get(target, key) {
      var _a;
      return (_a = Reflect.get(target, key)) != null ? _a : Reflect.get(defaultProps, key);
    }
  });
  const clientRefEl = ref(null);
  const listRefEl = ref(null);
  const headerRefEl = ref(null);
  const footerRefEl = ref(null);
  const stickyHeaderRefEl = ref(null);
  const stickyFooterRefEl = ref(null);
  const sizesMap = /* @__PURE__ */ new Map();
  const renderKey = ref(0);
  let direction = "backward";
  let fixOffset = false;
  let forceFixOffset = false;
  let abortFixOffset = false;
  let fixTaskFn = null;
  const slotSize = shallowReactive({
    clientSize: 0,
    headerSize: 0,
    footerSize: 0,
    stickyHeaderSize: 0,
    stickyFooterSize: 0
  });
  const reactiveData = shallowReactive({
    // 可视区域的个数，不算buffer，只和clientSize和minSize有关
    views: 0,
    // 滚动距离
    offset: 0,
    // 不包含插槽的高度
    listTotalSize: 0,
    // 虚拟占位尺寸，是从0到renderBegin的尺寸
    virtualSize: 0,
    // 可视区的起始下标
    inViewBegin: 0,
    // 可视区的结束下标
    inViewEnd: 0,
    // buffer的起始下标
    renderBegin: 0,
    // buffer的结束下标
    renderEnd: 0,
    bufferTop: 0,
    bufferBottom: 0
  });
  function getOffset() {
    const directionKey = props.horizontal ? "scrollLeft" : "scrollTop";
    return clientRefEl.value ? clientRefEl.value[directionKey] : 0;
  }
  function getSlotSize() {
    return slotSize.headerSize + slotSize.footerSize + slotSize.stickyHeaderSize + slotSize.stickyFooterSize;
  }
  function getTotalSize() {
    return reactiveData.listTotalSize + slotSize.headerSize + slotSize.footerSize + slotSize.stickyHeaderSize + slotSize.stickyFooterSize;
  }
  function getItemSize(itemKey) {
    var _a;
    if (props.fixed)
      return props.minSize;
    return (_a = sizesMap.get(String(itemKey))) != null ? _a : props.minSize;
  }
  function setItemSize(itemKey, size) {
    sizesMap.set(String(itemKey), size);
  }
  function deleteItemSize(itemKey) {
    sizesMap.delete(String(itemKey));
  }
  function getItemPosByIndex(index) {
    var _a, _b;
    if (props.fixed) {
      return {
        top: props.minSize * index,
        current: props.minSize,
        bottom: props.minSize * (index + 1)
      };
    }
    const {
      itemKey
    } = props;
    let topReduce = slotSize.headerSize;
    for (let i = 0; i <= index - 1; i += 1) {
      const currentSize = getItemSize((_a = props.list[i]) == null ? void 0 : _a[itemKey]);
      topReduce += currentSize;
    }
    const current = getItemSize((_b = props.list[index]) == null ? void 0 : _b[itemKey]);
    return {
      top: topReduce,
      current,
      bottom: topReduce + current
    };
  }
  function scrollToOffset(offset) {
    abortFixOffset = true;
    const directionKey = props.horizontal ? "scrollLeft" : "scrollTop";
    if (clientRefEl.value)
      clientRefEl.value[directionKey] = offset;
  }
  async function scrollToIndex(index) {
    if (index < 0) {
      return;
    }
    if (index >= props.list.length - 1) {
      scrollToBottom();
      return;
    }
    let {
      top: lastOffset
    } = getItemPosByIndex(index);
    scrollToOffset(lastOffset);
    const fixToIndex = () => {
      const {
        top: offset
      } = getItemPosByIndex(index);
      scrollToOffset(offset);
      if (lastOffset !== offset) {
        lastOffset = offset;
        fixTaskFn = fixToIndex;
        return;
      }
      fixTaskFn = null;
    };
    fixTaskFn = fixToIndex;
  }
  async function scrollIntoView(index) {
    var _a;
    const {
      top: targetMin,
      bottom: targetMax
    } = getItemPosByIndex(index);
    const offsetMin = getOffset();
    const offsetMax = getOffset() + slotSize.clientSize;
    const currentSize = getItemSize((_a = props.list[index]) == null ? void 0 : _a[props.itemKey]);
    if (targetMin < offsetMin && offsetMin < targetMax && currentSize < slotSize.clientSize) {
      scrollToOffset(targetMin);
      return;
    }
    if (targetMin + slotSize.stickyHeaderSize < offsetMax && offsetMax < targetMax + slotSize.stickyHeaderSize && currentSize < slotSize.clientSize) {
      scrollToOffset(targetMax - slotSize.clientSize + slotSize.stickyHeaderSize);
      return;
    }
    if (targetMin + slotSize.stickyHeaderSize >= offsetMax) {
      scrollToIndex(index);
      return;
    }
    if (targetMax <= offsetMin) {
      scrollToIndex(index);
      return;
    }
  }
  async function scrollToTop() {
    scrollToOffset(0);
    setTimeout(() => {
      var _a;
      const directionKey = props.horizontal ? "scrollLeft" : "scrollTop";
      if (((_a = clientRefEl == null ? void 0 : clientRefEl.value) == null ? void 0 : _a[directionKey]) !== 0) {
        scrollToTop();
      }
    }, 3);
  }
  async function scrollToBottom() {
    scrollToOffset(getTotalSize());
    setTimeout(() => {
      if (Math.abs(Math.round(reactiveData.offset + slotSize.clientSize) - Math.round(getTotalSize())) > 2) {
        scrollToBottom();
      }
    }, 3);
  }
  function fixSelection() {
    const selection = window.getSelection();
    if (selection) {
      const {
        anchorNode,
        anchorOffset,
        focusNode,
        focusOffset
      } = selection;
      if (anchorNode && anchorOffset !== null && focusNode !== null && focusOffset) {
        requestAnimationFrame(() => {
          if (anchorOffset < focusOffset) {
            selection.setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset);
          } else {
            selection.setBaseAndExtent(focusNode, focusOffset, anchorNode, anchorOffset);
          }
        });
      }
    }
  }
  function updateRange(start) {
    var _a;
    if (isVue2 && props.fixSelection && direction === "backward") {
      fixSelection();
    }
    reactiveData.inViewBegin = start;
    reactiveData.inViewEnd = Math.min(start + reactiveData.views, props.list.length - 1);
    (_a = emitFunction == null ? void 0 : emitFunction.rangeUpdate) == null ? void 0 : _a.call(emitFunction, reactiveData.inViewBegin, reactiveData.inViewEnd);
  }
  function calcRange() {
    var _a, _b;
    const {
      views,
      offset,
      inViewBegin
    } = reactiveData;
    const {
      itemKey
    } = props;
    const offsetWithNoHeader = offset - slotSize.headerSize;
    let start = inViewBegin;
    let offsetReduce = getVirtualSize2beginInView();
    if (offsetWithNoHeader < 0) {
      updateRange(0);
      return;
    }
    if (direction === "forward") {
      if (offsetWithNoHeader >= offsetReduce) {
        return;
      }
      for (let i = start - 1; i >= 0; i -= 1) {
        const currentSize = getItemSize((_a = props.list[i]) == null ? void 0 : _a[itemKey]);
        offsetReduce -= currentSize;
        if (offsetReduce <= offsetWithNoHeader && offsetWithNoHeader < offsetReduce + currentSize) {
          start = i;
          break;
        }
      }
      fixOffset = true;
    }
    if (direction === "backward") {
      if (offsetWithNoHeader <= offsetReduce) {
        return;
      }
      for (let i = start; i <= props.list.length - 1; i += 1) {
        const currentSize = getItemSize((_b = props.list[i]) == null ? void 0 : _b[itemKey]);
        if (offsetReduce <= offsetWithNoHeader && offsetWithNoHeader < offsetReduce + currentSize) {
          start = i;
          break;
        }
        offsetReduce += currentSize;
      }
      fixOffset = false;
    }
    if (start !== reactiveData.inViewBegin) {
      updateRange(start);
    }
  }
  function onScroll(evt) {
    var _a, _b, _c;
    (_a = emitFunction == null ? void 0 : emitFunction.scroll) == null ? void 0 : _a.call(emitFunction, evt);
    const offset = getOffset();
    if (offset === reactiveData.offset)
      return;
    direction = offset < reactiveData.offset ? "forward" : "backward";
    reactiveData.offset = offset;
    calcRange();
    if (direction === "forward" && reactiveData.offset - props.scrollDistance <= 0) {
      (_b = emitFunction == null ? void 0 : emitFunction.toTop) == null ? void 0 : _b.call(emitFunction, props.list[0]);
    }
    if (direction === "backward" && Math.round(reactiveData.offset + props.scrollDistance) >= Math.round(reactiveData.listTotalSize + getSlotSize() - slotSize.clientSize)) {
      (_c = emitFunction == null ? void 0 : emitFunction.toBottom) == null ? void 0 : _c.call(emitFunction, props.list[props.list.length - 1]);
    }
  }
  function calcViews() {
    const newViews = Math.ceil(slotSize.clientSize / props.minSize) + 1;
    reactiveData.views = newViews;
  }
  function onClientResize() {
    calcViews();
    updateRange(reactiveData.inViewBegin);
  }
  function calcListTotalSize() {
    var _a;
    if (props.fixed) {
      reactiveData.listTotalSize = props.minSize * props.list.length;
      return;
    }
    const {
      itemKey
    } = props;
    let re = 0;
    for (let i = 0; i <= props.list.length - 1; i += 1) {
      re += getItemSize((_a = props.list[i]) == null ? void 0 : _a[itemKey]);
    }
    reactiveData.listTotalSize = re;
  }
  function reset() {
    reactiveData.offset = 0;
    reactiveData.listTotalSize = 0;
    reactiveData.virtualSize = 0;
    reactiveData.inViewBegin = 0;
    reactiveData.inViewEnd = 0;
    reactiveData.renderBegin = 0;
    reactiveData.renderEnd = 0;
    sizesMap.clear();
    forceUpdate();
  }
  function deletedList2Top(deletedList) {
    calcListTotalSize();
    let deletedListSize = 0;
    deletedList.forEach((item) => {
      deletedListSize += getItemSize(item[props.itemKey]);
    });
    updateTotalVirtualSize();
    scrollToOffset(reactiveData.offset - deletedListSize);
    calcRange();
  }
  function addedList2Top(addedList) {
    calcListTotalSize();
    let addedListSize = 0;
    addedList.forEach((item) => {
      addedListSize += getItemSize(item[props.itemKey]);
    });
    updateTotalVirtualSize();
    scrollToOffset(reactiveData.offset + addedListSize);
    forceFixOffset = true;
    abortFixOffset = false;
    calcRange();
  }
  function forceUpdate() {
    renderKey.value += 1;
  }
  let resizeObserver = void 0;
  if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver((entries) => {
      var _a;
      let diff = 0;
      for (const entry of entries) {
        const id = entry.target.dataset.id;
        if (id) {
          const oldSize = getItemSize(id);
          let newSize = 0;
          if (entry.borderBoxSize) {
            const borderBoxSize = Array.isArray(entry.borderBoxSize) ? entry.borderBoxSize[0] : entry.borderBoxSize;
            newSize = props.horizontal ? borderBoxSize.inlineSize : borderBoxSize.blockSize;
          } else {
            newSize = props.horizontal ? entry.contentRect.width : entry.contentRect.height;
          }
          if (id === "client") {
            slotSize.clientSize = newSize;
            onClientResize();
          } else if (id === "header") {
            slotSize.headerSize = newSize;
          } else if (id === "footer") {
            slotSize.footerSize = newSize;
          } else if (id === "stickyHeader") {
            slotSize.stickyHeaderSize = newSize;
          } else if (id === "stickyFooter") {
            slotSize.stickyFooterSize = newSize;
          } else if (oldSize !== newSize) {
            setItemSize(id, newSize);
            diff += newSize - oldSize;
            (_a = emitFunction == null ? void 0 : emitFunction.itemResize) == null ? void 0 : _a.call(emitFunction, id, newSize);
          }
        }
      }
      reactiveData.listTotalSize += diff;
      if (fixTaskFn) {
        fixTaskFn();
      }
      if ((fixOffset || forceFixOffset) && diff !== 0 && !abortFixOffset) {
        fixOffset = false;
        forceFixOffset = false;
        scrollToOffset(reactiveData.offset + diff);
      }
      abortFixOffset = false;
    });
  }
  const updateTotalVirtualSize = () => {
    var _a;
    let offset = 0;
    const currentFirst = reactiveData.renderBegin;
    for (let i = 0; i < currentFirst; i++) {
      offset += getItemSize((_a = props.list[i]) == null ? void 0 : _a[props.itemKey]);
    }
    reactiveData.virtualSize = offset;
  };
  onBeforeMount(() => {
    if (props.bufferTop) {
      reactiveData.bufferTop = props.bufferTop;
    } else {
      reactiveData.bufferTop = props.buffer;
    }
    if (props.bufferBottom) {
      reactiveData.bufferBottom = props.bufferBottom;
    } else {
      reactiveData.bufferBottom = props.buffer;
    }
  });
  onMounted(() => {
    if (clientRefEl.value) {
      clientRefEl.value.addEventListener("scroll", onScroll);
      resizeObserver == null ? void 0 : resizeObserver.observe(clientRefEl.value);
    }
    if (stickyHeaderRefEl.value) {
      resizeObserver == null ? void 0 : resizeObserver.observe(stickyHeaderRefEl.value);
    }
    if (stickyFooterRefEl.value) {
      resizeObserver == null ? void 0 : resizeObserver.observe(stickyFooterRefEl.value);
    }
    if (headerRefEl.value) {
      resizeObserver == null ? void 0 : resizeObserver.observe(headerRefEl.value);
    }
    if (footerRefEl.value) {
      resizeObserver == null ? void 0 : resizeObserver.observe(footerRefEl.value);
    }
    if (props.start) {
      scrollToIndex(props.start);
    } else if (props.offset) {
      scrollToOffset(props.offset);
    }
  });
  onBeforeUnmount(() => {
    if (clientRefEl.value) {
      clientRefEl.value.removeEventListener("scroll", onScroll);
      resizeObserver == null ? void 0 : resizeObserver.unobserve(clientRefEl.value);
      slotSize.clientSize = 0;
    }
    if (stickyHeaderRefEl.value) {
      resizeObserver == null ? void 0 : resizeObserver.unobserve(stickyHeaderRefEl.value);
      slotSize.stickyHeaderSize = 0;
    }
    if (stickyFooterRefEl.value) {
      resizeObserver == null ? void 0 : resizeObserver.unobserve(stickyFooterRefEl.value);
      slotSize.stickyFooterSize = 0;
    }
    if (headerRefEl.value) {
      resizeObserver == null ? void 0 : resizeObserver.unobserve(headerRefEl.value);
      slotSize.headerSize = 0;
    }
    if (footerRefEl.value) {
      resizeObserver == null ? void 0 : resizeObserver.unobserve(footerRefEl.value);
      slotSize.footerSize = 0;
    }
  });
  function getVirtualSize2beginInView() {
    return reactiveData.virtualSize + getRangeSize(reactiveData.renderBegin, reactiveData.inViewBegin);
  }
  function getRangeSize(range1, range2) {
    var _a;
    const start = Math.min(range1, range2);
    const end = Math.max(range1, range2);
    let re = 0;
    for (let i = start; i < end; i += 1) {
      re += getItemSize((_a = props.list[i]) == null ? void 0 : _a[props.itemKey]);
    }
    return re;
  }
  const renderList = shallowRef([]);
  function manualRender(_newRenderBegin, _newRenderEnd) {
    const _oldRenderBegin = reactiveData.renderBegin;
    reactiveData.renderBegin = _newRenderBegin;
    reactiveData.renderEnd = _newRenderEnd;
    if (_newRenderBegin > _oldRenderBegin) {
      reactiveData.virtualSize += getRangeSize(_newRenderBegin, _oldRenderBegin);
    } else {
      reactiveData.virtualSize -= getRangeSize(_newRenderBegin, _oldRenderBegin);
    }
    renderList.value = props.list.slice(reactiveData.renderBegin, reactiveData.renderEnd + 1);
    updateTotalVirtualSize();
  }
  watch(
    // 这里为什么用 renderKey 代替监听 props.list
    // 因为props.list会导致v-for时deepArray导致大量的性能浪费
    () => [reactiveData.inViewBegin, reactiveData.inViewEnd, renderKey.value],
    (newVal, oldVal) => {
      if (newVal && oldVal) {
        const [_newInViewBegin] = newVal;
        const _oldRenderBegin = reactiveData.renderBegin;
        let _newRenderBegin = _newInViewBegin;
        let _newRenderEnd = reactiveData.inViewEnd;
        _newRenderBegin = Math.max(0, _newRenderBegin - reactiveData.bufferTop);
        _newRenderEnd = Math.min(_newRenderEnd + reactiveData.bufferBottom, props.list.length - 1 > 0 ? props.list.length - 1 : 0);
        if (props == null ? void 0 : props.renderControl) {
          const {
            begin,
            end
          } = props.renderControl(_newInViewBegin, reactiveData.inViewEnd);
          _newRenderBegin = begin;
          _newRenderEnd = end;
        }
        reactiveData.renderBegin = _newRenderBegin;
        reactiveData.renderEnd = _newRenderEnd;
        if (_newRenderBegin > _oldRenderBegin) {
          reactiveData.virtualSize += getRangeSize(_newRenderBegin, _oldRenderBegin);
        } else {
          reactiveData.virtualSize -= getRangeSize(_newRenderBegin, _oldRenderBegin);
        }
        renderList.value = props.list.slice(reactiveData.renderBegin, reactiveData.renderEnd + 1);
      }
    },
    {
      immediate: true
    }
  );
  watch(() => props.list.length, () => {
    if (props.list.length <= 0) {
      reset();
      return;
    }
    calcListTotalSize();
    updateRange(reactiveData.inViewBegin);
    updateTotalVirtualSize();
    forceUpdate();
  }, {
    immediate: true
  });
  return {
    props,
    renderList,
    clientRefEl,
    listRefEl,
    headerRefEl,
    footerRefEl,
    stickyHeaderRefEl,
    stickyFooterRefEl,
    reactiveData,
    slotSize,
    sizesMap,
    resizeObserver,
    getOffset,
    getSlotSize,
    reset,
    scrollToIndex,
    manualRender,
    scrollIntoView,
    scrollToTop,
    scrollToBottom,
    scrollToOffset,
    getItemSize,
    deleteItemSize,
    // expose only
    deletedList2Top,
    addedList2Top,
    getItemPosByIndex,
    forceUpdate
  };
}
const VirtList = /* @__PURE__ */ defineComponent({
  name: "VirtList",
  props: {
    list: {
      type: Array,
      default: () => []
    },
    // 数据key
    itemKey: {
      type: [String, Number],
      required: true
    },
    // 最小尺寸
    minSize: {
      type: Number,
      default: 20,
      required: true
    },
    itemGap: {
      type: Number,
      default: 0
    },
    renderControl: {
      type: Function,
      default: void 0
    },
    fixed: {
      type: Boolean,
      default: false
    },
    buffer: {
      type: Number,
      default: 0
    },
    bufferTop: {
      type: Number,
      default: 0
    },
    bufferBottom: {
      type: Number,
      default: 0
    },
    // 滚动距离阈值
    scrollDistance: {
      type: Number,
      default: 0
    },
    // 是否为水平移动
    horizontal: {
      type: Boolean,
      default: false
    },
    // 起始下标
    start: {
      type: Number,
      default: 0
    },
    // 起始偏移量
    offset: {
      type: Number,
      default: 0
    },
    listStyle: {
      type: String,
      default: ""
    },
    listClass: {
      type: String,
      default: ""
    },
    itemStyle: {
      type: String,
      default: ""
    },
    itemClass: {
      type: String,
      default: ""
    },
    headerClass: {
      type: String,
      default: ""
    },
    headerStyle: {
      type: String,
      default: ""
    },
    footerClass: {
      type: String,
      default: ""
    },
    footerStyle: {
      type: String,
      default: ""
    },
    stickyHeaderClass: {
      type: String,
      default: ""
    },
    stickyHeaderStyle: {
      type: String,
      default: ""
    },
    stickyFooterClass: {
      type: String,
      default: ""
    },
    stickyFooterStyle: {
      type: String,
      default: ""
    }
  },
  setup(props, context) {
    const emitFunction = {
      scroll: (evt) => {
        context.emit("scroll", evt);
      },
      toTop: (firstItem) => {
        context.emit("toTop", firstItem);
      },
      toBottom: (lastItem) => {
        context.emit("toBottom", lastItem);
      },
      itemResize: (id, newSize) => {
        context.emit("itemResize", id, newSize);
      },
      rangeUpdate: (inViewBegin, inViewEnd) => {
        context.emit("rangeUpdate", inViewBegin, inViewEnd);
      }
    };
    return useVirtList(props, emitFunction);
  },
  render() {
    const {
      renderList,
      reactiveData,
      resizeObserver
    } = this;
    const {
      itemGap,
      itemKey,
      horizontal,
      listStyle,
      listClass,
      itemStyle,
      itemClass,
      headerClass,
      headerStyle,
      footerClass,
      footerStyle,
      stickyHeaderClass,
      stickyHeaderStyle,
      stickyFooterClass,
      stickyFooterStyle
    } = this.props;
    const renderStickyHeaderSlot = () => {
      var _a;
      return getSlot(this, "stickyHeader") ? _h("div", {
        key: "slot-sticky-header",
        class: stickyHeaderClass,
        style: `position: sticky; z-index: 10; ${horizontal ? "left: 0" : "top: 0;"} ${stickyHeaderStyle}`,
        ref: "stickyHeaderRefEl",
        attrs: {
          "data-id": "stickyHeader"
        }
      }, [(_a = getSlot(this, "stickyHeader")) == null ? void 0 : _a()]) : null;
    };
    const renderStickyFooterSlot = () => {
      var _a;
      return getSlot(this, "stickyFooter") ? _h("div", {
        key: "slot-sticky-footer",
        class: stickyFooterClass,
        style: `position: sticky; z-index: 10; ${horizontal ? "right: 0" : "bottom: 0;"} ${stickyFooterStyle}`,
        ref: "stickyFooterRefEl",
        attrs: {
          "data-id": "stickyFooter"
        }
      }, [(_a = getSlot(this, "stickyFooter")) == null ? void 0 : _a()]) : null;
    };
    const renderHeaderSlot = () => {
      var _a;
      return getSlot(this, "header") ? _h("div", {
        key: "slot-header",
        class: headerClass,
        style: headerStyle,
        ref: "headerRefEl",
        attrs: {
          "data-id": "header"
        }
      }, [(_a = getSlot(this, "header")) == null ? void 0 : _a()]) : null;
    };
    const renderFooterSlot = () => {
      var _a;
      return getSlot(this, "footer") ? _h("div", {
        key: "slot-footer",
        class: footerClass,
        style: footerStyle,
        ref: "footerRefEl",
        attrs: {
          "data-id": "footer"
        }
      }, [(_a = getSlot(this, "footer")) == null ? void 0 : _a()]) : null;
    };
    const {
      listTotalSize,
      virtualSize,
      renderBegin
    } = reactiveData;
    const itemGapStyle = itemGap > 0 ? `padding: ${itemGap / 2}px 0; ` : "";
    const renderMainList = () => {
      var _a, _b;
      const mainList = [];
      for (let index = 0; index < renderList.length; index += 1) {
        const currentItem = renderList[index];
        mainList.push(_hChild(ObserverItem, {
          key: currentItem[itemKey],
          class: itemClass,
          style: `${itemGapStyle}${itemStyle}`,
          attrs: {
            id: currentItem[itemKey],
            resizeObserver
          }
        }, (_a = getSlot(this, "default")) == null ? void 0 : _a({
          itemData: currentItem,
          index: renderBegin + index
        })));
      }
      if (mainList.length === 0 && getSlot(this, "empty")) {
        const height = this.slotSize.clientSize - this.getSlotSize();
        mainList.push(_h("div", {
          key: `slot-empty-${height}`,
          style: `height: ${height}px`
        }, [(_b = getSlot(this, "empty")) == null ? void 0 : _b()]));
      }
      const dynamicListStyle = horizontal ? `will-change: width; min-width: ${listTotalSize}px; display: flex; ${listStyle}` : `will-change: height; min-height: ${listTotalSize}px; ${listStyle}`;
      const virtualStyle = horizontal ? `width: ${virtualSize}px; will-change: width;` : `height: ${virtualSize}px; will-change: height;`;
      return _h("div", {
        ref: "listRefEl",
        class: listClass,
        style: dynamicListStyle
      }, [_h("div", {
        style: virtualStyle
      }), mainList]);
    };
    return _h("div", {
      ref: "clientRefEl",
      class: "virt-list__client",
      // 如果要自动撑开高度，不要虚拟，修改这里的样式即可
      style: `width: 100%; height: 100%; overflow: auto;`,
      attrs: {
        "data-id": "client"
      }
    }, [renderStickyHeaderSlot(), renderHeaderSlot(), renderMainList(), renderFooterSlot(), renderStickyFooterSlot()]);
  }
});
export {
  VirtList,
  useVirtList
};
