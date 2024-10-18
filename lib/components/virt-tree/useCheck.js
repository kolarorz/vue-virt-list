import { shallowRef, watch, triggerRef } from "vue-demi";
import { UPDATE_CHECKED_KEYS, NODE_CHECK } from "./useTree.js";
const useCheck = ({
  props,
  treeInfo,
  emits,
  getTreeNode
}) => {
  let innerMode = false;
  const checkedKeysSet = shallowRef(/* @__PURE__ */ new Set());
  const indeterminateKeysSet = shallowRef(/* @__PURE__ */ new Set());
  const hasChecked = (node) => checkedKeysSet.value.has(node.key);
  const hasIndeterminate = (node) => indeterminateKeysSet.value.has(node.key);
  const setCheckedKeys = () => {
    checkedKeysSet.value.clear();
    indeterminateKeysSet.value.clear();
    if (props.checkable && props.checkedKeys) {
      for (const key of props.checkedKeys) {
        const node = getTreeNode(key);
        if (!node)
          return;
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
    if (!props.checkable)
      return;
    const { maxLevel, levelNodesMap } = treeInfo;
    const checkedKeySet = checkedKeysSet.value;
    const indeterminateKeySet = /* @__PURE__ */ new Set();
    for (let level = maxLevel - 1; level >= 1; level--) {
      const nodes = levelNodesMap.get(level);
      if (!nodes)
        continue;
      nodes.forEach((node) => {
        const children = node.children;
        if (children) {
          let allChecked = true;
          let hasChecked2 = false;
          for (const childNode of children) {
            const key = childNode.key;
            const checkboxDisabled = childNode.disableCheckbox;
            if (checkboxDisabled) {
              continue;
            } else if (checkedKeySet.has(key)) {
              hasChecked2 = true;
            } else if (indeterminateKeySet.has(key)) {
              allChecked = false;
              hasChecked2 = true;
              break;
            } else {
              allChecked = false;
            }
          }
          if (allChecked && !node.disableCheckbox) {
            checkedKeySet.add(node.key);
          } else if (hasChecked2 && !node.disableCheckbox) {
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
  const _toggleCheckbox = (node, isChecked) => {
    if (node.disableCheckbox)
      return;
    const checkedKeySet = checkedKeysSet.value;
    const toggle = (node2, checked) => {
      checkedKeySet[checked ? "add" : "delete"](node2.key);
      const children = node2.children;
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
  const toggleCheckbox = (node) => {
    const checked = hasChecked(node);
    _toggleCheckbox(node, !checked);
    emits(UPDATE_CHECKED_KEYS, Array.from(checkedKeysSet.value));
    afterNodeCheck(node, !checked);
  };
  const getChecked = (leafOnly = false) => {
    const checkedNodes = [];
    const keys = [];
    if (props.checkable) {
      checkedKeysSet.value.forEach((key) => {
        const node = getTreeNode(key);
        if (node && (!leafOnly || leafOnly && node.isLeaf)) {
          keys.push(key);
          checkedNodes.push(node.data);
        }
      });
    }
    return {
      checkedKeys: keys,
      checkedNodes
    };
  };
  const getHalfChecked = () => {
    const halfCheckedNodes = [];
    const halfCheckedKeys = [];
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
      halfCheckedKeys
    };
  };
  const afterNodeCheck = (node, checked) => {
    const { checkedNodes, checkedKeys } = getChecked();
    const { halfCheckedNodes, halfCheckedKeys } = getHalfChecked();
    emits(NODE_CHECK, checkedKeys, {
      node,
      checked,
      checkedKeys,
      checkedNodes,
      halfCheckedKeys,
      halfCheckedNodes
    });
  };
  const checkAll = (checked) => {
    if (!checked) {
      checkedKeysSet.value.clear();
    } else {
      const checkedKeys = treeInfo.allNodeKeys.filter((key) => {
        const node = getTreeNode(key);
        if (!node)
          return false;
        return !node.disableCheckbox;
      });
      checkedKeysSet.value = new Set(checkedKeys || []);
    }
    if (innerMode) {
      triggerRef(checkedKeysSet);
    }
    emits(UPDATE_CHECKED_KEYS, Array.from(checkedKeysSet.value));
  };
  const checkNode = (key, checked) => {
    let target = null;
    if (!Array.isArray(key)) {
      target = [key];
    } else {
      target = key;
    }
    target == null ? void 0 : target.forEach((k) => {
      const node = getTreeNode(k);
      if (!node)
        return;
      _toggleCheckbox(node, checked);
    });
    emits(UPDATE_CHECKED_KEYS, Array.from(checkedKeysSet.value));
  };
  const getCheckedKeys = (leafOnly = false) => {
    return getChecked(leafOnly).checkedKeys;
  };
  const getCheckedNodes = (leafOnly = false) => {
    return getChecked(leafOnly).checkedNodes;
  };
  const getHalfCheckedKeys = () => {
    return getHalfChecked().halfCheckedKeys;
  };
  const getHalfCheckedNodes = () => {
    return getHalfChecked().halfCheckedNodes;
  };
  watch(
    () => props.checkedKeys,
    () => {
      if (props.checkedKeys !== void 0) {
        innerMode = false;
        checkedKeysSet.value = new Set(props.checkedKeys);
        triggerRef(checkedKeysSet);
      } else {
        innerMode = true;
      }
    },
    {
      immediate: true
    }
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
    getHalfCheckedNodes
  };
};
export {
  useCheck
};
