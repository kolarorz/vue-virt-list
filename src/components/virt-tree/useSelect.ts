import {
  nextTick,
  shallowRef,
  triggerRef,
  watch,
  type SetupContext,
  type ShallowReactive,
} from 'vue-demi';
import {
  NODE_SELECT,
  UPDATE_SELECTED_KEYS,
  type TreeEmits,
  type TreeProps,
} from './useTree';
import type { TreeInfo, TreeNode, TreeNodeKey, TreeNodeData } from './type';

export const useSelect = ({
  props,
  treeInfo,
  emits,
  getTreeNode,
}: {
  props: TreeProps;
  treeInfo: ShallowReactive<TreeInfo | undefined>;
  emits: SetupContext<typeof TreeEmits>['emit'];
  getTreeNode: (key: TreeNodeKey) => TreeNode | undefined;
}) => {
  let innerMode = false;
  const { selectMultiple, selectedKeys } = props;
  const selectedKeysSet = shallowRef<Set<TreeNodeKey>>(new Set(selectedKeys));

  const hasSelected = (node: TreeNode) => selectedKeysSet.value.has(node.key);

  const toggleSelect = (node: TreeNode) => {
    if (node.disableSelect) {
      return;
    }
    const selected = hasSelected(node);
    if (selected) {
      selectedKeysSet.value.delete(node.key);
    } else {
      if (!selectMultiple) {
        selectedKeysSet.value.clear();
      }
      selectedKeysSet.value.add(node.key);
    }
    if (innerMode) {
      triggerRef(selectedKeysSet);
    }
    afterNodeSelect(node, !selected);
  };

  const selectNode = (key: TreeNodeKey | TreeNodeKey[], selected: boolean) => {
    if (Array.isArray(key)) {
      key.forEach((k) => {
        if (selected) {
          selectedKeysSet.value.add(k);
        } else {
          selectedKeysSet.value.delete(k);
        }
      });
    } else {
      if (selected) {
        selectedKeysSet.value.add(key);
      } else {
        selectedKeysSet.value.delete(key);
      }
    }
    emits(UPDATE_SELECTED_KEYS, [...selectedKeysSet.value]);
  };
  const selectAll = (selected: boolean) => {
    let selectKeys: TreeNodeKey[] = [];
    if (selected) {
      selectKeys = treeInfo.allNodeKeys.filter((key) => {
        const node = getTreeNode(key);
        if (!node) return false;
        return !node.disableSelect;
      });
      selectedKeysSet.value = new Set(selectKeys);
    } else {
      selectKeys = [];
      selectedKeysSet.value.clear();
    }
    if (innerMode) {
      triggerRef(selectedKeysSet);
    }
    emits(UPDATE_SELECTED_KEYS, selectKeys);
  };

  const getSelected = () => {
    const selectedKeys = Array.from(selectedKeysSet.value);
    const selectedNodes: TreeNodeData[] = [];
    if (props.selectable) {
      selectedKeys.forEach((key) => {
        const node = getTreeNode(key);
        if (node) {
          selectedNodes.push(node.data);
        }
      });
    }
    return {
      selectedKeys,
      selectedNodes,
    };
  };

  const afterNodeSelect = (node: TreeNode, selected: boolean) => {
    const { selectedNodes, selectedKeys } = getSelected();
    emits(UPDATE_SELECTED_KEYS, selectedKeys);
    emits(NODE_SELECT, selectedKeys, {
      node,
      selected,
      selectedKeys,
      selectedNodes,
    });
  };

  watch(
    () => props.selectedKeys,
    (keys) => {
      if (props.selectedKeys !== undefined) {
        innerMode = false;
        selectedKeysSet.value = new Set(keys);
        triggerRef(selectedKeysSet);
      } else {
        innerMode = true;
      }
    },
    {
      immediate: true,
    },
  );

  return {
    hasSelected,
    toggleSelect,

    selectNode,
    selectAll,
  };
};
