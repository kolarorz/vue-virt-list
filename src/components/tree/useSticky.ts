import type { VirtList } from '../../VirtList';
import { ref, watch, type Ref, type ShallowRef } from 'vue-demi';
import type { TreeNode, TreeNodeKey } from './type';

export const useSticky = (
  virtListRef: Ref<InstanceType<typeof VirtList> | null>,
  expandedKeysSet: ShallowRef<Set<TreeNodeKey>>,
) => {
  const stickyStack = ref<TreeNodeKey[]>([]);

  watch(
    () => (virtListRef.value ? virtListRef.value.reactiveData.inViewBegin : -1),
    (newViewBegin) => {
      if (!virtListRef.value) return;
      const viewFirstBeginItem = virtListRef.value.list[newViewBegin];
      if (!viewFirstBeginItem) return;
      setStickyStack(viewFirstBeginItem);
    },
  );

  const setStickyStack = (currentItem: TreeNode) => {
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
