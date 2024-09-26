import { type ExtractPropTypes, type PropType, type SetupContext } from 'vue-demi';
import type { TreeNode, TreeInfo, TreeNodeData, TreeData, TreeNodeKey, TreeFieldNames, IScrollParams } from './type';
export declare const NODE_CLICK = "click";
export declare const TREE_SCROLL = "scroll";
export declare const NODE_EXPAND = "expand";
export declare const UPDATE_EXPANDED_KEYS = "update:expandedKeys";
export declare const NODE_SELECT = "select";
export declare const UPDATE_SELECTED_KEYS = "update:selectedKeys";
export declare const NODE_CHECK = "check";
export declare const UPDATE_CHECKED_KEYS = "update:checkedKeys";
export declare const DRAGSTART = "dragstart";
export declare const DRAGEND = "dragend";
export declare const TreeEmits: {
    click: (data: TreeNodeData, node: TreeNode, e: MouseEvent) => MouseEvent;
    scroll: (e: Event) => Event;
    expand: (expandKeys: Array<string | number>, data: {
        node?: TreeNode;
        expanded: boolean;
        expandedNodes: TreeNodeData[];
    }) => {
        node?: TreeNode<TreeNodeData> | undefined;
        expanded: boolean;
        expandedNodes: TreeNodeData[];
    };
    "update:expandedKeys": (expandedKeys: TreeNodeKey[]) => TreeNodeKey[];
    select: (selectedKeys: TreeNodeKey[], data: {
        node: TreeNode;
        selected: boolean;
        selectedKeys: TreeNodeKey[];
        selectedNodes: TreeNodeData[];
    }) => {
        node: TreeNode;
        selected: boolean;
        selectedKeys: TreeNodeKey[];
        selectedNodes: TreeNodeData[];
    };
    "update:selectedKeys": (selectedKeys: TreeNodeKey[]) => TreeNodeKey[];
    check: (checkedKeys: TreeNodeKey[], data: {
        node: TreeNode;
        checked: boolean;
        checkedKeys: TreeNodeKey[];
        checkedNodes: TreeNodeData[];
        halfCheckedKeys: TreeNodeKey[];
        halfCheckedNodes: TreeNodeData[];
    }) => {
        node: TreeNode;
        checked: boolean;
        checkedKeys: TreeNodeKey[];
        checkedNodes: TreeNodeData[];
        halfCheckedKeys: TreeNodeKey[];
        halfCheckedNodes: TreeNodeData[];
    };
    "update:checkedKeys": (checkedKeys: TreeNodeKey[]) => TreeNodeKey[];
    dragstart: (data: {
        sourceNode: TreeNodeData;
    }) => {
        sourceNode: TreeNodeData;
    };
    dragend: (data?: {
        node: TreeNode;
        prevNode: TreeNode | undefined;
        parentNode: TreeNode | undefined;
    }) => {
        node: TreeNode;
        prevNode: TreeNode | undefined;
        parentNode: TreeNode | undefined;
    } | undefined;
};
export declare const customFieldNames: {
    list: {
        type: PropType<TreeData>;
        required: boolean;
        default: () => never[];
    };
    minSize: {
        type: NumberConstructor;
        default: number;
    };
    fixed: {
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
    buffer: {
        type: NumberConstructor;
        default: number;
    };
    showLine: {
        type: BooleanConstructor;
        default: boolean;
    };
    fieldNames: {
        type: PropType<TreeFieldNames>;
        default: () => {};
    };
    filterMethod: {
        type: PropType<(query: string, node: TreeNode) => boolean>;
    };
    defaultExpandAll: {
        type: BooleanConstructor;
        default: boolean;
    };
    expandedKeys: {
        type: PropType<TreeNodeKey[]>;
    };
    expandOnClickNode: {
        type: BooleanConstructor;
        default: boolean;
    };
    selectable: {
        type: BooleanConstructor;
        default: boolean;
    };
    selectMultiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    selectedKeys: {
        type: PropType<TreeNodeKey[]>;
    };
    checkable: {
        type: BooleanConstructor;
        default: boolean;
    };
    checkedKeys: {
        type: PropType<TreeNodeKey[]>;
    };
    checkedStrictly: {
        type: BooleanConstructor;
        default: boolean;
    };
    checkOnClickNode: {
        type: BooleanConstructor;
        default: boolean;
    };
    focusedKeys: {
        type: PropType<TreeNodeKey[]>;
        default: () => never[];
    };
    draggable: {
        type: BooleanConstructor;
        default: boolean;
    };
    dragClass: {
        type: StringConstructor;
        default: string;
    };
    dragGhostClass: {
        type: StringConstructor;
        default: string;
    };
};
export declare const TreeNodeEmits: {
    click: (node: TreeNode, e: MouseEvent) => MouseEvent;
    check: (node: TreeNode, checked: boolean) => boolean;
};
export type TreeProps = ExtractPropTypes<typeof customFieldNames>;
export declare const useTree: (props: TreeProps, emits: SetupContext<typeof TreeEmits>['emit']) => {
    virtListRef: import("vue-demi").Ref<import("vue-demi").CreateComponentPublicInstance<Readonly<ExtractPropTypes<{
        list: {
            type: {
                (arrayLength: number): any[];
                (...items: any[]): any[];
                new (arrayLength: number): any[];
                new (...items: any[]): any[];
                isArray(arg: any): arg is any[];
                readonly prototype: any[];
                from<T>(arrayLike: ArrayLike<T>): T[];
                from<T_1, U>(arrayLike: ArrayLike<T_1>, mapfn: (v: T_1, k: number) => U, thisArg?: any): U[];
                from<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>): T_2[];
                from<T_3, U_1>(iterable: Iterable<T_3> | ArrayLike<T_3>, mapfn: (v: T_3, k: number) => U_1, thisArg?: any): U_1[];
                of<T_4>(...items: T_4[]): T_4[];
                readonly [Symbol.species]: ArrayConstructor;
            };
            default: () => never[];
        };
        itemKey: {
            type: (StringConstructor | NumberConstructor)[];
            required: true;
        };
        minSize: {
            type: NumberConstructor;
            default: number;
            required: true;
        };
        itemGap: {
            type: NumberConstructor;
            default: number;
        };
        renderControl: {
            type: FunctionConstructor;
            default: undefined;
        };
        fixed: {
            type: BooleanConstructor;
            default: boolean;
        };
        buffer: {
            type: NumberConstructor;
            default: number;
        };
        bufferTop: {
            type: NumberConstructor;
            default: number;
        };
        bufferBottom: {
            type: NumberConstructor;
            default: number;
        };
        scrollDistance: {
            type: NumberConstructor;
            default: number;
        };
        horizontal: {
            type: BooleanConstructor;
            default: boolean;
        };
        start: {
            type: NumberConstructor;
            default: number;
        };
        offset: {
            type: NumberConstructor;
            default: number;
        };
        listStyle: {
            type: StringConstructor;
            default: string;
        };
        listClass: {
            type: StringConstructor;
            default: string;
        };
        itemStyle: {
            type: StringConstructor;
            default: string;
        };
        itemClass: {
            type: StringConstructor;
            default: string;
        };
        headerClass: {
            type: StringConstructor;
            default: string;
        };
        headerStyle: {
            type: StringConstructor;
            default: string;
        };
        footerClass: {
            type: StringConstructor;
            default: string;
        };
        footerStyle: {
            type: StringConstructor;
            default: string;
        };
        stickyHeaderClass: {
            type: StringConstructor;
            default: string;
        };
        stickyHeaderStyle: {
            type: StringConstructor;
            default: string;
        };
        stickyFooterClass: {
            type: StringConstructor;
            default: string;
        };
        stickyFooterStyle: {
            type: StringConstructor;
            default: string;
        };
    }>>, import("../..").VirtListReturn<any>, unknown, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, import("vue-demi").EmitsOptions, import("vue-demi").VNodeProps & import("vue-demi").AllowedComponentProps & import("vue-demi").ComponentCustomProps & Readonly<ExtractPropTypes<{
        list: {
            type: {
                (arrayLength: number): any[];
                (...items: any[]): any[];
                new (arrayLength: number): any[];
                new (...items: any[]): any[];
                isArray(arg: any): arg is any[];
                readonly prototype: any[];
                from<T>(arrayLike: ArrayLike<T>): T[];
                from<T_1, U>(arrayLike: ArrayLike<T_1>, mapfn: (v: T_1, k: number) => U, thisArg?: any): U[];
                from<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>): T_2[];
                from<T_3, U_1>(iterable: Iterable<T_3> | ArrayLike<T_3>, mapfn: (v: T_3, k: number) => U_1, thisArg?: any): U_1[];
                of<T_4>(...items: T_4[]): T_4[];
                readonly [Symbol.species]: ArrayConstructor;
            };
            default: () => never[];
        };
        itemKey: {
            type: (StringConstructor | NumberConstructor)[];
            required: true;
        };
        minSize: {
            type: NumberConstructor;
            default: number;
            required: true;
        };
        itemGap: {
            type: NumberConstructor;
            default: number;
        };
        renderControl: {
            type: FunctionConstructor;
            default: undefined;
        };
        fixed: {
            type: BooleanConstructor;
            default: boolean;
        };
        buffer: {
            type: NumberConstructor;
            default: number;
        };
        bufferTop: {
            type: NumberConstructor;
            default: number;
        };
        bufferBottom: {
            type: NumberConstructor;
            default: number;
        };
        scrollDistance: {
            type: NumberConstructor;
            default: number;
        };
        horizontal: {
            type: BooleanConstructor;
            default: boolean;
        };
        start: {
            type: NumberConstructor;
            default: number;
        };
        offset: {
            type: NumberConstructor;
            default: number;
        };
        listStyle: {
            type: StringConstructor;
            default: string;
        };
        listClass: {
            type: StringConstructor;
            default: string;
        };
        itemStyle: {
            type: StringConstructor;
            default: string;
        };
        itemClass: {
            type: StringConstructor;
            default: string;
        };
        headerClass: {
            type: StringConstructor;
            default: string;
        };
        headerStyle: {
            type: StringConstructor;
            default: string;
        };
        footerClass: {
            type: StringConstructor;
            default: string;
        };
        footerStyle: {
            type: StringConstructor;
            default: string;
        };
        stickyHeaderClass: {
            type: StringConstructor;
            default: string;
        };
        stickyHeaderStyle: {
            type: StringConstructor;
            default: string;
        };
        stickyFooterClass: {
            type: StringConstructor;
            default: string;
        };
        stickyFooterStyle: {
            type: StringConstructor;
            default: string;
        };
    }>>, {
        fixed: boolean;
        list: any[];
        minSize: number;
        scrollDistance: number;
        headerClass: string;
        headerStyle: string;
        footerClass: string;
        footerStyle: string;
        stickyHeaderClass: string;
        stickyHeaderStyle: string;
        stickyFooterClass: string;
        stickyFooterStyle: string;
        itemGap: number;
        renderControl: Function;
        buffer: number;
        bufferTop: number;
        bufferBottom: number;
        horizontal: boolean;
        start: number;
        offset: number;
        listStyle: string;
        listClass: string;
        itemStyle: string;
        itemClass: string;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<ExtractPropTypes<{
        list: {
            type: {
                (arrayLength: number): any[];
                (...items: any[]): any[];
                new (arrayLength: number): any[];
                new (...items: any[]): any[];
                isArray(arg: any): arg is any[];
                readonly prototype: any[];
                from<T>(arrayLike: ArrayLike<T>): T[];
                from<T_1, U>(arrayLike: ArrayLike<T_1>, mapfn: (v: T_1, k: number) => U, thisArg?: any): U[];
                from<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>): T_2[];
                from<T_3, U_1>(iterable: Iterable<T_3> | ArrayLike<T_3>, mapfn: (v: T_3, k: number) => U_1, thisArg?: any): U_1[];
                of<T_4>(...items: T_4[]): T_4[];
                readonly [Symbol.species]: ArrayConstructor;
            };
            default: () => never[];
        };
        itemKey: {
            type: (StringConstructor | NumberConstructor)[];
            required: true;
        };
        minSize: {
            type: NumberConstructor;
            default: number;
            required: true;
        };
        itemGap: {
            type: NumberConstructor;
            default: number;
        };
        renderControl: {
            type: FunctionConstructor;
            default: undefined;
        };
        fixed: {
            type: BooleanConstructor;
            default: boolean;
        };
        buffer: {
            type: NumberConstructor;
            default: number;
        };
        bufferTop: {
            type: NumberConstructor;
            default: number;
        };
        bufferBottom: {
            type: NumberConstructor;
            default: number;
        };
        scrollDistance: {
            type: NumberConstructor;
            default: number;
        };
        horizontal: {
            type: BooleanConstructor;
            default: boolean;
        };
        start: {
            type: NumberConstructor;
            default: number;
        };
        offset: {
            type: NumberConstructor;
            default: number;
        };
        listStyle: {
            type: StringConstructor;
            default: string;
        };
        listClass: {
            type: StringConstructor;
            default: string;
        };
        itemStyle: {
            type: StringConstructor;
            default: string;
        };
        itemClass: {
            type: StringConstructor;
            default: string;
        };
        headerClass: {
            type: StringConstructor;
            default: string;
        };
        headerStyle: {
            type: StringConstructor;
            default: string;
        };
        footerClass: {
            type: StringConstructor;
            default: string;
        };
        footerStyle: {
            type: StringConstructor;
            default: string;
        };
        stickyHeaderClass: {
            type: StringConstructor;
            default: string;
        };
        stickyHeaderStyle: {
            type: StringConstructor;
            default: string;
        };
        stickyFooterClass: {
            type: StringConstructor;
            default: string;
        };
        stickyFooterStyle: {
            type: StringConstructor;
            default: string;
        };
    }>>, import("../..").VirtListReturn<any>, {}, {}, {}, {
        fixed: boolean;
        list: any[];
        minSize: number;
        scrollDistance: number;
        headerClass: string;
        headerStyle: string;
        footerClass: string;
        footerStyle: string;
        stickyHeaderClass: string;
        stickyHeaderStyle: string;
        stickyFooterClass: string;
        stickyFooterStyle: string;
        itemGap: number;
        renderControl: Function;
        buffer: number;
        bufferTop: number;
        bufferBottom: number;
        horizontal: boolean;
        start: number;
        offset: number;
        listStyle: string;
        listClass: string;
        itemStyle: string;
        itemClass: string;
    }> | null>;
    treeInfo: import("vue-demi").ShallowReactive<TreeInfo>;
    dragging: import("vue-demi").Ref<boolean>;
    renderList: import("vue-demi").ComputedRef<TreeNode<TreeNodeData>[]>;
    onScroll: (e: Event) => void;
    filter: (query: string) => void;
    isForceHiddenExpandIcon: (node: TreeNode<TreeNodeData>) => boolean;
    setTreeData: (list: TreeData) => void;
    getTreeNode: (key: TreeNodeKey) => TreeNode<TreeNodeData> | undefined;
    scrollToBottom: () => void;
    scrollToTarget: (key: TreeNodeKey, isTop?: boolean) => void;
    scrollToTop: () => void;
    scrollTo: (scroll: IScrollParams) => void;
    forceUpdate: () => void;
    hasExpanded: (node: TreeNode<TreeNodeData>) => boolean;
    toggleExpand: (node: TreeNode<TreeNodeData>) => void;
    expandAll: (expanded: boolean) => void;
    expandNode: (key: TreeNodeKey | TreeNodeKey[], expanded: boolean) => void;
    hasSelected: (node: TreeNode<TreeNodeData>) => boolean;
    selectNode: (key: TreeNodeKey | TreeNodeKey[], selected: boolean) => void;
    selectAll: (selected: boolean) => void;
    hasChecked: (node: TreeNode<TreeNodeData>) => boolean;
    hasIndeterminate: (node: TreeNode<TreeNodeData>) => boolean;
    checkAll: (checked: boolean) => void;
    checkNode: (key: TreeNodeKey | TreeNodeKey[], checked: boolean) => void;
    hasFocused: (node: TreeNode<TreeNodeData>) => boolean;
    onDragstart: (event: MouseEvent) => void;
    onClickExpandIcon: (node: TreeNode) => void;
    onClickNodeContent: (node: TreeNode) => void;
    onClickCheckbox: (node: TreeNode, e: Event) => void;
};
