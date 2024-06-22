import {
  computed,
  nextTick,
  ref,
  shallowRef,
  triggerRef,
  watch,
  type ExtractPropTypes,
  type PropType,
  type SetupContext,
} from 'vue-demi';
import { VirtList } from '../../VirtList';
import type {
  ITreeNode,
  ITreeInfo,
  TreeNodeData,
  TreeData,
  TreeKey,
  ITreeOptionProps,
  CheckedInfo,
} from './type';
import { useCheck } from './useCheck';
import { useFilter } from './useFilter';

// enums
export enum TreeOptionsEnum {
  KEY = 'id',
  LABEL = 'label',
  CHILDREN = 'children',
}

// emits
export const NODE_CLICK = 'node-click';
export const NODE_EXPAND = 'node-expand';
export const NODE_COLLAPSE = 'node-collapse';
export const CURRENT_CHANGE = 'current-change';
export const NODE_CHECK = 'node-check';
export const NODE_CHECK_CHANGE = 'node-check-change';
export const TREE_SCROLL = 'scroll';

export const TreeEmits = {
  [NODE_CLICK]: (data: TreeNodeData, node: ITreeNode, e: MouseEvent) =>
    data && node && e,
  [NODE_EXPAND]: (data: TreeNodeData, node: ITreeNode) => data && node,
  [NODE_COLLAPSE]: (data: TreeNodeData, node: ITreeNode) => data && node,
  [CURRENT_CHANGE]: (data: TreeNodeData, node: ITreeNode) => data && node,
  [NODE_CHECK]: (data: TreeNodeData, checkedInfo: CheckedInfo) =>
    data && checkedInfo,
  [NODE_CHECK_CHANGE]: (data: TreeNodeData, checked: boolean) =>
    data && typeof checked === 'boolean',
  [TREE_SCROLL]: (e: Event) => e,
};

export const treeProps = {
  data: {
    type: Object as PropType<TreeData>,
    required: true,
    default: () => [],
  },
  fieldNames: {
    type: Object as PropType<ITreeOptionProps>,
    default: () => ({ children: 'children', label: 'label', value: 'value' }),
  },
  defaultExpandedKeys: {
    type: Array as PropType<TreeKey[]>,
    default: () => [],
  },
  defaultCheckedKeys: {
    type: Array as PropType<TreeKey[]>,
    default: () => [],
  },
  indent: {
    type: Number,
    default: 16,
  },
  currentNodeKey: {
    type: [String, Number] as PropType<TreeKey>,
    default: '',
  },
  minSize: {
    type: Number,
    default: 10,
  },
  expandOnClickNode: {
    type: Boolean,
    default: true,
  },
  showCheckbox: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  filterMethod: {
    type: Function as PropType<(query: string, node: TreeNodeData) => boolean>,
  },
};

export const TreeNodeEmits = {
  click: (node: ITreeNode, e: MouseEvent) => node && e,
  check: (node: ITreeNode, checked: boolean) =>
    node && typeof checked === 'boolean',
};

export type TreeProps = ExtractPropTypes<typeof treeProps>;

export const useTree = (
  props: TreeProps,
  emits: SetupContext<typeof TreeEmits>['emit'],
) => {
  const virListRef = ref<InstanceType<typeof VirtList> | null>(null);
  const expandedKeysSet = shallowRef<Set<TreeKey>>(
    new Set(props.defaultExpandedKeys),
  );
  const tree = shallowRef<ITreeInfo | undefined>();
  const currentNode = ref<TreeKey>();
  const parentNodeKeys = new Set<TreeKey>();

  const { isChecked, isIndeterminate, toggleCheckbox } = useCheck(
    props,
    emits,
    tree,
  );

  const { doFilter, hiddenNodeKeySet, isForceHiddenExpandIcon } = useFilter(
    props,
    tree,
  );

  const expandParents = (node: ITreeNode) => {
    expandedKeysSet.value.add(node.key);
    if (!node?.parent) return;
    expandParents(node.parent);
  };

  const flattenList = computed(() => {
    // 展开节点的所有父节点
    const expandedKeys = expandedKeysSet.value;
    const hiddenNodeKeys = hiddenNodeKeySet.value;
    const flattenNodes: ITreeNode[] = [];
    const nodes = (tree.value && tree.value.treeNodes) || [];
    function traverse() {
      const stack: ITreeNode[] = [];
      for (let i = nodes.length - 1; i >= 0; --i) {
        stack.push(nodes[i]);
      }
      while (stack.length) {
        const node = stack.pop();
        if (!node) continue;
        if (!hiddenNodeKeys.has(node.key)) {
          flattenNodes.push(node);
        }
        if (expandedKeys.has(node.key)) {
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

  const valueKey = computed(() => {
    return props.fieldNames?.value || TreeOptionsEnum.KEY;
  });
  const childrenKey = computed(() => {
    return props.fieldNames?.children || TreeOptionsEnum.CHILDREN;
  });
  const labelKey = computed(() => {
    return props.fieldNames?.label || TreeOptionsEnum.LABEL;
  });

  const getKey = (node: TreeNodeData) => (!node ? '' : node[valueKey.value]);
  const getChildren = (node: TreeNodeData) =>
    !node ? [] : node[childrenKey.value];
  const getLabel = (node: TreeNodeData) => (!node ? '' : node[labelKey.value]);

  const createTree = (data: TreeData): ITreeInfo => {
    const treeNodesMap = new Map<TreeKey, ITreeNode>();
    const levelNodesMap = new Map<TreeKey, ITreeNode[]>();

    let maxLevel = 1;
    const flat = (nodes: TreeData, level: number = 1, parent?: ITreeNode) => {
      const currNodes: ITreeNode[] = [];
      for (const rawNode of nodes) {
        const children = getChildren(rawNode);
        const key = getKey(rawNode);
        const label = getLabel(rawNode);
        const node: ITreeNode = {
          data: rawNode,
          key,
          parent,
          level,
          label,
          isLeaf: !children || children.length === 0,
        };
        if (children && children.length) {
          node.children = flat(children, level + 1, node);
        }
        parentNodeKeys.add(node.key);
        currNodes.push(node);
        treeNodesMap.set(key, node);
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
    const treeNodes = flat(data);
    return {
      treeNodes,
      treeNodesMap,
      levelNodesMap,
      maxLevel,
    };
  };

  const expandNode = (node: ITreeNode) => {
    emits(NODE_COLLAPSE, node.data, node);
    expandedKeysSet.value.add(node.key);
    triggerRef(expandedKeysSet);
  };

  const collapseNode = (node: ITreeNode) => {
    emits(NODE_EXPAND, node.data, node);
    expandedKeysSet.value.delete(node.key);
    triggerRef(expandedKeysSet);
  };

  const toggleExpand = (node: ITreeNode) => {
    if (!virListRef.value) return;
    const { offset: preOffset } = virListRef.value.reactiveData;
    const expandedKeys = expandedKeysSet.value;
    if (expandedKeys.has(node.key)) {
      collapseNode(node);
    } else {
      expandNode(node);
    }
    nextTick(() => {
      if (virListRef.value) virListRef.value.scrollToOffset(preOffset);
    });
  };

  const setTreeData = (data: TreeData) => {
    tree.value = createTree(data);
  };

  const isExpanded = (node: ITreeNode) => {
    return expandedKeysSet.value.has(node.key);
  };

  const isCurrent = (node: ITreeNode) => {
    return !!currentNode.value && currentNode.value === node.key;
  };

  const onClickTreeNode = (node: ITreeNode, e: MouseEvent) => {
    emits(NODE_CLICK, node.data, node, e);
    if (!isCurrent(node)) {
      emits(CURRENT_CHANGE, node.data, node);
      currentNode.value = node.key;
    }
    if (props.expandOnClickNode) {
      toggleExpand(node);
    }
  };

  const getCurrentNode = (data: TreeKey | TreeNodeData) => {
    const key = typeof data === 'object' && data !== null ? getKey(data) : data;
    return tree.value?.treeNodesMap.get(key);
  };

  const getCurrentKey = () => {
    return currentNode.value;
  };

  const setCurrentKey = (key: TreeKey) => {
    currentNode.value = key;
  };

  const setExpandedKeys = (keys: TreeKey[]) => {
    // 设置展开项的时候需要展开所有的父级
    for (const key of keys) {
      const node = tree.value?.treeNodesMap.get(key);
      if (node) {
        expandParents(node);
      }
    }
    triggerRef(expandedKeysSet);
  };

  const getNodeByKey = (key: TreeKey) => tree.value?.treeNodesMap.get(key);

  const expandAllNodes = () => {
    expandedKeysSet.value = parentNodeKeys;
    triggerRef(expandedKeysSet);
  };

  const collapseAllNods = () => {
    expandedKeysSet.value = new Set([]);
    triggerRef(expandedKeysSet);
    virListRef.value?.scrollToTop();
  };

  const onScroll = (e: Event) => {
    emits(TREE_SCROLL, e);
  };

  const expandNodeByKey = (key: TreeKey) => {
    if (!key && key !== 0) return;
    const targetItem = tree.value?.treeNodesMap.get(key);
    if (!targetItem) return;
    // 根据节点展开的时候需要展开所有父亲节点
    expandParents(targetItem);
    triggerRef(expandedKeysSet);
    scrollToTarget(key, false);
  };

  const collapseNodeByKey = (key: TreeKey) => {
    if (!expandedKeysSet.value.has(key)) return;
    expandedKeysSet.value.delete(key);
    triggerRef(expandedKeysSet);
  };

  const scrollToBottom = () => {
    virListRef.value?.scrollToBottom();
  };

  const scrollToTop = () => {
    virListRef.value?.scrollToTop();
  };

  const scrollToTarget = (key: TreeKey, isTop: boolean = true) => {
    const currIndex = flattenList.value.findIndex((l) => l.key === key);
    // 若展开节点不在可视区域内，将对应节点滚动到可视区域
    if (currIndex < 0) return;
    if (isTop) {
      virListRef.value?.scrollToIndex(currIndex);
      return;
    }
    virListRef.value?.scrollIntoView(currIndex);
  };

  const onCheckChange = (node: ITreeNode, checked: boolean) => {
    toggleCheckbox(node, checked);
  };

  const filter = (query: string) => {
    const keys = doFilter(query);
    if (keys) {
      expandedKeysSet.value = keys;
    }
  };

  watch(
    () => props.data,
    (data: TreeData) => {
      parentNodeKeys.clear();
      setTreeData(data);
      if (!virListRef.value) return;
      virListRef.value.forceUpdate();
    },
    {
      immediate: true,
    },
  );

  watch(
    () => props.currentNodeKey,
    (key) => {
      currentNode.value = key;
    },
    {
      immediate: true,
    },
  );

  return {
    virListRef,
    tree,

    flattenList,

    onScroll,
    filter,
    isForceHiddenExpandIcon,
    setTreeData,
    toggleExpand,
    expandNode,
    collapseNode,
    onClickTreeNode,
    isExpanded,
    isCurrent,
    getCurrentNode,
    getCurrentKey,
    setCurrentKey,
    setExpandedKeys,
    getNodeByKey,
    expandAllNodes,
    collapseAllNods,
    expandNodeByKey,
    collapseNodeByKey,
    scrollToBottom,
    scrollToTarget,
    scrollToTop,

    isChecked,
    isIndeterminate,
    onCheckChange,
  };
};
