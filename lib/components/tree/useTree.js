import { ref, shallowReactive, computed, watch } from "vue-demi";
import { useCheck } from "./useCheck.js";
import { useFilter } from "./useFilter.js";
import { useSelect } from "./useSelect.js";
import { useFocus } from "./useFocus.js";
import { useExpand } from "./useExpand.js";
import { useDrag } from "./useDrag.js";
const defaultFiledNames = {
  key: "key",
  title: "title",
  children: "children",
  disableSelect: "disableSelect",
  disableCheckbox: "disableCheckbox",
  disableDragIn: "disableDragIn",
  disableDragOut: "disableDragOut"
};
const TREE_SCROLL = "scroll";
const NODE_EXPAND = "expand";
const UPDATE_EXPANDED_KEYS = "update:expandedKeys";
const NODE_SELECT = "select";
const UPDATE_SELECTED_KEYS = "update:selectedKeys";
const NODE_CHECK = "check";
const UPDATE_CHECKED_KEYS = "update:checkedKeys";
const DRAGSTART = "dragstart";
const DRAGEND = "dragend";
const customFieldNames = {
  list: {
    type: Array,
    required: true,
    default: () => []
  },
  minSize: {
    type: Number,
    default: 32
  },
  // 是否为固定高
  fixed: {
    type: Boolean,
    default: false
  },
  indent: {
    type: Number,
    default: 16
  },
  iconSize: {
    type: Number,
    default: 16
  },
  itemGap: {
    type: Number,
    default: 0
  },
  showLine: {
    type: Boolean,
    default: false
  },
  fieldNames: {
    type: Object,
    default: () => ({})
  },
  filterMethod: {
    type: Function
  },
  // expand
  defaultExpandAll: {
    type: Boolean,
    default: false
  },
  expandedKeys: {
    type: Array
  },
  expandOnClickNode: {
    type: Boolean,
    default: false
  },
  // selectable
  selectable: {
    type: Boolean,
    default: false
  },
  selectMultiple: {
    type: Boolean,
    default: false
  },
  selectedKeys: {
    type: Array
  },
  // checkable
  checkable: {
    type: Boolean,
    default: false
  },
  checkedKeys: {
    type: Array
  },
  checkedStrictly: {
    type: Boolean,
    default: false
  },
  checkOnClickNode: {
    type: Boolean,
    default: false
  },
  // focus
  focusedKeys: {
    type: Array,
    default: () => []
  },
  draggable: {
    type: Boolean,
    default: false
  },
  dragClass: {
    type: String,
    default: ""
  },
  dragGhostClass: {
    type: String,
    default: ""
  },
  beforeDrag: {
    type: Function,
    default: () => true
  }
};
const useTree = (props, emits) => {
  const dragging = ref(false);
  const virtListRef = ref(null);
  const mergeFieldNames = {
    ...defaultFiledNames,
    ...props.fieldNames
  };
  const getKey = (node) => !node ? "" : node[mergeFieldNames.key];
  const getTitle = (node) => !node ? "" : node[mergeFieldNames.title];
  const getChildren = (node) => !node ? [] : node[mergeFieldNames.children];
  const getDisableSelect = (node) => !node ? "" : node[mergeFieldNames.disableSelect];
  const getDisableCheckbox = (node) => !node ? "" : node[mergeFieldNames.disableCheckbox];
  const treeInfo = shallowReactive({
    treeNodesMap: /* @__PURE__ */ new Map(),
    levelNodesMap: /* @__PURE__ */ new Map(),
    maxLevel: 1,
    treeNodes: [],
    allNodeKeys: []
  });
  const parentNodeKeys = [];
  function setTreeNode(key, value) {
    return treeInfo.treeNodesMap.set(String(key), value);
  }
  function getTreeNode(key) {
    return treeInfo.treeNodesMap.get(String(key));
  }
  const setTreeData = (list) => {
    const levelNodesMap = /* @__PURE__ */ new Map();
    let maxLevel = 1;
    const flat = (nodes, level = 1, parent) => {
      const currNodes = [];
      let index = 0;
      for (const rawNode of nodes) {
        index++;
        const key = getKey(rawNode);
        const title = getTitle(rawNode);
        const children = getChildren(rawNode);
        const disableSelect = getDisableSelect(rawNode);
        const disableCheckbox = getDisableCheckbox(rawNode);
        const node = {
          data: rawNode,
          key,
          parent,
          level,
          title,
          disableSelect,
          disableCheckbox,
          isLeaf: !children || children.length === 0,
          isLast: index === nodes.length
        };
        if (children && children.length) {
          node.children = flat(children, level + 1, node);
          parentNodeKeys.push(node.key);
        }
        currNodes.push(node);
        setTreeNode(key, node);
        treeInfo.allNodeKeys.push(key);
        if (level > maxLevel) {
          maxLevel = level;
        }
        const levelInfo = levelNodesMap.get(level);
        if (levelInfo) {
          levelInfo.push(node);
          continue;
        }
        levelNodesMap.set(level, [node]);
      }
      return currNodes;
    };
    treeInfo.treeNodes = flat(list);
    treeInfo.levelNodesMap = levelNodesMap;
    treeInfo.maxLevel = maxLevel;
  };
  const scrollToTarget = (key, isTop = true) => {
    var _a, _b;
    const currIndex = renderList.value.findIndex((l) => l.key === key);
    if (currIndex < 0) {
      expandNode(key, true);
      return;
    }
    if (isTop) {
      (_a = virtListRef.value) == null ? void 0 : _a.scrollToIndex(currIndex);
      return;
    }
    (_b = virtListRef.value) == null ? void 0 : _b.scrollIntoView(currIndex);
  };
  const onScroll = (e) => {
    emits(TREE_SCROLL, e);
  };
  const scrollToBottom = () => {
    var _a;
    (_a = virtListRef.value) == null ? void 0 : _a.scrollToBottom();
  };
  const scrollToTop = () => {
    var _a;
    (_a = virtListRef.value) == null ? void 0 : _a.scrollToTop();
  };
  const scrollTo = (scroll) => {
    var _a;
    const { key, align, offset } = scroll;
    if (offset && offset >= 0) {
      (_a = virtListRef.value) == null ? void 0 : _a.scrollToOffset(offset);
      return;
    }
    if (!key)
      return;
    if (align && align === "top") {
      scrollToTarget(key, true);
    } else {
      scrollToTarget(key, false);
    }
  };
  const {
    hasChecked,
    hasIndeterminate,
    setCheckedKeys,
    toggleCheckbox,
    checkAll,
    checkNode
  } = useCheck({
    props,
    treeInfo,
    getTreeNode,
    emits
  });
  const { doFilter, hiddenNodeKeySet, isForceHiddenExpandIcon } = useFilter({
    props,
    treeInfo
  });
  const { hasSelected, toggleSelect, selectNode, selectAll } = useSelect({
    props,
    treeInfo,
    emits,
    getTreeNode
  });
  const { hasExpanded, setExpandedKeys, toggleExpand, expandAll, expandNode } = useExpand({
    props,
    virtListRef,
    parentNodeKeys,
    getTreeNode,
    emits
  });
  const { hasFocused } = useFocus({ props });
  const { onDragstart } = useDrag({
    props,
    virtListRef,
    dragging,
    getTreeNode,
    hasExpanded,
    expandNode,
    emits
  });
  const renderList = computed(() => {
    const hiddenNodeKeys = hiddenNodeKeySet.value;
    const flattenNodes = [];
    const nodes = treeInfo && treeInfo.treeNodes || [];
    function traverse() {
      const stack = [];
      for (let i = nodes.length - 1; i >= 0; --i) {
        stack.push(nodes[i]);
      }
      while (stack.length) {
        const node = stack.pop();
        if (!node)
          continue;
        if (!hiddenNodeKeys.has(node.key)) {
          flattenNodes.push(node);
        }
        if (hasExpanded(node)) {
          const children = node.children;
          if (children) {
            const length = children.length;
            for (let i = length - 1; i >= 0; --i) {
              stack.push(children[i]);
            }
          }
        }
      }
    }
    traverse();
    return flattenNodes;
  });
  const onClickExpandIcon = (node) => {
    if (dragging.value)
      return;
    toggleExpand(node);
  };
  const onClickCheckbox = (node, e) => {
    if (dragging.value)
      return;
    toggleCheckbox(node);
  };
  const onClickNodeContent = (node) => {
    if (dragging.value)
      return;
    if (props.selectable && !node.disableSelect) {
      toggleSelect(node);
    } else if (props.checkable && !node.disableCheckbox && props.checkOnClickNode) {
      toggleCheckbox(node);
    } else if (props.expandOnClickNode) {
      toggleExpand(node);
    }
  };
  const filter = (query) => {
    const keys = doFilter(query);
    if (keys) {
      expandNode([...keys], true);
    }
  };
  function forceUpdate() {
    setTreeData(props.list);
    setExpandedKeys();
    setCheckedKeys();
    if (!virtListRef.value)
      return;
    virtListRef.value.forceUpdate();
  }
  watch(
    () => props.list.length,
    () => {
      forceUpdate();
    },
    {
      immediate: true
    }
  );
  return {
    virtListRef,
    treeInfo,
    dragging,
    renderList,
    onScroll,
    filter,
    isForceHiddenExpandIcon,
    setTreeData,
    getTreeNode,
    scrollToBottom,
    scrollToTarget,
    scrollToTop,
    scrollTo,
    forceUpdate,
    // expand
    hasExpanded,
    toggleExpand,
    expandAll,
    expandNode,
    // select
    hasSelected,
    selectNode,
    selectAll,
    // check
    hasChecked,
    hasIndeterminate,
    checkAll,
    checkNode,
    // focus
    hasFocused,
    onDragstart,
    onClickExpandIcon,
    onClickNodeContent,
    onClickCheckbox
  };
};
export {
  DRAGEND,
  DRAGSTART,
  NODE_CHECK,
  NODE_EXPAND,
  NODE_SELECT,
  TREE_SCROLL,
  UPDATE_CHECKED_KEYS,
  UPDATE_EXPANDED_KEYS,
  UPDATE_SELECTED_KEYS,
  customFieldNames,
  useTree
};
