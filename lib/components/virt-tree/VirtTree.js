import { defineComponent } from "vue-demi";
import { TreeEmits, customFieldNames, useTree } from "./useTree.js";
import VirtTreeNode from "./VirtTreeNode.js";
import { VirtList } from "../virt-list/index.js";
import { _h2Slot, getSlot } from "../../utils/index.js";
const VirtTree = /* @__PURE__ */ defineComponent({
  name: "VirtTree",
  emits: TreeEmits,
  props: customFieldNames,
  setup(props, context) {
    const emits = context.emit;
    return useTree(props, emits);
  },
  render() {
    const {
      dragging,
      renderList,
      isForceHiddenExpandIcon,
      hasChecked,
      hasIndeterminate,
      onClickCheckbox,
      hasExpanded,
      onClickExpandIcon,
      hasSelected,
      hasFocused,
      onDragstart,
      onClickNodeContent,
      onScroll,
      onToTop,
      onToBottom,
      onItemResize,
      onRangeUpdate
    } = this;
    const {
      minSize,
      fixed,
      itemGap,
      buffer,
      checkable,
      selectable,
      indent,
      iconSize,
      showLine,
      draggable
    } = this.$props;
    const renderTreeNode = ({
      itemData
    }) => {
      return _h2Slot(VirtTreeNode, {
        attrs: {
          node: itemData,
          minSize,
          fixed,
          indent,
          iconSize,
          showLine,
          itemGap,
          // 动态判断当前节点是否需要隐藏展开图标
          hiddenExpandIcon: isForceHiddenExpandIcon(itemData),
          // expand
          isExpanded: hasExpanded(itemData),
          // select
          selectable,
          isSelected: hasSelected(itemData),
          disableSelect: itemData.disableSelect,
          // checkbox
          checkable,
          isChecked: hasChecked(itemData),
          isIndeterminate: hasIndeterminate(itemData),
          disableCheckbox: itemData.disableCheckbox,
          // focus
          isFocused: hasFocused(itemData),
          // drag
          draggable
        },
        on: {
          clickExpandIcon: onClickExpandIcon,
          clickNodeContent: onClickNodeContent,
          clickCheckbox: onClickCheckbox,
          dragstart: onDragstart
        }
      }, {
        default: getSlot(this, "default") ? (node) => {
          var _a;
          return (_a = getSlot(this, "default")) == null ? void 0 : _a({
            node
          });
        } : null,
        content: getSlot(this, "content") ? (node) => {
          var _a;
          return (_a = getSlot(this, "content")) == null ? void 0 : _a({
            node
          });
        } : null,
        icon: getSlot(this, "icon") ? (node) => {
          var _a;
          return (_a = getSlot(this, "icon")) == null ? void 0 : _a({
            node
          });
        } : null
      });
    };
    return _h2Slot(VirtList, {
      ref: "virtListRef",
      attrs: {
        list: renderList,
        minSize,
        fixed,
        itemKey: "key",
        itemGap,
        buffer,
        ...this.$attrs,
        // 暂时不支持外部传入class，后面要把该参数改成一个string|object|array
        itemClass: "virt-tree-item"
      },
      class: {
        "is-dragging": dragging
      },
      on: {
        scroll: onScroll,
        toTop: onToTop,
        toBottom: onToBottom,
        itemResize: onItemResize,
        rangeUpdate: onRangeUpdate
      }
    }, {
      default: renderTreeNode,
      stickyHeader: getSlot(this, "stickyHeader"),
      stickyFooter: getSlot(this, "stickyFooter"),
      header: getSlot(this, "header"),
      footer: getSlot(this, "footer"),
      empty: getSlot(this, "empty")
    });
  }
});
export {
  VirtTree
};
