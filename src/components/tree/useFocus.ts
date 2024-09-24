import { type TreeProps } from './useTree';
import type { TreeNode, TreeNodeKey } from './type';
import { shallowRef, triggerRef, watch } from 'vue';

export const useFocus = ({ props }: { props: TreeProps }) => {
  const focusedKeysSet = shallowRef<Set<TreeNodeKey>>(
    new Set(props.focusedKeys),
  );
  const hasFocused = (node: TreeNode) => focusedKeysSet.value.has(node.key);

  watch(
    () => props.focusedKeys,
    (keys) => {
      focusedKeysSet.value = new Set(keys);
      triggerRef(focusedKeysSet);
    },
  );
  return {
    hasFocused,
  };
};
