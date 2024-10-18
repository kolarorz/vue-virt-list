import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue-demi';
import { _h, getSlot } from '../../utils';

export type ObserverItemProps = {
  resizeObserver: ResizeObserver;
};

const useObserverItem = (props: ObserverItemProps) => {
  const itemRefEl = ref(null);

  onMounted(() => {
    if (props.resizeObserver && itemRefEl.value) {
      props.resizeObserver.observe(itemRefEl.value);
    }
  });

  onBeforeUnmount(() => {
    if (props.resizeObserver && itemRefEl.value) {
      props.resizeObserver.unobserve(itemRefEl.value);
    }
  });

  return {
    itemRefEl,
  };
};
const ObserverItem = defineComponent({
  name: 'ObserverItem',
  props: {
    resizeObserver: {
      type: ResizeObserver,
      require: true,
    },
    id: {
      type: [String, Number],
      require: true,
    },
  },
  setup(props) {
    return useObserverItem(props as ObserverItemProps);
  },
  render() {
    const { id } = this;
    return _h(
      'div',
      {
        ref: 'itemRefEl',
        attrs: {
          'data-id': id,
        },
      },
      [getSlot(this, 'default')?.()],
    );
  },
});

export { ObserverItem, useObserverItem };
