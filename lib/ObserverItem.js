import { ref, onMounted, onBeforeUnmount, defineComponent } from "vue-demi";
import { _h, getSlot } from "./util.js";
const useObserverItem = (props) => {
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
    itemRefEl
  };
};
const ObserverItem = /* @__PURE__ */ defineComponent({
  name: "ObserverItem",
  props: {
    resizeObserver: {
      type: ResizeObserver,
      require: true
    },
    id: {
      type: [String, Number],
      require: true
    }
  },
  setup(props) {
    return useObserverItem(props);
  },
  render() {
    var _a;
    const {
      id
    } = this;
    return _h("div", {
      ref: "itemRefEl",
      attrs: {
        "data-id": id
      }
    }, [(_a = getSlot(this, "default")) == null ? void 0 : _a()]);
  }
});
export {
  ObserverItem,
  useObserverItem
};
