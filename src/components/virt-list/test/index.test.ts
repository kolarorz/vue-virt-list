import { describe, it, expect, vi } from 'vitest';
import { VirtList } from '../index';
import { mount } from '@vue/test-utils';
import { h } from 'vue';

const list = new Array(10).fill(0).map((_, index) => ({ id: index }));

describe('virt-list', () => {
  it('should be defined', () => {
    expect(VirtList).toBeDefined();
  });

  it('should render', async () => {
    const wrapper = mount(VirtList, {
      props: {
        list,
        itemKey: 'id',
        minSize: 20,
      },
      slots: {
        default: ({ itemData, index }) => {
          return h('div', { class: 'item' }, `Item ${index}: ${itemData.id}`);
        },
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe('props itemClass', () => {
  it('itemClass is function and return string', async () => {
    const wrapper = mount(VirtList, {
      props: {
        list,
        itemClass: (item: { id: number }, index: number) =>
          `item-${item.id}-${index}`,
        itemKey: 'id',
        minSize: 20,
      },
      slots: {
        default: ({ itemData, index }) => {
          return h('div', { class: 'item' }, `Item ${index}: ${itemData.id}`);
        },
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find('.item-0-0').exists()).toBe(true);
  });

  it('itemClass is function and return array', async () => {
    const wrapper = mount(VirtList, {
      props: {
        list,
        itemClass: (item: { id: number }, index: number) => ['foo', 'bar'],
        itemKey: 'id',
        minSize: 20,
      },
      slots: {
        default: ({ itemData, index }) => {
          return h('div', { class: 'item' }, `Item ${index}: ${itemData.id}`);
        },
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find('.foo').exists()).toBe(true);
    expect(wrapper.find('.bar').exists()).toBe(true);
  });

  it('itemClass is array', async () => {
    const wrapper = mount(VirtList, {
      props: {
        list,
        itemClass: ['foo', 'bar'],
        itemKey: 'id',
        minSize: 20,
      },
      slots: {
        default: ({ itemData, index }) => {
          return h('div', { class: 'item' }, `Item ${index}: ${itemData.id}`);
        },
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find('.foo.bar').exists()).toBe(true);
  });

  it('itemClass is object', async () => {
    const wrapper = mount(VirtList, {
      props: {
        list,
        itemClass: {
          foo: true,
          bar: false,
        },
        itemKey: 'id',
        minSize: 20,
      },
      slots: {
        default: ({ itemData, index }) => {
          return h('div', { class: 'item' }, `Item ${index}: ${itemData.id}`);
        },
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find('.foo').exists()).toBe(true);
    expect(wrapper.find('.bar').exists()).toBe(false);
  });
});
