/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  isVue2,
  defineComponent,
  onBeforeMount,
  onMounted,
  onBeforeUnmount,
  shallowReactive,
  ref,
  shallowRef,
  watch,
  type ShallowRef,
  type ShallowReactive,
  type VNode,
  type SetupContext,
  type Ref,
} from 'vue-demi';
import { VirtualScrollbar } from './Scrollbar';
import { ObserverItem } from '../common/ObserverItem';
import { _h, _h2Slot, _hChild, getSlot } from '../../utils';
import type {
  ReactiveData,
  SlotSize,
  VirtListProps,
  VirtScrollbarReturn,
  VirtScrollbarEmitFunction,
  ScrollbarOptions,
} from './type';
import type { PropType } from '@vue/composition-api';

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
  listStyle: '',
  listClass: '',
  itemStyle: '',
  itemClass: '',
  headerClass: '',
  headerStyle: '',
  footerClass: '',
  footerStyle: '',
  stickyHeaderClass: '',
  stickyHeaderStyle: '',
  stickyFooterClass: '',
  stickyFooterStyle: '',
};

function useScroll(
  elRefEl: Ref<HTMLElement | null>,
  scrollFn: (distance: number) => void,
  horizontal: boolean = false,
) {
  let startX = 0;
  let startY = 0;
  let lastDelta = 0;
  let startTime = 0;
  let velocity = 0;
  let animationFrameId: number | null = null;

  // 缓动函数
  function easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }

  function smoothScroll(targetDelta: number) {
    const duration = 500; // 动画持续时间(ms)
    const startDelta = lastDelta;
    const deltaDistance = targetDelta - startDelta;
    let startTimestamp: number | null = null;

    function animate(currentTime: number) {
      if (startTimestamp === null) {
        startTimestamp = currentTime;
      }

      const elapsed = currentTime - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeOutCubic(progress);

      const currentDelta = startDelta + deltaDistance * easeProgress;
      const increment = currentDelta - lastDelta;

      scrollFn(increment);
      lastDelta = currentDelta;

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        lastDelta = 0;
        velocity = 0;
        animationFrameId = null;
      }
    }

    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  function handleTouchStart(evt: TouchEvent) {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }

    const touch = evt.touches[0];
    startX = touch.pageX;
    startY = touch.pageY;
    startTime = Date.now();
    lastDelta = 0;
    velocity = 0;
  }

  function handleTouchMove(evt: TouchEvent) {
    if (!startX && !startY) return;

    const touch = evt.touches[0];
    const deltaX = startX - touch.pageX;
    const deltaY = startY - touch.pageY;
    const currentTime = Date.now();
    const timeElapsed = currentTime - startTime;

    const delta = horizontal ? deltaX : deltaY;
    velocity = (delta - lastDelta) / timeElapsed;

    const isMainAxis = horizontal
      ? Math.abs(deltaX) > Math.abs(deltaY)
      : Math.abs(deltaY) > Math.abs(deltaX);

    if (isMainAxis) {
      evt.preventDefault();
      scrollFn(delta - lastDelta);
      lastDelta = delta;
    }

    startTime = currentTime;
  }

  function handleTouchEnd() {
    if (Math.abs(velocity) > 0.1) {
      const deceleration = 0.003;
      const direction = velocity > 0 ? 1 : -1;
      const distance = ((velocity * velocity) / (2 * deceleration)) * direction;

      smoothScroll(lastDelta + distance);
    } else {
      lastDelta = 0;
      velocity = 0;
    }
  }

  function handleWheel(evt: WheelEvent) {
    evt.stopPropagation();
    // 沿主轴方向滚动时，阻止滚轮事件的默认行为，防止触发页面滚动
    // 沿副轴方向滚动时，不阻止滚轮事件的默认行为，保持页面滚动
    const isMainAxis = horizontal
      ? Math.abs(evt.deltaX) > Math.abs(evt.deltaY)
      : Math.abs(evt.deltaY) > Math.abs(evt.deltaX);

    if (isMainAxis) {
      evt.preventDefault();
      const delta = horizontal ? evt.deltaX : evt.deltaY;
      scrollFn(delta); // 直接应用滚动，不使用平滑效果
    }
  }

  onMounted(() => {
    if (elRefEl.value) {
      elRefEl.value.addEventListener('wheel', handleWheel, { passive: false });
      elRefEl.value.addEventListener('touchstart', handleTouchStart);
      elRefEl.value.addEventListener('touchmove', handleTouchMove, {
        passive: false,
      });
      elRefEl.value.addEventListener('touchend', handleTouchEnd);
    }
  });

  onBeforeUnmount(() => {
    if (elRefEl.value) {
      elRefEl.value.removeEventListener('wheel', handleWheel);
      elRefEl.value.removeEventListener('touchstart', handleTouchStart);
      elRefEl.value.removeEventListener('touchmove', handleTouchMove);
      elRefEl.value.removeEventListener('touchend', handleTouchEnd);
    }

    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
    }
  });
}

function useVirtScrollbarList<T extends Record<string, any>>(
  userProps: ShallowReactive<VirtListProps<T>>,
  emitFunction?: VirtScrollbarEmitFunction<T>,
): VirtScrollbarReturn<T> {
  const props = new Proxy(userProps, {
    get(target, key) {
      return Reflect.get(target, key) ?? Reflect.get(defaultProps, key);
    },
  }) as Required<VirtListProps<T>>;

  const clientRefEl = ref<HTMLElement | null>(null);
  const listRefEl = ref<HTMLElement | null>(null);
  const headerRefEl = ref<HTMLElement | null>(null);
  const footerRefEl = ref<HTMLElement | null>(null);
  const stickyHeaderRefEl = ref<HTMLElement | null>(null);
  const stickyFooterRefEl = ref<HTMLElement | null>(null);
  const transformDistance = ref(0);

  const sizesMap = new Map();
  const renderKey = ref(0);
  let direction: 'forward' | 'backward' = 'backward';
  // 一个手动设置滚动的标志位，用来判断是否需要纠正滚动位置
  let fixOffset = false;
  let forceFixOffset = false;
  let abortFixOffset = false;
  let lastRenderEnd = 0;
  let lastRenderBegin = 0;

  let fixTaskFn: null | (() => void) = null;

  const slotSize: ShallowReactive<SlotSize> = shallowReactive({
    clientSize: 0,
    headerSize: 0,
    footerSize: 0,
    stickyHeaderSize: 0,
    stickyFooterSize: 0,
  });

  // 全局需要响应式的数据
  const reactiveData: ShallowReactive<ReactiveData> = shallowReactive({
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
    bufferBottom: 0,
  });

  function getOffset() {
    return reactiveData.offset > 0 ? reactiveData.offset : 0;
  }
  function getSlotSize() {
    return (
      slotSize.headerSize +
      slotSize.footerSize +
      slotSize.stickyHeaderSize +
      slotSize.stickyFooterSize
    );
  }
  function getTotalSize() {
    return (
      reactiveData.listTotalSize +
      slotSize.headerSize +
      slotSize.footerSize +
      slotSize.stickyHeaderSize +
      slotSize.stickyFooterSize
    );
  }
  function getItemSize(itemKey: string) {
    if (props.fixed) return props.minSize;
    return sizesMap.get(String(itemKey)) ?? props.minSize;
  }
  function setItemSize(itemKey: string, size: number) {
    sizesMap.set(String(itemKey), size);
  }
  function deleteItemSize(itemKey: string) {
    sizesMap.delete(String(itemKey));
  }
  // 通过下标来获取元素位置信息
  function getItemPosByIndex(index: number) {
    if (props.fixed) {
      return {
        top: props.minSize * index,
        current: props.minSize,
        bottom: props.minSize * (index + 1),
      };
    }

    const { itemKey } = props;
    let topReduce = slotSize.headerSize;
    for (let i = 0; i <= index - 1; i += 1) {
      const currentSize = getItemSize(props.list[i]?.[itemKey]);
      topReduce += currentSize;
    }
    const current = getItemSize(props.list[index]?.[itemKey]);
    return {
      top: topReduce,
      current,
      bottom: topReduce + current,
    };
  }

  function calcOffsetReduce(targetOffset: number) {
    const { headerSize } = slotSize;
    let index = 0;
    let offsetReduce = 0;
    for (let i = 0; i <= lastRenderEnd; i++) {
      const currentSize = getItemSize(props.list[i]?.[props.itemKey]);
      if (offsetReduce + currentSize + headerSize > targetOffset) {
        index = i;
        return {
          targetIndex: index,
          offsetReduce,
        };
      }
      offsetReduce += currentSize;
    }
    const gapOffset = targetOffset - offsetReduce;
    const gapIndex = Math.ceil(gapOffset / props.minSize);
    return {
      offsetReduce: gapIndex * props.minSize + offsetReduce,
      targetIndex: gapIndex + index,
    };
  }

  function scrollToOffset(targetOffset: number) {
    console.time('xzc');
    // 拖动滚动条时，改成增量计算的方式
    abortFixOffset = true;
    let offset = targetOffset;
    if (offset < 0) {
      offset = 0;
    } else if (offset > getTotalSize() - slotSize.clientSize) {
      offset = getTotalSize() - slotSize.clientSize;
    }
    // 找到当前offset小于当前 offset 的最大的index
    const { headerSize } = slotSize;
    let index = 0;
    let offsetReduce = 0;
    for (let i = 0; i < props.list.length; i += 1) {
      const currentSize = getItemSize(props.list[i]?.[props.itemKey]);
      if (offsetReduce + currentSize + headerSize > offset) {
        index = i;
        break;
      }
      offsetReduce += currentSize;
    }
    // const { targetIndex: index, offsetReduce } = calcOffsetReduce(offset);
    reactiveData.offset = offset;
    updateRange(index);
    // 需要计算一下 renderBegin 不然计算不准
    reactiveData.renderBegin = Math.max(0, index - reactiveData.bufferTop);
    // 实际的滚动距离 = 目标可视区域展示的第一个元素的偏移量 + 渲染列表第一个元素到可视区域第一个元素的距离
    transformDistance.value =
      offsetReduce -
      offset -
      getRangeSize(reactiveData.renderBegin, reactiveData.inViewBegin);
    updateTotalVirtualSize();
    console.timeEnd('xzc');
  }
  // expose 滚动到指定下标
  async function scrollToIndex(index: number) {
    if (index < 0) {
      return;
    }

    // 如果要去的位置大于长度，那么就直接调用去底部的方法
    if (index >= props.list.length - 1) {
      scrollToBottom();
      return;
    }

    let { top: lastOffset } = getItemPosByIndex(index);

    scrollToOffset(lastOffset);
    const fixToIndex = () => {
      const { top: offset } = getItemPosByIndex(index);
      scrollToOffset(offset);
      if (lastOffset !== offset) {
        lastOffset = offset;
        fixTaskFn = fixToIndex;
        return;
      }
      // 重置后如果不需要修正，将修正函数置空
      fixTaskFn = null;
    };
    fixTaskFn = fixToIndex;
  }
  // expose 滚动到可视区域
  async function scrollIntoView(index: number) {
    const { top: targetMin, bottom: targetMax } = getItemPosByIndex(index);
    const offsetMin = getOffset();
    const offsetMax = getOffset() + slotSize.clientSize;
    const currentSize = getItemSize(props.list[index]?.[props.itemKey]);
    if (
      targetMin < offsetMin &&
      offsetMin < targetMax &&
      currentSize < slotSize.clientSize
    ) {
      // 如果目标元素上方看不到，底部看得到，那么滚动到顶部部看得到就行了
      scrollToOffset(targetMin);
      return;
    }
    if (
      targetMin + slotSize.stickyHeaderSize < offsetMax &&
      offsetMax < targetMax + slotSize.stickyHeaderSize &&
      currentSize < slotSize.clientSize
    ) {
      // 如果目标元素上方看得到，底部看不到，那么滚动到底部看得到就行了
      scrollToOffset(
        targetMax - slotSize.clientSize + slotSize.stickyHeaderSize,
      );
      return;
    }

    // 屏幕下方
    if (targetMin + slotSize.stickyHeaderSize >= offsetMax) {
      scrollToIndex(index);
      return;
    }

    // 屏幕上方
    if (targetMax <= offsetMin) {
      scrollToIndex(index);
      return;
    }

    // 在中间就不动了
  }
  // expose 滚动到顶部，这个和去第一个元素不同
  async function scrollToTop() {
    scrollToOffset(0);
    checkCurrentStatus('forward');

    const fixTopFn = () => {
      const directionKey = props.horizontal ? 'scrollLeft' : 'scrollTop';
      // 因为纠正滚动条会有误差，所以这里需要再次纠正
      if (clientRefEl?.value?.[directionKey] !== 0) {
        scrollToTop();
      }
      fixTaskFn = null;
    };
    fixTaskFn = fixTopFn;
  }
  // expose 滚动到底部
  async function scrollToBottom() {
    scrollToOffset(getTotalSize() - slotSize.clientSize);
    checkCurrentStatus('backward');

    const fixBottomFn = () => {
      if (
        Math.abs(
          Math.round(reactiveData.offset + slotSize.clientSize) -
            Math.round(getTotalSize()),
        ) > 2
      ) {
        scrollToBottom();
      }
      fixTaskFn = null;
    };
    fixTaskFn = fixBottomFn;
  }

  // 修复vue2-diff的bug导致的selection问题
  function fixSelection() {
    const selection = window.getSelection();
    if (selection) {
      const { anchorNode, anchorOffset, focusNode, focusOffset } = selection;
      if (
        anchorNode &&
        anchorOffset !== null &&
        focusNode !== null &&
        focusOffset
      ) {
        requestAnimationFrame(() => {
          if (anchorOffset < focusOffset) {
            selection.setBaseAndExtent(
              anchorNode,
              anchorOffset,
              focusNode,
              focusOffset,
            );
          } else {
            selection.setBaseAndExtent(
              focusNode,
              focusOffset,
              anchorNode,
              anchorOffset,
            );
          }
        });
      }
    }
  }

  function updateRange(start: number) {
    // 修复vue2-diff的bug
    if (isVue2 && props.fixSelection && direction === 'backward') {
      fixSelection();
    }

    reactiveData.inViewBegin = start;
    reactiveData.inViewEnd = Math.min(
      start + reactiveData.views,
      props.list.length - 1,
    );
  }

  function calcRange() {
    const { offset, inViewBegin } = reactiveData;
    const { itemKey } = props;

    const offsetWithNoHeader = offset - slotSize.headerSize;
    let start = inViewBegin;
    let offsetReduce = getVirtualSize2beginInView();

    // 当有顶部插槽的时候，快速滚动到顶部，则需要判断，并直接修正
    if (offsetWithNoHeader < 0) {
      updateRange(0);
      return;
    }

    if (direction === 'forward') {
      if (offsetWithNoHeader >= offsetReduce) {
        return;
      }
      for (let i = start - 1; i >= 0; i -= 1) {
        const currentSize = getItemSize(props.list[i]?.[itemKey]);
        offsetReduce -= currentSize;
        if (
          offsetReduce <= offsetWithNoHeader &&
          offsetWithNoHeader < offsetReduce + currentSize
        ) {
          start = i;
          break;
        }
      }

      // 向上滚动需要修正
      fixOffset = true;
    }

    if (direction === 'backward') {
      if (offsetWithNoHeader <= offsetReduce) {
        return;
      }
      for (let i = start; i <= props.list.length - 1; i += 1) {
        const currentSize = getItemSize(props.list[i]?.[itemKey]);

        if (
          offsetReduce <= offsetWithNoHeader &&
          offsetWithNoHeader < offsetReduce + currentSize
        ) {
          start = i;
          break;
        }
        offsetReduce += currentSize;
      }

      // 向下滚动不需要修正
      fixOffset = false;
    }

    // 节流
    if (start !== reactiveData.inViewBegin) {
      updateRange(start);
    }
  }

  function checkCurrentStatus(targetDirection: 'forward' | 'backward') {
    if (
      targetDirection === 'forward' &&
      reactiveData.offset - props.scrollDistance <= 0
    ) {
      emitFunction?.toTop?.(props.list[0]);
    }
    if (
      targetDirection === 'backward' &&
      Math.round(reactiveData.offset + props.scrollDistance) >=
        Math.round(
          reactiveData.listTotalSize + getSlotSize() - slotSize.clientSize,
        )
    ) {
      emitFunction?.toBottom?.(props.list[props.list.length - 1]);
    }
  }

  function handleScroll(delta: number, withRaf = true) {
    if (getTotalSize() - slotSize.clientSize < 0) return;
    direction = delta < 0 ? 'forward' : 'backward';
    let offset = reactiveData.offset + delta;
    if (offset >= getTotalSize() - slotSize.clientSize) {
      offset = getTotalSize() - slotSize.clientSize;
    } else if (offset < 0) {
      offset = 0;
    }
    if (offset === reactiveData.offset) {
      return;
    }
    reactiveData.offset = offset;

    emitFunction?.scroll?.(offset);

    calcRange();

    if (withRaf) {
      requestAnimationFrame(() => {
        transformDistance.value =
          reactiveData.virtualSize - reactiveData.offset;
      });
    } else {
      transformDistance.value = reactiveData.virtualSize - reactiveData.offset;
    }
    checkCurrentStatus(direction);
  }

  useScroll(clientRefEl, handleScroll, props.horizontal);

  function onScrollBarScroll(ratio: number) {
    const targetOffset = ratio * (getTotalSize() - slotSize.clientSize);
    handleScroll(targetOffset - reactiveData.offset);
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
    if (props.fixed) {
      reactiveData.listTotalSize = props.minSize * props.list.length;
      return;
    }
    const { itemKey } = props;
    let re = 0;
    for (let i = 0; i <= props.list.length - 1; i += 1) {
      re += getItemSize(props.list[i]?.[itemKey]);
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
  // expose only
  function deletedList2Top(deletedList: T[]) {
    calcListTotalSize();
    let deletedListSize = 0;
    deletedList.forEach((item) => {
      deletedListSize += getItemSize(item[props.itemKey]);
    });
    updateTotalVirtualSize();
    scrollToOffset(reactiveData.offset - deletedListSize);
    calcRange();
  }
  // expose only
  function addedList2Top(addedList: T[]) {
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

  let resizeObserver: ResizeObserver | undefined = undefined;
  if (typeof ResizeObserver !== 'undefined') {
    let rafId: number | null = null;
    resizeObserver = new ResizeObserver((entries) => {
      // if (rafId !== null) {
      //   cancelAnimationFrame(rafId);
      // }
      // rafId = requestAnimationFrame(() => {
      let diff = 0;
      for (const entry of entries) {
        const id = (entry.target as HTMLElement).dataset.id;

        if (id) {
          const oldSize = getItemSize(id);

          let newSize = 0;
          // 兼容性处理，详情：https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver
          // ios中没有borderBoxSize，只有contentRect
          if (entry.borderBoxSize) {
            // Firefox implements `borderBoxSize` as a single content rect, rather than an array
            const borderBoxSize = Array.isArray(entry.borderBoxSize)
              ? entry.borderBoxSize[0]
              : entry.borderBoxSize;
            newSize = props.horizontal
              ? borderBoxSize.inlineSize
              : borderBoxSize.blockSize;
          } else {
            newSize = props.horizontal
              ? entry.contentRect.width
              : entry.contentRect.height;
          }

          if (id === 'client') {
            slotSize.clientSize = newSize;
            onClientResize();
          } else if (id === 'header') {
            slotSize.headerSize = newSize;
          } else if (id === 'footer') {
            slotSize.footerSize = newSize;
          } else if (id === 'stickyHeader') {
            slotSize.stickyHeaderSize = newSize;
          } else if (id === 'stickyFooter') {
            slotSize.stickyFooterSize = newSize;
          } else if (oldSize !== newSize) {
            setItemSize(id, newSize);
            diff += newSize - oldSize;
            emitFunction?.itemResize?.(id, newSize);
          }
        }
      }
      reactiveData.listTotalSize += diff;

      // 如果有需要修正的方法进行修正
      if (fixTaskFn) {
        fixTaskFn();
      }
      // 向上滚动纠正误差 - 当没有顶部buffer的时候是需要的
      if ((fixOffset || forceFixOffset) && diff !== 0 && !abortFixOffset) {
        fixOffset = false;
        forceFixOffset = false;
        handleScroll(diff, false);
      }
      abortFixOffset = false;
    });
    // });
  }

  const updateTotalVirtualSize = () => {
    let offset = 0;
    // const currentFirst = Math.min(reactiveData.renderBegin, lastRenderBegin);
    const currentFirst = reactiveData.renderBegin;
    for (let i = 0; i < currentFirst; i++) {
      offset += getItemSize(props.list[i]?.[props.itemKey]);
    }
    // if (reactiveData.renderBegin > lastRenderBegin) {
    //   offset += (reactiveData.renderBegin - lastRenderBegin) * props.minSize;
    // }
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
      resizeObserver?.observe(clientRefEl.value);
    }

    if (stickyHeaderRefEl.value) {
      resizeObserver?.observe(stickyHeaderRefEl.value);
    }
    if (stickyFooterRefEl.value) {
      resizeObserver?.observe(stickyFooterRefEl.value);
    }
    if (headerRefEl.value) {
      resizeObserver?.observe(headerRefEl.value);
    }
    if (footerRefEl.value) {
      resizeObserver?.observe(footerRefEl.value);
    }

    if (props.start) {
      scrollToIndex(props.start);
    } else if (props.offset) {
      scrollToOffset(props.offset);
    }
  });

  onBeforeUnmount(() => {
    if (clientRefEl.value) {
      resizeObserver?.unobserve(clientRefEl.value);
      slotSize.clientSize = 0;
    }

    if (stickyHeaderRefEl.value) {
      resizeObserver?.unobserve(stickyHeaderRefEl.value);
      slotSize.stickyHeaderSize = 0;
    }
    if (stickyFooterRefEl.value) {
      resizeObserver?.unobserve(stickyFooterRefEl.value);
      slotSize.stickyFooterSize = 0;
    }
    if (headerRefEl.value) {
      resizeObserver?.unobserve(headerRefEl.value);
      slotSize.headerSize = 0;
    }
    if (footerRefEl.value) {
      resizeObserver?.unobserve(footerRefEl.value);
      slotSize.footerSize = 0;
    }
  });

  function getVirtualSize2beginInView() {
    return (
      reactiveData.virtualSize +
      getRangeSize(reactiveData.renderBegin, reactiveData.inViewBegin)
    );
  }

  function getRangeSize(range1: number, range2: number) {
    const start = Math.min(range1, range2);
    const end = Math.max(range1, range2);
    let re = 0;
    for (let i = start; i < end; i += 1) {
      re += getItemSize(props.list[i]?.[props.itemKey]);
    }
    return re;
  }

  const renderList: ShallowRef<T[]> = shallowRef([]);
  watch(
    () => [reactiveData.inViewBegin, reactiveData.inViewEnd, renderKey.value],
    (newVal, oldVal) => {
      if (newVal && oldVal) {
        const [_newInViewBegin] = newVal;

        // 旧的渲染起始
        const _oldRenderBegin = reactiveData.renderBegin;

        // 新的渲染起始
        let _newRenderBegin = _newInViewBegin;
        // 新的渲染结束
        let _newRenderEnd = reactiveData.inViewEnd;

        // 计算buffer
        _newRenderBegin = Math.max(0, _newRenderBegin - reactiveData.bufferTop);
        _newRenderEnd = Math.min(
          _newRenderEnd + reactiveData.bufferBottom,
          props.list.length - 1 > 0 ? props.list.length - 1 : 0,
        );

        // 控制层渲染，等于说要覆盖掉buffer
        if (props?.renderControl) {
          const { begin, end } = props.renderControl(
            _newInViewBegin,
            reactiveData.inViewEnd,
          );
          _newRenderBegin = begin;
          _newRenderEnd = end;
        }

        // update render begin
        reactiveData.renderBegin = _newRenderBegin;
        // update render end
        reactiveData.renderEnd = _newRenderEnd;
        // update virtualSize, diff range size
        if (_newRenderBegin >= _oldRenderBegin) {
          fixOffset = false;
          reactiveData.virtualSize += getRangeSize(
            _newRenderBegin,
            _oldRenderBegin,
          );
        } else {
          reactiveData.virtualSize -= getRangeSize(
            _newRenderBegin,
            _oldRenderBegin,
          );
          fixOffset = true;
        }
        lastRenderEnd = Math.max(lastRenderEnd, _newRenderEnd);
        lastRenderBegin = Math.max(lastRenderBegin, _newRenderBegin);
        // update render list
        renderList.value = props.list.slice(
          reactiveData.renderBegin,
          reactiveData.renderEnd + 1,
        );
      }
    },
    {
      immediate: true,
    },
  );

  watch(
    () => props.list.length,
    () => {
      // 如果数据为空，那么就重置
      if (props.list.length <= 0) {
        reset();
        return;
      }

      // [require] 因为list长度变化，所以总高度有变化
      calcListTotalSize();
      // [require] 因为list长度变化，所以重新计算起始结束位置
      updateRange(reactiveData.inViewBegin);
      // [require] 如果顶部列表数据发生变更需要更正顶部高度
      updateTotalVirtualSize();
      // [require] 列表长度切内容发生变化，如果起始位置没变，则需要强制更新一下页面
      forceUpdate();
    },
    {
      immediate: true,
    },
  );

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

    transformDistance,

    getOffset,
    reset,
    scrollToIndex,
    scrollIntoView,
    scrollToTop,
    scrollToBottom,
    scrollToOffset,
    getItemSize,
    deleteItemSize,
    handleScroll,
    getSlotSize,
    onScrollBarScroll,
    // expose only
    deletedList2Top,
    addedList2Top,
    getItemPosByIndex,
    forceUpdate,
  };
}
const VirtScrollbarList = defineComponent({
  name: 'VirtScrollbarList',
  props: {
    list: {
      type: Array<any>,
      default: () => [],
    },
    // 数据key
    itemKey: {
      type: [String, Number],
      required: true,
    },
    // 最小尺寸
    minSize: {
      type: Number,
      default: 20,
      required: true,
    },
    renderControl: {
      type: Function,
      default: undefined,
    },
    fixed: {
      type: Boolean,
      default: false,
    },
    buffer: {
      type: Number,
      default: 0,
    },
    bufferTop: {
      type: Number,
      default: 0,
    },
    bufferBottom: {
      type: Number,
      default: 0,
    },
    // 滚动距离阈值
    scrollDistance: {
      type: Number,
      default: 0,
    },
    // 是否为水平移动
    horizontal: {
      type: Boolean,
      default: false,
    },
    // 起始下标
    start: {
      type: Number,
      default: 0,
    },
    // 起始偏移量
    offset: {
      type: Number,
      default: 0,
    },
    listStyle: {
      type: String,
      default: '',
    },
    listClass: {
      type: String,
      default: '',
    },
    itemStyle: {
      type: String,
      default: '',
    },
    itemClass: {
      type: String,
      default: '',
    },
    headerClass: {
      type: String,
      default: '',
    },
    headerStyle: {
      type: String,
      default: '',
    },
    footerClass: {
      type: String,
      default: '',
    },
    footerStyle: {
      type: String,
      default: '',
    },
    stickyHeaderClass: {
      type: String,
      default: '',
    },
    stickyHeaderStyle: {
      type: String,
      default: '',
    },
    stickyFooterClass: {
      type: String,
      default: '',
    },
    stickyFooterStyle: {
      type: String,
      default: '',
    },
    scrollbarOptions: {
      type: Object as PropType<ScrollbarOptions>,
    },
  },
  setup(props: any, context: SetupContext) {
    const emitFunction: VirtScrollbarEmitFunction<any> = {
      scroll: (offset: number) => {
        context.emit('scroll', offset);
      },
      toTop: (firstItem: any) => {
        context.emit('toTop', firstItem);
      },
      toBottom: (lastItem: any) => {
        context.emit('toBottom', lastItem);
      },
      itemResize: (id: string, newSize: number) => {
        context.emit('itemResize', id, newSize);
      },
    };

    return useVirtScrollbarList(props, emitFunction);
  },
  render() {
    const { renderList, reactiveData, resizeObserver } = this;
    const {
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
      stickyFooterStyle,
      scrollbarOptions,
    } = this.props;

    const renderStickyHeaderSlot = (): VNode | null =>
      getSlot(this, 'stickyHeader')
        ? _h(
            'div',
            {
              key: 'slot-sticky-header',
              class: stickyHeaderClass,
              style: `position: sticky; z-index: 10; ${
                horizontal ? 'left: 0' : 'top: 0;'
              } ${stickyHeaderStyle}`,
              ref: 'stickyHeaderRefEl',
              attrs: {
                'data-id': 'stickyHeader',
              },
            },
            [getSlot(this, 'stickyHeader')?.()],
          )
        : null;

    const renderStickyFooterSlot = (): VNode | null =>
      getSlot(this, 'stickyFooter')
        ? _h(
            'div',
            {
              key: 'slot-sticky-footer',
              class: stickyFooterClass,
              style: `position: sticky; z-index: 10; ${
                horizontal ? 'right: 0' : 'bottom: 0;'
              } ${stickyFooterStyle}`,
              ref: 'stickyFooterRefEl',
              attrs: {
                'data-id': 'stickyFooter',
              },
            },
            [getSlot(this, 'stickyFooter')?.()],
          )
        : null;

    const renderHeaderSlot = (): VNode | null =>
      getSlot(this, 'header')
        ? _h(
            'div',
            {
              key: 'slot-header',
              class: headerClass,
              style: headerStyle,
              ref: 'headerRefEl',
              attrs: { 'data-id': 'header' },
            },
            [getSlot(this, 'header')?.()],
          )
        : null;

    const renderFooterSlot = (): VNode | null =>
      getSlot(this, 'footer')
        ? _h(
            'div',
            {
              key: 'slot-footer',
              class: footerClass,
              style: footerStyle,
              ref: 'footerRefEl',
              attrs: {
                'data-id': 'footer',
              },
            },
            [getSlot(this, 'footer')?.()],
          )
        : null;

    const { renderBegin } = reactiveData;

    const renderMainList = (): VNode | null => {
      const mainList = [];
      for (let index = 0; index < renderList.length; index += 1) {
        const currentItem = renderList[index];
        mainList.push(
          _hChild(
            ObserverItem,
            {
              key: currentItem[itemKey],
              class:
                typeof itemClass === 'function'
                  ? itemClass(currentItem, index)
                  : itemClass,
              style:
                typeof itemStyle === 'function'
                  ? itemStyle(currentItem, index)
                  : itemStyle,
              attrs: {
                id: currentItem[itemKey],
                resizeObserver: resizeObserver,
              },
            },
            getSlot(
              this,
              'default',
            )?.({
              itemData: currentItem,
              index: renderBegin + index,
            }),
          ),
        );
      }

      if (mainList.length === 0 && getSlot(this, 'empty')) {
        const height = this.slotSize.clientSize - this.getSlotSize();
        mainList.push(
          _h(
            'div',
            {
              key: `slot-empty-${height}`,
              style: `height: ${height}px`,
            },
            [getSlot(this, 'empty')?.()],
          ),
        );
      }

      const dynamicListStyle = horizontal
        ? `display: flex; ${listStyle};`
        : `${listStyle}`;

      return _h(
        'div',
        {
          ref: 'listRefEl',
          class: listClass,
          style: dynamicListStyle,
        },
        [mainList],
      );
    };

    const renderBody = () => {
      return _h(
        'div',
        {
          style: `will-change: transform; transform: translate${horizontal ? 'X' : 'Y'}(${this.transformDistance}px);`,
        },
        [renderHeaderSlot(), renderMainList(), renderFooterSlot()],
      );
    };

    const renderVirtualScrollbar = () => {
      return _hChild(VirtualScrollbar, {
        attrs: {
          clientSize: this.slotSize.clientSize,
          listSize:
            reactiveData.listTotalSize +
            this.slotSize.headerSize +
            this.slotSize.footerSize,
          direction: horizontal ? 'horizontal' : 'vertical',
          scrollFrom:
            reactiveData.offset /
            (reactiveData.listTotalSize +
              this.slotSize.headerSize +
              this.slotSize.footerSize -
              this.slotSize.clientSize),
          onScroll: this.onScrollBarScroll,
          options: scrollbarOptions,
        },
      });
    };

    return _h(
      'div',
      {
        ref: 'clientRefEl',
        class: 'virt-list__client',
        style: `width: 100%; height: 100%; position: relative`,
        attrs: {
          'data-id': 'client',
        },
      },
      [
        _h(
          'div',
          {
            style: `height: 100%; width: 100%; ${horizontal ? `overflow-x: hidden; overflow-y: auto` : `overflow-x: auto; overflow-y: hidden`};`,
          },
          [renderStickyHeaderSlot(), renderBody(), renderStickyFooterSlot()],
        ),
        renderVirtualScrollbar(),
      ],
    );
  },
});

export { VirtScrollbarList, useVirtScrollbarList, useScroll, VirtualScrollbar };
