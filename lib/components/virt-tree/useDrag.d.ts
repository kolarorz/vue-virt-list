import { type SetupContext, type ShallowRef, type Ref, type ShallowReactive } from 'vue-demi';
import type { TreeInfo, TreeNode, TreeNodeKey } from './type';
import type { VirtList } from '../virt-list';
import { type TreeEmits, type TreeProps } from './useTree';
export declare const useDrag: ({ props, treeInfo, virtListRef, dragging, getTreeNode, hasExpanded, expandNode, emits, }: {
    props: TreeProps;
    treeInfo: ShallowReactive<TreeInfo | undefined>;
    virtListRef: ShallowRef<typeof VirtList | null>;
    dragging: Ref<boolean>;
    getTreeNode: (key: TreeNodeKey) => TreeNode | undefined;
    hasExpanded: (node: TreeNode) => boolean;
    expandNode: (key: TreeNodeKey | TreeNodeKey[], expanded: boolean) => void;
    emits: SetupContext<typeof TreeEmits>['emit'];
}) => {
    onDragstart: (event: MouseEvent) => void;
};
