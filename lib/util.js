import { isVue2, h } from "vue-demi";
function vue2h(ele, props, children) {
  const { attrs, ...rest } = props;
  return h(ele, { attrs, ...rest }, children);
}
function vue3h(ele, props, children) {
  const { attrs, ...rest } = props;
  return h(ele, { ...attrs, ...rest }, children);
}
const _h = isVue2 ? vue2h : vue3h;
function vue2hChild(ele, props, child) {
  const { attrs, ...rest } = props;
  return h(ele, { attrs, ...rest }, [child]);
}
function vue3hChild(ele, props, child) {
  const { attrs, ...rest } = props;
  return h(ele, { ...attrs, ...rest }, {
    default: () => child
  });
}
const _hChild = isVue2 ? vue2hChild : vue3hChild;
function vue2h2Slot(ele, props, slots) {
  const { attrs, ...rest } = props;
  return h(ele, { attrs, ...rest, scopedSlots: slots });
}
function vue3h2Slot(ele, props, slots) {
  const { attrs, ...rest } = props;
  return h(ele, { ...attrs, ...rest }, slots);
}
const _h2Slot = isVue2 ? vue2h2Slot : vue3h2Slot;
function vue2getSlot(_ctx, name) {
  var _a;
  return (_a = _ctx.$scopedSlots) == null ? void 0 : _a[name];
}
function vue3getSlot(_ctx, name) {
  var _a;
  return (_a = _ctx.$slots) == null ? void 0 : _a[name];
}
const getSlot = isVue2 ? vue2getSlot : vue3getSlot;
export {
  _h,
  _h2Slot,
  _hChild,
  getSlot
};
