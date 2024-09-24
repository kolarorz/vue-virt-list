import { type SetupContext, type ShallowReactive } from 'vue-demi';
import { type TreeEmits, type TreeProps } from './useTree';
import type { TreeInfo, TreeNode, TreeNodeKey, TreeNodeData } from './type';
export declare const useCheck: ({ props, treeInfo, emits, getTreeNode, }: {
    props: TreeProps;
    treeInfo: ShallowReactive<TreeInfo | undefined>;
    emits: SetupContext<typeof TreeEmits>['emit'];
    getTreeNode: (key: TreeNodeKey) => TreeNode | undefined;
}) => {
    setCheckedKeys: () => void;
    hasChecked: (node: TreeNode) => boolean;
    hasIndeterminate: (node: TreeNode) => boolean;
    updateCheckedKeys: () => void;
    toggleCheckbox: (node: TreeNode) => void;
    checkAll: (checked: boolean) => void;
    checkNode: (key: TreeNodeKey | TreeNodeKey[], checked: boolean) => void;
    getCheckedKeys: (leafOnly?: boolean) => TreeNodeKey[];
    getCheckedNodes: (leafOnly?: boolean) => TreeNodeData[];
    getHalfCheckedKeys: () => TreeNodeKey[];
    getHalfCheckedNodes: () => TreeNodeData[];
};
