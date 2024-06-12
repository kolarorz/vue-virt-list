import { defineComponent, type SetupContext } from 'vue-demi';
import { useTree, treeProps, type TreeProps, TreeEmits } from './useTree';
import TreeNode from './VirtTreeNode';
import { VirtList } from '../../VirtList';
import { _h, _h2Slot, getSlot } from '../../util';
import type { ITreeNode, TreeNodeData } from './type';

export default defineComponent({
  name: 'VitTree',
  props: treeProps,
  setup(props: TreeProps, context: SetupContext) {
    const emits = context.emit as SetupContext<typeof TreeEmits>['emit'];
    return useTree(props, emits);
  },
  render() {
    const {
      flattenList,
      onClickTreeNode,
      isExpanded,
      onScroll,
      isCurrent,
      isChecked,
      isIndeterminate,
      onCheckChange,
      toggleExpand,
    } = this;

    const { minSize, showCheckbox, indent } = this.$props as TreeProps;

    const renderTreeNode = ({
      itemData,
    }: {
      itemData: ITreeNode;
      index: number;
    }) => {
      return _h2Slot(
        TreeNode,
        {
          node: itemData,
          indent,
          showCheckbox,
          expanded: isExpanded(itemData),
          current: isCurrent(itemData),
          checked: isChecked(itemData),
          indeterminate: isIndeterminate(itemData),
          onClick: onClickTreeNode,
          onCheck: onCheckChange,
          onToggle: (node: ITreeNode) => toggleExpand(node),
        },
        {
          default: getSlot(this, 'default')
            ? (node: ITreeNode, data: TreeNodeData, expand: boolean) =>
                getSlot(
                  this,
                  'default',
                )?.({
                  node,
                  data,
                  expand,
                })
            : null,
          content: getSlot(this, 'content')
            ? (node: ITreeNode) => getSlot(this, 'content')?.({ node })
            : null,
          icon: getSlot(this, 'icon')
            ? (node: ITreeNode, expanded: boolean) =>
                getSlot(this, 'icon')?.({ node, expanded })
            : null,
        },
      );
    };

    const renderTree = () => {
      return _h2Slot(
        VirtList,
        {
          ref: 'virListRef',
          attrs: {
            list: flattenList,
            minSize: minSize,
            itemKey: 'key',
            onScroll: onScroll,
            ...this.$attrs,
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
    };

    return _h(
      'div',
      {
        style: {
          height: '100%',
          width: '100%',
          overflow: 'hidden',
        },
      },
      [renderTree()],
    );
  },
});
