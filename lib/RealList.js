import { defineComponent, ref, shallowReactive, watch, onBeforeUpdate, onUpdated, onMounted, onBeforeUnmount } from "vue-demi";
import { ObserverItem } from "./ObserverItem.js";
import { _h, getSlot, _hChild } from "./util.js";
const defaultProps = {
  itemKey: "id",
  miniSize: 40,
  list: [],
  scrollDistance: 100,
  headerClass: "",
  headerStyle: "",
  footerClass: "",
  footerStyle: "",
  stickyHeaderClass: "",
  stickyHeaderStyle: "",
  stickyFooterClass: "",
  stickyFooterStyle: ""
};
const useRealList = (userProps, emitFunction) => {
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
  const offsetMap = /* @__PURE__ */ new Map();
  const slotSize = shallowReactive({
    clientSize: 0,
    headerSize: 0,
    footerSize: 0,
    stickyHeaderSize: 0,
    stickyFooterSize: 0
  });
  const reactiveData = shallowReactive({
    listTotalSize: 0,
    // 不包含插槽的高度
    begin: "",
    end: ""
  });
  const isScrollTop = ref(false);
  const isScrollBottom = ref(false);
  const isUpdating = ref(false);
  const calcListTotalSize = () => {
    var _a;
    const {
      itemKey
    } = props;
    let re = 0;
    for (let i = 0; i <= props.list.length - 1; i += 1) {
      re += getItemSize((_a = props.list[i]) == null ? void 0 : _a[itemKey]);
    }
    reactiveData.listTotalSize = re;
  };
  const getItemSize = (itemKey) => {
    var _a;
    return (_a = sizesMap.get(String(itemKey))) != null ? _a : props.minSize;
  };
  const setItemSize = (itemKey, size) => {
    sizesMap.set(String(itemKey), size);
  };
  const getScrollOffset = () => clientRefEl.value ? clientRefEl.value.scrollTop : 0;
  let resizeObserver = void 0;
  if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver((entries) => {
      var _a;
      let diff = 0;
      for (const entry of entries) {
        const {
          id
        } = entry.target.dataset;
        if (id) {
          const prevSize = getItemSize(id);
          const currentSize = entry.contentBoxSize[0].blockSize;
          if (id === "client") {
            slotSize.clientSize = currentSize;
          } else if (id === "header") {
            slotSize.headerSize = currentSize;
          } else if (id === "footer") {
            slotSize.footerSize = currentSize;
          } else if (id === "stickyHeader") {
            slotSize.stickyHeaderSize = currentSize;
          } else if (id === "stickyFooter") {
            slotSize.stickyFooterSize = currentSize;
          } else if (prevSize !== currentSize) {
            setItemSize(id, currentSize);
            diff += currentSize - prevSize;
            (_a = emitFunction == null ? void 0 : emitFunction.itemResize) == null ? void 0 : _a.call(emitFunction, id, currentSize);
          }
        }
      }
      reactiveData.listTotalSize += diff;
      calcListTotalSize();
      updateOffset();
      if (isUpdating.value) {
        if (isScrollTop.value)
          scrollIntoPosition("forward");
        if (isScrollBottom.value)
          scrollIntoPosition("backward");
        return;
      }
      const currentScrollOffset = getScrollOffset();
      checkScrollStatus(currentScrollOffset);
    });
  }
  const getItemOffset = (itemKey) => {
    var _a;
    return (_a = offsetMap.get(String(itemKey))) != null ? _a : -1;
  };
  const setItemOffset = (itemKey, size) => {
    offsetMap.set(String(itemKey), size);
  };
  const updateOffset = () => {
    var _a, _b;
    const {
      itemKey
    } = props;
    offsetMap.clear();
    let offset = 0;
    for (let i = 0; i < props.list.length; i += 1) {
      setItemOffset((_a = props.list[i]) == null ? void 0 : _a[itemKey], offset);
      offset += getItemSize((_b = props.list[i]) == null ? void 0 : _b[itemKey]);
    }
  };
  const getSlotSize = () => slotSize.headerSize + slotSize.stickyFooterSize + slotSize.stickyHeaderSize;
  const debounce = (func, wait) => {
    let timeout;
    return function() {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(), wait);
    };
  };
  let currentKey = "";
  const updateFirstKey = debounce(() => {
    var _a;
    currentKey = getCurrentFirstItem();
    (_a = emitFunction == null ? void 0 : emitFunction.updateCurrent) == null ? void 0 : _a.call(emitFunction, currentKey);
  }, 200);
  const checkScrollStatus = (currentScrollOffset) => {
    var _a, _b;
    if (props.list.length <= 0)
      return;
    if (currentScrollOffset <= props.scrollDistance) {
      reactiveData.begin = props.list[0][props.itemKey];
      if (props.list.length > props.pageSize) {
        reactiveData.end = props.list[props.list.length - props.pageSize - 1][props.itemKey];
      } else {
        reactiveData.end = props.list[props.list.length - 1][props.itemKey];
      }
      (_a = emitFunction == null ? void 0 : emitFunction.toTop) == null ? void 0 : _a.call(emitFunction, props.list[0]);
      isScrollBottom.value = false;
      isScrollTop.value = true;
    }
    if (currentScrollOffset + props.scrollDistance >= reactiveData.listTotalSize + getSlotSize() - slotSize.clientSize) {
      reactiveData.end = props.list[props.list.length - 1][props.itemKey];
      if (props.list.length > props.pageSize) {
        reactiveData.begin = props.list[props.pageSize][props.itemKey];
      } else {
        reactiveData.begin = props.list[0][props.itemKey];
      }
      (_b = emitFunction == null ? void 0 : emitFunction.toBottom) == null ? void 0 : _b.call(emitFunction, props.list[props.list.length - 1]);
      isScrollBottom.value = true;
      isScrollTop.value = false;
    }
  };
  const onScroll = (evt) => {
    var _a;
    (_a = emitFunction == null ? void 0 : emitFunction.scroll) == null ? void 0 : _a.call(emitFunction, evt);
    if (props.list.length <= 0)
      return;
    const currentScrollOffset = getScrollOffset();
    if (isUpdating.value) {
      const currentStartOffset = getItemOffset(reactiveData.begin);
      if (currentScrollOffset < currentStartOffset) {
        scrollToOffset(currentStartOffset);
      }
      return;
    }
    updateFirstKey();
    checkScrollStatus(currentScrollOffset);
  };
  const scrollToOffset = (offset) => {
    const directionKey = "scrollTop";
    if (clientRefEl.value)
      clientRefEl.value[directionKey] = offset;
  };
  const scrollIntoView = (index) => {
    var _a;
    const targetMin = getItemOffset((_a = props.list[index]) == null ? void 0 : _a[props.itemKey]);
    const scrollTargetToView = async (targetMin2, resolve) => {
      var _a2;
      if (targetMin2 === -1) {
        setTimeout(() => {
          var _a3;
          const offset = getItemOffset((_a3 = props.list[index]) == null ? void 0 : _a3[props.itemKey]);
          scrollTargetToView(offset, resolve);
        }, 3);
        return;
      }
      const currentSize = getItemSize((_a2 = props.list[index]) == null ? void 0 : _a2[props.itemKey]);
      const targetMax = targetMin2 + currentSize;
      const offsetMin = getScrollOffset();
      const offsetMax = getScrollOffset() + slotSize.clientSize;
      if (targetMin2 < offsetMin && offsetMin < targetMax && currentSize < slotSize.clientSize) {
        scrollToOffset(targetMin2 + slotSize.headerSize);
        resolve();
        return;
      }
      if (targetMin2 + slotSize.stickyHeaderSize < offsetMax && offsetMax < targetMax + slotSize.stickyHeaderSize && currentSize < slotSize.clientSize) {
        scrollToOffset(targetMax - slotSize.clientSize + slotSize.stickyHeaderSize);
        resolve();
        return;
      }
      if (targetMin2 + slotSize.stickyHeaderSize >= offsetMax) {
        await scrollToIndex(index);
        resolve();
        return;
      }
      if (targetMax <= offsetMin) {
        await scrollToIndex(index);
      }
      resolve();
    };
    return new Promise((resolve) => {
      scrollTargetToView(targetMin, resolve);
    });
  };
  const getOffsetByIndex = (index) => {
    var _a;
    const key = (_a = props.list[index]) == null ? void 0 : _a[props.itemKey];
    return getItemOffset(key);
  };
  const getCurrentFirstItem = () => {
    let currentKey2 = "";
    const currentScrollOffset = getScrollOffset();
    const preDistance = currentScrollOffset + slotSize.stickyHeaderSize - slotSize.headerSize;
    const distance = preDistance < 0 ? 0 : preDistance;
    for (const [key, value] of offsetMap) {
      if (value <= distance && value + getItemSize(key) > currentScrollOffset) {
        currentKey2 = key;
        break;
      }
    }
    return currentKey2;
  };
  const scrollToIndex = (index) => {
    var _a;
    if (index < 0)
      return;
    if (index >= props.list.length - 1) {
      scrollToBottom();
      return;
    }
    const offset = getItemOffset((_a = props.list[index]) == null ? void 0 : _a[props.itemKey]);
    const scrollToTargetOffset = (targetOffset, resolve) => {
      if (targetOffset === -1) {
        setTimeout(() => {
          var _a2;
          const offset2 = getItemOffset((_a2 = props.list[index]) == null ? void 0 : _a2[props.itemKey]);
          scrollToTargetOffset(offset2, resolve);
        }, 3);
        return;
      }
      scrollToOffset(targetOffset + slotSize.headerSize);
      resolve();
    };
    return new Promise((resolve) => {
      scrollToTargetOffset(offset, resolve);
    });
  };
  const scrollToBottom = () => {
    const bottomOffset = reactiveData.listTotalSize + slotSize.headerSize + slotSize.footerSize;
    scrollToOffset(bottomOffset);
  };
  let preScrollOffset = 0;
  const scrollIntoPosition = (direction) => {
    if (!clientRefEl.value)
      return;
    if (direction === "forward") {
      scrollToOffset(preScrollOffset + getItemOffset(reactiveData.begin));
    } else {
      scrollToOffset(preScrollOffset);
    }
  };
  const reset = () => {
    reactiveData.listTotalSize = 0;
    reactiveData.begin = "";
    reactiveData.end = "";
    sizesMap.clear();
    offsetMap.clear();
  };
  watch(() => props.list, () => {
    isUpdating.value = true;
  }, {
    deep: false
  });
  onBeforeUpdate(() => {
    if (isScrollTop.value) {
      preScrollOffset = getScrollOffset();
    }
    if (isScrollBottom.value) {
      preScrollOffset = getScrollOffset() - offsetMap.get(String(reactiveData.begin));
    }
  });
  onUpdated(() => {
    setTimeout(() => {
      isUpdating.value = false;
    }, 10);
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
  return {
    props,
    resizeObserver,
    sizesMap,
    slotSize,
    clientRefEl,
    listRefEl,
    headerRefEl,
    footerRefEl,
    stickyHeaderRefEl,
    stickyFooterRefEl,
    scrollIntoView,
    scrollToIndex,
    reset,
    getItemOffset,
    getCurrentFirstItem,
    getOffsetByIndex,
    scrollToOffset
  };
};
const RealList = /* @__PURE__ */ defineComponent({
  name: "RealList",
  props: {
    itemKey: {
      type: [String, Number],
      default: "id"
    },
    list: {
      type: Array,
      default: () => []
    },
    minSize: {
      type: Number,
      default: 40
    },
    pageSize: {
      type: Number,
      default: 30
    },
    scrollDistance: {
      type: Number,
      default: 100
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
  setup(props, ctx) {
    const emitFunction = {
      scroll: (evt) => {
        ctx.emit("scroll", evt);
      },
      toTop: (firstItem) => {
        ctx.emit("toTop", firstItem);
      },
      toBottom: (lastItem) => {
        ctx.emit("toBottom", lastItem);
      },
      itemResize: (id, newSize) => {
        ctx.emit("itemResize", id, newSize);
      },
      updateCurrent: (key) => {
        ctx.emit("updateCurrent", key);
      }
    };
    return useRealList(props, emitFunction);
  },
  render() {
    const {
      props,
      resizeObserver
    } = this;
    const {
      itemKey,
      headerClass,
      headerStyle,
      footerClass,
      footerStyle,
      stickyHeaderClass,
      stickyHeaderStyle,
      stickyFooterClass,
      stickyFooterStyle
    } = props;
    const renderStickyHeaderSlot = () => {
      var _a;
      return getSlot(this, "stickyHeader") ? _h("div", {
        key: "slot-sticky-header",
        class: stickyHeaderClass,
        style: `position: sticky; z-index: 10; 'top: 0; ${stickyHeaderStyle}`,
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
        style: `position: sticky; z-index: 10; bottom: 0; ${stickyFooterStyle}`,
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
    const renderMainList = () => {
      var _a;
      const mainList = [];
      for (let i = 0; i < props.list.length; i++) {
        const currentItem = props.list[i];
        mainList.push(_hChild(ObserverItem, {
          key: currentItem[itemKey],
          attrs: {
            id: currentItem[itemKey],
            resizeObserver
          }
        }, (_a = getSlot(this, "default")) == null ? void 0 : _a({
          itemData: currentItem
        })));
      }
      return _h("div", {
        ref: "listRefEl"
      }, [mainList]);
    };
    return _h("div", {
      ref: "clientRefEl",
      style: `width: 100%; height: 100%; overflow: overlay;`,
      attrs: {
        "data-id": "client"
      }
    }, [renderStickyHeaderSlot(), renderHeaderSlot(), renderMainList(), renderFooterSlot(), renderStickyFooterSlot()]);
  }
});
export {
  RealList
};
