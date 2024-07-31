/// <reference types="vite/client" />

declare module 'vue-virt-list' {
  import {
    VirtList,
    VirtTree,
    RealList,
    VirtGrid,
    VirtScrollbarList,
    VirtualScrollbar,
    useVirtScrollbarList,
    useScroll,
    useVirtList,
    useObserverItem,
  } from 'src/index';
  export const VirtList = VirtList as typeof VirtList;
  export const VirtTree = VirtTree as typeof VirtTree;
  export const RealList = RealList as typeof RealList;
  export const VirtGrid = VirtGrid as typeof VirtGrid;
  export const VirtScrollbarList =
    VirtScrollbarList as typeof VirtScrollbarList;
  export const VirtualScrollbar = VirtualScrollbar as typeof VirtualScrollbar;
  export const useVirtScrollbarList =
    useVirtScrollbarList as typeof useVirtScrollbarList;
  export const useScroll = useScroll as typeof useScroll;
  export const useVirtList = useVirtList as typeof useVirtList;
  export const useObserverItem = useObserverItem as typeof useObserverItem;
}
