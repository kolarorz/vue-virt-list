import { type Component, type ComponentPropsOptions, type ExtractPropTypes, type ComputedOptions, type MethodOptions, type VNode, type VNodeArrayChildren } from 'vue-demi';
export type RawChildren = string | number | boolean | VNode | VNodeArrayChildren | (() => any);
export type RawSlots = {
    [name: string]: unknown;
    $stable?: boolean;
};
type Data = Record<string, unknown>;
type Props = Record<string, any> & {
    attrs?: Record<string, any>;
};
declare function vue2h<P>(ele: Component<Readonly<P extends ComponentPropsOptions<Data> ? ExtractPropTypes<P> : P>, any, any, ComputedOptions, MethodOptions, {}, any> | string, props: Props, children?: RawChildren | RawSlots): VNode<import("vue-demi").RendererNode, import("vue-demi").RendererElement, {
    [key: string]: any;
}>;
export declare const _h: typeof vue2h;
declare function vue2hChild<P>(ele: Component<Readonly<P extends ComponentPropsOptions<Data> ? ExtractPropTypes<P> : P>, any, any, ComputedOptions, MethodOptions, {}, any> | string, props: Props, child?: VNode): VNode<import("vue-demi").RendererNode, import("vue-demi").RendererElement, {
    [key: string]: any;
}>;
export declare const _hChild: typeof vue2hChild;
declare function vue2h2Slot<P>(ele: Component<Readonly<P extends ComponentPropsOptions<Data> ? ExtractPropTypes<P> : P>, any, any, ComputedOptions, MethodOptions, {}, any> | string, props: Props, slots?: any): VNode<import("vue-demi").RendererNode, import("vue-demi").RendererElement, {
    [key: string]: any;
}>;
export declare const _h2Slot: typeof vue2h2Slot;
declare function vue2getSlot(_ctx: any, name: string): any;
export declare const getSlot: typeof vue2getSlot;
export {};
