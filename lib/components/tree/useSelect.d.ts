import { type SetupContext, type ShallowReactive } from 'vue-demi';
import { type TreeEmits, type TreeProps } from './useTree';
import type { TreeInfo, TreeNode, TreeNodeKey } from './type';
export declare const useSelect: ({ props, treeInfo, emits, getTreeNode, }: {
    props: TreeProps;
    treeInfo: ShallowReactive<TreeInfo | undefined>;
    emits: SetupContext<typeof TreeEmits>['emit'];
    getTreeNode: (key: TreeNodeKey) => TreeNode | undefined;
}) => {
    hasSelected: (node: TreeNode) => boolean;
    toggleSelect: (node: TreeNode) => void;
    selectNode: (key: TreeNodeKey | TreeNodeKey[], selected: boolean) => void;
    selectAll: (selected: boolean) => void;
};
