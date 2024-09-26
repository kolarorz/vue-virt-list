# VirtTree API

## Tree Attributes

| Attribute                      | Description                                                                   | Type                         | Default | Required                      |
| ------------------------------ | ----------------------------------------------------------------------------- | ---------------------------- | ------- | ----------------------------- |
| list                           | list                                                                          | `TreeNodeData[]`             | -       | <font color="#f00">Yes</font> |
| minSize                        | **最小尺寸**，会根据这个尺寸来计算可视区域内个数                              | `number`                     | `32`    | <font color="#f00">Yes</font> |
| indent                         | 相邻级节点间的水平缩进，单位为像素                                            | `number`                     | `16`    | 否                            |
| iconSize                       | 图标大小                                                                      | `number`                     | `16`    | 否                            |
| itemGap                        | 元素之间的间距 (元素尺寸包含itemGap)                                          | `Number`                     | `0`     | 否                            |
| showLine                       | 是否显示层级线                                                                | `boolean`                    | `false` | 否                            |
| `[expand]` expandedKeys        | `.sync` 展开的节点的 `key` 集合                                               | `TreeNodeKey[]`              | `[]`    | 否                            |
| `[expand]` defaultExpandAll    | 是否默认展开节点                                                              | `boolean`                    | `true`  | 否                            |
| `[expand]` expandOnClickNode   | 点击元素是否展开 (仅在selectable=false&checkOnClickNode=false时生效)          | `boolean`                    | `true`  | 否                            |
| `[checkable]` checkable        | 是否有checkbox                                                                | `boolean`                    | `false` | 否                            |
| `[checkable]` checkedKeys      | `.sync` 勾选的节点的 `key` 集合，只在`showCheckbox`为 true 的时候生效         | `TreeNodeKey[]`              | `[]`    | 否                            |
| `[checkable]` checkOnClickNode | 点击节点是否可以选中checkbox                                                  | `boolean`                    | `false` | 否                            |
| `[checkable]` checkedStrictly  | 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false        | `boolean`                    | `false` | 否                            |
| `[selectable]` selectable      | 是否可以选中                                                                  | `boolean`                    | `false` | 否                            |
| `[selectable]` selectedKeys    | `.sync` 选中的节点的 `key` 集合，只在`selectable`为 true 的时候生效           | `TreeNodeKey[]`              | `[]`    | 否                            |
| `[selectable]` selectMultiple  | 是否可以多选                                                                  | `boolean`                    | `false` | 否                            |
| `[focus]` focusedKeys          | `.sync` 激活的节点的 `key` 集合，也可以是一个节点                             | `TreeNodeKey\|TreeNodeKey[]` | `[]`    | 否                            |
| `[draggable]` draggable        | 是否开启拖拽                                                                  | `boolean`                    | `false` | 否                            |
| `[draggable]` dragClass        | 拖拽的节点class                                                               | `string`                     | ``      | 否                            |
| `[draggable]` dragGhostClass   | 拖拽的克隆节点class                                                           | `string`                     | ``      | 否                            |
| `[draggable]` beforeDrag       | 拖拽进入每个节点前的回调，返回true代表可以完成该拖拽，返回false代表不可以完成 | `() => boolean`              | ``      | 否                            |
| filterMethod                   | 对树节点进行筛选时执行的方法，返回 true 显示， 返回 false 被隐藏              | `() => boolean`              | -       | 否                            |
| fieldNames                     | 配置选项                                                                      | `TreeFieldNames`             | -       | 否                            |
| 其他属性                       | 同VirtList属性                                                                | -                            | -       | -                             |

## Tree Methods

| Method     | Description            | Parameters                                                              |
| ---------- | ---------------------- | ----------------------------------------------------------------------- |
| expandAll  | 设置全部节点的展开状态 | `(expanded: boolean)`                                                   |
| expandNode | 展开指定节点           | `(key: TreeNodeKey\|TreeNodeKey[], expanded: boolean)`                  |
| scrollTo   | 展开指定节点           | `({key?: string \| number; align?: 'view' \| 'top'; offset?: number;})` |

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
| key             | 每个树节点用来作为唯一key的属性    | `string, number` | `key`             | 否       |
| title           | 指定节点标签为节点对象的某个属性值 | `string`         | `title`           | 否       |
| children        | 指定子树为节点对象的某个属性值     | `string`         | `children`        | 否       |
| disableSelect   | 禁止选中                           | `string`         | `disableSelect`   | 否       |
| disableCheckbox | 禁止复选框勾选                     | `string`         | `disableCheckbox` | 否       |
| disableDragIn   | 禁止拖入该节点                     | `string`         | `disableDragIn`   | 否       |
| disableDragOut  | 禁止拖出该节点                     | `string`         | `disableDragOut`  | 否       |
