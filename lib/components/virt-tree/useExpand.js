import { shallowRef, watch, triggerRef } from "vue-demi";
import { UPDATE_EXPANDED_KEYS, NODE_EXPAND } from "./useTree.js";
const useExpand = ({
  props,
  virtListRef,
  parentNodeKeys,
  getTreeNode,
  emits
}) => {
  let innerMode = false;
  const expandedKeysSet = shallowRef(/* @__PURE__ */ new Set());
  const hasExpanded = (node) => expandedKeysSet.value.has(node.key);
  const setExpandedKeys = () => {
    if (props.defaultExpandAll) {
      expandedKeysSet.value = new Set(parentNodeKeys);
    } else if (props.expandedKeys !== void 0) {
      expandedKeysSet.value.clear();
      props.expandedKeys.forEach((key) => {
        expandedKeysSet.value.add(key);
        const node = getTreeNode(key);
        if (!node)
          return;
        expandParents(node);
      });
    }
    if (innerMode) {
      triggerRef(expandedKeysSet);
    }
    emits(UPDATE_EXPANDED_KEYS, [...expandedKeysSet.value]);
  };
  const expandParents = (node) => {
    expandedKeysSet.value.add(node.key);
    if (!(node == null ? void 0 : node.parent))
      return;
    expandParents(node.parent);
  };
  const expandAll = (expanded) => {
    expandedKeysSet.value = new Set(expanded ? parentNodeKeys : []);
    if (innerMode) {
      triggerRef(expandedKeysSet);
    }
    emits(UPDATE_EXPANDED_KEYS, [...expandedKeysSet.value]);
    const expandedNodes = [];
    expandedKeysSet.value.forEach((key) => {
      const node = getTreeNode(key);
      if (node) {
        expandedNodes.push(node.data);
      }
    });
    emits(NODE_EXPAND, expanded ? parentNodeKeys : [], {
      expanded,
      expandedNodes
    });
  };
  const expandNode = (key, expanded) => {
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
      if (expanded) {
        expandedKeysSet.value.add(node.key);
        expandParents(node);
      } else {
        expandedKeysSet.value.delete(node.key);
      }
    });
    const expandedNodes = [];
    expandedKeysSet.value.forEach((key2) => {
      const node = getTreeNode(key2);
      if (node) {
        expandedNodes.push(node.data);
      }
    });
    emits(NODE_EXPAND, [...expandedKeysSet.value], {
      node: !Array.isArray(key) ? getTreeNode(key) : void 0,
      expanded,
      expandedNodes
    });
    if (innerMode) {
      triggerRef(expandedKeysSet);
    }
    emits(UPDATE_EXPANDED_KEYS, [...expandedKeysSet.value]);
  };
  const toggleExpand = (node) => {
    if (!virtListRef.value)
      return;
    if (node.isLeaf)
      return;
    const expanded = hasExpanded(node);
    expandNode(node.key, !expanded);
  };
  watch(
    () => props.expandedKeys,
    () => {
      if (props.expandedKeys !== void 0) {
        innerMode = false;
        expandedKeysSet.value = new Set(props.expandedKeys);
        triggerRef(expandedKeysSet);
      } else {
        innerMode = true;
      }
    },
    {
      immediate: true
    }
  );
  return {
    hasExpanded,
    setExpandedKeys,
    toggleExpand,
    expandNode,
    expandAll
  };
};
export {
  useExpand
};
