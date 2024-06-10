/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  isVue2,
  h,
  type Component,
  type ComponentPropsOptions,
  type ExtractPropTypes,
  type ComputedOptions,
  type MethodOptions,
  type VNode,
} from 'vue-demi';
import type { RawChildren, RawSlots } from './type';

type Data = Record<string, unknown>;
type Props = Record<string, any> & {
  attrs?: Record<string, any>;
};

function vue2h<P>(
  ele:
    | Component<
        Readonly<
          P extends ComponentPropsOptions<Data> ? ExtractPropTypes<P> : P
        >,
        any,
        any,
        ComputedOptions,
        MethodOptions,
        {},
        any
      >
    | string,
  props: Props,
  children?: RawChildren | RawSlots,
) {
  const { attrs, ...rest } = props;
  return h(ele, { attrs, ...rest } as any, children);
}

function vue3h<P>(
  ele:
    | Component<
        Readonly<
          P extends ComponentPropsOptions<Data> ? ExtractPropTypes<P> : P
        >,
        any,
        any,
        ComputedOptions,
        MethodOptions,
        {},
        any
      >
    | string,
  props: Props,
  children?: RawChildren | RawSlots,
) {
  const { attrs, ...rest } = props;
  return h(ele, { ...attrs, ...rest } as any, children);
}

export const _h = isVue2 ? vue2h : vue3h;

function vue2hChild<P>(
  ele:
    | Component<
        Readonly<
          P extends ComponentPropsOptions<Data> ? ExtractPropTypes<P> : P
        >,
        any,
        any,
        ComputedOptions,
        MethodOptions,
        {},
        any
      >
    | string,
  props: Props,
  child?: VNode,
) {
  const { attrs, ...rest } = props;
  return h(ele, { attrs, ...rest } as any, [child]);
}

function vue3hChild<P>(
  ele:
    | Component<
        Readonly<
          P extends ComponentPropsOptions<Data> ? ExtractPropTypes<P> : P
        >,
        any,
        any,
        ComputedOptions,
        MethodOptions,
        {},
        any
      >
    | string,
  props: Props,
  child?: VNode,
) {
  const { attrs, ...rest } = props;
  // vue3 为了性能，推荐使用functional
  return h(ele, { ...attrs, ...rest } as any, {
    default: () => child,
  });
}

export const _hChild = isVue2 ? vue2hChild : vue3hChild;

function vue2h2Slot<P>(
  ele:
    | Component<
        Readonly<
          P extends ComponentPropsOptions<Data> ? ExtractPropTypes<P> : P
        >,
        any,
        any,
        ComputedOptions,
        MethodOptions,
        {},
        any
      >
    | string,
  props: Props,
  slots?: any,
) {
  const { attrs, ...rest } = props;
  return h(ele, { attrs, ...rest, scopedSlots: slots } as any);
}

// vue3 渲染slot时推荐使用functional
function vue3h2Slot<P>(
  ele:
    | Component<
        Readonly<
          P extends ComponentPropsOptions<Data> ? ExtractPropTypes<P> : P
        >,
        any,
        any,
        ComputedOptions,
        MethodOptions,
        {},
        any
      >
    | string,
  props: Props,
  slots?: any,
) {
  const { attrs, ...rest } = props;
  return h(ele, { ...attrs, ...rest } as any, slots);
}

// 渲染传递插槽
export const _h2Slot = isVue2 ? vue2h2Slot : vue3h2Slot;

function vue2getSlot(_ctx: any, name: string) {
  return _ctx.$scopedSlots?.[name];
}

function vue3getSlot(_ctx: any, name: string) {
  return _ctx.$slots?.[name];
}

export const getSlot = isVue2 ? vue2getSlot : vue3getSlot;
