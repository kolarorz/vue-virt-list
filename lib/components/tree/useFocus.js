import "vue-demi";
import { shallowRef, watch, triggerRef } from "vue";
const useFocus = ({ props }) => {
  const focusedKeysSet = shallowRef(
    new Set(props.focusedKeys)
  );
  const hasFocused = (node) => focusedKeysSet.value.has(node.key);
  watch(
    () => props.focusedKeys,
    (keys) => {
      focusedKeysSet.value = new Set(keys);
      triggerRef(focusedKeysSet);
    }
  );
  return {
    hasFocused
  };
};
export {
  useFocus
};
