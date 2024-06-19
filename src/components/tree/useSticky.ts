import type { VirtList } from '../../VirtList';
import { ref, watch, type Ref, type ShallowRef } from 'vue-demi';
import type { ITreeNode, TreeKey } from './type';

export const useSticky = (
  virListRef: Ref<InstanceType<typeof VirtList> | null>,
  expandedKeysSet: ShallowRef<Set<TreeKey>>,
) => {
  const stickyStack = ref<TreeKey[]>([]);

  watch(
    () => (virListRef.value ? virListRef.value.reactiveData.inViewBegin : -1),
    (newViewBegin) => {
      if (!virListRef.value) return;
      const viewFirstBeginItem = virListRef.value.list[newViewBegin];
      if (!viewFirstBeginItem) return;
      setStickyStack(viewFirstBeginItem);
    },
  );

  const setStickyStack = (currentItem: ITreeNode) => {
    // 查找当前元素的子元素有没有展开
    if (!currentItem.children || currentItem.children.length === 0) return;
    currentItem.children.forEach((item) => {
      if (expandedKeysSet.value.has(item.key)) {
        stickyStack.value.push(item.key);
      }
    });
  };

  return {
    stickyStack,
  };
};
