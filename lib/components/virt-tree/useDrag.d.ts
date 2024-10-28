import { type SetupContext, type ShallowRef, type Ref } from 'vue-demi';
import type { TreeNode, TreeNodeKey } from './type';
import type { VirtList } from '../virt-list';
import { type TreeEmits, type TreeProps } from './useTree';
export declare const useDrag: ({ props, virtListRef, dragging, getTreeNode, hasExpanded, expandNode, emits, }: {
    props: TreeProps;
    virtListRef: ShallowRef<typeof VirtList | null>;
    dragging: Ref<boolean>;
    getTreeNode: (key: TreeNodeKey) => TreeNode | undefined;
    hasExpanded: (node: TreeNode) => boolean;
    expandNode: (key: TreeNodeKey | TreeNodeKey[], expanded: boolean) => void;
    emits: SetupContext<typeof TreeEmits>['emit'];
}) => {
    onDragstart: (event: MouseEvent) => void;
};
