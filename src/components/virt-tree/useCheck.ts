import {
  nextTick,
  shallowRef,
  triggerRef,
  watch,
  type SetupContext,
  type ShallowReactive,
} from 'vue-demi';
import {
  NODE_CHECK,
  UPDATE_CHECKED_KEYS,
  type TreeEmits,
  type TreeProps,
} from './useTree';
import type { TreeInfo, TreeNode, TreeNodeKey, TreeNodeData } from './type';

export const useCheck = ({
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

  const checkedKeysSet = shallowRef<Set<TreeNodeKey>>(new Set());
  const indeterminateKeysSet = shallowRef<Set<TreeNodeKey>>(new Set());

  const hasChecked = (node: TreeNode) => checkedKeysSet.value.has(node.key);
  const hasIndeterminate = (node: TreeNode) =>
    indeterminateKeysSet.value.has(node.key);

  const setCheckedKeys = () => {
    checkedKeysSet.value.clear();
    indeterminateKeysSet.value.clear();

    if (props.checkable && props.checkedKeys) {
      for (const key of props.checkedKeys) {
        const node = getTreeNode(key);
        if (!node) return;
        if (node && !hasChecked(node)) {
          _toggleCheckbox(node, true);
        }
      }
    }
    if (innerMode) {
      triggerRef(checkedKeysSet);
    }
    emits(UPDATE_CHECKED_KEYS, [...checkedKeysSet.value]);
  };

  const updateCheckedKeys = () => {
    if (!props.checkable) return;
    const { maxLevel, levelNodesMap } = treeInfo;
    const checkedKeySet = checkedKeysSet.value;

    const indeterminateKeySet = new Set<TreeNodeKey>();
    for (let level = maxLevel - 1; level >= 1; level--) {
      const nodes = levelNodesMap.get(level);
      if (!nodes) continue;
      nodes.forEach((node) => {
        const children = node.children;
        if (children) {
          let allChecked = true;
          let hasChecked = false;
          for (const childNode of children) {
            const key = childNode.key;
            const checkboxDisabled = childNode.disableCheckbox;
            if (checkboxDisabled) {
              continue;
            } else if (checkedKeySet.has(key)) {
              hasChecked = true;
            } else if (indeterminateKeySet.has(key)) {
              allChecked = false;
              hasChecked = true;
              break;
            } else {
              allChecked = false;
            }
          }
          if (allChecked && !node.disableCheckbox) {
            checkedKeySet.add(node.key);
          } else if (hasChecked && !node.disableCheckbox) {
            indeterminateKeySet.add(node.key);
            checkedKeySet.delete(node.key);
          } else {
            checkedKeySet.delete(node.key);
            indeterminateKeySet.delete(node.key);
          }
        }
      });
    }
    indeterminateKeysSet.value = indeterminateKeySet;
    if (innerMode) {
      triggerRef(checkedKeysSet);
    }
    triggerRef(indeterminateKeysSet);

    emits(UPDATE_CHECKED_KEYS, [...checkedKeysSet.value]);
  };

  const _toggleCheckbox = (node: TreeNode, isChecked: boolean) => {
    if (node.disableCheckbox) return;
    const checkedKeySet = checkedKeysSet.value;
    const toggle = (node: TreeNode, checked: boolean) => {
      checkedKeySet[checked ? 'add' : 'delete'](node.key);
      const children = node.children;
      if (children && !props.checkedStrictly) {
        children.forEach((childNode) => {
          if (!childNode.disableCheckbox) {
            toggle(childNode, checked);
          }
        });
      }
    };
    toggle(node, isChecked);
    if (props.checkedStrictly) {
      if (innerMode) {
        triggerRef(checkedKeysSet);
      }
    } else {
      updateCheckedKeys();
    }
  };

  const toggleCheckbox = (node: TreeNode) => {
    const checked = hasChecked(node);
    _toggleCheckbox(node, !checked);
    emits(UPDATE_CHECKED_KEYS, Array.from(checkedKeysSet.value));
    afterNodeCheck(node, !checked);
  };

  const getChecked = (
    leafOnly = false,
  ): {
    checkedKeys: TreeNodeKey[];
    checkedNodes: TreeNodeData[];
  } => {
    const checkedNodes: TreeNodeData[] = [];
    const keys: TreeNodeKey[] = [];
    if (props.checkable) {
      checkedKeysSet.value.forEach((key) => {
        const node = getTreeNode(key);
        if (node && (!leafOnly || (leafOnly && node.isLeaf))) {
          keys.push(key);
          checkedNodes.push(node.data);
        }
      });
    }
    return {
      checkedKeys: keys,
      checkedNodes,
    };
  };

  const getHalfChecked = (): {
    halfCheckedKeys: TreeNodeKey[];
    halfCheckedNodes: TreeNodeData[];
  } => {
    const halfCheckedNodes: TreeNodeData[] = [];
    const halfCheckedKeys: TreeNodeKey[] = [];
    if (props.checkable) {
      indeterminateKeysSet.value.forEach((key) => {
        const node = getTreeNode(key);
        if (node) {
          halfCheckedKeys.push(key);
          halfCheckedNodes.push(node.data);
        }
      });
    }
    return {
      halfCheckedNodes,
      halfCheckedKeys,
    };
  };

  const afterNodeCheck = (node: TreeNode, checked: boolean) => {
    const { checkedNodes, checkedKeys } = getChecked();
    const { halfCheckedNodes, halfCheckedKeys } = getHalfChecked();
    emits(NODE_CHECK, checkedKeys, {
      node,
      checked,
      checkedKeys,
      checkedNodes,
      halfCheckedKeys,
      halfCheckedNodes,
    });
  };

  const checkAll = (checked: boolean) => {
    if (!checked) {
      checkedKeysSet.value.clear();
    } else {
      const checkedKeys = treeInfo.allNodeKeys.filter((key) => {
        const node = getTreeNode(key);
        if (!node) return false;
        return !node.disableCheckbox;
      });
      checkedKeysSet.value = new Set(checkedKeys || []);
    }
    if (innerMode) {
      triggerRef(checkedKeysSet);
    }
    emits(UPDATE_CHECKED_KEYS, Array.from(checkedKeysSet.value));
  };

  const checkNode = (key: TreeNodeKey | TreeNodeKey[], checked: boolean) => {
    let target: TreeNodeKey[] | null = null;
    if (!Array.isArray(key)) {
      target = [key];
    } else {
      target = key;
    }
    target?.forEach((k) => {
      const node = getTreeNode(k);
      if (!node) return;
      _toggleCheckbox(node, checked);
    });
    emits(UPDATE_CHECKED_KEYS, Array.from(checkedKeysSet.value));
  };

  const getCheckedKeys = (leafOnly = false): TreeNodeKey[] => {
    return getChecked(leafOnly).checkedKeys;
  };

  const getCheckedNodes = (leafOnly = false): TreeNodeData[] => {
    return getChecked(leafOnly).checkedNodes;
  };

  const getHalfCheckedKeys = (): TreeNodeKey[] => {
    return getHalfChecked().halfCheckedKeys;
  };

  const getHalfCheckedNodes = (): TreeNodeData[] => {
    return getHalfChecked().halfCheckedNodes;
  };

  watch(
    () => props.checkedKeys,
    () => {
      if (props.checkedKeys !== undefined) {
        innerMode = false;
        checkedKeysSet.value = new Set(props.checkedKeys);
        triggerRef(checkedKeysSet);
      } else {
        innerMode = true;
      }
    },
    {
      immediate: true,
    },
  );

  return {
    setCheckedKeys,
    hasChecked,
    hasIndeterminate,
    updateCheckedKeys,
    toggleCheckbox,
    checkAll,
    checkNode,
    getCheckedKeys,
    getCheckedNodes,
    getHalfCheckedKeys,
    getHalfCheckedNodes,
  };
};
