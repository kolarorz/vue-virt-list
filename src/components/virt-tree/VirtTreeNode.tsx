import {
  defineComponent,
  type ExtractPropTypes,
  type PropType,
} from 'vue-demi';
import type { TreeNode } from './type';
import { _h, _h2Slot, getSlot } from '../../utils';

export const treeNodeProps = {
  node: {
    type: Object as PropType<TreeNode>,
    default: () => ({}),
    required: true,
  },
  minSize: {
    type: Number,
    default: 32,
  },
  // 是否为固定高
  fixed: {
    type: Boolean,
    default: false,
  },
  showLine: {
    type: Boolean,
    default: false,
  },
  indent: {
    type: Number,
    default: 16,
  },
  iconSize: {
    type: Number,
    default: 16,
  },
  itemGap: {
    type: Number,
    default: 0,
  },

  hiddenExpandIcon: {
    type: Boolean,
    default: false,
  },

  isExpanded: {
    type: Boolean,
    default: false,
  },

  selectable: {
    type: Boolean,
    default: false,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
  disableSelect: {
    type: Boolean,
    default: false,
  },

  checkable: {
    type: Boolean,
    default: false,
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
  isIndeterminate: {
    type: Boolean,
    default: false,
  },
  disableCheckbox: {
    type: Boolean,
    default: false,
  },

  isFocused: {
    type: Boolean,
    default: false,
  },

  draggable: {
    type: Boolean,
    default: false,
  },
};

export type TreeNodeProps = ExtractPropTypes<typeof treeNodeProps>;

export default defineComponent({
  name: 'VirtTreeNode',
  props: treeNodeProps,
  emits: ['clickExpandIcon', 'clickNodeContent', 'clickCheckbox', 'dragstart'],
  setup(props: TreeNodeProps, { emit }) {
    const onClickExpandIcon = (e: Event) => {
      e.stopPropagation();
      emit('clickExpandIcon', props.node);
    };
    const onClickCheckbox = (e: Event) => {
      e.stopPropagation();
      emit('clickCheckbox', props.node);
    };
    const onClickNodeContent = (e: Event) => {
      e.stopPropagation();
      emit('clickNodeContent', props.node);
    };
    const handleDragstart = (e: Event) => {
      emit('dragstart', e);
    };

    return {
      onClickNodeContent,
      handleDragstart,
      onClickCheckbox,
      onClickExpandIcon,
    };
  },
  render() {
    const {
      onClickNodeContent,
      handleDragstart,
      onClickCheckbox,
      onClickExpandIcon,
    } = this;
    const {
      minSize,
      fixed,
      indent,
      iconSize,
      isChecked,
      checkable,
      isIndeterminate,
      isExpanded,
      node,
      hiddenExpandIcon,
      isSelected,
      disableSelect,
      disableCheckbox,
      isFocused,
      showLine,
      itemGap,
      draggable,
    } = this.$props as TreeNodeProps;

    const defaultIcon = _h(
      'svg',
      {
        attrs: {
          width: '100%',
          height: '100%',
          viewBox: `0 0 20 20`,
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
        },
      },
      [
        _h('path', {
          attrs: {
            d: 'M14.5632 7.72544L10.539 13.2587C10.2728 13.6247 9.72696 13.6247 9.46073 13.2587L5.43658 7.72544C5.11611 7.28479 5.43088 6.66666 5.97573 6.66666L14.024 6.66666C14.5689 6.66666 14.8837 7.28479 14.5632 7.72544Z',
            fill: 'var(--virt-tree-color-icon)',
          },
        }),
      ],
    );

    const slotIcon = _h(
      'div',
      {
        class: {
          'virt-tree-icon-wrapper': true,
          'is-expanded': isExpanded,
        },
        style: {
          width: `${indent}px`,
        },
      },
      [
        _h(
          'div',
          {
            class: 'virt-tree-icon',
            style: {
              display: node.isLeaf || hiddenExpandIcon ? 'none' : 'block',
              width: `${iconSize}px`,
              height: `${iconSize}px`,
            },
            on: {
              click: onClickExpandIcon,
            },
          },
          getSlot(this, 'icon')
            ? getSlot(this, 'icon')?.(node, isExpanded)
            : [defaultIcon],
        ),
      ],
    );

    const slotCheckbox = checkable
      ? _h(
          'div',
          {
            class: {
              'virt-tree-checkbox-wrapper': true,
            },
          },
          [
            _h('div', {
              class: {
                'virt-tree-checkbox': true,
                'is-checked': isChecked,
                'is-indeterminate': isIndeterminate,
                'is-disabled': disableCheckbox,
              },
              on: {
                click: onClickCheckbox,
              },
            }),
          ],
        )
      : null;

    const slotContent = _h(
      'div',
      {
        class: {
          'virt-tree-node-content': true,
          'is-fixed-height': fixed,
        },
        on: {
          click: onClickNodeContent,
        },
      },
      [
        getSlot(this, 'content')
          ? getSlot(this, 'content')?.(node)
          : node.title,
      ],
    );

    const generateChildren = () => {
      const childrenList = [slotIcon, slotCheckbox, slotContent];
      if (node.level <= 1) {
        return childrenList;
      }

      const test: any[] = [];
      for (let index = 0; index <= node.level - 2; index++) {
        test.push(
          _h('div', {
            class: {
              'virt-tree-node-indent-block': true,
              'virt-tree-node-indent-block-line-vertical': showLine,
              // 破折线
              'virt-tree-node-indent-block-line-horizontal':
                showLine && index === node.level - 2,
              // 半条线
              'virt-tree-node-indent-block-line-vertical--half':
                showLine &&
                index === node.level - 2 &&
                !!node.isLast &&
                !isExpanded,
              'virt-tree-node-indent-block-line-horizontal--double':
                node.isLeaf,
            },
            style: {
              width: `${indent}px`,
              height: itemGap > 0 ? `calc(100% + ${itemGap}px)` : `100%`,
              // 解决itemGap的偏移
              transform: `translateY(-${itemGap / 2}px)`,
            },
          }),
        );
      }

      const indentBox = _h(
        'div',
        {
          class: {
            'virt-tree-node-indent': true,
          },
        },
        test,
      );

      childrenList.unshift(indentBox);
      return childrenList;
    };

    return getSlot(this, 'default')
      ? getSlot(this, 'default')?.(node, node!.data, isExpanded)
      : _h(
          'div',
          {
            class: {
              'virt-tree-node': true,
              'is-selected': isSelected,
              'is-disabled': disableSelect,
              'is-focused': isFocused,
            },
            attrs: {
              draggable: draggable,
            },
            style: {
              'min-height': `${minSize}px`,
              height: fixed ? `${minSize}px` : 'auto',
            },
            on: {
              dragstart: handleDragstart,
            },
          },
          generateChildren(),
        );
  },
});
