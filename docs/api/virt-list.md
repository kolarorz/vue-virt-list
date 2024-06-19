# VirtList API

## Props

| 参数          | 说明                                                                              | 类型                                                               | 默认值  | 是否必须                     |
| ------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------- | ---------------------------- |
| list          | 数据                                                                              | `Array`                                                            | -       | <font color="#f00">是</font> |
| itemKey       | 项的 id，<font color="#f00">必须唯一!!!</font>（否则会无法正常滚动）              | `String\|Number`                                                   | -       | <font color="#f00">是</font> |
| minSize       | **最小尺寸**，会根据这个尺寸来计算可视区域内个数                                  | `Number`                                                           | `20`    | <font color="#f00">是</font> |
| fixed         | 是否为固定高度，可以提升性能<br />**注意：动态高度模式下，请勿使用**              | `Number`                                                           | `false` | -                            |
| buffer        | 当渲染量大，滚动白屏严重时，可以给定数值，bufferTop 和 bufferBottom 会等于 buffer | `Number`                                                           | `0`     | -                            |
| bufferTop     | 顶部 buffer 个数                                                                  | `Number`                                                           | `0`     | -                            |
| bufferBottom  | 底部 buffer 个数                                                                  | `Number`                                                           | `0`     | -                            |
| horizontal    | 是否水平滚动                                                                      | `Boolean`                                                          | `false` | -                            |
| fixSelection  | 是否需要修复滚动丢失selection问题(仅vue2下需要和生效)                             | `Boolean`                                                          | `false` | -                            |
| start         | 起始渲染下标                                                                      | `Number`                                                           | `0`     | -                            |
| offset        | 起始渲染顶部高度                                                                  | `Number`                                                           | `0`     | -                            |
| listStyle     | 列表容器样式                                                                      | `String`                                                           | `''`    | -                            |
| listClass     | 列表容器类名                                                                      | `String`                                                           | `''`    | -                            |
| itemStyle     | item容器样式                                                                      | `String`                                                           | `''`    | -                            |
| itemClass     | item容器类名                                                                      | `String`                                                           | `''`    | -                            |
| renderControl | 渲染控制器                                                                        | `(begin: number, end: number ) => { begin: number; end: number };` | -       | -                            |

## Slots

| name          | 说明                                           |
| ------------- | ---------------------------------------------- |
| header        | 顶部插槽                                       |
| footer        | 底部插槽                                       |
| sticky-header | 顶部悬浮插槽                                   |
| sticky-footer | 底部悬浮插槽                                   |
| default       | item 内容， `作用域参数为 { itemData, index }` |

## Events

| 方法名      | 说明              | 参数                                         |
| ----------- | ----------------- | -------------------------------------------- |
| toTop       | 触顶的回调        | 列表中第一项                                 |
| toBottom    | 触底的回调        | 列表中最后一项                               |
| scroll      | 滚动的回调        | event                                        |
| itemResize  | Item 尺寸发生变化 | `{ id: string, newSize: number }`            |
| rangeUpdate | 可视区范围变更    | `{ inViewBegin: number, inViewEnd: number }` |

## Methods

| 方法名            | 说明                                                                       | 参数                                               |
| ----------------- | -------------------------------------------------------------------------- | -------------------------------------------------- |
| reset             | 重置列表                                                                   | -                                                  |
| getOffset         | 获取滚动高度                                                               | -                                                  |
| scrollToTop       | scroll to top                                                              | -                                                  |
| scrollToBottom    | scroll to bottom                                                           | -                                                  |
| scrollToIndex     | scroll to index                                                            | index                                              |
| scrollInToView    | scroll to index if needed（不在可视范围内）                                | index                                              |
| scrollToOffset    | scroll to px                                                               | px                                                 |
| getItemSize       | 获取指定item尺寸                                                           | index                                              |
| getItemPosByIndex | 获取指定item的位置信息: `{ top: number; current: number; bottom: number;}` | index                                              |
| forceUpdate       | 强制更新                                                                   | -                                                  |
| deletedList2Top   | 删除顶部list（通常在分页模式下使用，具体参考demo）                         | list[]                                             |
| addedList2Top     | 添加顶部list（通常在分页模式下使用，具体参考demo）                         | list[]                                             |
| manualRender      | 手动控制渲染（提供渲染起始）                                               | `(renderBegin: number, renderEnd: number) => void` |

## Extra variables

### reactive:ReactiveData

| 属性          | 类型   | 说明                                   |
| ------------- | ------ | -------------------------------------- |
| views         | number | 可视区域渲染个数                       |
| offset        | number | 滚动距离                               |
| listTotalSize | number | 不包含插槽的高度                       |
| virtualSize   | number | 虚拟占位尺寸，是从0到renderBegin的尺寸 |
| inViewBegin   | number | 可视区的起始下标                       |
| inViewEnd     | number | 可视区的结束下标                       |
| renderBegin   | number | 实际渲染的起始下标                     |
| renderEnd     | number | 实际渲染的结束下标                     |
| bufferTop     | number | 顶部buffer个数                         |
| bufferBottom  | number | 底部buffer个数                         |

### slotSize:SlotSize

| 属性             | 类型   | 说明                 |
| ---------------- | ------ | -------------------- |
| clientSize       | number | 可视区容器高度       |
| headerSize       | number | header插槽高度       |
| footerSize       | number | footer插槽高度       |
| stickyHeaderSize | number | stickyHeader插槽高度 |
| stickyFooterSize | number | stickyFooter插槽高度 |
