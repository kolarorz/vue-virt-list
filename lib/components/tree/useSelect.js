import { shallowRef, watch, triggerRef } from "vue-demi";
import { UPDATE_SELECTED_KEYS, NODE_SELECT } from "./useTree.js";
const useSelect = ({
  props,
  treeInfo,
  emits,
  getTreeNode
}) => {
  let innerMode = false;
  const { selectMultiple, selectedKeys } = props;
  const selectedKeysSet = shallowRef(new Set(selectedKeys));
  const hasSelected = (node) => selectedKeysSet.value.has(node.key);
  const toggleSelect = (node) => {
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
  const selectNode = (key, selected) => {
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
  const selectAll = (selected) => {
    let selectKeys = [];
    if (selected) {
      selectKeys = treeInfo.allNodeKeys.filter((key) => {
        const node = getTreeNode(key);
        if (!node)
          return false;
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
    const selectedKeys2 = Array.from(selectedKeysSet.value);
    const selectedNodes = [];
    if (props.selectable) {
      selectedKeys2.forEach((key) => {
        const node = getTreeNode(key);
        if (node) {
          selectedNodes.push(node.data);
        }
      });
    }
    return {
      selectedKeys: selectedKeys2,
      selectedNodes
    };
  };
  const afterNodeSelect = (node, selected) => {
    const { selectedNodes, selectedKeys: selectedKeys2 } = getSelected();
    emits(UPDATE_SELECTED_KEYS, selectedKeys2);
    emits(NODE_SELECT, selectedKeys2, {
      node,
      selected,
      selectedKeys: selectedKeys2,
      selectedNodes
    });
  };
  watch(
    () => props.selectedKeys,
    (keys) => {
      if (props.selectedKeys !== void 0) {
        innerMode = false;
        selectedKeysSet.value = new Set(keys);
        triggerRef(selectedKeysSet);
      } else {
        innerMode = true;
      }
    },
    {
      immediate: true
    }
  );
  return {
    hasSelected,
    toggleSelect,
    selectNode,
    selectAll
  };
};
export {
  useSelect
};
