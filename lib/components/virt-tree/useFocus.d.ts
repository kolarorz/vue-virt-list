import { type TreeProps } from './useTree';
import type { TreeNode } from './type';
export declare const useFocus: ({ props }: {
    props: TreeProps;
}) => {
    hasFocused: (node: TreeNode) => boolean;
};
