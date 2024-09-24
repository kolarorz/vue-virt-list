import { type SetupContext, type ShallowRef } from 'vue-demi';
import { type TreeEmits, type TreeProps } from './useTree';
import type { TreeNode, TreeNodeKey } from './type';
import type { VirtList } from 'vue-virt-list';
export declare const useExpand: ({ props, virtListRef, parentNodeKeys, getTreeNode, emits, }: {
    props: TreeProps;
    virtListRef: ShallowRef<InstanceType<typeof VirtList> | null>;
    parentNodeKeys: TreeNodeKey[];
    getTreeNode: (key: TreeNodeKey) => TreeNode | undefined;
    emits: SetupContext<typeof TreeEmits>['emit'];
}) => {
    hasExpanded: (node: TreeNode) => boolean;
    setExpandedKeys: () => void;
    toggleExpand: (node: TreeNode) => void;
    expandNode: (key: TreeNodeKey | TreeNodeKey[], expanded: boolean) => void;
    expandAll: (expanded: boolean) => void;
};
