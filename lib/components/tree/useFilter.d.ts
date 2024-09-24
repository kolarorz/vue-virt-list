import { type ShallowReactive } from 'vue-demi';
import type { TreeInfo, TreeNode, TreeNodeKey } from './type';
import type { TreeProps } from './useTree';
export declare const useFilter: ({ props, treeInfo, }: {
    props: TreeProps;
    treeInfo: ShallowReactive<TreeInfo | undefined>;
}) => {
    hiddenExpandIconKeySet: import("vue-demi").ShallowRef<Set<TreeNodeKey>>;
    hiddenNodeKeySet: import("vue-demi").ShallowRef<Set<TreeNodeKey>>;
    doFilter: (query: string) => Set<TreeNodeKey> | undefined;
    isForceHiddenExpandIcon: (node: TreeNode) => boolean;
};
