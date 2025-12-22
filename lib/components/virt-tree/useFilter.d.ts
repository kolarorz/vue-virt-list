import { type ShallowReactive, type ShallowRef } from 'vue-demi';
import type { TreeInfo, TreeNode, TreeNodeKey } from './type';
import type { TreeProps } from './useTree';
import type { VirtList } from '../virt-list';
export declare const useFilter: ({ props, treeInfo, virtListRef, }: {
    props: TreeProps;
    treeInfo: ShallowReactive<TreeInfo | undefined>;
    virtListRef: ShallowRef<typeof VirtList | null>;
}) => {
    hiddenExpandIconKeySet: ShallowRef<Set<TreeNodeKey>, Set<TreeNodeKey>>;
    hiddenNodeKeySet: ShallowRef<Set<TreeNodeKey>, Set<TreeNodeKey>>;
    doFilter: (query: string) => Set<TreeNodeKey> | undefined;
    isForceHiddenExpandIcon: (node: TreeNode) => boolean;
};
