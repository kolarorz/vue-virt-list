# API Document

## Attribute

| Attribute     | Description                                                                                                                                                         | Type                                                               | Default | Required |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------- | -------- |
| list          | Data                                                                                                                                                                | `Array`                                                            | -       | `Yes`    |
| itemKey       | id，Must be unique                                                                                                                                                  | `String  Number`                                                   | -       | `Yes`    |
| minSize       | **minimum size**，will calculate the number of visible areas based on this size                                                                                     | `Number`                                                           | `20`    | `Yes`    |
| fixed         | Is it a fixed height that can improve performance<br />**Warning：Do not use in dynamic height mode**                                                               | `Number`                                                           | `false` | -        |
| buffer        | When the rendering volume is large and the scrolling white screen is severe, a numerical value can be given, and bufferTop and bufferBottom will be equal to buffer | `Number`                                                           | `0`     | -        |
| bufferTop     | Top buffer numbers                                                                                                                                                  | `Number`                                                           | `0`     | -        |
| bufferBottom  | Bottom buffer numbers                                                                                                                                               | `Number`                                                           | `0`     | -        |
| horizontal    | Whether to scroll horizontally                                                                                                                                      | `Boolean`                                                          | `false` | -        |
| fixSelection  | Is it need to fix the scrolling loss selection issue (only required and effective under Vue2)                                                                       | `Boolean`                                                          | `false` | -        |
| start         | Start rendering index                                                                                                                                               | `Number`                                                           | `0`     | -        |
| offset        | Start rendering top height                                                                                                                                          | `Number`                                                           | `0`     | -        |
| listStyle     | List Container Style                                                                                                                                                | `String`                                                           | `''`    | -        |
| listClass     | List container class name                                                                                                                                           | `String`                                                           | `''`    | -        |
| itemStyle     | item Container Style                                                                                                                                                | `String`                                                           | `''`    | -        |
| itemClass     | item container class name                                                                                                                                           | `String`                                                           | `''`    | -        |
| renderControl | Rendering controller                                                                                                                                                | `(begin: number, end: number ) => { begin: number; end: number };` | -       | -        |

## Slots

| name          | Description                                                |
| ------------- | ---------------------------------------------------------- |
| header        | Top slot                                                   |
| footer        | Bottom slot                                                |
| sticky-header | Top floating slot                                          |
| sticky-footer | Bottom floating slot                                       |
| default       | item content, `The scope parameter is { itemData, index }` |

## Events

| Event Name | Description            | Parameters                        |
| ---------- | ---------------------- | --------------------------------- |
| toTop      | Topping callback       | First item in the list            |
| toBottom   | bottoming out callback | Last item in the list             |
| scroll     | scrolling callback     | event                             |
| itemResize | Item Size changes      | `{ id: string, newSize: number }` |

## Exposure methods

| Method            | Description                                                                               | Parameters |
| ----------------- | ----------------------------------------------------------------------------------------- | ---------- |
| reset             | Reset List                                                                                | -          |
| getOffset         | Get scrolling height                                                                      | -          |
| scrollToTop       | scroll to top                                                                             | -          |
| scrollToBottom    | scroll to bottom                                                                          | -          |
| scrollToIndex     | scroll to index                                                                           | index      |
| scrollInToView    | scroll to index if needed（Not within visible range）                                     | index      |
| scrollToOffset    | scroll to px                                                                              | px         |
| getItemSize       | get appoint item size                                                                     | index      |
| getItemPosByIndex | get appoint item position information: `{ top: number; current: number; bottom: number;}` | index      |
| forceUpdate       | force updates                                                                             | -          |
| deletedList2Top   | Delete the top list (only used in pagination mode, please refer to the demo for details)  | list[]     |
| addedList2Top     | Delete the top list (only used in pagination mode, please refer to the demo for details)  | list[]     |

## Additional parameters

### reactive:ReactiveData

| Attribute     | Type   | Description                                                       |
| ------------- | ------ | ----------------------------------------------------------------- |
| views         | number | Number of visible area renderings                                 |
| offset        | number | Scrolling distance                                                |
| listTotalSize | number | Height without slots                                              |
| virtualSize   | number | Virtual placeholder size, which is the size from 0 to renderBegin |
| inViewBegin   | number | Starting index of visible area                                    |
| inViewEnd     | number | End index of visible area                                         |
| renderBegin   | number | The starting index of the actual rendering                        |
| renderEnd     | number | Actual rendering end index                                        |
| bufferTop     | number | Number of top buffers                                             |
| bufferBottom  | number | Number of bottom buffers                                          |

### slotSize:SlotSize

| Attribute        | Type   | Description                      |
| ---------------- | ------ | -------------------------------- |
| clientSize       | number | Height of visible area container |
| headerSize       | number | Header slot height               |
| footerSize       | number | Footer slot height               |
| stickyHeaderSize | number | StickyHeader slot height         |
| stickyFooterSize | number | StickyFooter slot height         |
