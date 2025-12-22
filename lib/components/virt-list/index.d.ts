import { type ShallowReactive } from 'vue-demi';
import type { EmitFunction, VirtListProps, VirtListReturn } from './type';
declare function useVirtList<T extends Record<string, any>>(userProps: ShallowReactive<VirtListProps<T>>, emitFunction?: EmitFunction<T>): VirtListReturn<T>;
declare const VirtList: import("vue-demi").DefineComponent<import("vue-demi").ExtractPropTypes<{
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
}>, VirtListReturn<any>, {}, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, {}, string, import("vue-demi").PublicProps, Readonly<import("vue-demi").ExtractPropTypes<{
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
}, {}, {}, {}, string, import("vue-demi").ComponentProvideOptions, true, {}, any>;
export { VirtList, useVirtList };
