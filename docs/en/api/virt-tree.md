# VirtTree API

## Tree Attributes

| Attribute                       | Description                                                                                                                          | Type                         | Default   | Required                      |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- | --------- | ----------------------------- |
| list                            | Tree data                                                                                                                            | `TreeNodeData[]`             | -         | <font color="#f00">Yes</font> |
| itemPreSize                     | Estimated item size                                                                                                                  | `number`                     | `32`      | -                             |
| minSize                         | >= v1.7.0 deprecated                                                                                                                 | `number`                     | `32`      | -                             |
| indent                          | Horizontal indentation between adjacent level nodes, in pixels                                                                       | `number`                     | `16`      | -                             |
| iconSize                        | Icon size                                                                                                                            | `number`                     | `16`      | -                             |
| itemGap                         | Gap between items (item size includes itemGap)                                                                                       | `Number`                     | `0`       | -                             |
| showLine                        | Whether to show level lines                                                                                                          | `boolean`                    | `false`   | -                             |
| `[expand]` expandedKeys         | `.sync` Set of `key` values for expanded nodes                                                                                       | `TreeNodeKey[]`              | `[]`      | -                             |
| `[expand]` defaultExpandAll     | Whether to expand nodes by default                                                                                                   | `boolean`                    | `true`    | -                             |
| `[expand]` expandOnClickNode    | Whether to expand when clicking element (only effective when selectable=false&checkOnClickNode=false)                                | `boolean`                    | `true`    | -                             |
| `[checkable]` checkable         | Whether to have checkbox                                                                                                             | `boolean`                    | `false`   | -                             |
| `[checkable]` checkedKeys       | `.sync` Set of `key` values for checked nodes, only effective when `showCheckbox` is true                                            | `TreeNodeKey[]`              | `[]`      | -                             |
| `[checkable]` checkOnClickNode  | Whether clicking node can select checkbox                                                                                            | `boolean`                    | `false`   | -                             |
| `[checkable]` checkedStrictly   | When showing checkboxes, whether to strictly follow the practice of no mutual association between parent and child, default is false | `boolean`                    | `false`   | -                             |
| `[selectable]` selectable       | Whether selection is allowed                                                                                                         | `boolean`                    | `false`   | -                             |
| `[selectable]` selectedKeys     | `.sync` Set of `key` values for selected nodes, only effective when `selectable` is true                                             | `TreeNodeKey[]`              | `[]`      | -                             |
| `[selectable]` selectMultiple   | Whether multiple selection is allowed                                                                                                | `boolean`                    | `false`   | -                             |
| `[focus]` focusedKeys           | `.sync` Set of `key` values for focused nodes, can also be a single node                                                             | `TreeNodeKey\|TreeNodeKey[]` | `[]`      | -                             |
| `[draggable]` draggable         | Whether to enable drag                                                                                                               | `boolean`                    | `false`   | -                             |
| `[draggable]` dragClass         | Class for dragged node                                                                                                               | `string`                     | ``        | -                             |
| `[draggable]` dragGhostClass    | Class for dragged clone node                                                                                                         | `string`                     | ``        | -                             |
| `[draggable]` beforeDrag        | Callback before drag enters each node, return true to allow drag, return false to disallow                                           | `() => boolean`              | ``        | -                             |
| `[draggable]` dragoverPlacement | Effective area range for drag area                                                                                                   | `number[]`                   | `[33,66]` | -                             |
| filterMethod                    | Method executed when filtering tree nodes, return true to show, return false to hide                                                 | `() => boolean`              | -         | -                             |
| fieldNames                      | Configuration options                                                                                                                | `TreeFieldNames`             | -         | -                             |
| Other attributes                | Same as VirtList attributes                                                                                                          | -                            | -         | -                             |

## Tree Methods

| Method           | Description                       | Parameters                                                              |
| ---------------- | --------------------------------- | ----------------------------------------------------------------------- |
| scrollTo         | Scroll to                         | `({key?: string \| number; align?: 'view' \| 'top'; offset?: number;})` |
| hasSelected      | Whether the node is selected      | `(node: TreeNode) => boolean`                                           |
| selectAll        | Set selection state for all nodes | `(selected: boolean)`                                                   |
| selectNode       | Select specified node             | `(key: TreeNodeKey\|TreeNodeKey[], selected: boolean)`                  |
| hasExpanded      | Whether the node is expanded      | `(node: TreeNode) => boolean`                                           |
| toggleExpand     | Toggle node expansion             | `(node: TreeNode) => boolean`                                           |
| expandAll        | Set expansion state for all nodes | `(expanded: boolean)`                                                   |
| expandNode       | Expand specified node             | `(key: TreeNodeKey\|TreeNodeKey[], expanded: boolean)`                  |
| hasChecked       | Whether the node is checked       | `(node: TreeNode) => boolean`                                           |
| hasIndeterminate | Whether the node is indeterminate | `(node: TreeNode) => boolean`                                           |
| checkAll         | Set check state for all nodes     | `(checked: boolean)`                                                    |
| checkNode        | Check specified node              | `(key: TreeNodeKey\|TreeNodeKey[], checked: boolean)`                   |

## Tree Events

| Event Name | Description                                                                                                   | Parameters                                                                                                                                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| select     | Triggered when clicking tree node                                                                             | selectedKeys: `Array<string \| number>`<br>data: `{ selected?: boolean; selectedNodes: TreeNodeData[]; node?: TreeNodeData; e?: Event; }`                                                                       |
| check      | Triggered when clicking tree node checkbox. `halfCheckedKeys` and `halfCheckedNodes` supported from `2.19.0`. | checkedKeys: `Array<string \| number>`<br>data: `{ checked?: boolean; checkedNodes: TreeNodeData[]; node?: TreeNodeData; e?: Event; halfCheckedKeys: (string \| number)[]; halfCheckedNodes: TreeNodeData[]; }` |
| expand     | Expand/collapse                                                                                               | expandKeys: `Array<string \| number>`<br>data: `{ expanded?: boolean; expandNodes: TreeNodeData[]; node?: TreeNodeData; e?: Event; }`                                                                           |
| drag-start | Node starts dragging                                                                                          | ev: `DragEvent`<br>node: `TreeNodeData`                                                                                                                                                                         |
| drag-end   | Node ends dragging                                                                                            | ev: `DragEvent`<br>node: `TreeNodeData`                                                                                                                                                                         |
| drag-over  | Node is dragged to droppable target                                                                           | ev: `DragEvent`<br>node: `TreeNodeData`                                                                                                                                                                         |
| drag-leave | Node leaves droppable target                                                                                  | ev: `DragEvent`<br>node: `TreeNodeData`                                                                                                                                                                         |
| drop       | Node is dropped on droppable target                                                                           | data: `{ e: DragEvent; dragNode: TreeNodeData; dropNode: TreeNodeData; dropPosition: number; }`                                                                                                                 |

## Tree Slots

| Name    | Description                                                    |
| ------- | -------------------------------------------------------------- |
| icon    | Icon slot, `scoped parameters: { node }`                       |
| content | Node content slot, `scoped parameters: { node }`               |
| default | Node item content, `scoped parameters: { node, data, expand }` |
| header  | Node item content, `scoped parameters: { node, data, expand }` |
| footer  | Node item content, `scoped parameters: { node, data, expand }` |

### TreeNode

| Parameter Name  | Description                                             | Type               | Default |
| --------------- | ------------------------------------------------------- | ------------------ | :-----: |
| key             | Unique identifier                                       | `string \| number` |   `-`   |
| level           | Level                                                   | number             |    1    |
| title           | Title displayed for this node                           | `string`           |   `-`   |
| isLeaf          | Whether it's a leaf node. Effective for dynamic loading | `boolean`          | `false` |
| isLast          | Whether it's the last node at current level             | `boolean`          | `false` |
| parent          | Parent                                                  | `TreeNode[]`       |    1    |
| children        | Child nodes                                             | `TreeNode[]`       |   `-`   |
| disableSelect   | Whether to disable selection                            | `boolean`          | `false` |
| disableCheckbox | Whether to disable checkbox                             | `boolean`          | `false` |
| data            | Custom drag icon, priority over tree                    | `() => VNode`      |   `-`   |

### TreeFieldNames

| Attribute       | Description                                           | Type             | Default           | Required |
| --------------- | ----------------------------------------------------- | ---------------- | ----------------- | -------- |
| key             | Property used as unique key for each tree node        | `string, number` | `key`             | -        |
| title           | Specify node label as a property value of node object | `string`         | `title`           | -        |
| children        | Specify subtree as a property value of node object    | `string`         | `children`        | -        |
| disableSelect   | Disable selection                                     | `string`         | `disableSelect`   | -        |
| disableCheckbox | Disable checkbox check                                | `string`         | `disableCheckbox` | -        |
| disableDragIn   | Disable drag into this node                           | `string`         | `disableDragIn`   | -        |
| disableDragOut  | Disable drag out of this node                         | `string`         | `disableDragOut`  | -        |
