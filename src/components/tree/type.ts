export type TreeNodeData = Record<string, any>;
export type TreeKey = string | number;
export type TreeData = TreeNodeData[];

export interface ITreeNode<T = TreeNodeData> {
  key: TreeKey;
  level: number;
  parent?: ITreeNode;
  children?: ITreeNode[];
  data: T;
  disabled?: boolean;
  label?: string;
  isLeaf?: boolean;
}

export interface ITreeOptionProps {
  children?: string;
  label?: string;
  value?: string;
  disabled?: string;
}

export interface ITreeInfo {
  treeNodesMap: Map<TreeKey, ITreeNode>;
  treeNodes: ITreeNode[];
  levelNodesMap: Map<TreeKey, ITreeNode[]>;
  maxLevel: number;
}

export interface CheckedInfo {
  checkedKeys: TreeKey[];
  checkedNodes: TreeData;
  halfCheckedKeys: TreeKey[];
  halfCheckedNodes: TreeData;
}
