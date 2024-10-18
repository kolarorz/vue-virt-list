# VirtGrid API

## Attributes

| Attribute   | Description                          | Type     | Default | Required                      |
| ----------- | ------------------------------------ | -------- | ------- | ----------------------------- |
| list        | list data                            | `Array`  | -       | <font color="#f00">Yes</font> |
| minSize     | The Min Size of Item                 | `Number` | `20`    | <font color="#f00">Yes</font> |
| gridItems   | Number of items displayed per column | `Number` | `2`     | 否                            |
| other attrs | Same as VirtList's attribute         | -        | -       | -                             |

## Methods

| Method         | Description                                         | Parameters |
| -------------- | --------------------------------------------------- | ---------- |
| scrollToTop    | scroll to top                                       | -          |
| scrollToBottom | scroll to bottom                                    | -          |
| scrollToIndex  | scroll to index                                     | index      |
| scrollInToView | scroll to index if needed（if item is not in view） | index      |
| scrollToOffset | scroll to px                                        | px         |
| forceUpdate    | force update(render)                                | -          |

## Slots

| Name          | Description                                                     |
| ------------- | --------------------------------------------------------------- |
| header        | the slot of header                                              |
| footer        | the slot of footer                                              |
| sticky-header | the slot of sticky header                                       |
| sticky-footer | the slot of sticky footer                                       |
| empty         | the slot of empty                                               |
| default       | the slot of item， `slotScoped = { itemData, index, rowIndex }` |
