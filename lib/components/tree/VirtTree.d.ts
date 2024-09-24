import type { TreeNode, TreeNodeData } from './type';
export declare const VirtTree: import("vue-demi").DefineComponent<{
    list: {
        type: import("vue-demi").PropType<import("./type").TreeData>;
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
    showLine: {
        type: BooleanConstructor;
        default: boolean;
    };
    fieldNames: {
        type: import("vue-demi").PropType<import("./type").TreeFieldNames>;
        default: () => {};
    };
    filterMethod: {
        type: import("vue-demi").PropType<(query: string, node: TreeNodeData) => boolean>;
    };
    defaultExpandAll: {
        type: BooleanConstructor;
        default: boolean;
    };
    expandedKeys: {
        type: import("vue-demi").PropType<import("./type").TreeNodeKey[]>;
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
        type: import("vue-demi").PropType<import("./type").TreeNodeKey[]>;
    };
    checkable: {
        type: BooleanConstructor;
        default: boolean;
    };
    checkedKeys: {
        type: import("vue-demi").PropType<import("./type").TreeNodeKey[]>;
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
        type: import("vue-demi").PropType<import("./type").TreeNodeKey[]>;
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
    beforeDrag: {
        type: import("vue-demi").PropType<(data: {
            placement: "top" | "bottom" | "center";
            node: TreeNode<TreeNodeData>;
            prevNode: TreeNode<TreeNodeData>;
            parentNode: TreeNode<TreeNodeData>;
        }) => boolean>;
        default: () => boolean;
    };
}, {
    virtListRef: import("vue-demi").Ref<import("vue-demi").CreateComponentPublicInstance<Readonly<import("vue-demi").ExtractPropTypes<{
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
    }>>, import("../..").VirtListReturn<any>, unknown, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, import("vue-demi").EmitsOptions, import("vue-demi").VNodeProps & import("vue-demi").AllowedComponentProps & import("vue-demi").ComponentCustomProps & Readonly<import("vue-demi").ExtractPropTypes<{
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
        list: any[];
        minSize: number;
        itemGap: number;
        scrollDistance: number;
        headerClass: string;
        headerStyle: string;
        footerClass: string;
        footerStyle: string;
        stickyHeaderClass: string;
        stickyHeaderStyle: string;
        stickyFooterClass: string;
        stickyFooterStyle: string;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue-demi").ExtractPropTypes<{
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
        list: any[];
        minSize: number;
        itemGap: number;
        scrollDistance: number;
        headerClass: string;
        headerStyle: string;
        footerClass: string;
        footerStyle: string;
        stickyHeaderClass: string;
        stickyHeaderStyle: string;
        stickyFooterClass: string;
        stickyFooterStyle: string;
    }> | null>;
    treeInfo: import("vue-demi").ShallowReactive<import("./type").TreeInfo>;
    dragging: import("vue-demi").Ref<boolean>;
    renderList: import("vue-demi").ComputedRef<TreeNode<TreeNodeData>[]>;
    onScroll: (e: Event) => void;
    filter: (query: string) => void;
    isForceHiddenExpandIcon: (node: TreeNode<TreeNodeData>) => boolean;
    setTreeData: (list: import("./type").TreeData) => void;
    getTreeNode: (key: import("./type").TreeNodeKey) => TreeNode<TreeNodeData> | undefined;
    scrollToBottom: () => void;
    scrollToTarget: (key: import("./type").TreeNodeKey, isTop?: boolean) => void;
    scrollToTop: () => void;
    scrollTo: (scroll: import("./type").IScrollParams) => void;
    forceUpdate: () => void;
    hasExpanded: (node: TreeNode<TreeNodeData>) => boolean;
    toggleExpand: (node: TreeNode<TreeNodeData>) => void;
    expandAll: (expanded: boolean) => void;
    expandNode: (key: import("./type").TreeNodeKey | import("./type").TreeNodeKey[], expanded: boolean) => void;
    hasSelected: (node: TreeNode<TreeNodeData>) => boolean;
    selectNode: (key: import("./type").TreeNodeKey | import("./type").TreeNodeKey[], selected: boolean) => void;
    selectAll: (selected: boolean) => void;
    hasChecked: (node: TreeNode<TreeNodeData>) => boolean;
    hasIndeterminate: (node: TreeNode<TreeNodeData>) => boolean;
    checkAll: (checked: boolean) => void;
    checkNode: (key: import("./type").TreeNodeKey | import("./type").TreeNodeKey[], checked: boolean) => void;
    hasFocused: (node: TreeNode<TreeNodeData>) => boolean;
    onDragstart: (event: MouseEvent) => void;
    onClickExpandIcon: (node: TreeNode<TreeNodeData>) => void;
    onClickNodeContent: (node: TreeNode<TreeNodeData>) => void;
    onClickCheckbox: (node: TreeNode<TreeNodeData>, e: Event) => void;
}, unknown, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, import("vue-demi").EmitsOptions, string, import("vue-demi").PublicProps, Readonly<import("vue-demi").ExtractPropTypes<{
    list: {
        type: import("vue-demi").PropType<import("./type").TreeData>;
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
    showLine: {
        type: BooleanConstructor;
        default: boolean;
    };
    fieldNames: {
        type: import("vue-demi").PropType<import("./type").TreeFieldNames>;
        default: () => {};
    };
    filterMethod: {
        type: import("vue-demi").PropType<(query: string, node: TreeNodeData) => boolean>;
    };
    defaultExpandAll: {
        type: BooleanConstructor;
        default: boolean;
    };
    expandedKeys: {
        type: import("vue-demi").PropType<import("./type").TreeNodeKey[]>;
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
        type: import("vue-demi").PropType<import("./type").TreeNodeKey[]>;
    };
    checkable: {
        type: BooleanConstructor;
        default: boolean;
    };
    checkedKeys: {
        type: import("vue-demi").PropType<import("./type").TreeNodeKey[]>;
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
        type: import("vue-demi").PropType<import("./type").TreeNodeKey[]>;
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
    beforeDrag: {
        type: import("vue-demi").PropType<(data: {
            placement: "top" | "bottom" | "center";
            node: TreeNode<TreeNodeData>;
            prevNode: TreeNode<TreeNodeData>;
            parentNode: TreeNode<TreeNodeData>;
        }) => boolean>;
        default: () => boolean;
    };
}>>, {
    fixed: boolean;
    list: import("./type").TreeData;
    minSize: number;
    itemGap: number;
    indent: number;
    iconSize: number;
    showLine: boolean;
    fieldNames: import("./type").TreeFieldNames;
    defaultExpandAll: boolean;
    expandOnClickNode: boolean;
    selectable: boolean;
    selectMultiple: boolean;
    checkable: boolean;
    checkedStrictly: boolean;
    checkOnClickNode: boolean;
    focusedKeys: import("./type").TreeNodeKey[];
    draggable: boolean;
    dragClass: string;
    dragGhostClass: string;
    beforeDrag: (data: {
        placement: "top" | "bottom" | "center";
        node: TreeNode<TreeNodeData>;
        prevNode: TreeNode<TreeNodeData>;
        parentNode: TreeNode<TreeNodeData>;
    }) => boolean;
}, {}>;
