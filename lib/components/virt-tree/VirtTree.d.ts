import type { TreeNode } from './type';
export declare const VirtTree: import("vue-demi").DefineComponent<{
    fixed: boolean;
    buffer: number;
    listClass: string;
    itemClass: string | Record<string, any> | unknown[];
    list: import("./type").TreeData;
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
    dragoverPlacement: number[];
    crossLevelDraggable: boolean;
    customGroup: string;
    itemPreSize?: number | undefined;
    minSize?: number | undefined;
    filterMethod?: ((query: string, node: TreeNode<import("./type").TreeNodeData>) => boolean) | undefined;
    expandedKeys?: import("./type").TreeNodeKey[] | undefined;
    selectedKeys?: import("./type").TreeNodeKey[] | undefined;
    checkedKeys?: import("./type").TreeNodeKey[] | undefined;
}, {
    virtListRef: import("vue-demi").Ref<import("vue-demi").DefineComponent<import("vue-demi").ExtractPropTypes<{
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
        itemPreSize: {
            type: NumberConstructor;
        };
        minSize: {
            type: NumberConstructor;
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
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        listClass: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        itemStyle: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor | FunctionConstructor)[];
            default: string;
        };
        itemClass: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor | FunctionConstructor)[];
            default: string;
        };
        headerClass: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        headerStyle: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        footerClass: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        footerStyle: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        stickyHeaderClass: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        stickyHeaderStyle: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        stickyFooterClass: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        stickyFooterStyle: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
    }>, import("../..").VirtListReturn<any>, {}, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, {}, string, import("vue-demi").PublicProps, Readonly<import("vue-demi").ExtractPropTypes<{
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
        itemPreSize: {
            type: NumberConstructor;
        };
        minSize: {
            type: NumberConstructor;
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
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        listClass: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        itemStyle: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor | FunctionConstructor)[];
            default: string;
        };
        itemClass: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor | FunctionConstructor)[];
            default: string;
        };
        headerClass: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        headerStyle: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        footerClass: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        footerStyle: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        stickyHeaderClass: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        stickyHeaderStyle: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        stickyFooterClass: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        stickyFooterStyle: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
    }>> & Readonly<{}>, {
        fixed: boolean;
        renderControl: Function;
        buffer: number;
        bufferTop: number;
        bufferBottom: number;
        horizontal: boolean;
        start: number;
        offset: number;
        listStyle: string | Record<string, any> | unknown[];
        listClass: string | Record<string, any> | unknown[];
        itemStyle: string | Function | Record<string, any> | unknown[];
        itemClass: string | Function | Record<string, any> | unknown[];
        list: any[];
        itemGap: number;
        scrollDistance: number;
        headerClass: string | Record<string, any> | unknown[];
        headerStyle: string | Record<string, any> | unknown[];
        footerClass: string | Record<string, any> | unknown[];
        footerStyle: string | Record<string, any> | unknown[];
        stickyHeaderClass: string | Record<string, any> | unknown[];
        stickyHeaderStyle: string | Record<string, any> | unknown[];
        stickyFooterClass: string | Record<string, any> | unknown[];
        stickyFooterStyle: string | Record<string, any> | unknown[];
    }, {}, {}, {}, string, import("vue-demi").ComponentProvideOptions, true, {}, any> | null, import("vue-demi").DefineComponent<import("vue-demi").ExtractPropTypes<{
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
        itemPreSize: {
            type: NumberConstructor;
        };
        minSize: {
            type: NumberConstructor;
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
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        listClass: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        itemStyle: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor | FunctionConstructor)[];
            default: string;
        };
        itemClass: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor | FunctionConstructor)[];
            default: string;
        };
        headerClass: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        headerStyle: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        footerClass: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        footerStyle: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        stickyHeaderClass: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        stickyHeaderStyle: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        stickyFooterClass: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        stickyFooterStyle: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
    }>, import("../..").VirtListReturn<any>, {}, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, {}, string, import("vue-demi").PublicProps, Readonly<import("vue-demi").ExtractPropTypes<{
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
        itemPreSize: {
            type: NumberConstructor;
        };
        minSize: {
            type: NumberConstructor;
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
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        listClass: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        itemStyle: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor | FunctionConstructor)[];
            default: string;
        };
        itemClass: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor | FunctionConstructor)[];
            default: string;
        };
        headerClass: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        headerStyle: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        footerClass: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        footerStyle: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        stickyHeaderClass: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        stickyHeaderStyle: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        stickyFooterClass: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
        stickyFooterStyle: {
            type: (ObjectConstructor | ArrayConstructor | StringConstructor)[];
            default: string;
        };
    }>> & Readonly<{}>, {
        fixed: boolean;
        renderControl: Function;
        buffer: number;
        bufferTop: number;
        bufferBottom: number;
        horizontal: boolean;
        start: number;
        offset: number;
        listStyle: string | Record<string, any> | unknown[];
        listClass: string | Record<string, any> | unknown[];
        itemStyle: string | Function | Record<string, any> | unknown[];
        itemClass: string | Function | Record<string, any> | unknown[];
        list: any[];
        itemGap: number;
        scrollDistance: number;
        headerClass: string | Record<string, any> | unknown[];
        headerStyle: string | Record<string, any> | unknown[];
        footerClass: string | Record<string, any> | unknown[];
        footerStyle: string | Record<string, any> | unknown[];
        stickyHeaderClass: string | Record<string, any> | unknown[];
        stickyHeaderStyle: string | Record<string, any> | unknown[];
        stickyFooterClass: string | Record<string, any> | unknown[];
        stickyFooterStyle: string | Record<string, any> | unknown[];
    }, {}, {}, {}, string, import("vue-demi").ComponentProvideOptions, true, {}, any> | null>;
    treeInfo: import("vue-demi").ShallowReactive<import("./type").TreeInfo>;
    dragging: import("vue-demi").Ref<boolean, boolean>;
    renderList: import("vue-demi").ComputedRef<TreeNode<import("./type").TreeNodeData>[]>;
    filter: (query: string) => void;
    isForceHiddenExpandIcon: (node: TreeNode<import("./type").TreeNodeData>) => boolean;
    setTreeData: (list: import("./type").TreeData) => void;
    getTreeNode: (key: import("./type").TreeNodeKey) => TreeNode<import("./type").TreeNodeData> | undefined;
    scrollToBottom: () => void;
    scrollToTarget: (key: import("./type").TreeNodeKey, isTop?: boolean) => void;
    scrollToTop: () => void;
    scrollTo: (scroll: import("./type").IScrollParams) => void;
    forceUpdate: () => void;
    hasExpanded: (node: TreeNode<import("./type").TreeNodeData>) => boolean;
    toggleExpand: (node: TreeNode<import("./type").TreeNodeData>) => void;
    expandAll: (expanded: boolean) => void;
    expandNode: (key: import("./type").TreeNodeKey | import("./type").TreeNodeKey[], expanded: boolean, foldAllNodes?: boolean | undefined) => void;
    hasSelected: (node: TreeNode<import("./type").TreeNodeData>) => boolean;
    selectNode: (key: import("./type").TreeNodeKey | import("./type").TreeNodeKey[], selected: boolean) => void;
    selectAll: (selected: boolean) => void;
    hasChecked: (node: TreeNode<import("./type").TreeNodeData>) => boolean;
    hasIndeterminate: (node: TreeNode<import("./type").TreeNodeData>) => boolean;
    checkAll: (checked: boolean) => void;
    checkNode: (key: import("./type").TreeNodeKey | import("./type").TreeNodeKey[], checked: boolean) => void;
    hasFocused: (node: TreeNode<import("./type").TreeNodeData>) => boolean;
    onDragstart: (event: MouseEvent) => void;
    onClickExpandIcon: (node: TreeNode<import("./type").TreeNodeData>) => void;
    onClickNodeContent: (node: TreeNode<import("./type").TreeNodeData>) => void;
    onClickCheckbox: (node: TreeNode<import("./type").TreeNodeData>, e: Event) => void;
    onScroll: (e: Event) => void;
    onToTop: (firstItem: any) => void;
    onToBottom: (lastItem: any) => void;
    onItemResize: (id: string, newSize: number) => void;
    onRangeUpdate: (inViewBegin: number, inViewEnd: number) => void;
}, {}, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, {}, string, import("vue-demi").PublicProps, Readonly<{
    fixed: boolean;
    buffer: number;
    listClass: string;
    itemClass: string | Record<string, any> | unknown[];
    list: import("./type").TreeData;
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
    dragoverPlacement: number[];
    crossLevelDraggable: boolean;
    customGroup: string;
    itemPreSize?: number | undefined;
    minSize?: number | undefined;
    filterMethod?: ((query: string, node: TreeNode<import("./type").TreeNodeData>) => boolean) | undefined;
    expandedKeys?: import("./type").TreeNodeKey[] | undefined;
    selectedKeys?: import("./type").TreeNodeKey[] | undefined;
    checkedKeys?: import("./type").TreeNodeKey[] | undefined;
}> & Readonly<{}>, {
    fixed: boolean;
    buffer: number;
    listClass: string;
    itemClass: string | Record<string, any> | unknown[];
    list: import("./type").TreeData;
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
    dragoverPlacement: number[];
    crossLevelDraggable: boolean;
    customGroup: string;
}, {}, {}, {}, string, import("vue-demi").ComponentProvideOptions, true, {}, any>;
