# VirtTree

## Basic

<!<< @/demos/tree/Basic.vue

## Selectable

selectable 模式下只能点击图标进行展开/折叠

```ts
type Props = {
  selectable: boolean; // 开启 展开/折叠
  selectMultiple: boolean; // 开启多选
};
```

<!<< @/demos/tree/Selectable.vue

## Focus

Focus 状态切换完全交由外部处理，内部仅给Node节点加上`.is-focused`类名

<!<< @/demos/tree/Focus.vue

## Expand

<!<< @/demos/tree/Expand.vue

## Checkbox

<!<< @/demos/tree/Checkbox.vue

## Filter

<!<< @/demos/tree/Filter.vue

## ICON Slot

提供展开状态下的图标

<!<< @/demos/tree/Icon.vue

## Content Slot

<!<< @/demos/tree/Content.vue

## Default Slot

自定义整个node节点

<!<< @/demos/tree/Default.vue

## showLine

展示节点连接线

<!<< @/demos/tree/ShowLine.vue

## Operations

对 tree 的各种操作方式

<!<< @/demos/tree/Operate.vue

## header&footer Slot

<!<< @/demos/tree/Slots.vue

## draggable

<!<< @/demos/tree/Drag.vue

## dragover placement

拖拽悬浮生效区域判定

<!<< @/demos/tree/DragoverPlacement.vue

## drag handler

<!<< @/demos/tree/DragHandler.vue

## css variable

```css
.virt-tree-item {
  /* drag line */
  --virt-tree-color-drag-line: #4c88ff;
  --virt-tree-color-drag-box: rgb(76, 136, 255, 0.1);
  --virt-tree-color-drag-line-disabled: rgb(76, 136, 255, 0.4);

  /* text */
  --virt-tree-color-text: #1f2329;
  --virt-tree-color-text-disabled: #a8abb2;
  --virt-tree-color-text-selected: #1456f0;

  /* node */
  --virt-tree-color-node-bg: #fff;
  --virt-tree-color-node-bg-hover: #1f232914;
  --virt-tree-color-node-bg-disabled: transparent;
  --virt-tree-color-node-bg-selected: #f0f4ff;

  /* icon */
  --virt-tree-color-icon: #2b2f36;
  --virt-tree-color-icon-bg-hover: #1f23291a;

  /* line */
  --virt-tree-line-color: #cacdd1;

  /* checkbox */
  --virt-tree-color-checkbox-bg: #fff;
  --virt-tree-color-checkbox-bg-indeterminate: #1890ff;
  --virt-tree-color-checkbox-bg-checked: #1890ff;
  --virt-tree-color-checkbox-bg-disabled: rgba(255, 255, 255, 0.3);
  --virt-tree-color-checkbox-border: rgb(190, 192, 198);
  --virt-tree-color-checkbox-border-checked: #1890ff;
  --virt-tree-color-checkbox-border-indeterminate: #1890ff;

  /* 生效于图标的margin和拖拽线的左边距离 */
  --virt-tree-switcher-icon-margin-right: 4px;
  --virt-tree-drag-line-gap: 4px;
}

html.dark .virt-tree-item {
  /* drag line */
  --virt-tree-color-drag-line: #4c88ff;
  --virt-tree-color-drag-box: rgb(76, 136, 255, 0.1);
  --virt-tree-color-drag-line-disabled: rgb(76, 136, 255, 0.4);

  /* text */
  --virt-tree-color-text: #f9f9f9;
  --virt-tree-color-text-disabled: rgba(255, 255, 255, 0.3);
  --virt-tree-color-text-selected: #4c88ff;

  /* node */
  --virt-tree-color-node-bg: #1b1b1f;
  --virt-tree-color-node-bg-hover: #2e3238;
  --virt-tree-color-node-bg-disabled: transparent;
  --virt-tree-color-node-bg-selected: #152340;

  /* icon */
  --virt-tree-color-icon: #f9f9f9;
  --virt-tree-color-icon-bg-hover: #ebebeb1a;

  /* line */
  --virt-tree-line-color: #35393f;

  /* checkbox */
  --virt-tree-color-checkbox-bg: #fff;
  --virt-tree-color-checkbox-bg-indeterminate: #1890ff;
  --virt-tree-color-checkbox-bg-checked: #1890ff;
  --virt-tree-color-checkbox-bg-disabled: rgba(255, 255, 255, 0.3);
  --virt-tree-color-checkbox-border: rgb(190, 192, 198);
  --virt-tree-color-checkbox-border-checked: #1890ff;
  --virt-tree-color-checkbox-border-indeterminate: #1890ff;

  /* 生效于图标的margin和拖拽线的左边距离 */
  --virt-tree-switcher-icon-margin-right: 4px;
  --virt-tree-drag-line-gap: 4px;
}
```
