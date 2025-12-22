# VirtTree API

## Tree Attributes

| Attribute                       | Description                                                                   | Type                         | Default   | Required                     |
| ------------------------------- | ----------------------------------------------------------------------------- | ---------------------------- | --------- | ---------------------------- |
| list                            | 树形数据                                                                      | `TreeNodeData[]`             | -         | <font color="#f00">是</font> |
| itemPreSize                     | 预估尺寸                                                                      | `number`                     | `32`      | -                            |
| minSize                         | >= v1.7.0 后遗弃，使用itemPreSize替代                                         | `number`                     | `32`      | -                            |
| indent                          | 相邻级节点间的水平缩进，单位为像素                                            | `number`                     | `16`      | -                            |
| iconSize                        | 图标大小                                                                      | `number`                     | `16`      | -                            |
| itemGap                         | 元素之间的间距 (元素尺寸包含itemGap)                                          | `Number`                     | `0`       | -                            |
| showLine                        | 是否显示层级线                                                                | `boolean`                    | `false`   | -                            |
| `[expand]` expandedKeys         | `.sync` 展开的节点的 `key` 集合                                               | `TreeNodeKey[]`              | `[]`      | -                            |
| `[expand]` defaultExpandAll     | 是否默认展开节点                                                              | `boolean`                    | `true`    | -                            |
| `[expand]` expandOnClickNode    | 点击元素是否展开 (仅在selectable=false&checkOnClickNode=false时生效)          | `boolean`                    | `true`    | -                            |
| `[checkable]` checkable         | 是否有checkbox                                                                | `boolean`                    | `false`   | -                            |
| `[checkable]` checkedKeys       | `.sync` 勾选的节点的 `key` 集合，只在`showCheckbox`为 true 的时候生效         | `TreeNodeKey[]`              | `[]`      | -                            |
| `[checkable]` checkOnClickNode  | 点击节点是否可以选中checkbox                                                  | `boolean`                    | `false`   | -                            |
| `[checkable]` checkedStrictly   | 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false        | `boolean`                    | `false`   | -                            |
| `[selectable]` selectable       | 是否可以选中                                                                  | `boolean`                    | `false`   | -                            |
| `[selectable]` selectedKeys     | `.sync` 选中的节点的 `key` 集合，只在`selectable`为 true 的时候生效           | `TreeNodeKey[]`              | `[]`      | -                            |
| `[selectable]` selectMultiple   | 是否可以多选                                                                  | `boolean`                    | `false`   | -                            |
| `[focus]` focusedKeys           | `.sync` 激活的节点的 `key` 集合，也可以是一个节点                             | `TreeNodeKey\|TreeNodeKey[]` | `[]`      | -                            |
| `[draggable]` draggable         | 是否开启拖拽                                                                  | `boolean`                    | `false`   | -                            |
| `[draggable]` dragClass         | 拖拽的节点class                                                               | `string`                     | ``        | -                            |
| `[draggable]` dragGhostClass    | 拖拽的克隆节点class                                                           | `string`                     | ``        | -                            |
| `[draggable]` beforeDrag        | 拖拽进入每个节点前的回调，返回true代表可以完成该拖拽，返回false代表不可以完成 | `() => boolean`              | ``        | -                            |
| `[draggable]` dragoverPlacement | 拖拽区域生效的区域范围                                                        | `number[]`                   | `[33,66]` | -                            |
| filterMethod                    | 对树节点进行筛选时执行的方法，返回 true 显示， 返回 false 被隐藏              | `() => boolean`              | -         | -                            |
| fieldNames                      | 配置选项                                                                      | `TreeFieldNames`             | -         | -                            |
| 其他属性                        | 同VirtList属性                                                                | -                            | -         | -                            |

## Tree Methods

| Method           | Description            | Parameters                                                              |
| ---------------- | ---------------------- | ----------------------------------------------------------------------- |
| scrollTo         | 滚动到                 | `({key?: string \| number; align?: 'view' \| 'top'; offset?: number;})` |
| hasSelected      | 该节点是否被选中       | `(node: TreeNode) => boolean`                                           |
| selectAll        | 设置全部节点的选中状态 | `(selected: boolean)`                                                   |
| selectNode       | 选中指定节点           | `(key: TreeNodeKey\|TreeNodeKey[], selected: boolean)`                  |
| hasExpanded      | 该节点是否展开         | `(node: TreeNode) => boolean`                                           |
| toggleExpand     | 切换节点展开           | `(node: TreeNode) => boolean`                                           |
| expandAll        | 设置全部节点的展开状态 | `(expanded: boolean)`                                                   |
| expandNode       | 展开指定节点           | `(key: TreeNodeKey\|TreeNodeKey[], expanded: boolean)`                  |
| hasChecked       | 该节点是否勾选         | `(node: TreeNode) => boolean`                                           |
| hasIndeterminate | 该节点是否半选         | `(node: TreeNode) => boolean`                                           |
| checkAll         | 设置全部节点的勾选状态 | `(checked: boolean)`                                                    |
| checkNode        | 勾选指定节点           | `(key: TreeNodeKey\|TreeNodeKey[], checked: boolean)`                   |

## Tree Events

| 事件名     | 描述                                                                                   | 参数                                                                                                                                                                                                            |
| ---------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| select     | 点击树节点时触发                                                                       | selectedKeys: `Array<string \| number>`<br>data: `{ selected?: boolean; selectedNodes: TreeNodeData[]; node?: TreeNodeData; e?: Event; }`                                                                       |
| check      | 点击树节点复选框时触发。`halfCheckedKeys` 和 `halfCheckedNodes` 从 `2.19.0` 开始支持。 | checkedKeys: `Array<string \| number>`<br>data: `{ checked?: boolean; checkedNodes: TreeNodeData[]; node?: TreeNodeData; e?: Event; halfCheckedKeys: (string \| number)[]; halfCheckedNodes: TreeNodeData[]; }` |
| expand     | 展开/关闭                                                                              | expandKeys: `Array<string \| number>`<br>data: `{ expanded?: boolean; expandNodes: TreeNodeData[]; node?: TreeNodeData; e?: Event; }`                                                                           |
| drag-start | 节点开始拖拽                                                                           | ev: `DragEvent`<br>node: `TreeNodeData`                                                                                                                                                                         |
| drag-end   | 节点结束拖拽                                                                           | ev: `DragEvent`<br>node: `TreeNodeData`                                                                                                                                                                         |
| drag-over  | 节点被拖拽至可释放目标                                                                 | ev: `DragEvent`<br>node: `TreeNodeData`                                                                                                                                                                         |
| drag-leave | 节点离开可释放目标                                                                     | ev: `DragEvent`<br>node: `TreeNodeData`                                                                                                                                                                         |
| drop       | 节点在可释放目标上释放                                                                 | data: `{ e: DragEvent; dragNode: TreeNodeData; dropNode: TreeNodeData; dropPosition: number; }`                                                                                                                 |

## Tree Slots

| Name    | Description                                            |
| ------- | ------------------------------------------------------ |
| icon    | 图标插槽， `作用域参数为 { node }`                     |
| content | 节点内容插槽， `作用域参数为 { node }`                 |
| default | 节点 item 内容， `作用域参数为 { node, data, expand }` |
| header  | 节点 item 内容， `作用域参数为 { node, data, expand }` |
| footer  | 节点 item 内容， `作用域参数为 { node, data, expand }` |

### TreeNode

| 参数名          | 描述                            | 类型               | 默认值  |
| --------------- | ------------------------------- | ------------------ | :-----: |
| key             | 唯一标示                        | `string \| number` |   `-`   |
| level           | 层级                            | number             |    1    |
| title           | 该节点显示的标题                | `string`           |   `-`   |
| isLeaf          | 是否是叶子节点。动态加载时有效  | `boolean`          | `false` |
| isLast          | 是否是当前层级的最后节点        | `boolean`          | `false` |
| parent          | 父级                            | `TreeNode[]`       |    1    |
| children        | 子节点                          | `TreeNode[]`       |   `-`   |
| disableSelect   | 是否禁用选中                    | `boolean`          | `false` |
| disableCheckbox | 是否禁用复选框                  | `boolean`          | `false` |
| data            | 定制 drag 图标，优先级大于 tree | `() => VNode`      |   `-`   |

### TreeFieldNames

| Attribute       | Description                        | Type             | Default           | Required |
| --------------- | ---------------------------------- | ---------------- | ----------------- | -------- |
| key             | 每个树节点用来作为唯一key的属性    | `string, number` | `key`             | -        |
| title           | 指定节点标签为节点对象的某个属性值 | `string`         | `title`           | -        |
| children        | 指定子树为节点对象的某个属性值     | `string`         | `children`        | -        |
| disableSelect   | 禁止选中                           | `string`         | `disableSelect`   | -        |
| disableCheckbox | 禁止复选框勾选                     | `string`         | `disableCheckbox` | -        |
| disableDragIn   | 禁止拖入该节点                     | `string`         | `disableDragIn`   | -        |
| disableDragOut  | 禁止拖出该节点                     | `string`         | `disableDragOut`  | -        |
