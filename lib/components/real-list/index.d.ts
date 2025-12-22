import { type ShallowReactive } from 'vue-demi';
import type { SlotSize } from '../virt-list/type';
import type { RealListProps } from './type';
declare const RealList: import("vue-demi").DefineComponent<import("vue-demi").ExtractPropTypes<{
    itemKey: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
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
    itemPreSize: {
        type: NumberConstructor;
    };
    minSize: {
        type: NumberConstructor;
    };
    pageSize: {
        type: NumberConstructor;
        default: number;
    };
    scrollDistance: {
        type: NumberConstructor;
        default: number;
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
}>, {
    props: Required<RealListProps<any>>;
    resizeObserver: ResizeObserver | undefined;
    sizesMap: Map<any, any>;
    slotSize: ShallowReactive<SlotSize>;
    clientRefEl: import("vue-demi").Ref<HTMLElement | null, HTMLElement | null>;
    listRefEl: import("vue-demi").Ref<HTMLElement | null, HTMLElement | null>;
    headerRefEl: import("vue-demi").Ref<HTMLElement | null, HTMLElement | null>;
    footerRefEl: import("vue-demi").Ref<HTMLElement | null, HTMLElement | null>;
    stickyHeaderRefEl: import("vue-demi").Ref<HTMLElement | null, HTMLElement | null>;
    stickyFooterRefEl: import("vue-demi").Ref<HTMLElement | null, HTMLElement | null>;
    scrollIntoView: (index: number) => Promise<unknown>;
    scrollToIndex: (index: number) => Promise<unknown> | undefined;
    reset: () => void;
    getItemOffset: (itemKey: string) => any;
    getCurrentFirstItem: () => string;
    getOffsetByIndex: (index: number) => any;
    scrollToOffset: (offset: number) => void;
}, {}, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, {
    scroll: (e: Event) => Event;
    toTop: (firstItem: any) => any;
    toBottom: (lastItem: any) => any;
    itemResize: (id: string, newSize: number) => boolean;
    updateCurrent: (key: string | number) => boolean;
}, string, import("vue-demi").PublicProps, Readonly<import("vue-demi").ExtractPropTypes<{
    itemKey: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
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
    itemPreSize: {
        type: NumberConstructor;
    };
    minSize: {
        type: NumberConstructor;
    };
    pageSize: {
        type: NumberConstructor;
        default: number;
    };
    scrollDistance: {
        type: NumberConstructor;
        default: number;
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
}>> & Readonly<{
    onScroll?: ((e: Event) => any) | undefined;
    onToTop?: ((firstItem: any) => any) | undefined;
    onToBottom?: ((lastItem: any) => any) | undefined;
    onItemResize?: ((id: string, newSize: number) => any) | undefined;
    onUpdateCurrent?: ((key: string | number) => any) | undefined;
}>, {
    list: any[];
    itemKey: string | number;
    scrollDistance: number;
    headerClass: string | Record<string, any> | unknown[];
    headerStyle: string | Record<string, any> | unknown[];
    footerClass: string | Record<string, any> | unknown[];
    footerStyle: string | Record<string, any> | unknown[];
    stickyHeaderClass: string | Record<string, any> | unknown[];
    stickyHeaderStyle: string | Record<string, any> | unknown[];
    stickyFooterClass: string | Record<string, any> | unknown[];
    stickyFooterStyle: string | Record<string, any> | unknown[];
    pageSize: number;
}, {}, {}, {}, string, import("vue-demi").ComponentProvideOptions, true, {}, any>;
export { RealList };
