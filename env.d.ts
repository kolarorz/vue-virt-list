/// <reference types="vite/client" />

declare module 'vue-virt-list' {
  import { VirtList, VirtTree, RealList, VirtGrid } from 'src/index';
  export const VirtList = VirtList as typeof VirtList;
  export const VirtTree = VirtTree as typeof VirtTree;
  export const RealList = RealList as typeof RealList;
  export const VirtGrid = VirtGrid as typeof VirtGrid;
}
