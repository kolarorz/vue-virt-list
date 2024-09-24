export type TreeNodeData = Record<string, any>;
export type TreeNodeKey = string | number;
export type TreeData = TreeNodeData[];

export interface TreeNode<T = TreeNodeData> {
  key: TreeNodeKey;
  level: number;
  title?: string;
  isLeaf?: boolean;
  isLast?: boolean;
  parent?: TreeNode;
  children?: TreeNode[];
  disableSelect?: boolean;
  disableCheckbox?: boolean;
  searchedIndex?: number;
  data: T;
}

export interface TreeFieldNames {
  key?: string;
  title?: string;
  children?: string;
  disableSelect?: string;
  disableCheckbox?: string;
  disableDragIn?: string;
  disableDragOut?: string;
}

export interface TreeInfo {
  treeNodesMap: Map<TreeNodeKey, TreeNode>;
  treeNodes: TreeNode[];
  levelNodesMap: Map<TreeNodeKey, TreeNode[]>;
  maxLevel: number;
  allNodeKeys: TreeNodeKey[];
}

export interface CheckedInfo {
  checkedKeys: TreeNodeKey[];
  checkedNodes: TreeData;
  halfCheckedKeys: TreeNodeKey[];
  halfCheckedNodes: TreeData;
}

export interface IScrollParams {
  key?: TreeNodeKey;
  align?: 'view' | 'top';
  offset?: number;
}
