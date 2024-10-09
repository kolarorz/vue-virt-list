# VirtList API

## Attributes

| Attribute     | Description                                                                                                                              | Type                                                               | Default | Required                      |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------- | ----------------------------- |
| list          | list data                                                                                                                                | `Array`                                                            | -       | <font color="#f00">Yes</font> |
| itemKey       | The Id of Item，<font color="#f00">unique key!!!</font>（if not, scroll fail）                                                           | `String\|Number`                                                   | -       | <font color="#f00">Yes</font> |
| minSize       | **The Min Size of Item**                                                                                                                 | `Number`                                                           | `20`    | <font color="#f00">Yes</font> |
| itemGap       | the gap between item (item size include itemGap)                                                                                         | `Number`                                                           | 0       | -                             |
| fixed         | fixed height of item use it                                                                                                              | `Number`                                                           | `false` | -                             |
| buffer        | When the rendering amount is large and the scrolling white screen is serious, you can give a value<br/>bufferTop = bufferBottom = buffer | `Number`                                                           | `0`     | -                             |
| bufferTop     | buffer of top                                                                                                                            | `Number`                                                           | `0`     | -                             |
| bufferBottom  | buffer of bottom                                                                                                                         | `Number`                                                           | `0`     | -                             |
| horizontal    | is horizontal scrolling                                                                                                                  | `Boolean`                                                          | `false` | -                             |
| fixSelection  | fix the scrolling loss selection problem (only required and effective in vue2 diff-bug)                                                  | `Boolean`                                                          | `false` | -                             |
| start         | Start rendering index                                                                                                                    | `Number`                                                           | `0`     | -                             |
| offset        | Start rendering scrollTop                                                                                                                | `Number`                                                           | `0`     | -                             |
| listStyle     | list container style                                                                                                                     | `String`                                                           | `''`    | -                             |
| listClass     | list container class                                                                                                                     | `String`                                                           | `''`    | -                             |
| itemStyle     | item style                                                                                                                               | `String`                                                           | `''`    | -                             |
| itemClass     | item class                                                                                                                               | `String`                                                           | `''`    | -                             |
| renderControl | render control                                                                                                                           | `(begin: number, end: number ) => { begin: number; end: number };` | -       | -                             |

## Slots

| Name          | Description                                           |
| ------------- | ----------------------------------------------------- |
| header        | the slot of header                                    |
| footer        | the slot of footer                                    |
| sticky-header | the slot of sticky header                             |
| sticky-footer | the slot of sticky footer                             |
| default       | the slot of item， `slotScoped = { itemData, index }` |

## Events

| Event Name  | Description                                             | Parameters                                   |
| ----------- | ------------------------------------------------------- | -------------------------------------------- |
| toTop       | the event of arrived top                                | the itemData of first                        |
| toBottom    | the event of arrived bottom                             | the itemData of last                         |
| scroll      | the event of scrolling                                  | event                                        |
| itemResize  | the event of item size has changed                      | `{ id: string, newSize: number }`            |
| rangeUpdate | the event of startIndex or endIndex in view has changed | `{ inViewBegin: number, inViewEnd: number }` |

## Methods

| Method            | Description                                                              | Parameters                                         |
| ----------------- | ------------------------------------------------------------------------ | -------------------------------------------------- |
| reset             | reset VirtList                                                           | -                                                  |
| getOffset         | get scrollTop(or scrollLeft)                                             | -                                                  |
| scrollToTop       | scroll to top                                                            | -                                                  |
| scrollToBottom    | scroll to bottom                                                         | -                                                  |
| scrollToIndex     | scroll to index                                                          | index                                              |
| scrollInToView    | scroll to index if needed（if item is not in view）                      | index                                              |
| scrollToOffset    | scroll to px                                                             | px                                                 |
| getItemSize       | get size of item                                                         | index                                              |
| getItemPosByIndex | get position of item: `{ top: number; current: number; bottom: number;}` | index                                              |
| forceUpdate       | force update(render)                                                     | -                                                  |
| deletedList2Top   | deleted list of top part（Learn more in pagination example）             | list[]                                             |
| addedList2Top     | added list of top part（Learn more in pagination example）               | list[]                                             |
| manualRender      | manual render（need support renderBegin  & renderEnd）                   | `(renderBegin: number, renderEnd: number) => void` |

## Extra variables

### reactive:ReactiveData

| Attribute     | Type   | Description                                                    |
| ------------- | ------ | -------------------------------------------------------------- |
| views         | number | rendered number In view                                        |
| offset        | number | scrollTop or scrollLeft                                        |
| listTotalSize | number | the total of list size（Height without slots)                  |
| virtualSize   | number | The virtual placeholder size is the size from 0 to renderBegin |
| inViewBegin   | number | The start Index in view                                        |
| inViewEnd     | number | The end Index in view                                          |
| renderBegin   | number | The start Index of rendered                                    |
| renderEnd     | number | The end Index of rendered                                      |
| bufferTop     | number | The buffer of top                                              |
| bufferBottom  | number | The buffer of bottom                                           |

### slotSize:SlotSize

| Attribute        | Type   | Description            |
| ---------------- | ------ | ---------------------- |
| clientSize       | number | the client size        |
| headerSize       | number | header slot size       |
| footerSize       | number | footer slot size       |
| stickyHeaderSize | number | stickyHeader slot size |
| stickyFooterSize | number | stickyFooter slot size |
