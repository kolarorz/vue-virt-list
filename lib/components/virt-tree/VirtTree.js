import { defineComponent } from "vue-demi";
import { TreeEmits, customFieldNames, useTree } from "./useTree.js";
import VirtTreeNode from "./VirtTreeNode.js";
import { VirtList } from "../virt-list/index.js";
import { _h2Slot, getSlot, mergeClasses } from "../../utils/index.js";
const VirtTree = /* @__PURE__ */ defineComponent({
  name: "VirtTree",
  emits: TreeEmits,
  props: customFieldNames,
  setup(props, context) {
    const emits = context.emit;
    return useTree(props, emits);
  },
  render() {
    var _a;
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
      itemPreSize,
      minSize,
      fixed,
      itemGap,
      buffer,
      checkable,
      selectable,
      indent,
      iconSize,
      showLine,
      draggable,
      itemClass,
      customGroup,
      listClass
    } = this.$props;
    const defaultSize = (_a = itemPreSize != null ? itemPreSize : minSize) != null ? _a : 32;
    const renderTreeNode = ({
      itemData
    }) => {
      return _h2Slot(VirtTreeNode, {
        attrs: {
          node: itemData,
          itemPreSize: defaultSize,
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
          var _a2;
          return (_a2 = getSlot(this, "default")) == null ? void 0 : _a2({
            node
          });
        } : null,
        content: getSlot(this, "content") ? (node) => {
          var _a2;
          return (_a2 = getSlot(this, "content")) == null ? void 0 : _a2({
            node
          });
        } : null,
        icon: getSlot(this, "icon") ? (node) => {
          var _a2;
          return (_a2 = getSlot(this, "icon")) == null ? void 0 : _a2({
            node
          });
        } : null
      });
    };
    return _h2Slot(VirtList, {
      ref: "virtListRef",
      attrs: {
        list: renderList,
        itemPreSize: defaultSize,
        fixed,
        itemKey: "key",
        itemGap,
        buffer,
        itemClass: mergeClasses("virt-tree-item", itemClass),
        ...this.$attrs,
        listClass: `${customGroup} ${listClass}`,
        listStyle: "position: relative"
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
