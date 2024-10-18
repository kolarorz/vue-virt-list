# VirtGrid API

## 属性

| 参数      | 说明                                             | 类型     | 默认值 | 是否必须                     |
| --------- | ------------------------------------------------ | -------- | ------ | ---------------------------- |
| list      | 数据                                             | `Array`  | -      | <font color="#f00">是</font> |
| minSize   | **最小尺寸**，会根据这个尺寸来计算可视区域内个数 | `Number` | `20`   | <font color="#f00">是</font> |
| gridItems | 每列展示个数                                     | `Number` | `2`    | 否                           |
| 其他属性  | 同VirtList属性                                   | -        | -      | -                            |

## 暴露方法

| 方法名         | 说明                                        | 参数  |
| -------------- | ------------------------------------------- | ----- |
| scrollToTop    | scroll to top                               | -     |
| scrollToBottom | scroll to bottom                            | -     |
| scrollToIndex  | scroll to index                             | index |
| scrollInToView | scroll to index if needed（不在可视范围内） | index |
| scrollToOffset | scroll to px                                | px    |
| forceUpdate    | 强制更新                                    | -     |

## 插槽

| name          | 说明                                                     |
| ------------- | -------------------------------------------------------- |
| header        | 顶部插槽                                                 |
| footer        | 底部插槽                                                 |
| sticky-header | 顶部悬浮插槽                                             |
| sticky-footer | 底部悬浮插槽                                             |
| empty         | 空插槽                                                   |
| default       | item 内容， `作用域参数为 { itemData, index, rowIndex }` |
