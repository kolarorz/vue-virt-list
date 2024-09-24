import { defineComponent, type SetupContext, watch } from 'vue-demi';
import {
  useTree,
  customFieldNames,
  TreeEmits,
  type TreeProps,
} from './useTree';
import VirtTreeNode from './VirtTreeNode';
import { VirtList } from '../../VirtList';
import { _h, _h2Slot, getSlot } from '../../util';
import type { TreeNode, TreeNodeData } from './type';

export const VirtTree = defineComponent({
  name: 'VirtTree',
  props: customFieldNames,
  setup(props: TreeProps, context: SetupContext) {
    const emits = context.emit as SetupContext<typeof TreeEmits>['emit'];
    return useTree(props, emits);
  },
  render() {
    const {
      dragging,
      renderList,

      onScroll,
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
      draggable,
    } = this.$props as TreeProps;

    const renderTreeNode = ({
      itemData,
    }: {
      itemData: TreeNode;
      index: number;
    }) => {
      return _h2Slot(
        VirtTreeNode,
        {
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
            draggable: draggable,
          },
          on: {
            clickExpandIcon: onClickExpandIcon,
            clickNodeContent: onClickNodeContent,
            clickCheckbox: onClickCheckbox,
            dragstart: onDragstart,
          },
        },
        {
          default: getSlot(this, 'default')
            ? (node: TreeNode) => getSlot(this, 'default')?.({ node })
            : null,
          content: getSlot(this, 'content')
            ? (node: TreeNode) => getSlot(this, 'content')?.({ node })
            : null,
          icon: getSlot(this, 'icon')
            ? (node: TreeNode) => getSlot(this, 'icon')?.({ node })
            : null,
        },
      );
    };

    return _h2Slot(
      VirtList,
      {
        ref: 'virtListRef',
        attrs: {
          list: renderList,
          minSize,
          fixed,
          itemKey: 'key',
          itemGap,
          buffer,
          ...this.$attrs,
          itemClass: 'virt-tree-item',
        },
        class: {
          'is-dragging': dragging,
        },
        on: {
          scroll: onScroll,
        },
      },
      {
        default: renderTreeNode,
        stickyHeader: getSlot(this, 'stickyHeader'),
        stickyFooter: getSlot(this, 'stickyFooter'),
        header: getSlot(this, 'header'),
        footer: getSlot(this, 'footer'),
        empty: getSlot(this, 'empty'),
      },
    );
  },
});
