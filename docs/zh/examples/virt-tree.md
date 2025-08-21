# VirtTree

## Basic

<!<< @/demos/tree/Basic.vue

## Focus

Focus 状态切换完全交由外部处理，内部仅给Node节点加上`.is-focused`类名，一般该功能是用来保持节点下拉菜单使用的

<!<< @/demos/tree/Focus.vue

## Selectable

selectable 模式下只能点击图标进行展开/折叠

> 受控模式
>
> > vue2
> >
> > > 使用： `:selectedKeys.sync="selectedKeys"`
> > >
> > > 更新：由于受vue2响应式特性，`selectedKeys` 使用原数组的方法来改变响应式，例如使用`splice() pop() push()等`
> >
> > vue3
> >
> > > 使用： `v-model:selectedKeys="selectedKeys"`
> > >
> > > 更新：由于受vue3响应式特性，`selectedKeys`必须使用新数组来改变响应式。
>
> 非受控模式
>
> > 不需要提供`selectedKeys`（这时候会自动生成一个内部的`selectedKeys`），使用 `selectAll() selectNode()` 方法来改变数据，使用 `@select="onSelect"` 来接收变更

```ts
type Props = {
  selectable: boolean; // 开启 展开/折叠
  selectMultiple: boolean; // 开启多选
};
```

<!<< @/demos/tree/Selectable.vue

## Expand

> 受控模式
>
> > vue2
> >
> > > 使用： `:expandedKeys.sync="expandedKeys"`
> > >
> > > 更新：由于受vue2响应式特性，`expandedKeys` 使用原数组的方法来改变响应式，例如使用`splice() pop() push()等`
> >
> > vue3
> >
> > > 使用： `v-model:expandedKeys="expandedKeys"`
> > >
> > > 更新：由于受vue3响应式特性，`expandedKeys`必须使用新数组来改变响应式。
>
> 非受控模式
>
> > 不需要提供`expandedKeys`（这时候会自动生成一个内部的`expandedKeys`），使用 `expandAll() expandNode()` 方法来改变数据，使用 `@expand="onExpand"` 来接收变更

<!<< @/demos/tree/Expand.vue

## Checkbox

> 受控模式
>
> > vue2
> >
> > > 使用： `:checkedKeys.sync="checkedKeys"`
> > >
> > > 更新：由于受vue2响应式特性，`checkedKeys`使用原数组的方法来改变响应式，例如使用`splice() pop() push()等`
> >
> > vue3
> >
> > > 使用： `v-model:checkedKeys="checkedKeys"`
> > >
> > > 更新：由于受vue3响应式特性，`checkedKeys`必须使用新数组来改变响应式。
>
> 非受控模式
>
> > 不需要提供 `checkedKeys`（这时候会自动生成一个内部的`checkedKeys`），使用 `checkAll() checkNode()` 方法来改变数据，使用 `@check="onCheck"` 来接收变更

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

## disabled cross level drag

禁止跨级拖拽

<!<< @/demos/tree/DragArea.vue

## draggable

拖拽后不直接修改数据，而是提供 dragend 事件，由业务自行判定并修改数据，数据更改后，通过响应式更新树。

位置判定说明：每个元素会被切割为3份，上面一份判定为拖入该元素上方，下面一份判定为拖入该元素下方。如果该元素被禁止拖入，则会把该元素一分为二，去掉中间的区域。

<!<< @/demos/tree/Drag.vue

## drag handler

自定义拖拽生效图标，而不是整个节点

<!<< @/demos/tree/DragHandler.vue

通常这种形式用在替代 VueDraggable 组件

<!<< @/demos/tree/DragList.vue

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
