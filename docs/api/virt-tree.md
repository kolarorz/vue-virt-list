# VirtTree API

## Attributes

| Attribute           | Description                                                      | Type       | Default | Required                      |
| ------------------- | ---------------------------------------------------------------- | ---------- | ------- | ----------------------------- |
| data                | 数据                                                             | `Array`    | -       | <font color="#f00">Yes</font> |
| fieldNames          | 配置选项                                                         | `Object`   | -       | 否                            |
| minSize             | **最小尺寸**，会根据这个尺寸来计算可视区域内个数                 | `Number`   | `20`    | <font color="#f00">Yes</font> |
| defaultExpandedKeys | 默认展开的节点的 `key`                                           | `Array`    | `[]`    | 否                            |
| defaultCheckedKeys  | 默认选中的节点的 `key`，只在`showCheckbox`为 true 的时候生效     | `Array`    | `[]`    | 否                            |
| indent              | 相邻级节点间的水平缩进，单位为像素                               | `Number`   | `16`    | 否                            |
| currentNodeKey      | 当前选中节点的 `key`                                             | `Number`   | -       | 否                            |
| expandOnClickNode   | 点击元素是否展开                                                 | `Boolean`  | `true`  | 否                            |
| showCheckbox        | 是否展示 checkbox                                                | `Boolean`  | `false` | 否                            |
| filterMethod        | 对树节点进行筛选时执行的方法，返回 true 显示， 返回 false 被隐藏 | `Function` | -       | 否                            |
| 其他属性            | 同VirtList属性                                                   | -          | -       | -                             |

### fieldNames

| Attribute | Description                        | Type                | Default    | Required |
| --------- | ---------------------------------- | ------------------- | ---------- | -------- |
| value     | 每个树节点用来作为唯一key的属性    | `String` 、`Number` | `id`       | 否       |
| label     | 指定节点标签为节点对象的某个属性值 | `String`            | `label`    | 否       |
| children  | 指定子树为节点对象的某个属性值     | `String`            | `children` | 否       |

## Methods

| Method              | Description                                                                                  | Parameters                         |
| ------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------- |
| getCheckedNodes     | 节点可被选择（即show-checkbox为 true），则返回目前被选中的节点所组成的数组                   | `(leafOnly: boolean)`              |
| getCheckedKeys      | 若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点的 key 所组成的数组        | `(leafOnly: boolean)`              |
| setCheckedKeys      | 通过 keys 设置目前勾选的节点                                                                 | `(keys: TreeKey[])`                |
| setChecked          | 通过 key 设置某个节点的勾选状态                                                              | `(key: TreeKey, checked: boolean)` |
| setExpandedKeys     | 设置当前展开的节点                                                                           | `(keys: TreeKey[])`                |
| getHalfCheckedNodes | 如果节点可用被选中 (show-checkbox 为 true), 它将返回当前半选中的节点组成的数组               | -                                  |
| getHalfCheckedKeys  | 若节点可被选中(show-checkbox 为 true)，则返回目前半选中的节点的 key 所组成的数组             | index                              |
| getCurrentKey       | 获取当前被选中节点的 key，若没有节点被选中则返回 undefined                                   | index                              |
| getCurrentNode      | 获取当前被选中节点的 data，若没有节点被选中则返回 undefined                                  | px                                 |
| setCurrentKey       | 通过 key 设置某个节点的当前选中状态                                                          | `(key: TreeKey)`                   |
| expandNode          | 展开指定节点                                                                                 | `(node: ITreeNode)`                |
| collapseNode        | 折叠指定节点                                                                                 | `(node: ITreeNode)`                |
| setData             | 提供一种显式设置的方式来避免当数据量非常庞大的时候，总是使用响应式数据将导致性能表现不佳情况 | `(data: TreeNodeData)`             |

## Events

| Event Name        | Description                  | Parameters                                                                                                                              |
| ----------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| node-click        | 当节点被点击的时候触发       | `(data: TreeNodeData, node: ITreeNode, e: MouseEvent)`                                                                                  |
| node-check-change | 节点选中状态发生变化时的回调 | `(data: TreeNodeData, checked: boolean)`                                                                                                |
| node-check        | 当复选框被点击的时候触发     | `(data: TreeNodeData, info: { checkedKeys: TreeKey[],checkedNodes: TreeData, halfCheckedKeys: TreeKey[], halfCheckedNodes: TreeData,})` |
| current-change    | 当前选中节点变化时触发的事件 | `(data: TreeNodeData, node: ITreeNode)`                                                                                                 |
| node-expand       | 节点被展开时触发的事件       | `(data: TreeNodeData, node: ITreeNode)`                                                                                                 |
| node-collapse     | 节点被收起时触发的事件       | `(data: TreeNodeData, node: ITreeNode)`                                                                                                 |
| scroll            | 滚动的回调                   | `event  `                                                                                                                               |

## Slots

| Name    | Description                                            |
| ------- | ------------------------------------------------------ |
| icon    | 图标插槽， `作用域参数为 { node }`                     |
| content | 节点内容插槽， `作用域参数为 { node }`                 |
| default | 节点 item 内容， `作用域参数为 { node, data, expand }` |
