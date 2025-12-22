import { type ExtractPropTypes, type PropType } from 'vue-demi';
import type { TreeNode } from './type';
export declare const treeNodeProps: {
    node: {
        type: PropType<TreeNode<import("./type").TreeNodeData>>;
        default: () => {};
        required: boolean;
    };
    itemPreSize: {
        type: NumberConstructor;
        default: number;
    };
    fixed: {
        type: BooleanConstructor;
        default: boolean;
    };
    showLine: {
        type: BooleanConstructor;
        default: boolean;
    };
    indent: {
        type: NumberConstructor;
        default: number;
    };
    iconSize: {
        type: NumberConstructor;
        default: number;
    };
    itemGap: {
        type: NumberConstructor;
        default: number;
    };
    hiddenExpandIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
    isExpanded: {
        type: BooleanConstructor;
        default: boolean;
    };
    selectable: {
        type: BooleanConstructor;
        default: boolean;
    };
    isSelected: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableSelect: {
        type: BooleanConstructor;
        default: boolean;
    };
    checkable: {
        type: BooleanConstructor;
        default: boolean;
    };
    isChecked: {
        type: BooleanConstructor;
        default: boolean;
    };
    isIndeterminate: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableCheckbox: {
        type: BooleanConstructor;
        default: boolean;
    };
    isFocused: {
        type: BooleanConstructor;
        default: boolean;
    };
    draggable: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export type TreeNodeProps = ExtractPropTypes<typeof treeNodeProps>;
declare const _default: import("vue-demi").DefineComponent<{
    fixed: boolean;
    itemPreSize: number;
    itemGap: number;
    indent: number;
    iconSize: number;
    showLine: boolean;
    selectable: boolean;
    checkable: boolean;
    draggable: boolean;
    disableSelect: boolean;
    disableCheckbox: boolean;
    node: TreeNode<import("./type").TreeNodeData>;
    hiddenExpandIcon: boolean;
    isExpanded: boolean;
    isSelected: boolean;
    isChecked: boolean;
    isIndeterminate: boolean;
    isFocused: boolean;
}, {
    onClickNodeContent: (e: Event) => void;
    handleDragstart: (e: Event) => void;
    onClickCheckbox: (e: Event) => void;
    onClickExpandIcon: (e: Event) => void;
}, {}, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, ("dragstart" | "clickExpandIcon" | "clickNodeContent" | "clickCheckbox")[], "dragstart" | "clickExpandIcon" | "clickNodeContent" | "clickCheckbox", import("vue-demi").PublicProps, Readonly<{
    fixed: boolean;
    itemPreSize: number;
    itemGap: number;
    indent: number;
    iconSize: number;
    showLine: boolean;
    selectable: boolean;
    checkable: boolean;
    draggable: boolean;
    disableSelect: boolean;
    disableCheckbox: boolean;
    node: TreeNode<import("./type").TreeNodeData>;
    hiddenExpandIcon: boolean;
    isExpanded: boolean;
    isSelected: boolean;
    isChecked: boolean;
    isIndeterminate: boolean;
    isFocused: boolean;
}> & Readonly<{
    onDragstart?: ((...args: any[]) => any) | undefined;
    onClickExpandIcon?: ((...args: any[]) => any) | undefined;
    onClickNodeContent?: ((...args: any[]) => any) | undefined;
    onClickCheckbox?: ((...args: any[]) => any) | undefined;
}>, {
    fixed: boolean;
    itemPreSize: number;
    itemGap: number;
    indent: number;
    iconSize: number;
    showLine: boolean;
    selectable: boolean;
    checkable: boolean;
    draggable: boolean;
    disableSelect: boolean;
    disableCheckbox: boolean;
    node: TreeNode<import("./type").TreeNodeData>;
    hiddenExpandIcon: boolean;
    isExpanded: boolean;
    isSelected: boolean;
    isChecked: boolean;
    isIndeterminate: boolean;
    isFocused: boolean;
}, {}, {}, {}, string, import("vue-demi").ComponentProvideOptions, true, {}, any>;
export default _default;
