# VirtGrid API

## Attributes

| Attribute | Description                                      | Type     | Default | Required                      |
| --------- | ------------------------------------------------ | -------- | ------- | ----------------------------- |
| list      | 数据                                             | `Array`  | -       | <font color="#f00">Yes</font> |
| minSize   | **最小尺寸**，会根据这个尺寸来计算可视区域内个数 | `Number` | `20`    | <font color="#f00">Yes</font> |
| gridItems | 每列展示个数                                     | `Number` | `2`     | 否                            |
| 其他属性  | 同VirtList属性                                   | -        | -       | -                             |

## Methods

| Method         | Description                                 | Parameters |
| -------------- | ------------------------------------------- | ---------- |
| scrollToTop    | scroll to top                               | -          |
| scrollToBottom | scroll to bottom                            | -          |
| scrollToIndex  | scroll to index                             | index      |
| scrollInToView | scroll to index if needed（不在可视范围内） | index      |
| scrollToOffset | scroll to px                                | px         |
| forceUpdate    | 强制更新                                    | -          |
