import {
  nextTick,
  shallowRef,
  triggerRef,
  watch,
  type SetupContext,
  type ShallowRef,
} from 'vue-demi';
import {
  NODE_CHECK,
  NODE_CHECK_CHANGE,
  type TreeEmits,
  type TreeProps,
} from './useTree';
import type { ITreeInfo, ITreeNode, TreeKey, TreeNodeData } from './type';

export const useCheck = (
  props: TreeProps,
  emits: SetupContext<typeof TreeEmits>['emit'],
  tree: ShallowRef<ITreeInfo | undefined>,
) => {
  const checkedKeys = shallowRef<Set<TreeKey>>(new Set());
  const indeterminateKeys = shallowRef<Set<TreeKey>>(new Set());

  const isChecked = (node: ITreeNode) => checkedKeys.value.has(node.key);

  const isIndeterminate = (node: ITreeNode) =>
    indeterminateKeys.value.has(node.key);

  const updateCheckedKeys = () => {
    if (!props.showCheckbox || !tree.value) return;
    const { maxLevel, levelNodesMap } = tree.value;
    const checkedKeySet = checkedKeys.value;

    const indeterminateKeySet = new Set<TreeKey>();
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
            if (checkedKeySet.has(key)) {
              hasChecked = true;
            } else if (indeterminateKeySet.has(key)) {
              allChecked = false;
              hasChecked = true;
              break;
            } else {
              allChecked = false;
            }
          }
          if (allChecked) {
            checkedKeySet.add(node.key);
          } else if (hasChecked) {
            indeterminateKeySet.add(node.key);
            checkedKeySet.delete(node.key);
          } else {
            checkedKeySet.delete(node.key);
            indeterminateKeySet.delete(node.key);
          }
        }
      });
    }
    indeterminateKeys.value = indeterminateKeySet;
    triggerRef(checkedKeys);
    triggerRef(indeterminateKeys);
  };

  const toggleCheckbox = (
    node: ITreeNode,
    isChecked: boolean,
    nodeClick = true,
  ) => {
    const checkedKeySet = checkedKeys.value;
    const toggle = (node: ITreeNode, checked: boolean) => {
      checkedKeySet[checked ? 'add' : 'delete'](node.key);
      const children = node.children;
      if (children) {
        children.forEach((childNode) => {
          if (!childNode.disabled) {
            toggle(childNode, checked);
          }
        });
      }
    };
    toggle(node, isChecked);
    updateCheckedKeys();
    if (nodeClick) {
      afterNodeCheck(node, isChecked);
    }
  };

  const getChecked = (
    leafOnly = false,
  ): {
    checkedKeys: TreeKey[];
    checkedNodes: TreeNodeData[];
  } => {
    const checkedNodes: TreeNodeData[] = [];
    const keys: TreeKey[] = [];
    if (tree?.value && props.showCheckbox) {
      const { treeNodesMap } = tree.value;
      checkedKeys.value.forEach((key) => {
        const node = treeNodesMap.get(key);
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
    halfCheckedKeys: TreeKey[];
    halfCheckedNodes: TreeNodeData[];
  } => {
    const halfCheckedNodes: TreeNodeData[] = [];
    const halfCheckedKeys: TreeKey[] = [];
    if (tree?.value && props.showCheckbox) {
      const { treeNodesMap } = tree.value;
      indeterminateKeys.value.forEach((key) => {
        const node = treeNodesMap.get(key);
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

  const afterNodeCheck = (node: ITreeNode, checked: boolean) => {
    const { checkedNodes, checkedKeys } = getChecked();
    const { halfCheckedNodes, halfCheckedKeys } = getHalfChecked();
    emits(NODE_CHECK, node.data, {
      checkedKeys,
      checkedNodes,
      halfCheckedKeys,
      halfCheckedNodes,
    });
    emits(NODE_CHECK_CHANGE, node.data, checked);
  };

  const _setCheckedKeys = (keys: TreeKey[]) => {
    if (tree?.value) {
      const { treeNodesMap } = tree.value;
      if (props.showCheckbox && treeNodesMap && keys) {
        for (const key of keys) {
          const node = treeNodesMap.get(key);
          if (node && !isChecked(node)) {
            toggleCheckbox(node, true, false);
          }
        }
      }
    }
  };

  const setChecked = (key: TreeKey, isChecked: boolean) => {
    if (tree?.value && props.showCheckbox) {
      const node = tree.value.treeNodesMap.get(key);
      if (node) {
        toggleCheckbox(node, isChecked, false);
      }
    }
  };

  const setCheckedKeys = (keys: TreeKey[]) => {
    checkedKeys.value.clear();
    indeterminateKeys.value.clear();
    _setCheckedKeys(keys);
  };

  const getCheckedKeys = (leafOnly = false): TreeKey[] => {
    return getChecked(leafOnly).checkedKeys;
  };

  const getCheckedNodes = (leafOnly = false): TreeNodeData[] => {
    return getChecked(leafOnly).checkedNodes;
  };

  const getHalfCheckedKeys = (): TreeKey[] => {
    return getHalfChecked().halfCheckedKeys;
  };

  const getHalfCheckedNodes = (): TreeNodeData[] => {
    return getHalfChecked().halfCheckedNodes;
  };

  watch(
    [() => tree.value, () => props.defaultCheckedKeys],
    () => {
      return nextTick(() => {
        _setCheckedKeys(props.defaultCheckedKeys);
      });
    },
    {
      immediate: true,
    },
  );

  return {
    isChecked,
    isIndeterminate,
    updateCheckedKeys,
    toggleCheckbox,
    setChecked,
    setCheckedKeys,
    getCheckedKeys,
    getCheckedNodes,
    getHalfCheckedKeys,
    getHalfCheckedNodes,
  };
};
